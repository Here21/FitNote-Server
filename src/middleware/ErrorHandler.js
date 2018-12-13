/**
 * @Description: 通过Koa的洋葱皮特性，利用try next() catch 处理 module 内部所有的 throw 错误，以及语法错误
 * @author Martin
 * @date 2018/11/20
 */
const C = require('../util/const');
const logger = require('../util/logger');
const { Error } = require('../util/messageBean');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.error('Error Handler', e);

    if (!e) {
      ctx.body = new Error(C.ERROR_CODE.SYSTEM_ERROR);
    } else if (e.errorCode) {
      ctx.body = e;
    } else {
      ctx.body = new Error(C.ERROR_CODE.SYSTEM_ERROR, e.name, e.message);
    }
  }
};
