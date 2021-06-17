const { Task } = require('../../models');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'openTaskListHome', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    const tasksToUpdate = [];
    if (action.selected_options.length > 0) {
      action.selected_options.forEach(async (option) => {
        const taskID = option.value.split('-')[2];
        tasksToUpdate.push(taskID);
      });
      Task.update({ status: 'CLOSED' }, { where: { id: tasksToUpdate } });
    }
    await reloadAppHome(client, body.user.id, body.team.id);
  });
};
