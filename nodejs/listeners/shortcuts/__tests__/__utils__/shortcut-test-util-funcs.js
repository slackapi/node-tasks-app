/* ----------------------------------------------- Mocked API methods ----------------------------------------------- */

const viewsOpenMockFunc = jest.fn();
const ackMockFunc = jest.fn();

/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockShortcutCallbackInput = (shortcutPayload) => ({
  ack: ackMockFunc,
  shortcut: shortcutPayload,
  client: {
    views: {
      open: viewsOpenMockFunc,
    },
  },
});

/* ------------------------------------- Utility functions for testing shortcuts ------------------------------------ */

const testShortcut = async (shortcutCallbackPromise, triggerId, view) => {
  await shortcutCallbackPromise;
  expect(ackMockFunc).toBeCalledTimes(1);
  expect(viewsOpenMockFunc).toBeCalledTimes(1);
  expect(viewsOpenMockFunc).toBeCalledWith(
    expect.objectContaining({
      trigger_id: triggerId,
      view,
    }),
  );
};

const testErrorLog = async (callbackFunctionToTest, callbackFunctionInput) => {
  // Temporarily mock console.error to prevent the error from being logged
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const errorMsg = 'Oh no! We have an error';
  viewsOpenMockFunc.mockRejectedValueOnce(new Error(errorMsg));

  await callbackFunctionToTest(callbackFunctionInput);

  expect(ackMockFunc).toBeCalledTimes(1);
  expect(viewsOpenMockFunc).toBeCalledTimes(1);
  expect(errorSpy).toBeCalledTimes(1);
  errorSpy.mockRestore();
};

module.exports = {
  testErrorLog,
  mockShortcutCallbackInput,
  testShortcut,
};
