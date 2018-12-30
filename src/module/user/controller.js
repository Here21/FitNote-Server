const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');
const config = require('../../../config/config');
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
  // maxAge 单位为毫秒
  ctx.cookies.set('token', token, { httpOnly: false, maxAge: config.security.JWT_APP_TOKEN_EXPIRE_TIME * 1000 });
  ctx.body = new Success({ type: user.type, id: user.id });
};

exports.getInfo = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.body = new Error(C.ERROR_CODE.NO_USER);
  }
  const info = await dao.selectOne({ id: user.id });
  if (info) {
    ctx.body = new Success(info);
  } else {
    ctx.body = new Error(C.ERROR_CODE.NO_USER);
  }
};

exports.checkAccount = async ctx => {
  let { account } = ctx.request.body;
  const result = await dao.selectOne({ account });
  if (result) {
    ctx.body = new Error(C.ERROR_CODE.ACCOUNT_ALREADY_TOOK);
  } else {
    ctx.body = new Success(null, '该账号未被注册，可以使用');
  }
};

exports.register = async ctx => {
  let { account, password } = ctx.request.body;
  if (!account || !password) {
    ctx.body = new Error(C.ERROR_CODE.REQUIRE_MORE_PARAMS);
    return;
  }
  // 转为字符串
  account += '';
  password += '';
  password = encrypt.MD5(password);
  const result = await dao.add({ account, password });
  ctx.body = new Success(result);
};

exports.update = async ctx => {
  // 出于安全考虑，普通用户修改范围有限，敏感字段修改需要更高级的权限或者单独接口
  let { nickname } = ctx.request.body;
  const { user } = ctx.state;
  console.log(user);
  await dao.update({ nickname }, { id: user.id });
  ctx.body = new Success(null, '更新成功');
};
