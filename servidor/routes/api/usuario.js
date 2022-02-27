const router =  require('express').Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../../db');
const {check,validationResult, body} = require('express-validator');



/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: the auto-generated id of user
 *        nombre:
 *              type: integer
 *              description: user nanme
 *        userName:
 *          type: string
 *          description: the name of the user
 *        password:
 *          type: integer
 *          description: the amount of the user
 *      required:
 *        - userName
 *        - password
 *      example:
 *        nombre: Prueba
 *        userName: INosmnio@gmail.com
 *        password: 123456xXd
 *    UserNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found user
 *      example:
 *        msg: User was not found
 *
 *  parameters:
 *    New:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the user id
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User endpoint
 */

/**
 * @swagger
 * /api/users/:
 *  get:
 *    summary: Returns a list of users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: the list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 * 
 */
router.get('/',async (req,res)=>{
    const all =await Usuario.findAll();
    res.json(all);
});




/**
 * @swagger
 * /api/users/register:
 *  post:
 *    summary: create a new  User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: the user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some server error
 *
 */

router.post('/register',[
    check('nombre','Name  is require')
        .not()
        .isEmpty(),
    check('userName','Email is require ')
        .not()
        .isEmpty()
        .isEmail()
        .custom(value => {
            return Usuario.findOne({ where: {userName : value} })
               .then((res) => {
                if (res) {
                    //console.log(res);
                    return Promise.reject('E-mail already in use');
                  }
                    
                  //return Promise.reject('username already taken')
               })
         })
        ,
    check('password','Password is require')
        .not()
        .isEmpty()
    ],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    req.body.password = bcrypt.hashSync(req.body.password,10);
    const user = await Usuario.create(req.body);

    res.json({ msg : "Success", user})
});



/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: User login
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: the User was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some server error
 *
 */
router.post('/login',[
    check('userName','Email is require ')
        .not()
        .isEmpty()
        .isEmail()
        .custom(value => {
            return Usuario.findOne({ where: {userName : value} })
            .then((res) => {
             if (!res) {
                 return Promise.reject('E-mail not exist');
               }
            })
            })
        ,
    check('password','Password is require')
        .not()
        .isEmpty()
    ],async (req,res)=>{
    const user= await Usuario.findOne({ where: { userName : req.body.userName }});
    if (user){
        const iguales = bcrypt.compareSync(req.body.password , user.password);
        if (iguales){
            //console.log(user);
            const token = jwt.sign(user.toJSON(),'FrazzE Sectreta',{ expiresIn: '5d' });
            
            res.status(200).json({token});
        }else{
            res.status(401).json({msg:"Erron in password", AuthStatus:false});    
        }
    }else{
        res.status(403).json({msg:"Erron in userName",AuthStatus:false});
    }    
})

module.exports = router;