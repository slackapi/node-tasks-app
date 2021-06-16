module.exports = (app) => {
  app.action({ action_id: 'closedTaskListHome', type: 'block_actions' }, async ({ ack, action }) => {
    await ack();
    console.log(action.selected_options);
  });
};
