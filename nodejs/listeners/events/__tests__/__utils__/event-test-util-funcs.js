const { appHomeOpenedCallback } = require('../../app_home_opened');

/* -------------------- Functions for generating the inputs to the listener's callback functions. ------------------- */

const mockAppHomeEventCallbackInput = (mockAppHomeEvent) => ({
  client: {
    views: {
      publish: global.viewPublishMockFunc,
    },
  },
  event: mockAppHomeEvent,
  // The body payload that contains the 'event' payload
  body: {
    team_id: 'T014K402SOW',
    event: mockAppHomeEvent,
  },
});

/* ------------------------------------- Utility functions for testing shortcuts ------------------------------------ */

const validateAppHomeOpenedCallback = async (
  appHomeEventCallbackInput,
  publishArgs,
) => {
  await appHomeOpenedCallback(appHomeEventCallbackInput);

  expect(global.viewPublishMockFunc).toBeCalledTimes(1);
  expect(global.viewPublishMockFunc).toBeCalledWith(
    expect.objectContaining(publishArgs),
  );
};

module.exports = {
  validateAppHomeOpenedCallback,
  mockAppHomeEventCallbackInput,
};
