const { messageNewTaskCallback } = require('../message-new-task');
const {
  mockMessageShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');

const {
  testShortcut,
  testShortcutError,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Message shortcut callback function test ', () => {
  it('handles the message shortcut event and opens the newTask modal', async () => {
    await testShortcut(mockMessageShortcutPayloadData, messageNewTaskCallback);
  });

  it("logs an error if the modal can't be opened", async () => {
    await testShortcutError(
      mockMessageShortcutPayloadData,
      messageNewTaskCallback,
    );
  });
});
