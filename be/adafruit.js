const axios = require("axios");
const db_config = require("./db_config");
const pool = db_config;

const ADAFRUIT_IO_KEY = "aio_kTbb73aaRft4oVeofa62LY3IDxro";
const ADAFRUIT_IO_USERNAME = "duongwt16";
const FEED_NAME = "temp";

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

    setInterval(fetchDataAndPrint, 10000);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
