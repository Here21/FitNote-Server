const Koa = require('koa');
const config = require('../config/config.js');
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('./util/logger');
const ErrorHandler = require('./middleware/ErrorHandler');
const ResponseTime = require('./middleware/ResponseTime');
const DecodeToken = require('./middleware/DecodeToken');
const AccessLogger = require('./middleware/AccessLogger');

const initRouter = require('./module');

const app = new Koa();
global.rootDir = `${path.resolve(__dirname)}/`;

app.use(serve(path.join(__dirname, '../public')));
app.use(cors({
  origin: '*',
  // TODO: 配合本地开发，前端跨域携带cookie，服务器使用Nginx转发不存在跨域问题，正式环境删除一下两行，解注释第一行
  // origin: 'http://localhost:3000',
  // credentials: true,
  allowMethods: ['GET', 'POST', 'PUT'],
  maxAge: 86400
}));
app.use(bodyParser());

// middleware
app.use(ErrorHandler);
app.use(ResponseTime);
app.use(DecodeToken);
app.use(AccessLogger);

// router
initRouter(app);

const port = config.server.port;
app.listen(port);
logger.info(`server is running on port:${port} ...`);
