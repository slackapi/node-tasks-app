const { newTaskModalCallback } = require('./new-task-modal');

const newTaskModalListener = (app) =>
  app.view('new-task-modal', newTaskModalCallback);

module.exports = {
  newTaskModal: newTaskModalListener,
};
