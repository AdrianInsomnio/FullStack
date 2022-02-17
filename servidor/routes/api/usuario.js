const router =  require('express').Router();
const bcrypt =require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { Usuario } = require('../../db');
const {check,validationResult, body} = require('express-validator');



router.get('/',async (req,res)=>{
    const all =await Usuario.findAll();
    res.json(all);
});

router.post('/register',[
    check('nombre','Name  is require')
        .not()
        .isEmpty(),
    check('userName','UserName is require ')
        .not()
        .isEmpty()
        .custom(value => {
            return Usuario.findOne({ where: {username : value} })
               .then(() => {
                  return Promise.reject('username already taken')
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
    res.json(user)
});

router.post('/login',async (req,res)=>{
    const user= await Usuario.findOne({ where: { userName : req.body.userName }});
    if (user){
        const iguales = bcrypt.compareSync(req.body.password , user.password);
        if (iguales){

            res.json({success : crearToken(user)});
        }else{
            res.json({msg:"Erron in userName or password"});    
        }
    }else{
        res.json({msg:"Erron in userName or password"});
    }    
})


router.put('/update/:op_id',async (req,res)=>{
    await Usuario.update( req.body,{
        where: { id : req.params.op_id }
    })
    res.send({ msg: "Registro modificado"})
});

router.delete('/remove/:op_id', async (req,res)=>{
    await Usuario.destroy({
        where: { id: req.params.op_id}
    });
    res.json({success : "se ha eliminado la operacion"})
});


const crearToken = (user)=>{
    const payload = {
        id :user.id,
        createdAt : moment().unix(),
        expiredAt : moment().add(5 ,'days').unix()

    }
    return jwt.encode(payload,'FrazE SSecreta')
}
module.exports = router;