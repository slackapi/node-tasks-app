const { reloadAppHome } = require('../../utilities');

const appHomeOpenedCallback = async ({ client, event, body }) => {
  if (event.tab !== 'home') {
    // Ignore the `app_home_opened` event for everything
    // except home as we don't support a conversational UI
    return;
  }
  try {
    if (event.view) {
      await reloadAppHome(
        client,
        event.user,
        body.team_id,
        event.view.private_metadata,
      );
      return;
    }

    // For new users where we've never set the App Home,
    // the App Home event won't send a `view` property
    await reloadAppHome(client, event.user, body.team_id, '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };
