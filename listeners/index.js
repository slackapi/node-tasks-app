const shortcutsListener = require('./shortcuts');
const viewsListener = require('./views');
const eventsListener = require('./events');

module.exports.registerListeners = (app) => {
  shortcutsListener.register(app);
  viewsListener.register(app);
  eventsListener.register(app);
};
