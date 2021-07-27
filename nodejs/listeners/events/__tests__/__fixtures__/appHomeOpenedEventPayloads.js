// A new user of the app (who has never set the App Home) will not have a 'view' property in their event payload
const mockAppHomeOpenedEventNewUser = {
  type: 'app_home_opened',
  user: 'U061F7AUR',
  channel: 'D0LAN2Q65',
  event_ts: '1515449522000016',
  tab: 'home',
};

const mockAppHomeEventCallbackNewUserInput = {
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

const mockAppHomeEventCallbackExistingUserInput = {
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

module.exports = {
  mockAppHomeEventCallbackNewUserInput,
  mockAppHomeEventCallbackExistingUserInput,
};
