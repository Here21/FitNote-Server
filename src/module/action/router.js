const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/action', handlers: [authorization.check, controller.addAction] },
  { method: 'PUT', route: '/action/:id', handlers: [authorization.check, controller.updateAction] },
  { method: 'DELETE', route: '/action/:id', handlers: [authorization.check, controller.removeAction] },
  { method: 'GET', route: '/action', handlers: [authorization.check, controller.getActionsList] },
  { method: 'GET', route: '/action/:id', handlers: [authorization.check, controller.getAction] },
  { method: 'GET', route: '/action/part/:id', handlers: [authorization.check, controller.getActionByPart] }
];

module.exports = router;
