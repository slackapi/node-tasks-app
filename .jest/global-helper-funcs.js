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
// The required inputs consist of the listener's callback function (as a promise), and any mocked API method
// that the callback function usually calls. testErrorLog will simulate what happens when that API method call errors out.
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
