const log4js = require('log4js');
const path = require('path');

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    koa: {
      type: 'dateFile',
      filename: path.join(__dirname, '../../logs/'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: { default: { appenders: ['console', 'koa'], level: 'debug' } }
});

module.exports = log4js.getLogger('koa');
