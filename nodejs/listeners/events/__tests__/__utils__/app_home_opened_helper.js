const { appHomeOpenedCallback } = require('../../app_home_opened');
const {
  mockPublishFunc,
} = require('../__fixtures__/appHomeOpenedEventPayloads');

const validateAppHomeOpenedCallback = async (
  mockAppHomeEventCallbackInput,
  publishArgs,
) => {
  await appHomeOpenedCallback(mockAppHomeEventCallbackInput);

  expect(mockPublishFunc).toBeCalledTimes(1);
  expect(mockPublishFunc).toBeCalledWith(expect.objectContaining(publishArgs));
};

module.exports = { validateAppHomeOpenedCallback };
