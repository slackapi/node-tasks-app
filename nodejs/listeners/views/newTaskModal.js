const { User, Task } = require('../../models')

module.exports = app => {
    app.view('new-task-modal', async ({ack, view, body}) => {
        await ack();
        console.log(view);
        console.log('==========');
        console.log(body);

        try {
            const queryResult = await User.findOrCreate({
                where: {
                    slackID: body.user.id,
                    workspaceID: body.team.id
                },
                include : [
                    Task
                ]
            });
            const user = queryResult[0];

            user.createTask({
                title: view.state.values.taskTitle.taskTitle.value
            });

            await user.save();
        } catch (error) {
            console.error(error);
        }
    });
};