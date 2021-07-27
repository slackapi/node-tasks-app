// const { appHomeOpenedCallback } = require('../app_home_opened');
const {
  validateAppHomeOpenedCallback,
} = require('./__utils__/app_home_opened_helper');
const {
  openTasksView,
  completedTasksView,
} = require('../../../user-interface/app-home');
const {
  mockAppHomeEventCallbackExistingUserInput,
  mockAppHomeEventCallbackNewUserInput,
} = require('./__fixtures__/appHomeOpenedEventPayloads');

describe('app_home_opened event callback function test ', () => {
  const userId = mockAppHomeEventCallbackNewUserInput.event.user;

  it('should call the callback func correctly for a new user who opened the app home', async () => {
    await validateAppHomeOpenedCallback(mockAppHomeEventCallbackNewUserInput, {
      user_id: userId,
      view: openTasksView([]),
    });
  });

  it('should call the callback func correctly for an existing user who opened the app home Open Tasks tab with no open tasks', async () => {
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
