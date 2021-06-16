const { Task } = require('../../models');

module.exports = (app) => {
  app.action({ action_id: 'openTaskListHome', type: 'block_actions' }, async ({ ack, action }) => {
    await ack();
    const tasksToUpdate = [];
    if (action.selected_options.length > 0) {
      action.selected_options.forEach(async (option) => {
        const taskID = option.value.split('-')[2];
        tasksToUpdate.push(taskID);
      });
      Task.update({ status: 'CLOSED' }, { where: { id: tasksToUpdate } });
    }
  });
};
