const { App } = require('@slack/bolt');
const { slashCommand } = require('@slack-wrench/fixtures');
const JestReceiver = require('@slack-wrench/jest-bolt-receiver').default;
const {
  MockedWebClient,
  //   MockWebClient,
} = require('@slack-wrench/jest-mock-web-client');
const delay = require('delay');

const TasksApp = (receiver) =>
  new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    receiver,
  });

describe('My Awesome App', () => {
  let receiver;
  let app;
  let client; // Using a mock slack client so we can spy on it

  beforeEach(() => {
    // Pass in this receiver instead of yours or the default express one
    receiver = new JestReceiver();
    app = TasksApp(receiver);
    client = MockedWebClient.mock.instances[0];
  });

  console.log(typeof client);

  it('Can handle a slash command', async () => {
    const message = '@slack-wrench makes testing easy!';
    receiver.send(slashCommand('/echo', { text: message }));
    await delay(0); // Wait for anything async.

    // Test what should have happened.
    expect(client.chat.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: message,
      }),
    );
  });
});
