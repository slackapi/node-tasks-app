const { completeTasks, reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'button-mark-as-done', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    const taskID = action.value.split('-')[1];
    await completeTasks([taskID], body.user.id, client);
    await client.chat.update({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
      text: `~${body.message.text}~`,
      blocks: [], // Remove all the existing blocks, just leaving the text above.
    });
    await reloadAppHome(client, body.user.id, body.team.id, 'completed');
  });
};
