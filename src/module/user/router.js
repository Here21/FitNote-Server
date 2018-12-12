const controller = require('./controller');

const router = [
  { method: 'POST', route: '/user/login', handlers: [controller.login] }
];

module.exports = router;
