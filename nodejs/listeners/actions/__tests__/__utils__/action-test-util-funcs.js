/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockActionCallbackInput = (actionPayload) => ({
  ack: global.ackMockFunc,
  body: actionPayload,
  client: {
    views: {
      publish: global.publishViewMockFunc,
      open: global.openViewMockFunc,
    },
  },
});

/* -------------------------- Utility functions for testing the listener callback functions ------------------------- */

const testAction = async (mockActionPayloadData, actionCallback, apiMethod) => {
  const callbackInput = mockActionCallbackInput(mockActionPayloadData);

  const callbackFunctionPromiseToTest = actionCallback(callbackInput);
  const mockedApiMethod = apiMethod;
  const mockedApiMethodArgObj = {
    user_id: mockActionPayloadData.user.id,
  };

  await global.testListener(
    callbackFunctionPromiseToTest,
    mockedApiMethod,
    mockedApiMethodArgObj,
  );
};

const testActionError = async (
  mockActionPayloadData,
  actionCallback,
  methodToFail,
) => {
  const callbackInput = mockActionCallbackInput(mockActionPayloadData);
  await global.testErrorLog(actionCallback(callbackInput), methodToFail);
};

module.exports = {
  testAction,
  testActionError,
};
