const { Modal, Blocks, Elements } = require('slack-block-builder');

module.exports = (prefilledTitle) => {
  const textInput = (taskTitle) => {
    if (taskTitle) {
      return Elements.TextInput({
        placeholder: 'Do this thing',
        actionId: 'taskTitle',
        initialValue: taskTitle,
      });
    }

    return Elements.TextInput({
      placeholder: 'Do this thing',
      actionId: 'taskTitle',
    });
  };

  return Modal({ title: 'Create new task', submit: 'Create', callbackId: 'new-task-modal' })
    .blocks(
      Blocks.Input({ label: 'New task', blockId: 'taskTitle' }).element(
        textInput(prefilledTitle),
      ),
      Blocks.Input({ label: 'Due date', blockId: 'taskDueDate', optional: true }).element(
        Elements.DatePicker({
          actionId: 'taskDueDate',
        }),
      ),
    ).buildToJSON();
};
