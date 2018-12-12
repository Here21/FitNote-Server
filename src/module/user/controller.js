const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');
const encrypt = require('../../util/encrypt');
const jwt = require('../../util/jwt');

exports.login = async ctx => {
  let { account, password } = ctx.request.body;
  if (!account || !password) {
    ctx.body = new Error(C.ERROR_CODE.INVALID_PARAMS);
    return;
  }
  // 转为字符串
  account += '';
  password += '';
  password = encrypt.MD5(password);
  const user = await dao.login(account, password);
  if (!user) {
    ctx.body = new Error(C.ERROR_CODE.NO_USER);
    return;
  }
  const token = jwt.create({ id: user.id, type: user.type });
  ctx.cookies.set('token', token, { httpOnly: false, maxAge: 3 * 24 * 3600 });
  ctx.body = new Success({ token, type: user.type, id: user.id });
};
