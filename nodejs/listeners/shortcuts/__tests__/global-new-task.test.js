const { globalNewTaskCallback } = require('../global-new-task');
const { modals } = require('../../../user-interface');
const {
  viewsOpenMockFunc,
  ackMockFunc,
  mockShortcutCallbackInput,
} = require('./__utils__/shortcut-test-util-funcs');

describe('Global shortcut callback function test ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles the shortcut event and opens the newTask modal', async () => {
    // The callback is asynchronously called so we await it here
    await globalNewTaskCallback(mockShortcutCallbackInput);

    expect(ackMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledWith(
      expect.objectContaining({
        trigger_id: mockShortcutCallbackInput.shortcut.trigger_id,
        view: modals.newTask(null, mockShortcutCallbackInput.shortcut.user.id),
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
    const errorMsg = 'Oh no! We have an error';
    viewsOpenMockFunc.mockRejectedValueOnce(new Error(errorMsg));

    await globalNewTaskCallback(mockShortcutCallbackInput);

    expect(ackMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledTimes(1);
    expect(global.console.error).toBeCalledTimes(1);
  });
});
