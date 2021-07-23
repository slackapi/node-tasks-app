const { messageNewTaskCallback } = require('./message-new-task');
const { globalNewTaskCallback } = require('./global-new-task');

const messageNewTaskListener = (app) =>
  app.shortcut('message_new_task', messageNewTaskCallback);

const globalNewTaskListener = (app) =>
  app.shortcut('global_new_task', globalNewTaskCallback);

module.exports = {
  globalNewTask: globalNewTaskListener,
  messageNewTask: messageNewTaskListener,
};
