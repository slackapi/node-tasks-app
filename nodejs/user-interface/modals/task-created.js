const { Modal, Blocks, Elements } = require('slack-block-builder');

module.exports = (taskTitle) => {
    return Modal({ title: 'Task created', callbackId: 'new-task-modal'})
        .blocks(
            Blocks.Section({
                text: `${taskTitle} created`
            })
        ).buildToJSON();
}