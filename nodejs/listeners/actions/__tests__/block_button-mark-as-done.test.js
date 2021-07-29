const { appHomeBlockActionPayload } = require('./__fixtures__/action-fixtures');

const {
  testAction,
  testActionError,
} = require('./__utils__/action-test-util-funcs');
const { buttonMarkAsDoneCallback } = require('../block_button-mark-as-done');

describe('App home nav open action callback function test ', () => {
  it('Acknowledges the action and reloads the app home', async () => {
    await testAction(appHomeBlockActionPayload, buttonMarkAsDoneCallback);
  });
  it('Logs an error when the the new view fails to be published', async () => {
    await testActionError(appHomeBlockActionPayload, buttonMarkAsDoneCallback);
  });
});
