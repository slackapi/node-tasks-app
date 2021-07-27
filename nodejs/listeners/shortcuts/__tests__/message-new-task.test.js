const { messageNewTaskCallback } = require('../message-new-task');
const { modals } = require('../../../user-interface');
const {
  viewsOpenMockFunc,
  ackMockFunc,
  mockMessageShortcutPayloadData,
} = require('./__fixtures__/shortcut-fixtures');

const { testErrorLog } = require('./__utils__/shortcut-test-util-funcs');

describe('Message shortcut callback function test ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockShortcutCallbackInput = {
    ack: ackMockFunc,
    shortcut: mockMessageShortcutPayloadData,
    client: {
      views: {
        open: viewsOpenMockFunc,
      },
    },
  };
  it('handles the shortcut event and opens the newTask modal', async () => {
    // The callback is asynchronously called so we await it here
    await messageNewTaskCallback(mockShortcutCallbackInput);
    // jest.spyOn(global.console, 'error')

    expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledTimes(1);
    expect(viewsOpenMockFunc).toBeCalledWith(
      expect.objectContaining({
        trigger_id: mockMessageShortcutPayloadData.trigger_id,
        view: modals.newTask(
          mockMessageShortcutPayloadData.message.text,
          mockMessageShortcutPayloadData.user.id,
        ),
      }),
    );

    // This test isn't explicitly appropriate here since it's really testing the blockbuilder code in user-interface/modals/new-task.js
    // which already has a test of its own. I just thought it's a good example of how you can grab the arguments of a function and test them separately.
    const returnedBlocks = JSON.parse(
      viewsOpenMockFunc.mock.calls[0][0].view,
    ).blocks;
    const titleBlock = returnedBlocks[0].element;
    expect(titleBlock.initial_value).toBe(
      mockMessageShortcutPayloadData.message.text,
    );
  });

  it("logs an error if the modal can't be opened", async () => {
    await testErrorLog(messageNewTaskCallback, mockShortcutCallbackInput);
  });
});
