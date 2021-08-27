const { appHomeOpenedCallback } = require('./app_home_opened');

const appHomeOpenedListener = (app) =>
  app.event('app_home_opened', appHomeOpenedCallback);

module.exports = {
  appHomeOpened: appHomeOpenedListener,
};
