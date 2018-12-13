const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.getData = async ctx => {
  const { page } = ctx.params;
  try {
    let result = await dao.getDataByPage(page);
    ctx.body = new Success(result);
  } catch (e) {
    ctx.body = new Error(C.ERROR_CODE.DB_ERROR, '获取数据失败', e);
  }
};

exports.getAll = async ctx => {
  try {
    let result = await dao.getAll();
    ctx.body = new Success(result, 'template');
  } catch (e) {
    ctx.body = new Error(C.ERROR_CODE.DB_ERROR);
  }
};

exports.getOneById = async ctx => {
  const { id } = ctx.params;
  try {
    let result = await dao.getOne(id);
    ctx.body = new Success(result, 'ok');
  } catch (e) {
    ctx.body = new Error(C.ERROR_CODE.DB_ERROR, '获取数据发生错误', e);
  }
};
