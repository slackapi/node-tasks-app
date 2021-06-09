from dotenv import load_dotenv
load_dotenv()

import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

# Install the Slack app and get xoxb- token in advance
app = App(token=os.environ["SLACK_BOT_TOKEN"])

# Add functionality here

if __name__ == "__main__":
    # Create an app-level token with connections:write scope
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()