const { sendLinkEventApp } = require('./send-link-event');

module.exports.register = (app) => {
  console.log('request is coming here')
  app.event('message', sendLinkEventApp);
};
