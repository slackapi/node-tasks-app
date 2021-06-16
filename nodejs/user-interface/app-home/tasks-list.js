const {
  HomeTab, Header, Divider, Section, Actions, Elements, Blocks, Bits,
} = require('slack-block-builder');
const pluralize = require('pluralize');

module.exports = (openTasks, completedTasks) => {
  if (openTasks.length > 0 || completedTasks.length > 0) {
    return HomeTab({ callbackId: 'tasks-home' }).blocks(
      Header({ text: `You have ${openTasks.length} open ${pluralize('task', openTasks.length)}` }),
      Divider(),
      Blocks.Input({ label: 'Open Tasks', blockId: 'open-task-status-change' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'openTaskListHome' }).options(openTasks.map((task) => Bits.Option({ text: task.title, value: `open-task-${task.id}` })))),
      Blocks.Input({ label: 'Completed Tasks', blockId: 'completed-task-status-change' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'closedTaskListHome' }).options(completedTasks.map((task) => Bits.Option({ text: task.title, value: `completed-task-${task.id}` }))).initialOptions(completedTasks.map((task) => Bits.Option({ text: task.title, value: `completed-task-${task.id}` })))),
    ).buildToJSON();
  }
  return HomeTab({ callbackId: 'no-tasks-home' }).blocks(
    Header({ text: 'No open tasks' }),
    Divider(),
    Section({ text: 'Looks like you\'ve got nothing to do. You can create a task by clicking the button below.' }),
    Actions({ blockId: 'task-creation-actions' }).elements(
      Elements.Button({ text: 'Create a task' }).value('create-a-task-app-home').actionId('create-a-task-app-home'),
    ),
  ).buildToJSON();
};
