/**
 * @Description: notify the response time
 * @author Martin
 * @date 2018/11/22
 */

module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
};
