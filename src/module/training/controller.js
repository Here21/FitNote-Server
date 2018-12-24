const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');

exports.addTraining = async ctx => {
  const data = ctx.request.body;
  const { user } = ctx.state;
  data.u_id = user.id;
  const id = await dao.add(data);
  ctx.body = new Success({ id }, '添加训练成功');
};

exports.updateTraining = async ctx => {
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

exports.getTrainingList = async ctx => {

};

exports.getTraining = async ctx => {
  const { id } = ctx.params;
  const result = await dao.selectOne({ del: 0, id });
  ctx.body = new Success({ ...result });
};
