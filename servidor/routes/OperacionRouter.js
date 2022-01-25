const express =require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../db');


 
router.get('/:id', (req, res, next) => {
    console.log('route was being called to user with id: ' + req.params.id);
  
    const userId = req.params.id;
    const queryString = 'SELECT * FROM expenses.operacion WHERE id = ?';
    connection.query(queryString, [userId], (err, rows, fields) => {
      if (err) {
        console.log('Failed to query for users: ' + err);
        res.sendStatus(500);
        return;
      }
      console.log(rows);
      const operacion = rows.map(row => {
        return { id: row.idoperacion, concepto: row.concepto , monto : row.monto, fecha: row.fecha , tipo : row.tipo };
      });
  
      res.json(operacion);
    });
  
    });
    
router.get('/all', (req, res, next) => {

const queryString = 'SELECT * FROM expenses.operacion';
connection.query(queryString , (err, rows, fields) => {
if (err) {
    console.log('Failed to query for users: ' + err);
    res.sendStatus(500);
    return;
}
console.log(rows);

res.json(rows);
});

});

router.get('/top', (req, res, next) => {

    const queryString = 'SELECT * FROM expenses.operacion LIMIT 10';
    connection.query(queryString , (err, rows, fields) => {
    if (err) {
        console.log('Failed to query for users: ' + err);
        res.sendStatus(500);
        return;
    }
    console.log(rows);
    
    res.json(rows);
    });
    
    });

module.exports = router; 
  