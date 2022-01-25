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


//routes
app.get('/api/test', (req, res) => res.json({message:"api is ready"}));

app.get('/', (req, res, next) => {
    res.send('hello');
  });

app.use("/user",require('./routes/Op_Router'));
app.use("/expenses",require('./routes/OperacionRouter'));




//port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))