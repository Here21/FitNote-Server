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
  Origin: '*',
  allowMethods: ['GET', 'POST'],
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
