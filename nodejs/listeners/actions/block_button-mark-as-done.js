const { Op } = require('sequelize');
const { Task } = require('../../models');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.action({ action_id: 'button-mark-as-done', type: 'block_actions' }, async ({
    ack, action, client, body,
  }) => {
    await ack();
    const taskID = action.value.split('-')[1];
    Task.update({ status: 'CLOSED' }, { where: { id: taskID } });
    // Find all the tasks provided where we have a scheduled message ID
    const taskFromDB = await Task.findOne(
      {
        where: {
          [Op.and]: [
            { id: taskID },
            { scheduledMessageId: { [Op.not]: null } },
          ],
        },
      },
    );
    // If a reminder is scheduled, cancel it and remove the ID from the datastore
    if (taskFromDB.scheduledMessageId) {
      try {
        await client.chat.deleteScheduledMessage({
          channel: body.user.id,
          scheduled_message_id: taskFromDB.scheduledMessageId,
        });
        Task.update({ scheduledMessageId: null }, { where: { id: taskFromDB.id } });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    // TODO Update the reminder message to remove the "Mark as done button"
    await reloadAppHome(client, body.user.id, body.team.id, 'completed');
  });
};
