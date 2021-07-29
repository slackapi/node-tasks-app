/* --------------------------------------------- Hard-coded payload data -------------------------------------------- */
const appHomeBlockActionPayload = {
  type: 'block_actions',
  team: {
    id: 'T9TK3CUKW',
    domain: 'example',
  },
  user: {
    id: 'UA8RXUSPL',
    username: 'jtorrance',
    name: 'jtorrance',
    team_id: 'T9TK3CUKW',
  },
  api_app_id: 'AABA1ABCD',
  token: '9s8d9as89d8as9d8as989',
  container: {
    type: 'view',
    view_id: 'V0PKB1ZFV',
  },
  trigger_id: '24571818370.22717085937.b9c7ca14b87be6b44ff5864edba8306f',
  view: {
    id: 'V0PKB1ZFV',
    team_id: 'T9TK3CUKW',
    type: 'home',
    blocks: [
      {
        type: 'section',
        block_id: '8ZG',
        text: {
          type: 'mrkdwn',
          text: 'A stack of blocks for the simple sample Block Kit Home tab.',
          verbatim: false,
        },
      },
      {
        type: 'actions',
        block_id: '7fhg',
        elements: [
          {
            type: 'button',
            action_id: 'XRX',
            text: {
              type: 'plain_text',
              text: 'Action A',
              emoji: true,
            },
          },
          {
            type: 'button',
            action_id: 'GFBew',
            text: {
              type: 'plain_text',
              text: 'Action B',
              emoji: true,
            },
          },
        ],
      },
      {
        type: 'section',
        block_id: '6evU',
        text: {
          type: 'mrkdwn',
          text: "And now it's slightly more complex.",
          verbatim: false,
        },
      },
    ],
    private_metadata: '',
    callback_id: '',
    state: {
      values: {},
    },
    hash: '1571318366.2468e46f',
    clear_on_close: false,
    notify_on_close: false,
    close: null,
    submit: null,
    previous_view_id: null,
    root_view_id: 'V0PKB1ZFV',
    app_id: 'AABA1ABCD',
    external_id: '',
    app_installed_team_id: 'T9TK3CUKW',
    bot_id: 'B0B00B00',
  },
  actions: [
    {
      type: 'button',
      block_id: '7fhg',
      action_id: 'XRX',
      text: {
        type: 'plain_text',
        text: 'Action A',
        emoji: true,
      },
      action_ts: '1571318425.267782',
    },
    {
      action_id: 'reopen-task',
      block_id: 'T6iez',
      text: { type: 'plain_text', text: 'Reopen', emoji: true },
      value: '2',
      type: 'button',
      action_ts: '1627532321.009494',
    },
  ],
};

module.exports = { appHomeBlockActionPayload };
