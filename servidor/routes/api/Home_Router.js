const express =require('express');
const router = express.Router();
const { Operacion,Usuario } = require('../../db');
    
router.get('/',async (req, res, next) => {
    const all =await Operacion.findAll( 
        {
            limit: 10,
            where: {
              //your where conditions, or without them if you need ANY entry
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }
    );
  //  res.json(all);

    const salida= { Total : 0,Incomes :0 , Outcome : 0 , top10: all };
    
    all?.map( row=>{ 
        //console.log(row);
        (row?.tipo === "OUTCOME")?  salida.Incomes += row.monto : salida.Outcome += row.monto;
    });
    salida.Total = salida.Incomes-salida.Outcome;

    res.status(200).json(salida);
    
    });

module.exports = router;