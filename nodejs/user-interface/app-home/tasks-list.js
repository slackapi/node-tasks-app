const {
  HomeTab, Header, Divider, Section, Actions, Elements, Blocks, Bits
} = require('slack-block-builder');

module.exports = (tasks) => {
  if (tasks.length > 0) {
    return HomeTab({ callbackId: 'tasks-home' }).blocks(
      Header({ text: `You have ${tasks.length + 1} open tasks` }),
      Divider(),
      Blocks.Input({ label: 'Open Tasks' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'taskListHome' }).options(tasks.map((task) => Bits.Option({ text: task.title, value: `task-${task.id}` })))),
    ).buildToJSON();
  }
  return HomeTab({ callbackId: 'no-tasks-home' }).blocks(
    Header({ text: 'No open tasks' }),
    Divider(),
    Section({ text: 'Looks like you\'ve got nothing to do. You can create a task by clicking the button below.' }),
    Actions({ blockId: 'task-creation-actions' }).elements(
      Elements.Button({ text: 'Create a task' }).value('create-a-task-app-home').actionId('create-a-task-app-home')
    ),
  ).buildToJSON();
};
