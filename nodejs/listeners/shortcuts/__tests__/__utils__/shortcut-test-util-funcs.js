const {
  viewsOpenMockFunc,
  ackMockFunc,
} = require('../__fixtures__/shortcut-fixtures');

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
};
