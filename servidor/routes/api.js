const router =  require('express').Router();

const apiOperacionRouter = require('./api/operacion');

router.use('/operacion',apiOperacionRouter);

module.exports = router;