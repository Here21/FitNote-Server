const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addAction = async ctx => {
  const data = ctx.body;
  const result = await dao.add(data);
  ctx.body = new Success(result, '添加成功');
};

exports.updateAction = async ctx => {
  const data = ctx.body;
  const { id } = ctx.params;
  const action = await dao.getOne(id);
  if (action) {
    await dao.update(data, { id });
    ctx.body = new Success(null, '修改成功');
  } else {
    ctx.body = new Error(C.ERROR_CODE.NO_RES, '查询为空');
  }
};

exports.getActionsList = async ctx => {

};

exports.getAction = async ctx => {

};
