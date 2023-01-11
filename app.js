require('dotenv').config();

const { App, LogLevel } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const { connectToDatabase, getDb } = require('./db');
const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_BOT_TOKEN);


let logLevel;
switch (process.env.LOG_LEVEL) {
  case 'debug':
    logLevel = LogLevel.DEBUG;
    break;
  case 'info':
    logLevel = LogLevel.INFO;
    break;
  case 'warn':
    logLevel = LogLevel.WARN;
    break;
  case 'error':
    logLevel = LogLevel.ERROR;
    break;
  default:
    logLevel = LogLevel.INFO;
}

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel,
});

registerListeners(app);

const message = {
  channel: '#general',
  text: 'Hello, world!',
  icon_emoji: ':robot_face:' // replace this with the emoji you want to use as the bot's icon
};

// Call the chat.postMessage method with the message payload


(async () => {
  try {
    
    console.log('All models were synchronized successfully.');
     // Start your app
    await app.start();
    await connectToDatabase();
    web.chat.postMessage(message)
    .then((res) => {
      console.log(`Message sent: ${res.ts}`);
   })
    .catch((err) => {
      console.error(err);
  });
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to start App', error);
    process.exit(1);
  }
})();




