const router =  require('express').Router();
const { Operacion,Usuario } = require('../../db');
const {check,validationResult} = require('express-validator');



router.get('/',async (req,res)=>{
    const all =await Operacion.findAll();
    res.json(all);
});

router.post('/create',[
    //`concepto`, `monto`, `tipo`, `usuarioId`
    check('concepto',"Description is require").exists().isLength({min:2}),
    check('monto','Value must be a number').exists().isNumeric({ min: 0}),
    check('tipo','Value must be only INCOME or OUTCOME').isIn(['INCOME', 'OUTCOME'])

],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const oper = await Operacion.create(req.body);
    res.json(oper)
})

router.put('/update/:op_id',[
    check('concepto',"Description is require").exists().isLength({min:2}),
    check('monto','Value must be a number').exists().isNumeric({ min: 0}),
    check('tipo','Value must be only INCOME or OUTCOME').isEmpty()

],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

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