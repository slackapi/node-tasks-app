const { Modal, Blocks, Elements } = require('slack-block-builder');

module.exports = () => Modal({ title: 'Create new task', submit: 'Create', callbackId: 'new-task-modal' })
  .blocks(
    Blocks.Input({ label: 'Title', blockId: 'taskTitle' }).element(
      Elements.TextInput({
        placeholder: 'Do this thing',
        actionId: 'taskTitle',
      }),
    ),
    Blocks.Input({ label: 'Due date', blockId: 'taskDueDate', optional: true }).element(
      Elements.DatePicker({
        actionId: 'taskDueDate',
      }),
    ),
    Blocks.Input({ label: 'Assign user', blockId: 'taskAssignUser'}).element(
      Elements.UserSelect({
        actionId: 'taskAssignUser',
      }),
    ),
  ).buildToJSON();
