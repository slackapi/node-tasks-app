const { appHomeBlockActionPayload } = require('./__fixtures__/action-fixtures');

const {
  mockActionCallbackInput,
  testAction,
} = require('./__utils__/shortcut-test-util-funcs');
const {
  appHomeNavCompletedCallback,
} = require('../block_app-home-nav-completed');

describe('App home nav completed action callback function test ', () => {
  const appHomeNavCompletedActionCallbackInput = mockActionCallbackInput(
    appHomeBlockActionPayload,
  );
  it('Acknowledges the action and reloads the app home', async () => {
    await testAction(
      appHomeNavCompletedCallback(appHomeNavCompletedActionCallbackInput),
      appHomeBlockActionPayload.user.id,
    );
  });
  it('Logs an error when the the new view fails to be published', async () => {
    await global.testErrorLog(
      appHomeNavCompletedCallback(appHomeNavCompletedActionCallbackInput),
      global.publishViewMockFunc,
      false,
    );
  });
});
