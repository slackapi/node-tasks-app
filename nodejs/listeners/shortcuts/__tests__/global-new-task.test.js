const { globalNewTask } = require('../');

describe('ignore action listener', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('handles the shortcut and opens a modal', async () => {
      await globalNewTask
  
      expect(mockShortcutPayload.ack).toBeCalledTimes(1);
      expect(mockShortcutPayload.client.views.open).toBeCalledTimes(1);
      expect(mockShortcutPayload.client.views.open).toBeCalledWith(
        expect.objectContaining({
          trigger_id: mockShortcutPayload.shortcut.trigger_id,
          view: expect.objectContaining({
            type: 'modal',
            title: expect.objectContaining({
              text: 'Ask Question Anonymously',
            }),
            blocks: expect.arrayContaining([expect.anything()]),
            submit: expect.objectContaining({
              text: 'Ask Question',
            }),
          }),
        }),
      );
      expect(loggerErrorSpy).not.toBeCalled();
    });
  
    it("logs an error if the modal can't be opened", async () => {
      mockShortcutPayload.client.views.open.mockRejectedValueOnce(new Error('No thanks'));
      await postAnonymousQuestion(mockShortcutPayload as any);
  
      expect(mockShortcutPayload.ack).toBeCalledTimes(1);
      expect(mockShortcutPayload.client.views.open).toBeCalledTimes(1);
      expect(loggerErrorSpy).toBeCalledTimes(1);
      expect(loggerErrorSpy).toBeCalledWith(
        expect.stringContaining('Something went wrong publishing a view to Slack'),
        expect.anything(),
      );
    });
  });