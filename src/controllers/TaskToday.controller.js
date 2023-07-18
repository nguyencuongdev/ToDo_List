const Tasks = require('./Task.controller');
const Task = require('../models/Task');

class TaskToDay extends Tasks {

    constructor() {
        super();
    }

    getTasksToDay(req, res) {
        Task.getTasksToDay(req, res);
    }

    async handleShowTaskDetail(req, res) {
        res.status(200).render('taskdetail', { title: 'tasktoday', active: 'active' });
    }
}

module.exports = new TaskToDay();