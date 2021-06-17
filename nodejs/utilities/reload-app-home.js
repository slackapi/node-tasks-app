const { Op } = require('sequelize');

const { tasksList } = require('../user-interface/app-home');
const { User, Task } = require('../models');

module.exports = async (client, slackUserID, slackWorkspaceID) => {
  try {
    const queryResult = await User.findOrCreate({
      where: {
        slackUserID,
        slackWorkspaceID,
      },
      include: [
        Task,
      ],
    });
    const user = queryResult[0];

    const openTasks = await user.getTasks({
      where: {
        status: 'OPEN',
      },
    });

    const recentlyCompletedTasks = await user.getTasks({
      where: {
        status: 'CLOSED',
        updatedAt: {
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
    });

    await client.views.publish({
      user_id: slackUserID,
      view: tasksList(openTasks, recentlyCompletedTasks),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
