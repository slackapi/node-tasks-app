const app = require('./app');

jest.spyOn(app.client.auth, 'test').mockImplementation();

describe('app test', () => {});
