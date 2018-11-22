const glob = require('glob');
const path = require('path');
const router = require('koa-router')({ prefix: '/api' });

function initModules(app) {
  const moduleRouter = glob.sync(path.join(__dirname, './*/router.js'));

  moduleRouter.forEach(path => {
    const items = require(path);
    items.forEach(item => {
      router[item.method.toLowerCase()](item.route, ...item.handlers);
    });
    app.use(router.routes());
  });
}

module.exports = initModules;
