const router =  require('express').Router();
const { Operacion } = require('../../db');



router.get('/',async (req,res)=>{
    const all =await Operacion.findAll();
    res.json(all);
});

router.post('/create',async (req,res)=>{
    const oper = await Operacion.create(req.body);
    res.json(oper)
})

router.put('/update/:op_id',async (req,res)=>{
    await Operacion.update( req.body,{
        where: { id : req.params.op_id }
    })
    res.send({ msg: "Registro modificado"})
});

router.delete('/remove/:op_id', async (req,res)=>{
    await Operacion.destroy({
        where: { id: req.params.op_id}
    });
    res.json({success : "se ha eliminado la operacion"})
});


module.exports = router;