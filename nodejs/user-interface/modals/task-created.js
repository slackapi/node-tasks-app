const { Modal, Blocks } = require('slack-block-builder');

module.exports = (taskTitle) => Modal({ title: 'Task created', callbackId: 'new-task-modal' })
  .blocks(
    Blocks.Section({
      text: `${taskTitle} created`,
    }),
  ).buildToJSON();
