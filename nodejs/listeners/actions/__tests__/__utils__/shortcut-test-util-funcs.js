/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockActionCallbackInput = (actionPayload) => ({
  ack: global.ackMockFunc,
  body: actionPayload,
  client: {
    views: {
      publish: global.publishViewMockFunc,
    },
  },
});

/* ------------------------------------- Utility functions for testing shortcuts ------------------------------------ */

const testAction = async (actionCallbackPromise, userId) => {
  await actionCallbackPromise;
  expect(global.ackMockFunc).toBeCalledTimes(1);
  expect(global.publishViewMockFunc).toBeCalledTimes(1);
  // We expect a string as the view value since we are using the Slack Block Builder which returns JSON strings
  expect(global.publishViewMockFunc).toBeCalledWith(
    expect.objectContaining({
      user_id: userId,
      view: expect.any(String),
    }),
  );

  // We also test whether the "view" key of the mocked client.views.publish method was given valid JSON
  const publishViewMockFuncViewArg =
    global.publishViewMockFunc.mock.calls[0][0];
  expect(global.tryParseJSON(publishViewMockFuncViewArg.view)).toBeTruthy();
};

module.exports = {
  mockActionCallbackInput,
  testAction,
};
