const TaskImportant = {};
const TaskDetail = require('../models/TaskDetail.js');
const Task = require('../models/Task.js');
const db = require('../common/databse.js');
const connection = db.getConnection();

TaskImportant.getTaskImportant = async (req, res) => {
    let selectTask_sql = `select * from todolist.tasks where tasks.important = true`;
    connection.query(selectTask_sql, (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    })
}


TaskImportant.handleCreateTask = async (req, res) => {
    try {
        let task = req.body;
        task.important = true;
        let checkExist = await Task.checkExistOfTask(task.id);
        while (!checkExist) {
            task.id = Math.floor(Math.random() * (Math.pow(2, 31) - 1));
            checkExist = await Task.checkExistOfTask(task.id);
        }
        await Task.addTask(task);
        res.status(201).render('taskImportant', { title: 'important', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

TaskImportant.handleDeleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        await Task.deleteTask(id);
        res.status(200).render('taskImportant', { title: 'important', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

TaskImportant.handleUpdateTask = async (req, res) => {
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
        res.status(200).render('taskImportant', { title: 'important', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

TaskImportant.readTasksDetail = TaskDetail.getTaskDetail;

TaskImportant.handleShowTaskDetail = async (req, res) => {
    res.render('taskDetail', { title: 'important', active: 'active' });
}

TaskImportant.handleCreateTaskDetail = async (req, res) => {
    try {
        let taskDetail = req.body;
        await TaskDetail.addTaskDetail(taskDetail);
        res.status(201).render('taskDetail', { title: 'important', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

TaskImportant.handleDeleteTaskDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let idTaskDetail = req.body.idTaskDetail;
        await TaskDetail.deleteTaskDetail(idTaskDetail, id);
        res.status(200).render('taskDetail', { title: 'important', active: 'active' });
    } catch (err) {
        res.status(500).json(err);
    }
}


TaskImportant.handleUpdateTaskDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let idTaskDetail = req.body.idTaskDetail;
        let status = req.body.status;
        await TaskDetail.updateTaskDetailStatus(id, status, idTaskDetail);
        res.status(200).render('taskDetail', { title: 'important', active: 'active' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = TaskImportant;