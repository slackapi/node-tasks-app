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

/* -------------------------- Utility functions for testing the listener callback functions ------------------------- */

const testShortcut = async (
  mockShortcutPayloadData,
  shortcutCallback,
  apiMethod = global.openViewMockFunc,
) => {
  const callbackInput = mockShortcutCallbackInput(mockShortcutPayloadData);

  const callbackFunctionPromiseToTest = shortcutCallback(callbackInput);
  const mockedApiMethod = apiMethod;
  const mockedApiMethodArgObj = {
    trigger_id: mockShortcutPayloadData.trigger_id,
    view: expect.any(String),
  };

  await global.testListener(
    callbackFunctionPromiseToTest,
    mockedApiMethod,
    mockedApiMethodArgObj,
  );
};

const testShortcutError = async (
  mockShortcutPayloadData,
  shortcutCallback,
  methodToFail = global.openViewMockFunc,
) => {
  const callbackInput = mockShortcutCallbackInput(mockShortcutPayloadData);
  await global.testErrorLog(shortcutCallback(callbackInput), methodToFail);
};

module.exports = {
  testShortcut,
  testShortcutError,
};
