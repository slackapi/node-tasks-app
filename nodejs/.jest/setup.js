// Here we define some mock functions and some globally accessible utility functions that get used across different tests.

/* -------------------------------------------- Globally mocked functions ------------------------------------------- */

// Replace every instance of console.log and console.error with a mock function. This way, we can keep track of the number of times they are called
// and replace their functionality with a simple mock (that does nothing) so that we don't actually log anything to the console during testing.
// TODO: Update this when we find a better way to do errors (ideally we should just be raising an exception here and logging elsewhere).
global.console = {
  log: jest.fn(),

  // Keep native behaviour for other methods, use those to print out things in your own tests
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Mock for the client.views.open method
global.viewOpenMockFunc = jest.fn();
// Mock for the client.views.publish method
global.viewPublishMockFunc = jest.fn();
// Mocks the client.chat.update method
global.chatUpdateMockFunc = jest.fn();
// Mocks the client.chat.postMessage method
// TODO: Respond with message id, update the main code to use the response message id
global.chatPostMessageMockFunc = jest.fn();
// Mocks the client.chat.scheduleMessage method
global.chatScheduleMessageMockFunc = jest.fn(
  async ({ channel, postAt, text }) => ({
    ok: true,
    channel,
    scheduled_message_id: 'Q1298393284',
    post_at: postAt,
    message: {
      text,
      username: 'ecto1',
      bot_id: 'B19LU7CSY',
      attachments: [
        {
          text: 'This is an attachment',
          id: 1,
          fallback: "This is an attachment's fallback",
        },
      ],
      type: 'delayed_message',
      subtype: 'bot_message',
    },
  }),
);
// Mock for the ack() method
global.ackMockFunc = jest.fn();

/* --------------------------------------------- Global helper functions -------------------------------------------- */

// A helper function to parse and validate JSON.
global.isValidJSON = (jsonString) => {
  try {
    var obj = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check to make sure the object isn't null as well.
    // Thankfully, null is falsy, so this suffices:
    if (obj && typeof obj === 'object') {
      return obj;
    }
  } catch (e) {}

  return false;
};

// A helper function to test if a listener's callback function successfully runs and calls all the API methods that it should with the proper arguments
// apiMethods is an array of objects every object contains the mocked version of the API method and the arguments that should be passed to it
global.testListener = async (
  callbackFunctionPromiseToTest,
  apiMethodsToCall,
  usesAck = true,
) => {
  // Call the callback function
  await callbackFunctionPromiseToTest;

  for (const apiMethod of apiMethodsToCall) {
    const mockedFunction = apiMethod['mockedApiMethod'];
    const mockedFunctionArgument = apiMethod['mockedApiMethodArgObj'];

    expect(mockedFunction).toBeCalledWith(
      expect.objectContaining(mockedFunctionArgument),
    );

    // If the argument contains a "view" key (ex. in the case of the client.views.publish method), we check that the blocks are valid JSON
    // We expect a string as the view value since we are using the Slack Block Builder which returns JSON strings
    if ('view' in mockedFunctionArgument) {
      const mockedApiMethodViewArg = mockedFunction.mock.calls[0][0];
      expect(global.isValidJSON(mockedApiMethodViewArg.view)).toBeTruthy();
    }
  }

  // If the callback function calls the ack() method, we expect the ack mock function to be called
  if (usesAck) expect(global.ackMockFunc).toHaveBeenCalledTimes(1);
};

// A helper function to test if a listener's callback function errors out properly
// Since not all listeners pass the "ack()" method to their callback functions,
// expecting the ack mock function to be called is conditional
global.testErrorLog = async (
  callbackFunctionPromiseToTest,
  methodToFail,
  usesAck = true,
) => {
  // Temporarily mock console.error to prevent the error from being logged
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const errorMsg = 'Oh no! We have an error';
  methodToFail.mockRejectedValueOnce(new Error(errorMsg));

  await callbackFunctionPromiseToTest;

  if (usesAck) expect(global.ackMockFunc).toBeCalledTimes(1);
  expect(methodToFail).toBeCalledTimes(1);
  expect(errorSpy).toBeCalledTimes(1);
  errorSpy.mockRestore();
};
