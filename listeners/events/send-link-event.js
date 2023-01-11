const { getDb } = require('../../db');

const sendLinkEventApp = async ({ event, client }) => {
  const db = getDb();
  const collection = db.collection('SlackKeywords');
  const keywords = await collection.distinct("keyword");
  const text = event.text.toLowerCase();
    console.log(event.text)
    // Check if text contains any of the keywords
    const matchedKeywords = keywords.filter(keyword => text.includes(keyword.toLowerCase()));
    console.log("Matched keyword:", matchedKeywords)
    if (matchedKeywords.length > 0) {
      // Iterate over matchedKeywords and fetch data from the database
      for (let i = 0; i < matchedKeywords.length; i++) {
        const keyword = matchedKeywords[i];
        console.log("matched keyword:", keyword)
        const query = { keyword: keyword };
        const entry = await collection.findOne(query);
        console.log("company name", entry.company_name)
        if (entry) {
          const message = {
            channel: event.channel,
            text: `Here is the link to ${keyword} Battlecard ${entry.link}`
          };
          try {
            await client.chat.postMessage(message);
            console.log(`Message sent: ${message.text}`);
          } catch (error) {
            console.error(`Error posting message: ${error}`);
          }
        }
      }
    }
};

module.exports = { sendLinkEventApp };
