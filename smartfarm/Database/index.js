const express = require("express");
const cors = require("cors");
const db_config = require("./db_config");

const app = express();
const port = 3000;
const pool = db_config;

pool.connect();

app.use(cors());
app.use(express.json());

app.get('/datas', async (req, res) => {
    try {
        const result = await pool.query('SELECT phonenum, password FROM USERS');
        const data = result.rows;
        let phonenumList = [];
        let passwordList = [];
        data.forEach(row => {
            phonenumList.push(row.phonenum);
            passwordList.push(row.password);
        });

        const result1 = await pool.query('SELECT gmailuser, gmailpass FROM gmails');
        const data1 = result1.rows;
        let gmailList = [];
        let gmailpassList = [];
        data1.forEach(row => {
            gmailList.push(row.gmailuser);
            gmailpassList.push(row.gmailpass);
        });

        const result2 = await pool.query('SELECT otpcode FROM OTP');
        const data2 = result2.rows;
        let otpcodeList = [];
        data2.forEach(row => {
            otpcodeList.push(row.otpcode);
        });

        res.json({phonenum: phonenumList, password: passwordList, gmailuser: gmailList, gmailpass: gmailpassList, otpcode: otpcodeList});

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put("/change", (req, res) => {
    const {phonenumbers, newpassword} = req.body;
    pool.query(
        "UPDATE users SET password = $1 WHERE phonenum = $2",
        [newpassword, phonenumbers],
        (err, result) => {
            if (err) {
                console.error('Error updating password', err.message);
                res.status(500).send("Server error");
            } else {
                res.status(200).send("Password updated successfully");
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
