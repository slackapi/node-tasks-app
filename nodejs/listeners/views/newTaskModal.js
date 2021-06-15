const { User, Task } = require('../../models')
const { modals } = require('../../user-interface')
module.exports = app => {
    app.view('new-task-modal', async ({ ack, view, body }) => {

        try {
            const queryResult = await User.findOrCreate({
                where: {
                    slackUserID: body.user.id,
                    slackWorkspaceID: body.team.id
                },
                include: [
                    Task
                ]
            });
            const user = queryResult[0];

            user.createTask({
                title: view.state.values.taskTitle.taskTitle.value
            });

            await user.save();
            await ack(
                {
                    response_action: "update",
                    view: modals.taskCreated(view.state.values.taskTitle.taskTitle.value)
                }
            );
        } catch (error) {
            await ack(
                {
                    response_action: "update",
                    view: modals.taskCreationError(view.state.values.taskTitle.taskTitle.value)
                }
            )
            console.error(error);
        }
    });
};