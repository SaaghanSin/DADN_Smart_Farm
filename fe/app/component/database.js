const {Client} = require('pg')

const client = new Client({
  host: 'localhost',
  database: 'dadn',
  user: 'postgres',
  password: 'Sus16103*',
  port: 5432,
})

client.connect();
client.query('SELECT * FROM users', (error, result) => {
  if (error){
    console.log(error.message)
  }else{
    console.log(result.rows)
  }
  client.end;
})
