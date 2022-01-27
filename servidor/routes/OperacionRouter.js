const express =require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');


 

    
    router.get('/all', (req, res, next) => {

    const queryString = 'SELECT * FROM operacion';
    connection.query(queryString , (err, rows, fields) => {
    if (err) {
        console.log('Failed to query for users: ' + err);
        res.sendStatus(500);
        return;
    }
    //console.log(rows);

    res.json(rows);
    });

    });

    router.get('/top', (req, res, next) => {

        const queryString = 'SELECT * FROM expenses.operacion ORDER BY fecha desc LIMIT 10';
        connection.query(queryString , (err, rows, fields) => {
        if (err) {
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            return;
        }
        //console.log(rows);
        
        res.json(rows);
        });
        
        });

    router.post("/create",(req,res)=>{

        let data =
        { 
            concepto: req.body.concepto , 
            monto : req.body.monto,
            tipo : req.body.tipo };    

        let sql= "INSERT INTO expenses.operacion set ?";
        let query = connection.query(sql,data,(err,result)=>{
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            error : null, 
            response : "nuevo registro ha sido agregado"}))
        });
        });






    router.put("/update",(req,res)=>{

        let data =         
        [  
             req.body.concepto , 
             req.body.monto,
             new Date(),
             req.body.idoperacion
        ]        

        let sql= `UPDATE operacion SET concepto = ? , monto = ? , fecha = ? WHERE idoperacion = ? `;
        let query = connection.query(sql,data,(err,result)=>{
        if (err) throw err;
            res.send(JSON.stringify({
                status: 200,
                error : null, 
                response : "Registro ha sido modificado"}))
            });
        });
    
    router.get('/update/:id', (req, res, next) => {
        //console.log('route was being called to user with id: ' + req.params.id);
        
        const userId = req.params.id;
        const queryString = 'SELECT * FROM expenses.operacion WHERE id = ?';
        connection.query(queryString, [userId], (err, rows, fields) => {
            if (err) {
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            return;
            }
            //console.log(rows);
            const operacion = rows.map(row => {
            return { id: row.idoperacion, concepto: row.concepto , monto : row.monto, fecha: row.fecha , tipo : row.tipo };
            });
        
            res.json(operacion);
        });
        
        });


    router.delete("/remove/:id",(req,res)=>{
        //const id = req.params;

        let sql= "DELETE FROM expenses.operacion WHERE idoperacion = ?";
        let query = connection.query(sql,req.params.id,(err,result)=>{
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            error : null, 
            response : "nuevo registro ha sido agregado"}))
        });
        });

    router.get(
        '/getIncomes',(req,res , next)=>{
            const queryString = 'SELECT * FROM expenses.operacion where tipo = "I" ORDER BY fecha desc LIMIT 10';
            connection.query(queryString , (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for users: ' + err);
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            
            res.json(rows);
            });
            
        }
    );
    router.get(
        '/getOutcomes',(req,res , next)=>{
            const queryString = 'SELECT * FROM expenses.operacion where tipo != "I" ORDER BY fecha desc LIMIT 10';
            connection.query(queryString , (err, rows, fields) => {
            if (err) {
                console.log('Failed to query for users: ' + err);
                res.sendStatus(500);
                return;
            }
            console.log(rows);
            
            res.json(rows);
            });
            
        }
    );

    router.get('/:id', (req, res, next) => {
        //console.log('route was being called to user with id: ' + req.params.id);
      
        const userId = req.params.id;
        const queryString = 'SELECT * FROM expenses.operacion WHERE idoperacion = ?';
        connection.query(queryString, [userId], (err, rows, fields) => {
          if (err) {
            console.log('Failed to query for users: x ' + err);
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

        
module.exports = router; 
  