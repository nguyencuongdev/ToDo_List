const Tasks = require('./Task.controller');
const Task = require('../models/Task');

class TaskImportant extends Tasks {

    constructor() {
        super();
    }

    getTaskImportant = Task.getTasksImportant;


    async handleCreateTask(req, res) {
        try {
            let task = req.body;
            await Task.createTaskImportant(task);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleDeleteTask(req, res) {
        try {
            await super.handleDeleteTask(req, res);
            res.status(200).render('taskImportant', { title: 'important', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleUpdateTask(req, res) {
        try {
            await super.handleUpdateTask(req, res);
            res.status(200).render('taskImportant', { title: 'important', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleShowTaskDetail(req, res) {
        res.render('taskDetail', { title: 'important', active: 'active' });
    }

    async handleCreateTaskDetail(req, res) {
        try {
            await super.handleCreateTaskDetail(req, res);
            res.status(201).render('taskDetail', { title: 'important', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleDeleteTaskDetail(req, res) {
        try {
            await super.handleDeleteTaskDetail(req, res);
            res.status(200).render('taskDetail', { title: 'important', active: 'active' });
        } catch (err) {
            res.status(500).json(err);
        }
    }


    async handleUpdateTaskDetail(req, res) {
        try {
            await super.handleUpdateTaskDetail(req, res);
            res.status(200).render('taskDetail', { title: 'important', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new TaskImportant();