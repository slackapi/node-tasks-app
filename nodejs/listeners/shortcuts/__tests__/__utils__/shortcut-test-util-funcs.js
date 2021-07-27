const mockShortcutPayloadData = {
  type: 'shortcut',
  token: 'XXXXXXXXXXXXX',
  action_ts: '1581106241.371594',
  team: {
    id: 'TXXXXXXXX',
    domain: 'shortcuts-test',
  },
  user: {
    id: 'UXXXXXXXXX',
    username: 'aman',
    team_id: 'TXXXXXXXX',
  },
  callback_id: 'global_new_task',
  trigger_id: '944799105734.773906753841.38b5894552bdd4a780554ee59d1f3638',
};

const viewsOpenMockFunc = jest.fn();
const ackMockFunc = jest.fn();

const mockShortcutCallbackInput = {
  ack: ackMockFunc,
  shortcut: mockShortcutPayloadData,
  client: {
    views: {
      open: viewsOpenMockFunc,
    },
  },
};

module.exports = { viewsOpenMockFunc, ackMockFunc, mockShortcutCallbackInput };
