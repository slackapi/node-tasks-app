const { DateTime } = require('luxon');

const { User, Task } = require('../../models');
const { modals } = require('../../user-interface');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.view('new-task-modal', async ({
    ack, view, body, client
  }) => {
    const providedValues = view.state.values;

    const taskTitle = providedValues.taskTitle.taskTitle.value;

    const selectedDate = providedValues.taskDueDate.taskDueDate.selected_date;

    const selectedUser = providedValues.taskAssignUser.taskAssignUser.selected_user;

    const task = {
      title: taskTitle,
    };

    if (selectedDate) {
      const taskDueDate = DateTime.fromISO(providedValues.taskDueDate.taskDueDate.selected_date).endOf('day');

      const diffInDays = taskDueDate.diffNow('days').toObject().days;
      // Task due date is in the past, so reject
      if (diffInDays < 0) {
        await ack(
          {
            response_action: 'errors',
            errors: {
              taskDueDate: 'Please select a due date in the future',
            },
          },
        );
        return;
      }
      task.dueDate = taskDueDate;
    }

    try {
      const queryResult = await User.findOrCreate({
        where: {
          slackUserID: body.user.id,
          slackWorkspaceID: body.team.id,
        },
        include: [
          Task,
        ],
      });
      const user = queryResult[0];

      user.createTask(task);

      await user.save();
      await ack(
        {
          response_action: 'update',
          view: modals.taskCreated(taskTitle),
        },
      );
     // open DM with selected user   
      const result = await client.conversations.open({
        users: selectedUser,
      });
     // dynamic API call to send DM 
      const sendMessage = async(text) => {
        client.chat.postMessage({
          channel:result.channel.id,
          text
        });
      } 
      //conditional to determine which message is sent
      if(selectedUser === body.user.id){
        await sendMessage(`You created a new task:\n- *${taskTitle}*`)
      }else {
        await sendMessage(`<@${body.user.id}> assigned you a new task:\n- *${taskTitle}*`)
      };

     
      await reloadAppHome(client, body.user.id, body.team.id);
    } catch (error) {
      await ack(
        {
          response_action: 'update',
          view: modals.taskCreationError(taskTitle),
        },
      );
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
};
