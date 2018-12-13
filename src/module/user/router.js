const controller = require('./controller');
const authorization = require('../../middleware/Authorization');

const router = [
  { method: 'POST', route: '/user/login', handlers: [controller.login] },
  { method: 'POST', route: '/user/register', handlers: [controller.register] },
  { method: 'POST', route: '/user/check-account', handlers: [controller.checkAccount] },
  { method: 'PUT', route: '/user', handlers: [authorization.check, controller.update] },
  { method: 'GET', route: '/user', handlers: [authorization.check, controller.getInfo] }
];

module.exports = router;
