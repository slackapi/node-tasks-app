require('dotenv').config();

const { App } = require('@slack/bolt');

const { shortcutsListener } = require('./listeners')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

shortcutsListener.globalNewTask(app);

(async () => {
  // Start your app
  await app.start();

  // eslint-disable-next-line no-console
  console.log('⚡️ Bolt app is running!');
})();
