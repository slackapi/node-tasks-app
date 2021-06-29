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
      const tasks = await Task.findAll({ where: { id: tasksToUpdate } });
      tasks.map(async (task) => {
        if (task.scheduledMessageId) {
          // If a reminder is scheduled, cancel it and remove the ID from the datastore
          try {
            await client.chat.deleteScheduledMessage({
              channel: body.user.id,
              scheduled_message_id: task.scheduledMessageId,
            });
            Task.update({ scheduledMessageId: null }, { where: { id: task.id } });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        }
      });
    }
    await reloadAppHome(client, body.user.id, body.team.id);
  });
};
