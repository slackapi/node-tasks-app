require('dotenv').config();

const { App } = require('@slack/bolt');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI);

const { shortcutsListener, viewsListener } = require('./listeners')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

shortcutsListener.globalNewTask(app);

viewsListener.newTaskModal(app);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    console.log('Connection has been established successfully.');
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
  } catch (error) {
    console.error('Unable to start App', error);
  }

})();