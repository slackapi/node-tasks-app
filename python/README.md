# Tasks App (Bolt for Python)

## Installing

**Create Slack App**
1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.yml](../manifest.yml) into the text box that says `*Paste your manifest code here*` and click *Next*
4. Review the configuration and click *Create*
5. Now click *Install to Workspace* and *Allow* on the screen that follows. You'll be redirected to the App Configuration dashboard.
6. Click *Basic Information* in the left nav and scroll down to *App-Level Tokens*. Click the button that says *Generate Token and Scopes*, which will spawn a modal window. Give the token a name (something like "Socket Mode Token" is great) and from the drop down select the `connections:write` scope. Click the *Generate* button.

**Set Environment Variables**
Before you can run the app, you'll need to store two Slack tokens as environment variables.

1. Copy `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click *OAuth & Permissions* in the left hand menu, then copy the *Bot User OAuth Token* into your `.env` file after `SLACK_BOT_TOKEN`
3. Click *Socket Mode* from the left hand menu and verify that Socket Mode is enabled (it should be based on the settings in the `manifest.yml` file)
4. Click *Basic Information* in the left nav, scroll down to *App-Level Tokens*, click the token you generated when creating your Slack app, copy the token value then paste it in the `.env` file after `SLACK_APP_TOKEN`

**Install Dependencies**

`pip install -r requirements.txt`

**Run Bolt Server**

`python3 app.py`
