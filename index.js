const Koa = require('koa');
const config = require('./config/config.js');
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const glob = require('glob');
const logger = require('./util/logger');

const app = new Koa();

global.rootDir = `${path.resolve(__dirname)}/`;

app.use(serve(path.join(__dirname, '/../public')));
app.use(cors({
  Origin: '*',
  allowMethods: ['GET', 'POST'],
  maxAge: 86400
}));
app.use(bodyParser());

// routers
let routers = glob.sync('module/*/router.js');

routers.forEach(item => {
  const p = require(path.resolve(item));
  app.use(p.routes());
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const port = config.server.port;
app.listen(port);
logger.info(`server is running on port:${port} ...`);
