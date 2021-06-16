# Setup Tasks App

## Installing

**Create Slack App**
1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.yml](../manifest.yml) into the text box that says `*Paste your manifest code here*` and click *Next*
4. Review the configuration and click *Create*
5. Now click *Install to Workspace* and *Allow* on the screen that follows. You'll be redirected to the App Configuration dashboard.

**Environment variables**
Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click *OAuth & Permissions* in the left hand menu, then copy the *Bot User OAuth Token* into your `.env` file under `SLACK_BOT_TOKEN`
3. Click *Socket Mode* from the left hand menu, toggle the *Enable Socket Mode* option, and follow the steps to create an app-level token. Copy that token into your `.env` as `SLACK_APP_TOKEN`.
4. For the `DB_URI` value, you should enter the URI of the database system you plan to store tasks in. In the `.env.sample` file, we assume you're using [SQLite](https://www.sqlite.org/index.html), but you can use any system supported by [Sequelize](https://sequelize.org/)

**Install dependencies**

`npm install`

**Run database migrations**
`npx sequelize-cli db:migrate --url 'YOUR DATABASE URL'`

**Run Bolt Server**

`node app.js`