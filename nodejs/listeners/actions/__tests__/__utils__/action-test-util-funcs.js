/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockActionCallbackInput = (actionPayload) => ({
  ack: global.ackMockFunc,
  body: actionPayload,
  client: {
    views: {
      publish: global.publishViewMockFunc,
      open: global.openViewMockFunc,
    },
    chat: {
      update: global.updateChatMockFunc,
    },
  },
  action: actionPayload.actions[0],
});

/* -------------------------- Utility functions for testing the listener callback functions ------------------------- */
// TODO: There's a ton of commonalities between the different action tests, maybe there's room for refactoring across them
// Maybe a utility function that also sets up the test cases :think:

const testAction = async (
  mockActionPayloadData,
  actionCallback,
  mockedApiMethod = global.publishViewMockFunc,
  mockedApiMethodArgObj = {
    user_id: mockActionPayloadData.user.id,
    view: expect.any(String),
  },
) => {
  const callbackInput = mockActionCallbackInput(mockActionPayloadData);

  const callbackFunctionPromiseToTest = actionCallback(callbackInput);

  await global.testListener(
    callbackFunctionPromiseToTest,
    mockedApiMethod,
    mockedApiMethodArgObj,
  );
};

const testActionError = async (
  mockActionPayloadData,
  actionCallback,
  methodToFail = global.publishViewMockFunc,
) => {
  const callbackInput = mockActionCallbackInput(mockActionPayloadData);
  await global.testErrorLog(actionCallback(callbackInput), methodToFail);
};

module.exports = {
  testAction,
  testActionError,
};
