const TaskController = require('./Task.controller');

class AllTasks extends TaskController {
    constructor() {
        super();
    }
}

module.exports = new AllTasks();