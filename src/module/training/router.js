const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/training', handlers: [authorization.check, controller.addTraining] },
  { method: 'DELETE', route: '/training/:id', handlers: [authorization.check, controller.removeTraining] },
  { method: 'GET', route: '/training', handlers: [authorization.check, controller.getTrainingList] },
  { method: 'GET', route: '/training/:id', handlers: [authorization.check, controller.getTraining] },
  { method: 'PUT', route: '/training/complete-all', handlers: [authorization.check, controller.completeTraining] }
];

module.exports = router;
