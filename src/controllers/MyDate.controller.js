const MyDate = {};
const Task = require('../models/Task');
const TaskDetail = require('../models/TaskDetail');

MyDate.handleReadTask = Task.getTasksToDay;

MyDate.handleCreateTask = async (req, res) => {
    try {
        let task = req.body;
        let checkExist = await Task.checkExistOfTask(task.id);
        while (!checkExist) {
            task.id = Math.floor(Math.random() * (Math.pow(2, 31) - 1));
            checkExist = await Task.checkExistOfTask(task.id);
        }
        await Task.addTask(task);
        res.status(201).render('mydate', { title: 'mydate', active: 'active' });
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
        else if ("description" in req.body) {
            let description = req.body.description;
            await Task.updateTaskDescription(id, description);
        }
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.readTasksDetail = TaskDetail.getTaskDetail;

MyDate.handleShowTaskDetail = async (req, res) => {
    res.render('taskDetail', { title: 'mydate', active: 'active' });
}

MyDate.handleCreateTaskDetail = async (req, res) => {
    try {
        let taskDetail = req.body;
        await TaskDetail.addTaskDetail(taskDetail);
        res.status(200).render('taskDetail', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

MyDate.handleDeleteTaskDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let idTaskDetail = req.body.idTaskDetail;
        await TaskDetail.deleteTaskDetail(idTaskDetail, id);
        res.status(200).render('taskDetail', { title: 'mydate', active: 'active' });
    } catch (err) {
        res.status(500).json(err);
    }
}


MyDate.handleUpdateTaskDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let idTaskDetail = req.body.idTaskDetail;
        let status = req.body.status;
        await TaskDetail.updateTaskDetailStatus(id, status, idTaskDetail);
        res.status(200).render('mydate', { title: 'mydate', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = MyDate;