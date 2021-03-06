const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addAction = async ctx => {
  const data = ctx.request.body;
  const { user } = ctx.state;
  data.u_id = user.id;
  const id = await dao.add(data);
  ctx.body = new Success({ id }, '添加成功');
};

exports.updateAction = async ctx => {
  const data = ctx.request.body;
  const { id } = ctx.params;
  const { user } = ctx.state;
  const action = await dao.selectOne({ del: 0, id, u_id: user.id });
  if (action) {
    await dao.update(data, { id });
    ctx.body = new Success(null, '修改成功');
  } else {
    ctx.body = new Error(C.ERROR_CODE.NO_RES, '查询为空');
  }
};

exports.getActionsList = async ctx => {
  const { user } = ctx.state;
  const result = await dao.select({ del: 0, u_id: user.id });
  ctx.body = new Success(result);
};

exports.getAction = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const result = await dao.selectOne({ del: 0, id, u_id: user.id });
  ctx.body = new Success({ ...result });
};

exports.removeAction = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  await dao.delete({ id, u_id: user.id });
  ctx.body = new Success(null, '删除成功');
};

exports.getActionByPart = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const result = await dao.select({ del: 0, u_id: user.id, part: id });
  ctx.body = new Success(result);
};

exports.updateActionBatch = async ctx => {
  // body 应包含 { origin partId, new partId }
  // 处于安全，这里只更新part
  const { oldPId, newPId } = ctx.request.body;
  const { user } = ctx.state;
  const dataSource = await dao.select({ del: 0, u_id: user.id, part: oldPId });
  if (dataSource.length === 0) {
    ctx.body = new Error(C.ERROR_CODE.NO_RES, '无可更新数据');
  }

  await dao.updateBatch(dataSource, newPId);
  ctx.body = new Success(null, '批量更新成功');
};
