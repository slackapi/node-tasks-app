const { modals } = require('../../user-interface');
const { getDb } = require('../../db');

const getCompetitors = async (companyId) => {
  
  try {
    const db = getDb();
    const collection = db.collection('CompanyCompetitors');
    const companyList = await collection.find({ company_id: companyId }).toArray();
    return companyList;
  } catch (err) {
    console.error(err);
  }
}

const messageShortcutCallback = async ({ shortcut, ack, client }) => {
  // Send an acknowledgement response to Slack
  try {
    console.log("Entering... message callback")
    await ack();
    const company_id ='bb219741-6090-48be-b9ad-b13386ac4358'
    getCompetitors(company_id).then((competitorlist) => {
      if(competitorlist.length ==0 )
        console.log("company not found");
      client.views.open({
        trigger_id: shortcut.trigger_id,
        view: modals.messageShortcut(shortcut.message.text, shortcut.user.id, competitorlist),
      });
    })
   
  } catch (error) {
    console.error(error);
  }
}

module.exports = { messageShortcutCallback };

