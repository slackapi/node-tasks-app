const reloadAppHome = require('../../utilities/reload-app-home');

module.exports = (app) => {
  app.action({ action_id: 'app-home-nav-open', type: 'block_actions' }, async ({ body, ack, client }) => {
    try {
      await ack();
      await reloadAppHome(client, body.user.id, body.team.id, 'open');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
