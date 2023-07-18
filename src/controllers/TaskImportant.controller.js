const Tasks = require('./Task.controller');
const Task = require('../models/Task');

class TaskImportant extends Tasks {

    constructor() {
        super();
    }

    getTasksImportant(req, res) {
        Task.getTasksImportant(req, res);
    }
    async handleShowTaskDetail(req, res) {
        res.render('taskDetail', { title: 'important', active: 'active' });
    }
}

module.exports = new TaskImportant();