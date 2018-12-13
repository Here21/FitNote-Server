const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/action', handlers: [authorization.check, controller.addAction] },
  { method: 'PUT', route: '/action/:id', handlers: [authorization.check, controller.updateAction] },
  { method: 'GET', route: '/action', handlers: [authorization.check, controller.getActionsList] },
  { method: 'GET', route: '/action/:id', handlers: [authorization.check, controller.getAction] }
];

module.exports = router;
