const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const apiRouter = require('./routes/api');

const app = express();
require('dotenv').config();

// Swagger
const swaggerUI  = require("swagger-ui-express");
const swaggerJsDoc  = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Expenses API",
        version: "1.0.0",
        description: "A simple express library API",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
        }
      ]
    },
    apis: ["./routes/api/*.js"],
  };



//middleares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

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