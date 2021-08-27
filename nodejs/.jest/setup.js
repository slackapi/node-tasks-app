const helperFuncs = require('./global-helper-funcs');
const mockApiMethodFuncs = require('./mock-api-method-funcs');

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
