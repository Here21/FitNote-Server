const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/t_record', handlers: [authorization.check, controller.addRecord] },
  { method: 'PUT', route: '/t_record/:id', handlers: [authorization.check, controller.updateRecord] },
  { method: 'GET', route: '/t_record', handlers: [authorization.check, controller.getRecordList] },
  { method: 'GET', route: '/t_record/:id', handlers: [authorization.check, controller.getRecord] }
];

module.exports = router;
