const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');


const app = express();

//middleares

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


//routes
app.use("/user",require('./routes/Op_Router'));
app.use("/expenses",require('./routes/OperacionRouter'));
app.use("/home",require('./routes/Home_Router'));


app.get('/', (req, res, next) => {
  res.send('hello');
});


//port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))