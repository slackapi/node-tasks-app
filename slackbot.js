const axios = require('axios');

const mainAppURL = 'http://localhost:9501';

// Example Slack bot command handler
const handleCommand = async (command) => {
  if (command === '/AllCompanies') {
    try {
      const response = await axios.get(`${mainAppURL}/apis/company/v1/all`);
      const companies = response.data;
      // Do something with the user data
      console.log("company data:", companies)
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  }
};

// Example Slack bot event listener
slackBot.on('message', async (event) => {
  if (event.type === 'message') {
    const { text, company } = event;
    await handleCommand(text, company);
  }
});
