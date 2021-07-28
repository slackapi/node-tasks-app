const { globalNewTaskCallback } = require('../global-new-task');
const { modals } = require('../../../user-interface');
const {
  mockGlobalShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');
const {
  testErrorLog,
  mockShortcutCallbackInput,
  testShortcut,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Global shortcut callback function test ', () => {
  const mockGlobalShortcutCallbackInput = mockShortcutCallbackInput(
    mockGlobalShortcutPayloadData,
  );

  it('handles the message shortcut event and opens the newTask modal', async () => {
    await testShortcut(
      globalNewTaskCallback(mockGlobalShortcutCallbackInput),
      mockGlobalShortcutPayloadData.trigger_id,
      modals.newTask(null, mockGlobalShortcutPayloadData.user.id),
    );
  });

  it("logs an error if the modal can't be opened", async () => {
    await testErrorLog(globalNewTaskCallback, mockGlobalShortcutCallbackInput);
  });
});
