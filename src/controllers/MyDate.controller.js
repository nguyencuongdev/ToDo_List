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
        let important = req.body.important ?? false;
        let status = req.body.status ?? false;
        let name = req.body.name ?? false;
        if (important) await Task.updateTaskImportant(id, important);
        else if (name) await Task.updateTaskName(id, name);
        else await Task.updateTaskStatus(id, status);
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.readTasksDetail = TaskDetail.getTaskDetail;

MyDate.handleCreateTaskNext = async (req, res) => {
    try {
        let id = req.params.id ?? false;
        if (id) {
            let taskDetail = req.body;
            let description = taskDetail.description ?? '';
            let ListTasksNextAdded = taskDetail.ListTaskNextAdd ?? [];
            await TaskDetail.addTaskDetail(ListTasksNextAdded);
            await Task.updateTaskDescription(id, description);
            res.status(200).render('mydate', { title: 'mydate', active: 'active' });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = MyDate;