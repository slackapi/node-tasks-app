const { Op } = require('sequelize');

const { openTasksView, completedTasksView } = require('../user-interface/app-home');
const { User, Task } = require('../models');

module.exports = async (client, slackUserID, slackWorkspaceID, navTab) => {
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

    if (navTab === 'completed') {
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
        view: completedTasksView(recentlyCompletedTasks),
      });
      return;
    }

    const openTasks = await user.getTasks({
      where: {
        status: 'OPEN',
      },
      order: [
        ['dueDate', 'ASC'],
      ],
    });

    await client.views.publish({
      user_id: slackUserID,
      view: openTasksView(openTasks),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
