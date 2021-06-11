module.exports = app => {
    app.shortcut('global_new_task', async ({ shortcut, ack }) => {
        try {
            await ack();
            console.log('global_new_task called')
        } catch (error) {
            console.error(error);
        }
    });
};