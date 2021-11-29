// Here we define the mock api methods that will be used in our tests.

// Mock for the client.views.open method
global.viewOpenMockFunc = jest.fn();
// Mock for the client.views.publish method
global.viewPublishMockFunc = jest.fn();
// Mocks the client.chat.update method
global.chatUpdateMockFunc = jest.fn();
global.deleteScheduledMessageMockFunc = jest.fn();
// Mocks the client.chat.postMessage method
// TODO: Respond with message id, update the main code to use the response message id
global.chatPostMessageMockFunc = jest.fn();
// Mocks the client.chat.scheduleMessage method
global.chatScheduleMessageMockFunc = jest.fn(
  async ({ channel, postAt, text }) => ({
    ok: true,
    channel,
    scheduled_message_id: 'Q1298393284',
    post_at: postAt,
    message: {
      text,
      username: 'ecto1',
      bot_id: 'B19LU7CSY',
      attachments: [
        {
          text: 'This is an attachment',
          id: 1,
          fallback: "This is an attachment's fallback",
        },
      ],
      type: 'delayed_message',
      subtype: 'bot_message',
    },
  }),
);
// Mock for the ack() method
global.ackMockFunc = jest.fn();
