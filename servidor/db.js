const mysql = require('mysql2');
require('dotenv').config();

// db connection
const env = process.env;
const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});


module.exports = connection;