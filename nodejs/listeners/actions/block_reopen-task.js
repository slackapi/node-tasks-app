const { Task } = require('../../models');
const { reloadAppHome } = require('../../utilities');

const reopenTaskCallback = async ({ ack, action, client, body }) => {
  await ack();
  console.log(action);
  Task.update({ status: 'OPEN' }, { where: { id: action.value } });
  await reloadAppHome(client, body.user.id, body.team.id, 'completed');
};

module.exports = {
  reopenTaskCallback,
};
