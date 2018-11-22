const controller = require('./controller');

const router = [
  { method: 'GET', route: '/data', handlers: [controller.getAll] },
  { method: 'GET', route: '/data/page/:page', handlers: [controller.getData] },
  { method: 'GET', route: '/data/:id', handlers: [controller.getOneById] }
];

module.exports = router;
