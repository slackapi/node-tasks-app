const {
  validateAppHomeOpenedCallback,
  mockAppHomeEventCallbackInput,
} = require('./__utils__/event-test-util-funcs');
const {
  mockAppHomeOpenedEventNewUser,
  mockAppHomeOpenedEventExistingUser,
} = require('./__fixtures__/event-fixtures');
const {
  openTasksView,
  completedTasksView,
} = require('../../../user-interface/app-home');

const userId = mockAppHomeOpenedEventNewUser.user;

describe('app_home_opened event callback function test ', () => {
  it('should call the callback func correctly for a new user who opened the app home', async () => {
    const mockAppHomeEventCallbackNewUserInput = mockAppHomeEventCallbackInput(
      mockAppHomeOpenedEventNewUser,
    );

    await validateAppHomeOpenedCallback(mockAppHomeEventCallbackNewUserInput, {
      user_id: userId,
      view: openTasksView([]),
    });
  });

  it('should call the callback func correctly for an existing user who opened the app home Open Tasks tab with no open tasks', async () => {
    const mockAppHomeEventCallbackExistingUserInput =
      mockAppHomeEventCallbackInput(mockAppHomeOpenedEventExistingUser);
    // The private_metadata is set to open when the Open Tasks tab is opened
    mockAppHomeEventCallbackExistingUserInput.event.view.private_metadata =
      'open';

    await validateAppHomeOpenedCallback(
      mockAppHomeEventCallbackExistingUserInput,
      {
        user_id: userId,
        view: openTasksView([]),
      },
    );
  });

  it('should call the callback func correctly for an existing user who opened the app home Completed Tasks tab with no completed tasks', async () => {
    const mockAppHomeEventCallbackExistingUserInput =
      mockAppHomeEventCallbackInput(mockAppHomeOpenedEventExistingUser);

    // The private_metadata is set to completed when the Completed Tasks tab is opened
    mockAppHomeEventCallbackExistingUserInput.event.view.private_metadata =
      'completed';

    await validateAppHomeOpenedCallback(
      mockAppHomeEventCallbackExistingUserInput,
      {
        user_id: userId,
        view: completedTasksView([]),
      },
    );
  });
});

// TODO: Existing user with open tasks

// TODO: Existing user with completed tasks

// TODO: Error out

// TODO: event.tab !== 'home'
