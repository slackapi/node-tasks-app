// const { tasksApp } = require('./app');
const { App } = require('@slack/bolt');

const newMockApp = () => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  jest.spyOn(app.client.auth, 'test').mockImplementation();

  return app;
};

let app;

beforeEach(() => {
  app = newMockApp();
});

it('should pass the given token to app.client', async () => {
  // Assert some basics
  expect(app.client).toBeDefined();
  expect(app.client.token).toEqual(process.env.SLACK_BOT_TOKEN);
});

exports.newMockApp = newMockApp;
