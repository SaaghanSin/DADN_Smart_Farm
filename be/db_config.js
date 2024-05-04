const Pool = require("pg").Pool;

const db_config = new Pool({
  user: "postgres",
  password: "Sus16103*",
  host: "localhost",
  port: 5432,
  database: "dadn",
});

module.exports = db_config;
