const MyDate = {};
const Task = require('../models/Task');
const TaskDetail = require('../models/TaskDetail');

MyDate.handleReadTask = Task.getTasks;

MyDate.handleCreateTask = async (req, res) => {
    try {
        let task = req.body;
        await Task.addTask(task);
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.handleDeleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        await Task.deleteTask(id);
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.handleUpdateTask = async (req, res) => {
    try {
        let id = req.params.id;
        if ("important" in req.body) {
            let important = req.body.important;
            await Task.updateTaskImportant(id, important);
        }
        else if ("name" in req.body) {
            let name = req.body.name;
            await Task.updateTaskName(id, name);
        }
        else if ("status" in req.body) {
            let status = req.body.status;
            await Task.updateTaskStatus(id, status);
        }
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.readTasksDetail = TaskDetail.getTaskDetail;

MyDate.handleCreateTaskDetail = async (req, res) => {
    try {
        let id = req.params.id ?? false;
        if (id) {
            let taskDetail = req.body;
            await TaskDetail.addTaskDetail(taskDetail);
            res.status(200).render('mydate', { title: 'mydate', active: 'active' });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.handleShowTaskDetail = async (req, res) => {
    res.render('taskDetail', { title: 'mydate', active: 'active' });
}

module.exports = MyDate;