const TaskController = require('./Task.controller');
const Task = require('../models/Task');

class TaskImportant extends TaskController {

    constructor() {
        super();
    }

    getTasksImportant(req, res) {
        Task.getTasksImportant(req, res);
    }

    async handleCreateTask(req, res) {
        try {
            let task = req.body;
            await Task.createTaskImportant(task);
            res.status(201).json({ message: 'CreateTask success' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    }
    async handleShowTaskDetail(req, res) {
        res.render('taskDetail', { title: 'important', active: 'active' });
    }
}

module.exports = new TaskImportant();