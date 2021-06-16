module.exports = (app) => {
  app.action({ action_id: 'closedTaskListHome', type: 'block_actions' }, async ({ ack }) => {
    await ack();
  });
};
