const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: '15102003',
    host: 'localhost',
    port: 5432,
    database: 'DADN'
});

module.exports = pool;