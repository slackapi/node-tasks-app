const { taskReminder } = require('../index');

test('Returns blocks for the task created modal', () => {
  const taskTitle = 'Test Task';
  const channel = 'C1234567';
  const postAt = 123456789;
  const dueDate = 'Some date';
  const taskID = 1;
  const expected = {
    channel,
    post_at: postAt,
    text: `You asked me to remind you about "${taskTitle}".`,
    blocks: [
      {
        text: {
          type: 'mrkdwn',
          text: `:wave: You asked me to remind you about "*${taskTitle}*".`,
        },
        accessory: {
          text: {
            type: 'plain_text',
            text: 'Mark as done',
          },
          value: `task-${taskID}`,
          action_id: 'complete-from-reminder-message',
          type: 'button',
        },
        type: 'section',
      },
      {
        fields: [
          { type: 'mrkdwn', text: '*Task title*' },
          { type: 'mrkdwn', text: '*Due date*' },
          { type: 'mrkdwn', text: taskTitle },
          { type: 'mrkdwn', text: dueDate },
        ],
        type: 'section',
      },
    ],
  };
  expect(taskReminder(postAt, channel, taskTitle, dueDate, taskID)).toBe(JSON.stringify(expected));
});
