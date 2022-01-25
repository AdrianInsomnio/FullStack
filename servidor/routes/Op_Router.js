const express =require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../db');


 
router.get('/:id', (req, res, next) => {
    console.log('route was being called to user with id: ' + req.params.id);
  
    const userId = req.params.id;
    const queryString = 'SELECT * FROM users WHERE id = ?';
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
    
router.get('/', (req, res, next) => {

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

module.exports = router; 
  