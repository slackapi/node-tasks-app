const { appHomeBlockActionPayload } = require('./__fixtures__/action-fixtures');

const {
  mockActionCallbackInput,
  testAction,
} = require('./__utils__/action-test-util-funcs');
const {
  appHomeNavCreateATaskCallback,
} = require('../block_app-home-nav-create-a-task');

describe('App home nav create a task action callback function test ', () => {
  const appHomeNavCompletedActionCallbackInput = mockActionCallbackInput(
    appHomeBlockActionPayload,
  );
  it('Acknowledges the action and reloads the app home', async () => {
    await testAction(
      appHomeNavCreateATaskCallback(appHomeNavCompletedActionCallbackInput),
      appHomeBlockActionPayload.user.id,
    );
  });
  it('Logs an error when the the new view fails to be published', async () => {
    await global.testErrorLog(
      appHomeNavCreateATaskCallback(appHomeNavCompletedActionCallbackInput),
      global.openViewMockFunc,
      false,
    );
  });
});
