const Task = require('./Task.controller');

class AllTasks extends Task {
    constructor() {
        super();
    }


    handleReadTask = Task.getTasksToDay;

    async handleCreateTask(req, res) {
        try {
            await super.handleCreateTask(req, res);
            res.status(201).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleDeleteTask(req, res) {
        try {
            await super.handleDeleteTask(req, res);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleUpdateTask(req, res) {
        try {
            await super.handleUpdateTask(req, res);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleShowTaskDetail(req, res) {
        res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
    }

    async handleCreateTaskDetail(req, res) {
        try {
            await super.handleCreateTaskDetail(req, res);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

    async handleDeleteTaskDetail(req, res) {
        try {
            await super.handleDeleteTaskDetail(req, res);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        } catch (err) {
            res.status(500).json(err);
        }
    }


    async handleUpdateTaskDetail(req, res) {
        try {
            await super.handleUpdateTaskDetail(req, res);
            res.status(200).render('alltasks', { title: 'alltask', active: 'active' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new AllTasks();