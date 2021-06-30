const { Task } = require('../../models');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'blockOpenTaskCheckboxClicked', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    if (action.selected_options.length > 0) {
      const tasksToUpdate = action.selected_options.map((option) => option.value.split('-')[2]);
      Task.update({ status: 'CLOSED' }, { where: { id: tasksToUpdate } });
    }
    await reloadAppHome(client, body.user.id, body.team.id);
  });
};
