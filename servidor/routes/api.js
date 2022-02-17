const router =  require('express').Router();

const apiOperacionRouter = require('./api/operacion');
const apiUsuarioRouter = require('./api/usuario');
const middleware = require('./api/middleware');

router.use('/users',apiUsuarioRouter);
router.use('/expenses',middleware.checkToken ,apiOperacionRouter);


module.exports = router;