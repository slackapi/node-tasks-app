const {
  HomeTab, Header, Divider, Section, Actions, Elements, Input, Bits,
} = require('slack-block-builder');
const pluralize = require('pluralize');

module.exports = (openTasks, recentlyCompletedTasks) => {
  const homeTab = HomeTab({ callbackId: 'tasks-home' }).blocks(
    Actions({ blockId: 'task-creation-actions' }).elements(
      Elements.Button({ text: 'Create a task' }).value('create-a-task-app-home').actionId('create-a-task-app-home'),
    ),
  );

  if (openTasks.length > 0) {
    homeTab.blocks(
      Header({ text: `You have ${openTasks.length} open ${pluralize('task', openTasks.length)}` }),
      Divider(),
      // Open Tasks
      Input({ label: ' ', blockId: 'open-task-status-change' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'openTaskListHome' }).options(openTasks.map((task) => Bits.Option({ text: task.title, value: `open-task-${task.id}` })))),
    );
  }

  if (openTasks.length === 0) {
    homeTab.blocks(
      Header({ text: 'No open tasks' }),
      Divider(),
      Section({ text: 'Looks like you\'ve got nothing to do.' }),
    );
  }

  if (recentlyCompletedTasks.length > 0) {
    const completedTaskList = recentlyCompletedTasks.length > 0 ? recentlyCompletedTasks.map((task) => `• ~${task.title}~`).join('\n') : '*None*';
    homeTab.blocks(
      Header({ text: 'Tasks completed recently' }),
      Divider(),
      Section({ text: completedTaskList }),
    );
  }

  return homeTab.buildToJSON();
};
