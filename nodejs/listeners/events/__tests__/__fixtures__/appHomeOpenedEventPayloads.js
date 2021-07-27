// A new user of the app (who has never set the App Home) will not have a 'view' property in their event payload
const mockAppHomeOpenedEventNewUser = {
  type: 'app_home_opened',
  user: 'U061F7AUR',
  channel: 'D0LAN2Q65',
  event_ts: '1515449522000016',
  tab: 'home',
};

const mockPublishFunc = jest.fn();

const mockAppHomeEventCallbackInput = (mockAppHomeEvent) => ({
  client: {
    views: {
      publish: mockPublishFunc,
    },
  },
  event: mockAppHomeEvent,
  // The body payload that contains the 'event' payload
  body: {
    team_id: 'T014K402GMV',
    event: mockAppHomeEvent,
  },
});

const mockAppHomeEventCallbackNewUserInput = mockAppHomeEventCallbackInput(
  mockAppHomeOpenedEventNewUser,
);

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

const mockAppHomeEventCallbackExistingUserInput = mockAppHomeEventCallbackInput(
  mockAppHomeOpenedEventExistingUser,
);

module.exports = {
  mockAppHomeEventCallbackNewUserInput,
  mockAppHomeEventCallbackExistingUserInput,
  mockPublishFunc,
};
