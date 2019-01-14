const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addRecord = async ctx => {
  const data = ctx.request.body;
  const { user } = ctx.state;
  data.u_id = user.id;
  const id = await dao.add(data);
  ctx.body = new Success({ id }, '添加训练成功');
};

exports.updateRecord = async ctx => {
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

exports.getRecordList = async ctx => {

};

exports.getTraingingRecord = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const result = await dao.getTrainingRecord(id, user.id);
  ctx.body = new Success(result);
};

exports.removeRecord = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  await dao.delete({ id, u_id: user.id });
  ctx.body = new Success(null, '删除记录成功');
};
