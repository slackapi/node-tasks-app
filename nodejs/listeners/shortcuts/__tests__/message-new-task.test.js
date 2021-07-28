const { messageNewTaskCallback } = require('../message-new-task');
const { modals } = require('../../../user-interface');
const {
  mockMessageShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');

const {
  testErrorLog,
  mockShortcutCallbackInput,
  testShortcut,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Message shortcut callback function test ', () => {
  const mockMessageShortcutCallbackInput = mockShortcutCallbackInput(
    mockMessageShortcutPayloadData,
  );
  it('handles the global shortcut event and opens the newTask modal', async () => {
    await testShortcut(
      messageNewTaskCallback(mockMessageShortcutCallbackInput),
      mockMessageShortcutPayloadData.trigger_id,
      modals.newTask(
        mockMessageShortcutPayloadData.message.text,
        mockMessageShortcutPayloadData.user.id,
      ),
    );
  });

  it("logs an error if the modal can't be opened", async () => {
    await testErrorLog(
      messageNewTaskCallback,
      mockMessageShortcutCallbackInput,
    );
  });
});
