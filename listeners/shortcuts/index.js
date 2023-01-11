const {messageShortcutCallback} = require('./message');

module.exports.register = (app) => {

  app.shortcut('send-message', messageShortcutCallback);
  
};