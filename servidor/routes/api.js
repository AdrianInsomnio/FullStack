const router =  require('express').Router();

const apiOperacionRouter = require('./api/operacion');

router.use('/expenses',apiOperacionRouter);

module.exports = router;