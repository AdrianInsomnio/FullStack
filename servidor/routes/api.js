const router =  require('express').Router();

const apiOperacionRouter = require('./api/operacion');
const apiUsuarioRouter = require('./api/usuario');
const apiHomeRouter =require('./api/Home_Router');
const middleware = require('./api/middleware');

router.use('/users',apiUsuarioRouter);
router.use('/expenses',apiOperacionRouter);
router.use('/home',apiHomeRouter);

module.exports = router;