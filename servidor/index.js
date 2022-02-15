const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const apiRouter = require('./routes/api');

const app = express();

//middleares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
require('dotenv').config();
require('./db');


//routes

app.use('/api',apiRouter);
app.get('/', (req, res, next) => {
  res.send('hello');
});


//port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))