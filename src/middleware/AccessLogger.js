const _ = require('lodash');
const logger = require('../util/logger');

module.exports = async(ctx, next) => {
  logger.debug('[%s]: %s', ctx.method, ctx.url);
  const start = Date.now();
  const params = {
    req_header: JSON.stringify(ctx.headers),
    req_body: JSON.stringify(ctx.body),
    req_query: JSON.stringify(ctx.query),
    req_params: JSON.stringify(ctx.params),
    method: ctx.method,
    ip: ctx.ip,
    url: ctx.path
  };
  const { user } = ctx.state;
  if (_.isEmpty(user)) {
    params.u_id = 0;
  } else {
    params.u_id = user.uid;
  }
  // 记录access log
  // sql insert
  await next();
  const ms = Date.now() - start;
  // 更新access log
  // sql update ms
};
