const { newTask } = require('../index.js');

test('Returns blocks for the new task modal', () => {
    const expected = {
        "title": {
            "type": "plain_text",
            "text": "Create new task"
        },
        "submit": {
            "type": "plain_text",
            "text": "Create"
        },
        "callback_id": "new-task-modal",
        "blocks": [
            {
                "label": {
                    "type": "plain_text",
                    "text": "New task"
                },
                "block_id": "taskTitle",
                "element": {
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Do this thing"
                    },
                    "action_id": "taskTitle",
                    "type": "plain_text_input"
                },
                "type": "input"
            }
        ],
        "type": "modal"
    };
    expect(newTask()).toBe(JSON.stringify(expected));
});