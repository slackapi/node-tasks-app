const { Modal, Blocks } = require('slack-block-builder');

module.exports = (taskTitle) => Modal({ title: 'Something went wrong', callbackId: 'message-sent-error-modal' })
  .blocks(
    Blocks.Section({
      text: `We couldn't send ${taskTitle}. Sorry!`,
    }),
  ).buildToJSON();
