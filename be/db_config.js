const Pool = require("pg").Pool;

const db_config = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "dadn",
});

module.exports = db_config;
