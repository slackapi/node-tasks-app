const { tasksList } = require('../index');

test('Returns blocks for the task list home view if no tasks available', () => {
  const expected = {
    callback_id: 'tasks-home',
    blocks: [
      {
        block_id: 'task-creation-actions',
        elements: [
          {
            text: {
              type: 'plain_text',
              text: 'Create a task',
            },
            value: 'create-a-task-app-home',
            action_id: 'create-a-task-app-home',
            type: 'button',
          },
        ],
        type: 'actions',
      },
      {
        text: {
          type: 'plain_text',
          text: 'No open tasks',
        },
        type: 'header',
      },
      {
        type: 'divider',
      },
      {
        text: {
          type: 'mrkdwn',
          text: "Looks like you've got nothing to do.",
        },
        type: 'section',
      },
    ],
    type: 'home',
  };
  expect(tasksList([], [])).toEqual(JSON.stringify(expected));
});

test.todo('Returns blocks for the task list home view if tasks available');
