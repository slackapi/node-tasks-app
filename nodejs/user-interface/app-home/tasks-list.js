const {
  HomeTab, Header, Divider, Section, Actions, Elements, Input, Bits,
} = require('slack-block-builder');
const pluralize = require('pluralize');

module.exports = (openTasks, recentlyCompletedTasks) => {
  if (openTasks.length > 0) {
    const completedTaskList = recentlyCompletedTasks.length > 0 ? recentlyCompletedTasks.map((task) => `• ~${task.title}~`).join('\n') : '*None*';
    return HomeTab({ callbackId: 'tasks-home' }).blocks(
      Header({ text: `You have ${openTasks.length} open ${pluralize('task', openTasks.length)}` }),
      Divider(),
      // Open Tasks
      Input({ label: ' ', blockId: 'open-task-status-change' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'openTaskListHome' }).options(openTasks.map((task) => Bits.Option({ text: task.title, value: `open-task-${task.id}` })))),
      // Completed Tasks
      Header({ text: 'Tasks completed recently' }),
      Divider(),
      Section({ text: completedTaskList }),
    ).buildToJSON();
  }

  if (recentlyCompletedTasks.length > 0) {
    const completedTaskList = recentlyCompletedTasks.map((task) => `• ~${task.title}~`).join('\n');
    return HomeTab({ callbackId: 'tasks-home' }).blocks(
      Header({ text: 'No open tasks' }),
      Divider(),
      Section({ text: 'Looks like you\'ve got nothing to do. You can create a task by clicking the button below.' }),
      Actions({ blockId: 'task-creation-actions' }).elements(
        Elements.Button({ text: 'Create a task' }).value('create-a-task-app-home').actionId('create-a-task-app-home'),
      ),
      Header({ text: 'Tasks completed recently' }),
      Divider(),
      Section({ text: completedTaskList }),
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
