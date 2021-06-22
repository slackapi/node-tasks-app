const {
  HomeTab, Header, Divider, Section, Actions, Elements, Input, Bits,
} = require('slack-block-builder');
const pluralize = require('pluralize');

module.exports = (openTasks) => {
  const homeTab = HomeTab({ callbackId: 'tasks-home', privateMetaData: 'open' }).blocks(
    Actions({ blockId: 'task-creation-actions' }).elements(
      Elements.Button({ text: 'Open tasks' }).value('app-home-nav-open').actionId('app-home-nav-open').primary(true),
      Elements.Button({ text: 'Completed tasks' }).value('app-home-nav-completed').actionId('app-home-nav-completed'),
      Elements.Button({ text: 'Create a task' }).value('app-home-nav-create-a-task').actionId('app-home-nav-create-a-task'),
    ),
  );

  if (openTasks.length === 0) {
    homeTab.blocks(
      Header({ text: 'No open tasks' }),
      Divider(),
      Section({ text: 'Looks like you\'ve got nothing to do.' }),
    );
    return homeTab.buildToJSON();
  }

  homeTab.blocks(
    Header({ text: `You have ${openTasks.length} open ${pluralize('task', openTasks.length)}` }),
    Divider(),
    // Open Tasks
    Input({ label: ' ', blockId: 'open-task-status-change' }).dispatchAction().element(Elements.Checkboxes({ actionId: 'openTaskListHome' }).options(openTasks.map((task) => Bits.Option({ text: task.title, value: `open-task-${task.id}` })))),
  );

  return homeTab.buildToJSON();
};
