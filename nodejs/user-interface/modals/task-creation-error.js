const { Modal, Blocks } = require('slack-block-builder');

module.exports = (taskTitle) => Modal({ title: 'Something went wrong', callbackId: 'new-task-modal' })
  .blocks(
    Blocks.Section({
      text: `We couldn't create ${taskTitle}. Sorry!`,
    }),
  ).buildToJSON();
