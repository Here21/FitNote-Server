/**
 * @Description: 解析token，将用户放入上下文中
 * @author Martin
 * @date 2018/11/22
 */

const jwt = require('../util/jwt');

module.exports = async(ctx, next) => {
  const { token } = ctx.headers;
  ctx.state.user = jwt.decodeToken(token);
  await next();
};
