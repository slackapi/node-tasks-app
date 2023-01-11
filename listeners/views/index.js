const { newMessageShortcutCallback } = require('./message-shortcut-modal');

module.exports.register = (app) => {
  app.view('submit-form', newMessageShortcutCallback);
};
