const C = require('../util/const');
const { Error } = require('../util/messageBean');

async function _checkUserType(ctx, next, userType = 0) {
  const { user } = ctx.state;
  if (!user) {
    ctx.body = new Error(C.ERROR_CODE.TOKEN_ERROR);
  } else if (userType !== 0 && user.type !== userType) {
    ctx.body = new Error(C.ERROR_CODE.NO_AUTH);
  } else if (next) {
    await next();
  }
}

exports.check = async(ctx, next) => {
  await _checkUserType(ctx, next);
};

exports.checkAdmin = async(ctx, next) => {
  await _checkUserType(ctx, next, C.USER_TYPE.ADMIN);
};
