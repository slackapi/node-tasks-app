const { modals } = require('../../user-interface');

// Expose callback function for testing
const messageNewTaskCallback = async ({ shortcut, ack, client }) => {
  try {
    await ack();
    await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: modals.newTask(shortcut.message.text, shortcut.user.id),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { messageNewTaskCallback };
