const router = require('koa-router')();
const controller = require('./controller');

router.get('/data/:page', controller.getData);
router.get('/data', controller.getOne);

module.exports = router;
