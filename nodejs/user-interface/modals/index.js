const { newTask } = require('./new-task');
const { taskCreated } = require('./task-created');
const { taskCreationError } = require('./task-creation-error');

module.exports = {
  newTask,
  taskCreated,
  taskCreationError,
};
