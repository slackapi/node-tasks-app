// const { tasksApp: newMockApp } = require('./app');
const { App, ExpressReceiver } = require('@slack/bolt');

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const newMockApp = () => {
  const app = new App({
    socketMode: true,
    receiver,
    authorize: {
      botToken: 'junk test token',
      botId: 'junk bot id',
      botUserId: 'junk bot user id',
    },
  });

  return app;
};

let app;

beforeEach(() => {
  app = newMockApp();
});

it('should pass the given token to app.client', async () => {
  // Assert some basics
  expect(app.client).toBeDefined();
});

exports.newMockApp = newMockApp;
