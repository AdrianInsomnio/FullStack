const router =  require('express').Router();
const { Operacion,Usuario } = require('../../db');
const {check,validationResult} = require('express-validator');


/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the tasks was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: Some server error
 *
 */
router.get('/',async (req,res)=>{
    //console.log(req.id);
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

    const insert = {
        concepto: req.body.concepto,
        monto : req.body.monto,
        tipo :req.body.tipo,
        usuarioId : req.id
    };

    const oper = await Operacion.create(insert);
    oper.usuarioId = req.id;
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
    res.send({ msg: "Updated"})
});

router.delete('/remove/:op_id', async (req,res)=>{
    await Operacion.destroy({
        where: { id: req.params.op_id}
    });
    res.json({success : "Transaction remove"})
});


module.exports = router;