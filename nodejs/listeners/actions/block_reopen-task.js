const { Task } = require('../../models');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'reopen-task', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    Task.update({ status: 'OPEN' }, { where: { id: action.value } });
    await reloadAppHome(client, body.user.id, body.team.id, 'completed');
  });
};
