const { modals } = require('../../user-interface');

module.exports = (app) => {
  app.shortcut('message_new_task', async ({ shortcut, ack, client }) => {
    console.log(shortcut);
    try {
      await ack();
      await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: modals.newTask(shortcut.message.text),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
