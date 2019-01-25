const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addPart = async ctx => {
  const data = ctx.request.body;
  const { user } = ctx.state;
  data.u_id = user.id;
  const id = await dao.add(data);
  ctx.body = new Success({ id }, '添加成功');
};

exports.updatePart = async ctx => {
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

exports.getPartsList = async ctx => {
  const { user } = ctx.state;
  const result = await dao.select({ del: 0, u_id: user.id });
  ctx.body = new Success(result);
};

exports.removePart = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  await dao.delete({ id, u_id: user.id });
  ctx.body = new Success(null, '删除成功');
};
