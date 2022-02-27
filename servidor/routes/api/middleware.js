const moment = require('moment');
const jwt = require('jwt-simple');

const checkToken = (req,res,next)=>{
    if (!req.headers['user-token']){
        return res.json({error: "Nedd user-token in header"})
    }
    const userToken = req.headers['user-token'];
    let payload ={}
    try{
        payload = jwt.decode(userToken,'FrazE SSecreta')
    }catch(err){
        return res.json({error: "token not valid"})
    }
    if (payload.expiredAt < moment().unix()){
        return res.json({error:"Token Date not valid"})
    }

    req.id = payload.id;

    next();
}

module.exports = {
    checkToken:checkToken
}