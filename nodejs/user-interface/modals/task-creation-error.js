const { Modal, Blocks, Elements } = require('slack-block-builder');

module.exports = (taskTitle) => {
    return Modal({ title: 'Something went wrong', callbackId: 'new-task-modal'})
        .blocks(
            Blocks.Section({
                text: `We couldn't create ${taskTitle}. Sorry!`
            })
        ).buildToJSON();
}