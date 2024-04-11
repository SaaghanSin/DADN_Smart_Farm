const express = require("express");
const cors = require("cors");
const db_config = require("./db_config");

const app = express();
const port = 3000;
const pool = db_config;

pool.connect();

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      res.status(500).send("Internal server error");
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/latest-light", (req, res) => {
  pool.query(
    "SELECT lux FROM light_record ORDER BY light_record_id DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Internal server error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No data found");
        } else {
          const luxValue = result.rows[0].lux;
          res.json({ lux: luxValue });
        }
      }
    }
  );
});

app.get("/light/:name", async (req, res) => {
  try {
    const username = req.params.name;
    const allLights = await pool.query(
      "SELECT * FROM device WHERE device_type = 'light' AND username = $1",
      [username]
    );
    res.json(allLights.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//add a new activity to the activity table that has the activity_id, activity time, activity description, and the device id
app.post("/activity", async (req, res) => {
  try {
    const moment = require("moment-timezone");
    const activity_time = moment().tz("Asia/Ho_Chi_Minh").format();
    const { activity_id, acttivity_description, device_id } = req.body;
    const newActivity = await pool.query(
      "INSERT INTO activity (activity_id, activity_time, acttivity_description, device_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [activity_id, activity_time, acttivity_description, device_id]
    );
    res.json(newActivity.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//add a new light device to the device table that has the device name , type, and location of the light and the name of the user
app.post("/light/:name", async (req, res) => {
  try {
    const username = req.params.name;
    const { device_id, device_type, device_location } = req.body;
    const newLight = await pool.query(
      "INSERT INTO device (device_id, device_type, device_location, username) VALUES($1, $2, $3, $4) RETURNING *",
      [device_id, device_type, device_location, username]
    );
    res.json(newLight.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a light device from the device table that has the device id
app.delete("/light/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //delete the activities that have the device id
    const deleteActivities = await pool.query(
      "DELETE FROM activity WHERE device_id = $1",
      [id]
    );
    //then delete the light device that has the device id
    const deleteLight = await pool.query(
      "DELETE FROM device WHERE device_id = $1",
      [id]
    );
    res.json("Light was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/latest-temperature", (req, res) => {
  pool.query(
    "SELECT temperature FROM temperature_record ORDER BY temperature_record_id DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Internal server error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No data found");
        } else {
          const temperatureValue = result.rows[0].temperature;
          res.json({ temperature: temperatureValue });
        }
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Welcome to my Express application!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
