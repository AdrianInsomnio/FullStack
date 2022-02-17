const router =  require('express').Router();

const apiOperacionRouter = require('./api/operacion');
const apiUsuarioRouter = require('./api/usuario');

router.use('/users',apiUsuarioRouter);
router.use('/expenses',apiOperacionRouter);


module.exports = router;