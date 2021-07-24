const { globalNewTaskCallback } = require('../global-new-task');
const { modals } = require('../../../user-interface');

// TODO: Refactor repeated code between the two shortcut tests
describe('Global shortcut callback function test ', () => {
  let errorSpy;

  // Spy on the global console so we can make sure "console.error()" gets called when there is an error.
  // We also mock it to do nothing, so that it doesn't actually write to the console. We just need to know it was called
  // TODO: Update this when we find a better way to do errors (ideally we should just be raising an exception here and logging elsewhere).
  beforeAll(() => {
    errorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
  });

  // Restore the console.error() function to its original implementation so we don't affect other tests.
  afterAll(() => {
    errorSpy = global.console.error.mockRestore();
  });

  const mockShortcutPayloadData = {
    type: 'shortcut',
    token: 'XXXXXXXXXXXXX',
    action_ts: '1581106241.371594',
    team: {
      id: 'TXXXXXXXX',
      domain: 'shortcuts-test',
    },
    user: {
      id: 'UXXXXXXXXX',
      username: 'aman',
      team_id: 'TXXXXXXXX',
    },
    callback_id: 'global_new_task',
    trigger_id: '944799105734.773906753841.38b5894552bdd4a780554ee59d1f3638',
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
    await globalNewTaskCallback(mockShortcutCallbackInput);
    // jest.spyOn(global.console, 'error')

    expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledWith(
      expect.objectContaining({
        trigger_id: mockShortcutPayloadData.trigger_id,
        view: modals.newTask(null, mockShortcutPayloadData.user.id),
      }),
    );

    // This test isn't explicitly appropriate here since it's really testing the blockbuilder code in user-interface/modals/new-task.js
    // which already has a test of its own. I just thought it's a good example of how you can grab the arguments of a function and test them separately.
    const returnedBlocks = JSON.parse(
      openViewsFunction.mock.calls[0][0].view,
    ).blocks;
    const titleBlock = returnedBlocks[0].element;
    expect(titleBlock.initial_value).toBeUndefined();
  });

  it("logs an error if the modal can't be opened", async () => {
    const errorMsg = 'Oh no! We have an error';
    openViewsFunction.mockRejectedValueOnce(new Error(errorMsg));
    await globalNewTaskCallback(mockShortcutCallbackInput);

    expect(mockShortcutCallbackInput.ack).toBeCalledTimes(1);
    expect(openViewsFunction).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledTimes(1);
  });
});
