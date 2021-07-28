/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockShortcutCallbackInput = (shortcutPayload) => ({
  ack: global.ackMockFunc,
  shortcut: shortcutPayload,
  client: {
    views: {
      open: global.openViewMockFunc,
    },
  },
});

/* ------------------------------------- Utility functions for testing shortcuts ------------------------------------ */
// TODO: Very similar to the testAction and testEvent functions. Maybe we should make these a global helper
const testShortcut = async (shortcutCallbackPromise, triggerId) => {
  await shortcutCallbackPromise;
  expect(global.ackMockFunc).toBeCalledTimes(1);
  expect(global.openViewMockFunc).toBeCalledTimes(1);
  // We expect a string as the view value since we are using the Slack Block Builder which returns JSON strings
  expect(global.openViewMockFunc).toBeCalledWith(
    expect.objectContaining({
      trigger_id: triggerId,
      view: expect.any(String),
    }),
  );

  // We also test whether the "view" key of the mocked client.views.publish method was given valid JSON
  const openViewMockFuncViewArg = global.openViewMockFunc.mock.calls[0][0];
  expect(global.tryParseJSON(openViewMockFuncViewArg.view)).toBeTruthy();
};

module.exports = {
  mockShortcutCallbackInput,
  testShortcut,
};
