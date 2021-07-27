const { appHomeOpenedCallback } = require('../app_home_opened');
const {
  openTasksView,
  completedTasksView,
} = require('../../../user-interface/app-home');

describe('app_home_opened event callback function test ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // A new user of the app (who has never set the App Home) will not have a 'view' property in their event payload
  const mockAppHomeOpenedEventNewUser = {
    type: 'app_home_opened',
    user: 'U061F7AUR',
    channel: 'D0LAN2Q65',
    event_ts: '1515449522000016',
    tab: 'home',
  };

  it('should call the callback func correctly for a new user who opened the app home', async () => {
    const mockAppHomeEventCallbackInput = {
      client: {
        views: {
          publish: jest.fn(),
        },
      },
      event: mockAppHomeOpenedEventNewUser,
      // The body payload that contains the 'event' payload
      body: {
        team_id: 'T014K402GMV',
        event: mockAppHomeOpenedEventNewUser,
      },
    };

    await appHomeOpenedCallback(mockAppHomeEventCallbackInput);

    const clientViewsPublishMockFunc =
      mockAppHomeEventCallbackInput.client.views.publish;

    expect(clientViewsPublishMockFunc).toBeCalledTimes(1);
    expect(clientViewsPublishMockFunc).toBeCalledWith(
      expect.objectContaining({
        user_id: mockAppHomeOpenedEventNewUser.user,
        view: openTasksView([]),
      }),
    );
  });

  it('should call the callback func correctly for an existing user who opened the app home Open Tasks tab with no open tasks', async () => {
    // An existing user's home page has been opened. It will have the view property
    const mockAppHomeOpenedEventExistingUser = {
      ...mockAppHomeOpenedEventNewUser,
      view: {
        team_id: 'T21312902',
        type: 'home',
        private_metadata: 'open',
        callback_id: '',
      },
    };

    const mockAppHomeEventCallbackInput = {
      client: {
        views: {
          publish: jest.fn(),
        },
      },
      event: mockAppHomeOpenedEventExistingUser,
      // The body payload that contains the 'event' payload
      body: {
        team_id: 'T014K402GMV',
        event: mockAppHomeOpenedEventExistingUser,
      },
    };
    await appHomeOpenedCallback(mockAppHomeEventCallbackInput);

    const clientViewsPublishMockFunc =
      mockAppHomeEventCallbackInput.client.views.publish;

    expect(clientViewsPublishMockFunc).toBeCalledTimes(1);
    expect(clientViewsPublishMockFunc).toBeCalledWith(
      expect.objectContaining({
        user_id: mockAppHomeOpenedEventNewUser.user,
        view: openTasksView([]),
      }),
    );
  });

  it('should call the callback func correctly for an existing user who opened the app home Completed Tasks tab with no completed tasks', async () => {
    // An existing user's home page has been opened. It will have the view property
    const mockAppHomeOpenedEventExistingUser = {
      ...mockAppHomeOpenedEventNewUser,
      view: {
        id: 'VPASKP233',
        team_id: 'T21312902',
        type: 'home',
        private_metadata: 'completed',
        callback_id: '',
        hash: '1231232323.12321312',
        clear_on_close: false,
        notify_on_close: false,
        root_view_id: 'VPASKP233',
        app_id: 'A21SDS90',
        external_id: '',
        app_installed_team_id: 'T21312902',
        bot_id: 'BSDKSAO2',
      },
    };

    const mockAppHomeEventCallbackInput = {
      client: {
        views: {
          publish: jest.fn(),
        },
      },
      event: mockAppHomeOpenedEventExistingUser,
      // The body payload that contains the 'event' payload
      body: {
        team_id: 'T014K402GMV',
        event: mockAppHomeOpenedEventExistingUser,
      },
    };
    await appHomeOpenedCallback(mockAppHomeEventCallbackInput);

    const clientViewsPublishMockFunc =
      mockAppHomeEventCallbackInput.client.views.publish;

    expect(clientViewsPublishMockFunc).toBeCalledTimes(1);
    expect(clientViewsPublishMockFunc).toBeCalledWith(
      expect.objectContaining({
        user_id: mockAppHomeOpenedEventNewUser.user,
        view: completedTasksView([]),
      }),
    );
  });
});
