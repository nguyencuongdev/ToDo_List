const MyDate = {};
const Task = require('../models/Task');
const TaskDetail = require('../models/TaskDetail');

MyDate.handleReadTask = Task.getTasks;

MyDate.handleCreateTask = async (req, res) => {
    try {
        let task = req.body;
        await Task.addTask(task);
        res.render('mydate');
    }
    catch (err) {
        res.json(err);
    }
}

MyDate.handDeleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        await Task.deleteTask(id);
        res.render('mydate');
    }
    catch (err) {
        res.json(err);
    }
}

MyDate.handleUpdateTask = async (req, res) => {
    try {
        let id = req.params.id;
        let important = req.body.important ?? false;
        let status = req.body.status ?? false;
        let name = req.body.name ?? false;
        if (important) await Task.updateTaskImportant(id, important);
        else if (name) await Task.updateTaskName(id, name);
        else await Task.updateTaskStatus(id, status);
        res.render('mydate');
    }
    catch (err) {
        res.json(err);
    }
}

MyDate.readTasksDetail = TaskDetail.getTaskDetail;

module.exports = MyDate;