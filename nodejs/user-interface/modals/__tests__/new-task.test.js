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
      {
        label: {
          type: 'plain_text',
          text: 'Due date',
        },
        block_id: 'taskDueDate',
        optional: true,
        element: {
          action_id: 'taskDueDate',
          type: 'datepicker',
        },
        type: 'input',
      },
      // The timepicker is currently in beta and cannot be used in an App
      // that is listed in the App Directory
      {
        label: {
          type: 'plain_text',
          text: 'Time',
        },
        block_id: 'taskDueTime',
        optional: true,
        element: {
          action_id: 'taskDueTime',
          type: 'timepicker',
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
      {
        label: {
          type: 'plain_text',
          text: 'Due date',
        },
        block_id: 'taskDueDate',
        optional: true,
        element: {
          action_id: 'taskDueDate',
          type: 'datepicker',
        },
        type: 'input',
      },
      // The timepicker is currently in beta and cannot be used in an App
      // that is listed in the App Directory
      {
        label: {
          type: 'plain_text',
          text: 'Time',
        },
        block_id: 'taskDueTime',
        optional: true,
        element: {
          action_id: 'taskDueTime',
          type: 'timepicker',
        },
        type: 'input',
      },
    ],
    type: 'modal',
  };
  expect(newTask(taskTitle)).toBe(JSON.stringify(expected));
});
