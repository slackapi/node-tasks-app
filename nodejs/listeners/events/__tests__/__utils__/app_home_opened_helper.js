const { appHomeOpenedCallback } = require('../../app_home_opened');

/* ----------------------------------------------- Mocked API methods ----------------------------------------------- */

const mockPublishFunc = jest.fn();

/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

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

/* ------------------------------------- Utility functions for testing shortcuts ------------------------------------ */

const validateAppHomeOpenedCallback = async (
  appHomeEventCallbackInput,
  publishArgs,
) => {
  await appHomeOpenedCallback(appHomeEventCallbackInput);

  expect(mockPublishFunc).toBeCalledTimes(1);
  expect(mockPublishFunc).toBeCalledWith(expect.objectContaining(publishArgs));
};

module.exports = {
  validateAppHomeOpenedCallback,
  mockAppHomeEventCallbackInput,
  mockPublishFunc,
};
