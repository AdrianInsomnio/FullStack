const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const app = express();

//middleares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

// db connection
const env = process.env;
const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
});


//routes
app.get('/api/test', (req, res) => res.json({message:"api is ready"}));

app.get('/', (req, res, next) => {
    res.send('hello');
  });
  
app.get('/user/:id', (req, res, next) => {
  console.log('route was being called to user with id: ' + req.params.id);

  const userId = req.params.id;
  const queryString = 'SELECT * FROM users WHERE idf = ?';
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err);
      res.sendStatus(500);
      return;
    }
    console.log(rows);
    const users = rows.map(row => {
      return { name: row.nombre, pass: row.pass };
    });

    res.json(users);
  });

  });
  
  app.get('/users', (req, res, next) => {
   
    const queryString = 'SELECT * FROM users';
    connection.query(queryString , (err, rows, fields) => {
      if (err) {
        console.log('Failed to query for users: ' + err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      const users = rows.map(row => {
        return { name: row.nombre, pass: row.pass };
      });

      res.json(rows);
    });
   
  });
  






//port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))