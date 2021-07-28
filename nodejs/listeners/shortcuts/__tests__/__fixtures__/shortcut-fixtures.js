/* --------------------------------------------- Hard-coded payload data -------------------------------------------- */

const mockGlobalShortcutPayloadData = {
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

const mockMessageShortcutPayloadData = {
  callback_id: 'message_new_task',
  type: 'message_action',
  trigger_id: '13345224609.8534564800.6f8ab1f53e13d0cd15f96106292d5536',
  response_url:
    'https://hooks.slack.com/app-actions/T0MJR11A4/21974584944/yk1S9ndf35Q1flupVG5JbpM6',
  team: {
    id: 'T0MJRM1A7',
    domain: 'pandamonium',
  },
  channel: {
    id: 'D0LFFBKLZ',
    name: 'cats',
  },
  user: {
    id: 'U0D15K92L',
    name: 'dr_maomao',
  },
  message: {
    type: 'message',
    user: 'U0MJRG1AL',
    ts: '1516229207.000133',
    text: "World's smallest big cat! <https://youtube.com/watch?v=W86cTIoMv2U>",
  },
};

module.exports = {
  mockGlobalShortcutPayloadData,
  mockMessageShortcutPayloadData,
};
