const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.event('app_home_opened', async ({ client, event, body }) => {
    console.log(event);
    try {
      await reloadAppHome(client, event.user, body.team_id, event.view.private_metadata);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
