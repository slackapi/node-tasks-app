const {
  appHomeNavCompletedCallback,
} = require('./block_app-home-nav-completed');

const {
  appHomeNavCreateATaskCallback,
} = require('./block_app-home-nav-create-a-task');

const { appHomeNavOpenCallback } = require('./block_app-home-nav-open');

const { buttonMarkAsDoneCallback } = require('./block_button-mark-as-done');

const { reopenTaskCallback } = require('./block_reopen-task');

const {
  openTaskCheckboxClickedCallback,
} = require('./block_open_task_list_home');

const blockAppHomeNavCompletedListener = (app) => {
  app.action(
    { action_id: 'app-home-nav-completed', type: 'block_actions' },
    appHomeNavCompletedCallback,
  );
};

const blockCreateATaskAppHomeListener = (app) => {
  app.action('app-home-nav-create-a-task', appHomeNavCreateATaskCallback);
};

const blockAppHomeNavOpenListener = (app) => {
  app.action(
    { action_id: 'app-home-nav-open', type: 'block_actions' },
    appHomeNavOpenCallback,
  );
};

const blockButtonMarkAsDoneListener = (app) => {
  app.action(
    { action_id: 'button-mark-as-done', type: 'block_actions' },
    buttonMarkAsDoneCallback,
  );
};

const blockReopenTaskListener = (app) => {
  app.action(
    { action_id: 'reopen-task', type: 'block_actions' },
    reopenTaskCallback,
  );
};

const blockOpenTaskCheckboxClickedListener = (app) => {
  app.action(
    {
      action_id: 'blockOpenTaskCheckboxClicked',
      type: 'block_actions',
    },
    openTaskCheckboxClickedCallback,
  );
};

module.exports = {
  blockOpenTaskCheckboxClicked: blockOpenTaskCheckboxClickedListener,
  blockCreateATaskAppHome: blockCreateATaskAppHomeListener,
  blockAppHomeNavOpen: blockAppHomeNavOpenListener,
  blockAppHomeNavCompleted: blockAppHomeNavCompletedListener,
  blockReopenTask: blockReopenTaskListener,
  blockButtonMarkAsDone: blockButtonMarkAsDoneListener,
};
