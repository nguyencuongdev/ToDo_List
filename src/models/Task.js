const db = require('../common/databse.js');
const mysql = require('mysql');
const connection = db.getConnection();

const Task = {};

Task.addTask = async (task) => {
    let insert_sql = `insert into todolist.tasks(tasks.id,tasks.name,tasks.description,tasks.important,tasks.status) values(${task.id},'${task.name}','${task.description}',${task.important},${task.status})`;
    connection.query(insert_sql, (err) => {
        err ? console.error(err) : console.log('thêm thành công!');
    })
}

Task.deleteTask = async (id) => {
    let delete_sql = `delete from todolist.tasks where tasks.id = ${id}`;
    connection.query(delete_sql, (err) => {
        err ? console.error(err) : console.log('xóa thành công!')
    })
}

Task.updateTaskStatus = async (id, status) => {
    let update_sql = `update todolist.tasks set tasks.status = ${status} where tasks.id = ${id}`;
    connection.query(update_sql, (err) => {
        err ? console.error(err) : console.log('Update thành công!');
    });
}

module.exports = Task;