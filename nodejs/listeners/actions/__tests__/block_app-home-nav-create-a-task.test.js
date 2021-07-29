const { appHomeBlockActionPayload } = require('./__fixtures__/action-fixtures');

const {
  testAction,
  testActionError,
} = require('./__utils__/action-test-util-funcs');

const {
  appHomeNavCreateATaskCallback,
} = require('../block_app-home-nav-create-a-task');

describe('App home nav create a task action callback function test ', () => {
  it('Acknowledges the action and reloads the app home', async () => {
    await testAction(
      appHomeBlockActionPayload,
      appHomeNavCreateATaskCallback,
      global.openViewMockFunc,
      { trigger_id: appHomeBlockActionPayload.trigger_id },
    );
  });
  it('Logs an error when the the new view fails to be published', async () => {
    await testActionError(
      appHomeBlockActionPayload,
      appHomeNavCreateATaskCallback,
      global.openViewMockFunc,
      { trigger_id: appHomeBlockActionPayload.trigger_id },
    );
  });
});
