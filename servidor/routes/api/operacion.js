const router =  require('express').Router();
const { Operacion,Usuario } = require('../../db');
const {check,validationResult} = require('express-validator');

/**
 * @swagger
 * components:
 *  schemas:
 *    Transaction:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: the auto-generated id of transaction
 *        concepto:
 *          type: string
 *          description: the name of the transaction
 *        monto:
 *          type: integer
 *          description: the amount of the transaction
 *        tipo:
 *          type: string
 *          description: INCOME /OUTCOME
 *        usuarioId:
 *          type: integer
 *          description: foreing key
 *      required:
 *        - concepto
 *        - monto
 *        - usuarioId
 *      example:
 *        id: 5
 *        concepto: My first Income
 *        monto: 500
 *        ususarioId: 3
 *    TransactionNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found task
 *      example:
 *        msg: Transaction was not found
 *
 *  parameters:
 *    id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the transaction id
 */

/**
 * @swagger
 * tags:
 *  name: Transaction
 *  description: Transaction endpoint
 */

/**
 * @swagger
 * /api/expenses/:
 *  get:
 *    summary: Returns a list of transaction
 *    tags: [Transaction]
 *    responses:
 *      200:
 *        description: the list of transaction
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Transaction'
 */
router.get('/',async (req,res)=>{
    //console.log(req.id);
    const all =await Operacion.findAll();
    res.json(all);
});


/**
 * @swagger
 * /api/expenses/transaction/{id}:
 *  get:
 *    summary: Return  transaction by Id 
 *    tags: [Transaction]
 *    responses:
 *      200:
 *        description: transaction
 *        content:
 *          application/json:
 *            schema:
 *              type: objet
 *              items:
 *                $ref: '#/components/schemas/Transaction'
 */
router.get('/transaction/:op_id',async (req,res)=>{
    const obj = await Operacion.findOne( {where: { id : req.params.op_id}} );
    if (obj){
        return res.json(obj);
    }else{
        return res.json({message:"Transaction not found"});
    }

})

/**
 * @swagger
 * /api/expenses/transaction:
 *  post:
 *    summary: create a new  transaction
 *    tags: [Transaction]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transaction'
 *    responses:
 *      200:
 *        description: the transaction was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      500:
 *        description: Some server error
 *
 */
router.post('/transaction',[
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




/**
 * @swagger
 * /api/expenses/transaction/{id}:
 *  put:
 *    summary: Update a transaction by id
 *    tags: [Transaction]
 *    parameters:
 *      - $ref: '#/components/parameters/Id'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Transaction'
 *    responses:
 *      200:
 *        description: The updated transaction
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: the transaction was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionNotFound'
 *
 */
router.put('/transaction/:op_id',[
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



/**
 * @swagger
 * /api/expenses/transaction/{id}:
 *  delete:
 *    summary: delete a transaction by id
 *    tags: [Transaction]
 *    parameters:
 *      - $ref: '#/components/parameters/Id'
 *    responses:
 *      200:
 *        description: the transaction was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: the transaction was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionNotFound'
 *
 */
router.delete('/transaction/:op_id', async (req,res)=>{
    await Operacion.destroy({
        where: { id: req.params.op_id}
    });
    res.json({success : "Transaction remove"})
});


module.exports = router;