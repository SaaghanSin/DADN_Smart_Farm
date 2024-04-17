const axios = require("axios");
const db_config = require("./db_config");
const pool = db_config;

const ADAFRUIT_IO_KEY = "aio_kTbb73aaRft4oVeofa62LY3IDxro";
const ADAFRUIT_IO_USERNAME = "duongwt16";
const FEED_NAME = "temp";
const LED_FEED_NAME = "led";
const LUX_FEED_NAME = "lux";

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");

    const fetchDataAndPrint = async () => {
      try {
        const response = await axios.get(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEED_NAME}/data`,
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        const data = response.data;
        if (data.length > 0) {
          const latestData = data[0];
          const temperature = latestData.value;
          const recordDate = new Date(latestData.created_at);

          // Get the latest record_id from the record table
          const latestRecord = await pool.query(
            "SELECT MAX(record_id) AS max_id FROM record"
          );
          const latestRecordId = latestRecord.rows[0].max_id || 0; // If no records, set it to 0
          const newRecordId = latestRecordId + 1; // Generate a new record_id

          await pool.query(
            "INSERT INTO record (record_id, record_date, device_id) VALUES ($1, $2, 1)",
            [newRecordId, recordDate]
          );
          await pool.query(
            "INSERT INTO temperature_record (temperature_record_id, temperature) VALUES ($1, $2)",
            [newRecordId, temperature]
          );
          console.log(`Latest temperature: ${temperature} at ${recordDate}`);
        } else {
          console.log("No data available from Adafruit");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    let lastLedId = "";

    const fetchLedDataAndPrint = async () => {
      try {
        const ledResponse = await axios.get(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${LED_FEED_NAME}/data`,
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        const ledData = ledResponse.data;
        if (ledData.length > 0) {
          const latestData = ledData[0];
          const ledId = latestData.id;
          const status = latestData.value;
          const recordDate = new Date(latestData.created_at);
          const newActivityDescription = status == 0 ? "OFF" : "ON";
          
          if (ledId !== lastLedId) {
            lastLedId = ledId;
            await pool.query(
              "INSERT INTO activity (activity_time, acttivity_description, device_id) VALUES ($1, $2, 'L1')",
              [recordDate, newActivityDescription]
            );
            console.log(`Latest led status: ${newActivityDescription} at ${recordDate}`);
          }          
        } else {
          console.log("No led data available from Adafruit");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const setLatestLedId = async () => {
      try {
        const response = await axios.get(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${LED_FEED_NAME}/data`,
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        const data = response.data;
        const latestData = data[0];
        lastLedId = latestData.id;
      }
      catch (error) {
        console.error("Error:", error);
      }
    };

    const postLedData = async (value) => {
      try {
        await axios.post(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${LED_FEED_NAME}/data`,
          {
            value: value,
          },
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        console.log(`LED turned ${value == 0 ? "OFF" : "ON"}`);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const sendLedData = async () => {
      try {
        const ledCheckResponse = await axios.get(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${LED_FEED_NAME}/data`,
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        const ledCheckData = ledCheckResponse.data;
        if (ledCheckData.length > 0) {
          const data = ledCheckData[0];
          const status = data.value;
          
          // get the latest led status from the activity table
          const latestActivity = await pool.query(
            "SELECT * FROM activity WHERE device_id = 'L1' ORDER BY activity_time DESC LIMIT 1"
          );
          const latestActivityDescription = latestActivity.rows[0].acttivity_description;

          if (status == 0 && latestActivityDescription == "ON") {
            await postLedData(1);
            await setLatestLedId();
          } else if (status == 1 && latestActivityDescription == "OFF") {
            await postLedData(0);
            await setLatestLedId();
          }
        } else {
          const latestActivity = await pool.query(
            "SELECT * FROM activity WHERE device_id = 'L1' ORDER BY activity_time DESC LIMIT 1"
          );
          const latestActivityDescription = latestActivity.rows[0].acttivity_description;
          if (latestActivityDescription == "ON") {
            await postLedData(1);
            await setLatestLedId();
          } else if (latestActivityDescription == "OFF") {
            await postLedData(0);
            await setLatestLedId();
          }
        }
      }
      catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchLuxDataAndPrint = async () => {
      try {
        const luxResponse = await axios.get(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${LUX_FEED_NAME}/data`,
          {
            headers: {
              "X-AIO-Key": ADAFRUIT_IO_KEY,
            },
          }
        );
        const luxData = luxResponse.data;
        if (luxData.length > 0) {
          const latestData = luxData[0];
          const lux = latestData.value;
          const recordDate = new Date(latestData.created_at);

          // Get the latest record_id from the record table
          const latestRecord = await pool.query(
            "SELECT MAX(record_id) AS max_id FROM record"
          );
          const latestRecordId = latestRecord.rows[0].max_id || 0; // If no records, set it to 0
          const newRecordId = latestRecordId + 1; // Generate a new record_id

          await pool.query(
            "INSERT INTO record (record_id, record_date, device_id) VALUES ($1, $2, 2)",
            [newRecordId, recordDate]
          );
          await pool.query(
            "INSERT INTO light_record (light_record_id, lux) VALUES ($1, $2)",
            [newRecordId, lux]
          );
          console.log(`Latest lux: ${lux} at ${recordDate}`);
        } else {
          console.log("No lux data available from Adafruit");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setInterval(fetchDataAndPrint, 10000);
    setInterval(fetchLedDataAndPrint, 1000);
    // setInterval(sendLedData, 10000);
    setInterval(fetchLuxDataAndPrint, 11000);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
