const { modals } = require('../../user-interface');

module.exports = (app) => {
  app.action('create-a-task-app-home', async ({ body, ack, client }) => {
    try {
      await ack();
      await client.views.open({
        trigger_id: body.trigger_id,
        view: modals.newTask(),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
