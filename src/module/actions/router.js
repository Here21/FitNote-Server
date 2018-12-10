const controller = require('./controller');

const router = [
  { method: 'POST', route: '/action', handlers: [controller.addAction] },
  { method: 'UPDATE', route: '/action/:id', handlers: [controller.updateAction] },
  { method: 'GET', route: '/action', handlers: [controller.getActionsList] },
  { method: 'GET', route: '/action/:id', handlers: [controller.getAction] }
];

module.exports = router;
