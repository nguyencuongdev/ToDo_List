const Task = require('./Task.controller');

class AllTasks extends Task {
    constructor() {
        super();
    }
}

module.exports = new AllTasks();