require('dotenv').config();

const { App, LogLevel } = require('@slack/bolt');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI);

const {
  shortcutsListener,
  viewsListener,
  eventsListener,
  actionsListener,
} = require('./listeners');

let logLevel;

switch (process.env.LOG_LEVEL) {
  case 'debug':
    logLevel = LogLevel.Debug;
    break;
  case 'info':
    logLevel = LogLevel.Info;
    break;
  case 'warn':
    logLevel = LogLevel.Warn;
    break;
  case 'error':
    logLevel = LogLevel.Error;
    break;
  default:
    logLevel = LogLevel.Info;
}

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel,
});

shortcutsListener.globalNewTask(app);
shortcutsListener.messageNewTask(app);

viewsListener.newTaskModal(app);

eventsListener.appHomeOpened(app);

actionsListener.blockOpenTaskCheckboxClicked(app);
actionsListener.blockCreateATaskAppHome(app);
actionsListener.blockAppHomeNavOpen(app);
actionsListener.blockAppHomeNavCompleted(app);
actionsListener.blockReopenTask(app);
actionsListener.blockButtonMarkAsDone(app);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log('All models were synchronized successfully.');
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
    // Start your app
    await app.start();

    // eslint-disable-next-line no-console
    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to start App', error);
    process.exit(1);
  }
})();
