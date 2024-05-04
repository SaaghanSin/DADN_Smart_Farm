import console from "../LogApp/.expo/metro/externals/console/index.js";

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

// get all light devices that have the name of the user
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

//get the latest activity of the device that has the device id
app.get("/activity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const latestActivity = await pool.query(
      "SELECT acttivity_description FROM activity WHERE device_id = $1 ORDER BY activity_id DESC LIMIT 1",
      [id]
    );
    if (latestActivity.rows.length === 0) {
      res.json({ acttivity_description: "OFF" });
    } else {
      res.json(latestActivity.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//add a new activity to the activity table that has the activity_id, activity time, activity description, and the device id
app.post("/activity", async (req, res) => {
  try {
    const moment = require("moment-timezone");
    const {acttivity_description, device_id } = req.body;

    const activity_time = moment().tz("Asia/Ho_Chi_Minh").format();
    
    const newActivity = await pool.query(
      "INSERT INTO activity (activity_time, acttivity_description, device_id) VALUES ($1, $2, $3) RETURNING *",
      [activity_time, acttivity_description, device_id]
    );
    res.json(newActivity.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//add a new device to the device table that has the device name , type, and location of the light and the name of the user
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

// get latest lux data
app.get("/lux", async (req, res) => {
  try {
    const latestLux = await pool.query(
      "SELECT lux FROM light_record ORDER BY light_record_id DESC LIMIT 1"
    );
    res.json(latestLux.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all activities from the activity table
app.get("/activities", async (req, res) => {
  try {
    const allActivities = await pool.query("SELECT * FROM activity");
    res.json(allActivities.rows);
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

app.get("/base-limit", (req, res) => {
  pool.query(
    "SELECT base_limit FROM configurations WHERE area = 'Backyard'",
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Internal server error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No data found");
        } else {
          const baseLimit = result.rows[0].base_limit;
          res.json({ base_limit: baseLimit });
        }
      }
    }
  );
});

app.get("/upper-limit", (req, res) => {
  pool.query(
    "SELECT upper_limit FROM configurations WHERE area = 'Backyard'",
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).send("Internal server error");
      } else {
        if (result.rows.length === 0) {
          res.status(404).send("No data found");
        } else {
          const upperLimit = result.rows[0].upper_limit;
          res.json({ upper_limit: upperLimit });
        }
      }
    }
  );
});

app.get("/latest-moisture", (request, response) => {
  pool.query(
    "SELECT moisture FROM moisture_record ORDER BY moisture_record_id DESC LIMIT 1",
    (error, result) => {
      if (error) {
        console.erro("Error executing query:", err.message);
        response.status(500).send("Internal server error");
      } else {
        if (result.rows.length === 0){
          response.status(400).send("No data found");
        } else {
          response.json(rows[0])
        }
      }
    }
  )
})

//---------------- PUT REQUEST--------------------

app.put("/put-upper-limit", (req, res) => {
  const { upperLimit } = req.body;
  pool.query(
    "UPDATE configurations SET upper_limit = $1 WHERE area = 'Backyard'",
    [upperLimit],
    (err, result) => {
      if (err) {
        console.error("Error updating upper_limit:", err.message);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).send("Upper limit updated successfully");
      }
    }
  );
});

app.put("/put-base-limit", (req, res) => {
  const { baseLimit } = req.body;
  pool.query(
    "UPDATE configurations SET base_limit = $1 WHERE area = 'Backyard'",
    [baseLimit],
    (err, result) => {
      if (err) {
        console.error("Error updating base_limit:", err.message);
        res.status(500).send("Internal server error");
      } else {
        res.status(200).send("Upper limit updated successfully");
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
