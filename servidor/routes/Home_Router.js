const express =require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');
    
router.get('/', (req, res, next) => {

const queryString = 'SELECT * FROM operacion';
connection.query(queryString , (err, rows, fields) => {
if (err) {
    console.log('Failed to query for users: ' + err);
    res.sendStatus(500);
    return;
}

const salida= { Total : 0,Incomes :0 , Outcome : 0 };

 rows?.map( row=>{ 
     (row?.tipo === "I")?  salida.Incomes += row.monto : salida.Outcome += row.monto;
 });
salida.Total = salida.Incomes-salida.Outcome;

res.json(salida);
});

});

module.exports = router;