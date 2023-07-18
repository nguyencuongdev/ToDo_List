const Task = require('../models/Task');
const TaskDetail = require('../models/TaskDetail');


class Tasks {

    constructor() {

    }

    getTasks = Task.getTasks;
    readTasksDetail = TaskDetail.getTaskDetail;

    handleCreateTask = async (req, res) => {
        try {
            let task = req.body;
            await Task.addTask(task);
            res.status(201).json({ message: 'CreateTask success' });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    handleDeleteTask = async (req, res) => {
        try {
            let id = req.params.id;
            await Task.deleteTask(id);
            res.status(200).json({ message: 'DeleteTask success' });
        }
        catch (err) {
            throw new Error(err.message);
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
            res.status(200).json({ message: 'update success' });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    handleShowTaskDetail = async (req, res) => {
        res.render('taskDetail', { title: 'alltask', active: 'active' });
    }

    handleCreateTaskDetail = async (req, res) => {
        try {
            let taskDetail = req.body;
            await TaskDetail.addTaskDetail(taskDetail);
            res.status(200).json({ message: 'CreateTaskDetail success' });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    handleDeleteTaskDetail = async (req, res) => {
        try {
            let id = req.params.id;
            let idTaskDetail = req.body.idTaskDetail;
            await TaskDetail.deleteTaskDetail(idTaskDetail, id);
            res.status(200).json({ message: 'DeleteTaskDetail success' });
        } catch (err) {
            throw new Error(err.message);
        }
    }


    handleUpdateTaskDetail = async (req, res) => {
        try {
            let id = req.params.id;
            let idTaskDetail = req.body.idTaskDetail;
            let status = req.body.status;
            await TaskDetail.updateTaskDetailStatus(id, status, idTaskDetail);
            res.status(200).json({ message: 'UpdateTaskDetail success' });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = Tasks;