const db = require('../common/databse.js');
const mysql = require('mysql');
const connection = db.getConnection();

const Task = {};

Task.addTask = async (task) => {
    let insert_sql = `insert into todolist.task(task.name, task.status,task.account) values('${task.name}','chua hoan thanh','coung123')`;
    connection.query(insert_sql, (err) => {
        err ? console.error(err) : console.log('thêm thành công!');
    })
}

module.exports = Task;