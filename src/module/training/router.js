const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/training', handlers: [authorization.check, controller.addTraining] },
  { method: 'PUT', route: '/training/:id', handlers: [authorization.check, controller.updateTraining] },
  { method: 'GET', route: '/training', handlers: [authorization.check, controller.getTrainingList] },
  { method: 'GET', route: '/training/:id', handlers: [authorization.check, controller.getTraining] }
];

module.exports = router;
