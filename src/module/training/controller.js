const dao = require('./dao');
const { Success, Error } = require('../../util/messageBean');
const C = require('../../util/const');
const moment = require('moment');
const _ = require('lodash');

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
  const result = await dao.getTrainingList(user.id, 0);
  ctx.body = new Success(result);
};

exports.getTrainingHistoryList = async ctx => {
  const { user } = ctx.state;
  const list = await dao.getTrainingList(user.id, 1);
  list.forEach(item => {
    item.date = moment(item.createon).format('YYYY-MM-DD');
  });
  const result = _.groupBy(list, 'date');
  ctx.body = new Success(result);
};

exports.getTraining = async ctx => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const result = await dao.getOne(id, user.id);
  ctx.body = new Success({ ...result });
};

exports.completeTraining = async ctx => {
  try {
    const { user } = ctx.state;
    // 查找当日训练
    const trainingList = await dao.getTrainingList(user.id, 0);
    if (trainingList.length > 0) {
      const all = trainingList.map(item => {
        return new Promise((resolve, reject) => {
          dao.update({ status: 1 }, { id: item.id }).then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          });
        });
      });
      await Promise.all(all);
      ctx.body = new Success(null, '训练完成');
    } else {
      ctx.body = new Error(C.ERROR_CODE.NO_RES, '没有找到训练项目');
    }
  } catch (e) {
    ctx.body = new Error(C.ERROR_CODE.SYSTEM_ERROR, '完成训练出错');
  }
};
