const db = require('../common/databse.js');
const connection = db.getConnection();

const Task = {};
Task.getTasks = async (req, res) => {
    connection.query('SELECT * FROM todolist.tasks', (err, result) => {
        (!err) ? res.json(result) : res.json(err);
    });
}
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
        err ? console.error(err) : console.log('Update thành công! status');
    });
}

Task.updateTaskImportant = async (id, important) => {
    let update_sql = `update todolist.tasks set tasks.important = ${important} where tasks.id = ${id}`;
    connection.query(update_sql, (err) => {
        err ? console.error(err) : console.log('Update thành công! important');
    });
}

Task.updateTaskName = async (id, name) => {
    let update_sql = `update todolist.tasks set tasks.name = '${name}' where tasks.id = ${id}`;
    connection.query(update_sql, (err) => {
        err ? console.error(err) : console.log('Update thành công! name');
    });
}
module.exports = Task;