const { DateTime } = require('luxon');

const { User, Task } = require('../../models');
const { modals } = require('../../user-interface');
const { taskReminder } = require('../../user-interface/messages');
const { reloadAppHome } = require('../../utilities');

module.exports = (app) => {
  app.view('new-task-modal', async ({
    ack, view, body, client,
  }) => {
    const providedValues = view.state.values;

    const taskTitle = providedValues.taskTitle.taskTitle.value;

    const selectedDate = providedValues.taskDueDate.taskDueDate.selected_date;
    const selectedTime = providedValues.taskDueTime.taskDueTime.selected_time;

    const selectedUser = providedValues.taskAssignUser.taskAssignUser.selected_user;

    const task = {
      title: taskTitle,
    };

    if (selectedDate) {
      if (!selectedTime) {
        await ack(
          {
            response_action: 'errors',
            errors: {
              taskDueTime: 'Please set a time for the date you\'ve chosen',
            },
          },
        );
        return;
      }
      const taskDueDate = DateTime.fromISO(`${selectedDate}T${selectedTime}`);
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
          {
            model: Task,
            as: 'createdTasks',
          },
          {
            model: Task,
            as: 'assignedTasks',
          },
        ],
      });
      const user = queryResult[0];

      const storedTask = await user.createCreatedTask(task);
      const querySelectedUser = await User.findOrCreate({
        where: {
          slackUserID: selectedUser,
          slackWorkspaceID: body.team.id, // TODO better compatibility with Slack Connect.
        },
        include: [
          {
            model: Task,
            as: 'createdTasks',
          },
          {
            model: Task,
            as: 'assignedTasks',
          },
        ],
      });
      const selectedUserObject = querySelectedUser[0];
      storedTask.setCurrentAssignee(selectedUserObject);
      if (storedTask.dueDate) {
        const dateObject = DateTime.fromJSDate(storedTask.dueDate);
        // The `chat.scheduleMessage` endpoint only accepts messages in the next 120 days,
        // so if the date is further than that, don't set a reminder, and let the user know.
        if (dateObject.diffNow('days').toObject().days < 120) {
          await client.chat.scheduleMessage(
            taskReminder(
              dateObject.toSeconds(),
              body.user.id,
              storedTask.title,
              dateObject.toRelativeCalendar(),
              storedTask.id,
            ),
          ).then((response) => {
            storedTask.scheduledMessageId = response.scheduled_message_id;
            storedTask.save();
          });
        } else {
          // TODO better error message
          await client.chat.postMessage({
            text: `Sorry, but we couldn't set a reminder for ${taskTitle}, as it's more than 120 days from now`,
            channel: body.user.id,
          });
        }
      }
      await user.save();

      await ack(
        {
          response_action: 'update',
          view: modals.taskCreated(taskTitle),
        },
      );
      if (selectedUser != body.user.id) {
        client.chat.postMessage({
          channel: selectedUser,
          text: `<@${body.user.id}> assigned you a new task:\n- *${taskTitle}*`,
        });
      }

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
