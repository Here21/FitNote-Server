const router = require('koa-router')({ prefix: '/api' });
const controller = require('./controller');

router.get('/data/page/:page', controller.getData);
router.get('/data', controller.getAll);
router.get('/data/:id', controller.getOneById);

module.exports = router;
