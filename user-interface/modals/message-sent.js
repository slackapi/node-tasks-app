const { Modal, Blocks } = require('slack-block-builder');

module.exports = (taskTitle) => Modal({ title: 'SUCCESS!', callbackId: 'message-sent-success-modal' })
  .blocks(
    Blocks.Section({
      text: `Message is sent to Pintel successfully`,
    }),
  ).buildToJSON();
