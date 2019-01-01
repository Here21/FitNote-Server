const dao = require('./dao');
const { Success } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addTraining = async ctx => {
  const data = ctx.request.body;
  const { user } = ctx.state;
  data.u_id = user.id;
  const id = await dao.add(data);
  ctx.body = new Success({ id }, '添加训练成功');
};

exports.removeTraining = async ctx => {
  const { user } = ctx.state;
  const { id } = ctx.params;
  await dao.delete({ id, u_id: user.id });
  ctx.body = new Success(null, '删除成功');
};

exports.getTrainingList = async ctx => {
  const { user } = ctx.state;
  const result = await dao.select({ del: 0, u_id: user.id });
  ctx.body = new Success(result);
};

exports.getTraining = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const result = await dao.getOne(id, user.id);
  ctx.body = new Success({ ...result });
};
