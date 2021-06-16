const { tasksList } = require('../../user-interface/app-home');
const { User, Task } = require('../../models');

module.exports = (app) => {
  app.event('app_home_opened', async ({ event, client, body }) => {
    try {
      const queryResult = await User.findOrCreate({
        where: {
          slackUserID: event.user,
          slackWorkspaceID: body.team_id,
        },
        include: [
          Task,
        ],
      });
      const user = queryResult[0];
      await client.views.publish({
        user_id: event.user,
        view: tasksList(await user.getTasks({
          where: {
            status: 'OPEN',
          },
        })),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
