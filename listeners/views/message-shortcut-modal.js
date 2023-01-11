const { modals } = require('../../user-interface');
const {getDb} = require('../../db');

const newMessageShortcutCallback = async({ ack, view, body, client }) => {

  const providedValues = view.state.values;
  const taskMessage = providedValues.taskMessage.taskMessage.value;
  const taskCompetitor = providedValues.taskCompetitor.competitor_selection.selected_options;
  const taskCurrentUser = providedValues.taskCurrentUser.taskCurrentUser.selected_user;

  try {
  
    const userId = await getUserIdFromPintel(taskCurrentUser, client)
    const competitorObject =  convertToObject(taskCompetitor)

    sendMessageToMongoDB({
      title: 'Intel from Slack',
      published: new Date(),
      content: taskMessage,
      author: userId,
      competitors: competitorObject,
      source: 'Slack'
    });
    await ack({
      response_action: 'update',
      view: modals.messageSent("Message is sent to Pintel successfully."),
    });

  } catch (error) {
  
    await ack({
      response_action: 'update',
      view: modals.messageSentError("message to Pintel"),
    });
    
    console.error(error);
  }
};

function convertToObject(value, delimiter = ':') {
  if (Array.isArray(value)) {
    return value.map(v => convertToObject(v.value, delimiter));
  }

  if (typeof value !== 'string') {
    console.error(`Error parsing string to object: value is not a string`);
    return null;
  }

  try {
    const [name, id] = value.split(delimiter);
    return { "name": name, "id":id };
  } catch (err) {
    console.error(`Error parsing string to object: ${err.message}`);
    return null;
  }
}

const getUserIdFromPintel = async (userId, client) => {
  const db = getDb();
  const collection = db.collection('User');
  
  // Get the user's email from Slack given their user ID
  const userInfo = await client.users.info({ user: userId });
  
  // Fetch the user's ID from MongoDB given their email ID
  const result = await collection.findOne({ email: userInfo.user.profile.email });
  // Return the user ID value
  return result.id;
}

function sendMessageToMongoDB(shortcutPayload) {
  console.log("Entering... sendMessageToMongoDB")
  // Insert the new message into the collection
  const db = getDb();
  const collection = db.collection('AllIntel');
  collection.insertOne(shortcutPayload, function(err, res) {
      console.log('Message sent to MongoDB');
      db.close();
    });
    console.log("Exiting from method")
}

module.exports = { newMessageShortcutCallback };
