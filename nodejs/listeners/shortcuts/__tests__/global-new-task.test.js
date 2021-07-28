const { globalNewTaskCallback } = require('../global-new-task');
const {
  mockGlobalShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');
const {
  mockShortcutCallbackInput,
  testShortcut,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Global shortcut callback function test ', () => {
  const mockGlobalShortcutCallbackInput = mockShortcutCallbackInput(
    mockGlobalShortcutPayloadData,
  );

  it('handles the global shortcut event and opens the newTask modal', async () => {
    await testShortcut(
      globalNewTaskCallback(mockGlobalShortcutCallbackInput),
      mockGlobalShortcutPayloadData.trigger_id,
    );
  });

  it("logs an error if the modal can't be opened", async () => {
    await global.testErrorLog(
      globalNewTaskCallback(mockGlobalShortcutCallbackInput),
      global.openViewMockFunc,
    );
  });
});
