const dao = require('./dao');
const { Success, Error } = require('../../util/message_bean');
const C = require('../../util/const');

exports.getData = async ctx => {
  console.log('----', 'into here getData');

  const { page } = ctx.params;
  try {
    let result = await dao.getDataByPage(page);
    ctx.body = new Success(result);
  } catch (e) {
    ctx.body = new Error(C.ERROR_CODE.DB_ERROR, '获取数据失败', e);
  }
};

exports.getOne = async ctx => {
  console.log('----', 'into here getOne');
};
