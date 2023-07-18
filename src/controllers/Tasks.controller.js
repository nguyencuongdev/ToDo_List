const Task = require('../models/Task.js');
const TaskDetail = require('../models/TaskDetail.js');
const db = require('../common/databse.js');
const connection = db.getConnection();

class Tasks {
    getTasks = async (req, res) => {
        let selectTask_sql = `select * from todolist.tasks`;
        connection.query(selectTask_sql, (err, result) => {
            err ? res.status(500).json(err) : res.status(200).json(result);
        })
    }

    handleCreateTask = async (req, res) => {
        try {
            let task = req.body;
            await Task.addTask(task);
            res.status(201).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    handleDeleteTask = async (req, res) => {
        try {
            let id = req.params.id;
            await Task.deleteTask(id);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    handleUpdateTask = async (req, res) => {
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
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    readTasksDetail = TaskDetail.getTaskDetail;

    handleShowTaskDetail = async (req, res) => {
        res.render('taskDetail', { title: 'alltask', active: 'active' });
    }

    handleCreateTaskDetail = async (req, res) => {
        try {
            let taskDetail = req.body;
            await TaskDetail.addTaskDetail(taskDetail);
            res.status(201).render('taskDetail', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    handleDeleteTaskDetail = async (req, res) => {
        try {
            let id = req.params.id;
            let idTaskDetail = req.body.idTaskDetail;
            await TaskDetail.deleteTaskDetail(idTaskDetail, id);
            res.status(200).render('taskDetail', { title: 'alltask', active: 'active' });
        } catch (err) {
            res.status(500).json(err);
        }
    }


    handleUpdateTaskDetail = async (req, res) => {
        try {
            let id = req.params.id;
            let idTaskDetail = req.body.idTaskDetail;
            let status = req.body.status;
            await TaskDetail.updateTaskDetailStatus(id, status, idTaskDetail);
            res.status(200).render('taskDetail', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new Tasks();