const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const apiRouter = require('./routes/api');

const app = express();

// Swagger
const swaggerUI  = require("swagger-ui-express");
const swaggerJsDoc  = require("swagger-jsdoc");
const options   = require('./routes/api/swaggerOptions');

//middleares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
require('dotenv').config();
require('./db');

const specs = swaggerJsDoc(options);

//routes

app.use('/api',apiRouter);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req, res, next) => {
  res.send('hello');
});


//port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))