const MyDate = {};
const Task = require('../models/Task');
const database = require('../common/databse');
const connection = database.getConnection();

MyDate.getIndex = async (req, res) => {
    connection.query('SELECT * FROM tasks', (err, result) => {
        (!err) ? res.json(result) : res.json(err);
    });
}

MyDate.createTask = async (req, res) => {
    let task = await req.body;
    if (!task) {
        res.reder('/mydate');
    }
    else {
        await Task.addTask(task);
        res.render('mydate');
    }
}

module.exports = MyDate;