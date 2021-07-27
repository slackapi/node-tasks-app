const { globalNewTaskCallback } = require('../global-new-task');
const { modals } = require('../../../user-interface');
const {
  viewsOpenMockFunc,
  ackMockFunc,
  mockGlobalShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');
const { testErrorLog } = require('./__utils__/shortcut-test-util-funcs');

const mockShortcutCallbackInput = {
  ack: ackMockFunc,
  shortcut: mockGlobalShortcutPayloadData,
  client: {
    views: {
      open: viewsOpenMockFunc,
    },
  },
};

describe('Global shortcut callback function test ', () => {
  it('handles the shortcut event and opens the newTask modal', async () => {
    // The callback is asynchronously called so we await it here
    await globalNewTaskCallback(mockShortcutCallbackInput);

    expect(ackMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledWith(
      expect.objectContaining({
        trigger_id: mockGlobalShortcutPayloadData.trigger_id,
        view: modals.newTask(null, mockGlobalShortcutPayloadData.user.id),
      }),
    );

    // This test isn't explicitly appropriate here since it's really testing the blockbuilder code in user-interface/modals/new-task.js
    // which already has a test of its own. I just thought it's a good example of how you can grab the arguments of a function and test them separately.
    const returnedBlocks = JSON.parse(
      viewsOpenMockFunc.mock.calls[0][0].view,
    ).blocks;
    const titleBlock = returnedBlocks[0].element;
    expect(titleBlock.initial_value).toBeUndefined();
  });

  it("logs an error if the modal can't be opened", async () => {
    await testErrorLog(globalNewTaskCallback, mockShortcutCallbackInput);
  });
});
