const {
  appHomeNavCompletedCallback,
} = require('./block_app-home-nav-completed');

const {
  blockOpenTaskCheckboxClickedCallback,
} = require('./block_open_task_list_home');
const {
  blockCreateATaskAppHomeCallback,
} = require('./block_app-home-nav-create-a-task');
const { blockAppHomeNavOpenCallback } = require('./block_app-home-nav-open');
const { blockReopenTaskCallback } = require('./block_reopen-task');
const {
  blockButtonMarkAsDoneCallback,
} = require('./block_button-mark-as-done');

const blockAppHomeNavCompletedListener = (app) => {
  app.action(
    { action_id: 'app-home-nav-completed', type: 'block_actions' },
    appHomeNavCompletedCallback,
  );
};

const blockOpenTaskCheckboxClickedListener = (app) => {};

const blockCreateATaskAppHomeListener = (app) => {};

const blockAppHomeNavOpenListener = (app) => {};

const blockReopenTaskListener = (app) => {};

const blockButtonMarkAsDoneListener = (app) => {};

module.exports = {
  blockOpenTaskCheckboxClicked: blockOpenTaskCheckboxClickedListener,
  blockCreateATaskAppHome: blockCreateATaskAppHomeListener,
  blockAppHomeNavOpen: blockAppHomeNavOpenListener,
  blockAppHomeNavCompleted: blockAppHomeNavCompletedListener,
  blockReopenTask: blockReopenTaskListener,
  blockButtonMarkAsDone: blockButtonMarkAsDoneListener,
};
