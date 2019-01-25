const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/part', handlers: [authorization.check, controller.addPart] },
  { method: 'PUT', route: '/part/:id', handlers: [authorization.check, controller.updatePart] },
  { method: 'DELETE', route: '/part/:id', handlers: [authorization.check, controller.removePart] },
  { method: 'GET', route: '/part', handlers: [authorization.check, controller.getPartsList] }
];

module.exports = router;
