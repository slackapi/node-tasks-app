module.exports = (app) => {
  app.action({ action_id: 'taskListHome', type: 'block_actions' }, async ({ ack, action }) => {
    await ack();
    console.log(action);
  });
};
