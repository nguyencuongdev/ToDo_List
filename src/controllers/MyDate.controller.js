const MyDate = {};
const Task = require('../models/Task');
const database = require('../common/databse');
const connection = database.getConnection();

MyDate.getIndex = async (req, res) => {
    connection.query('SELECT * FROM tasks', (err, result) => {
        (!err) ? res.json(result) : res.json(err);
    });
}

MyDate.handleCreateTask = async (req, res) => {
    try {
        let task = req.body;
        await Task.addTask(task);
    }
    catch (err) {
        res.json(err);
    }
}

MyDate.handDeleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        await Task.deleteTask(id);
    }
    catch (err) {
        res.json(err);
    }
}

MyDate.handleUpdateTaskStatus = async (req, res) => {
    try {
        let id = req.params.id, status = req.body.status;
        await Task.updateTaskStatus(id, status);
    }
    catch (err) {
        res.json(err);
    }
}

module.exports = MyDate;