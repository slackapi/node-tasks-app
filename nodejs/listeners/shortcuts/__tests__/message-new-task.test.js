const { messageNewTaskCallback } = require('../message-new-task');
const { modals } = require('../../../user-interface');

it('handles the shortcut event and opens the newTask modal', async () => {
  const mockShortcutPayloadData = {
    token: 'Nj2rfC2hU8mAfgaJLemZgO7H',
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

  // The callback is asynchronously called so we await it here
  await messageNewTaskCallback(mockShortcutCallbackInput);

  expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
  expect(mockShortcutCallbackInput.client.views.open).toBeCalledTimes(1);
  expect(mockShortcutCallbackInput.client.views.open).toBeCalledWith(
    expect.objectContaining({
      trigger_id: mockShortcutPayloadData.trigger_id,
      view: modals.newTask(
        mockShortcutPayloadData.message.text,
        mockShortcutPayloadData.user.id,
      ),
    }),
  );
});
