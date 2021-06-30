const { completeTasks, reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'button-mark-as-done', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    const taskID = action.value.split('-')[1];
    await completeTasks([taskID], body.user.id, client);
    // TODO Update the reminder message to remove the "Mark as done button"
    await reloadAppHome(client, body.user.id, body.team.id, 'completed');
  });
};
