const { newTask } = require('../index');

test('Returns blocks for the new task modal if no prefill is provided', () => {
  const expected = {
    title: {
      type: 'plain_text',
      text: 'Create new task',
    },
    submit: {
      type: 'plain_text',
      text: 'Create',
    },
    callback_id: 'new-task-modal',
    blocks: [
      {
        label: {
          type: 'plain_text',
          text: 'New task',
        },
        block_id: 'taskTitle',
        element: {
          placeholder: {
            type: 'plain_text',
            text: 'Do this thing',
          },
          action_id: 'taskTitle',
          type: 'plain_text_input',
        },
        type: 'input',
      },
    ],
    type: 'modal',
  };
  expect(newTask()).toBe(JSON.stringify(expected));
});

test('Returns blocks for the new task modal if a prefill is provided', () => {
  const taskTitle = 'This is a task';
  const expected = {
    title: {
      type: 'plain_text',
      text: 'Create new task',
    },
    submit: {
      type: 'plain_text',
      text: 'Create',
    },
    callback_id: 'new-task-modal',
    blocks: [
      {
        label: {
          type: 'plain_text',
          text: 'New task',
        },
        block_id: 'taskTitle',
        element: {
          placeholder: {
            type: 'plain_text',
            text: 'Do this thing',
          },
          action_id: 'taskTitle',
          initial_value: `${taskTitle}`,
          type: 'plain_text_input',
        },
        type: 'input',
      },
    ],
    type: 'modal',
  };
  expect(newTask(taskTitle)).toBe(JSON.stringify(expected));
});
