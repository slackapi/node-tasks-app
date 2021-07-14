const { Modal, Blocks, Elements } = require('slack-block-builder');
// Need to import user id to set as `initialUser` or `initialConversation`
//const { User} = require('../models'); 

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
      Blocks.Input({ label: 'Assign user', blockId: 'taskAssignUser', optional: true }).element(
        Elements.UserSelect({
          actionId: 'taskAssignUser',
        }),
        //.initialUser(User.)
      ),
      //OR
      // Instead of a select user element we use a conversations element so that we can set filter out bot users something like:
      // Blocks.Input({ label: 'Assign user', blockId: 'taskAssignUser', optional: true }).element(
      //   Elements.ConversationSelect({
      //     actionId: 'taskAssignUser',
      //   }) 
      //   .filter(['im'])
      //   .excludeBotUsers(true) //breaks app
      // ),
      Blocks.Input({ label: 'Due date', blockId: 'taskDueDate', optional: true }).element(
        Elements.DatePicker({
          actionId: 'taskDueDate',
        }),
      ),
      Blocks.Input({ label: 'Time', blockId: 'taskDueTime', optional: true }).element(
        Elements.TimePicker({
          actionId: 'taskDueTime',
        }),
      ), 
    ).buildToJSON();
};
