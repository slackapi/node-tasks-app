const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.event('app_home_opened', async ({ client, event, body }) => {
    try {
      await reloadAppHome(client, event.user, body.team_id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
