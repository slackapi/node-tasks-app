const { globalNewTaskCallback } = require('../global-new-task');
const {
  mockGlobalShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');
const {
  testShortcutError,
  testShortcut,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Global shortcut callback function test ', () => {
  it('handles the global shortcut event and opens the newTask modal', async () => {
    await testShortcut(mockGlobalShortcutPayloadData, globalNewTaskCallback);
  });

  it("logs an error if the modal can't be opened", async () => {
    await testShortcutError(
      mockGlobalShortcutPayloadData,
      globalNewTaskCallback,
    );
  });
});
