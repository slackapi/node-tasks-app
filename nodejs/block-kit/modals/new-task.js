const { Modal, Blocks, Elements } = require('slack-block-builder');

module.exports = () => {
    return Modal({ title: 'Create new task', submit: 'Create', callbackId: 'new-task-modal' })
        .blocks(
            Blocks.Input({ label: 'New task', blockId: 'taskTitle' }).element(
                Elements.TextInput({
                    placeholder: 'Do this thing',
                    actionId: 'taskTitle'
                })
            )
        ).buildToJSON();
}