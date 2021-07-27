const { messageNewTaskCallback } = require('../message-new-task');
const { modals } = require('../../../user-interface');

describe('Message shortcut callback function test ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockShortcutPayloadData = {
    callback_id: 'message_new_task',
    type: 'message_action',
    trigger_id: '13345224609.8534564800.6f8ab1f53e13d0cd15f96106292d5536',
    response_url:
      'https://hooks.slack.com/app-actions/T0MJR11A4/21974584944/yk1S9ndf35Q1flupVG5JbpM6',
    team: {
      id: 'T0MJRM1A7',
      domain: 'pandamonium',
    },
    channel: {
      id: 'D0LFFBKLZ',
      name: 'cats',
    },
    user: {
      id: 'U0D15K92L',
      name: 'dr_maomao',
    },
    message: {
      type: 'message',
      user: 'U0MJRG1AL',
      ts: '1516229207.000133',
      text: "World's smallest big cat! <https://youtube.com/watch?v=W86cTIoMv2U>",
    },
  };

  const mockShortcutCallbackInput = {
    ack: jest.fn(),
    shortcut: mockShortcutPayloadData,
    client: {
      views: {
        open: jest.fn(),
      },
    },
  };

  const openViewsFunction = mockShortcutCallbackInput.client.views.open;

  it('handles the shortcut event and opens the newTask modal', async () => {
    // The callback is asynchronously called so we await it here
    await messageNewTaskCallback(mockShortcutCallbackInput);
    // jest.spyOn(global.console, 'error')

    expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledWith(
      expect.objectContaining({
        trigger_id: mockShortcutPayloadData.trigger_id,
        view: modals.newTask(
          mockShortcutPayloadData.message.text,
          mockShortcutPayloadData.user.id,
        ),
      }),
    );

    // This test isn't explicitly appropriate here since it's really testing the blockbuilder code in user-interface/modals/new-task.js
    // which already has a test of its own. I just thought it's a good example of how you can grab the arguments of a function and test them separately.
    const returnedBlocks = JSON.parse(
      openViewsFunction.mock.calls[0][0].view,
    ).blocks;
    const titleBlock = returnedBlocks[0].element;
    expect(titleBlock.initial_value).toBe(mockShortcutPayloadData.message.text);
  });

  it("logs an error if the modal can't be opened", async () => {
    const errorMsg = 'Oh no! We have an error';
    openViewsFunction.mockRejectedValueOnce(new Error(errorMsg));
    await messageNewTaskCallback(mockShortcutCallbackInput);

    expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledTimes(1);
    expect(global.console.error).toBeCalledTimes(1);
  });
});
