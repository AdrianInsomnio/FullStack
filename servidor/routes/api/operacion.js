const router =  require('express').Router();
const { Operacion } = require('../../db');



router.get('/',(req,res)=>{
    res.send("funciona");
});

router.post('/create',async (req,res)=>{
    const oper = await Operacion.create(req.body);
    res.json(oper)
})

module.exports = router;