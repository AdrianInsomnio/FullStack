const router =  require('express').Router();
const bcrypt =require('bcryptjs');
const { Usuario } = require('../../db');
const {check,validationResult} = require('express-validator');



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


module.exports = router;