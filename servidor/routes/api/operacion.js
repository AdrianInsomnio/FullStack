const router =  require('express').Router();
const { Operacion,Usuario } = require('../../db');
const {check,validationResult} = require('express-validator');
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');

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
 *         concepto
 *         monto
 *         usuarioId
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
 *    Id:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *          type: string
 *          description: the transaction id
  *    IdOp:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *          type: int32
 *          description: the transaction id
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
 *    parameters:
 *      - $ref: '#/components/parameters/Id'
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
 *    security:
 *       - bearerAuth: [ ]
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
router.post('/transaction',async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const data = req.body;
    //console.log("data",data);
    const token  = req.headers['authorization'];
    
    jwt.verify( token , 'FrazzE Sectreta' , (err, user)=>{
        if (err){
            res.status(403).json({msg:'Not authorized'});
        }else{
            
            const insert = {
                concepto: data.concepto,
                monto : data.monto,
                tipo : data.tipo,
                usuarioId : user.id };
                console.log("insert",insert);
            const oper = Operacion.create(insert);
            //oper.usuarioId = user.id;

            res.status(200).json({msg:'success', oper})

            
        }
    });
})

router.post('/prueba',(req,res)=>{
    const token  = req.headers['authorization'];
    jwt.verify( token , 'FrazzE Sectreta' , (err, user)=>{
        if (err){
            res.status(403).json({msg:'Not authorized'});
        }else{
            res.status(200).json({msg:'success',user})
        }
    });
})


/**
 * @swagger
 * /api/expenses/transaction/{id}:
 *  put:
 *    summary: Update a transaction by id
 *    security:
 *       - bearerAuth: [ ]
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
router.put('/transaction/',[
    check('id','Transaction Id is require'),
    check('usuarioId','usuario Id is require'),
    check('concepto',"Description is require").exists().isLength({min:2}),
    check('monto','Value must be a number').exists().isNumeric({ min: 0})
],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const data = {
        concepto : req.body.concepto,
        monto : req.body.monto
    };

    await Operacion.update( data,{
        where: { id : req.body.id }
    })
    res.send({ msg: "Updated"})
});



/**
 * @swagger
 * /api/expenses/transaction/{id}:
 *  delete:
 *    summary: delete a transaction by id
 *    security:
 *       - bearerAuth: [ ]
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
router.delete('/transaction', (req,res)=>{

    const token  = req.headers['authorization'];
    jwt.verify( token , 'FrazzE Sectreta' , (err, user)=>{
        if (err){
            res.status(403).json({msg:'Not authorized'});
        }else{
             Operacion.destroy({
                where: { id: req.body.id}
            });
            res.status(200).json({msg:'success'})
        }
    });
});

router.get('/getIncomes',async (req,res)=>{

    const all = await Operacion.findAll( {
        where : { tipo : 'INCOME' }
    });
    res.json(all);
})
router.get('/getOutcomes',async (req,res)=>{

    const all = await Operacion.findAll( {
        where : { tipo : 'OUTCOME' }
    });
    res.json(all);
})

module.exports = router;