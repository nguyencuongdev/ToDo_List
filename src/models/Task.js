const db = require('../common/databse.js');
const connection = db.getConnection();
const { deleteAllTaskDetail } = require('./TaskDetail.js');

const Task = {};
Task.getTasks = async (req, res) => {
    connection.query('SELECT * FROM todolist.tasks', (err, result) => {
        (!err) ? res.status(200).json(result) : res.status(500).json(err);
    });
}

Task.getTasksToDay = async (req, res) => {
    let select_sql = `SELECT *
                        FROM todolist.tasks
                        WHERE DATE_FORMAT(startDate, '%d-%m-%y') <= DATE_FORMAT(CURDATE(), '%d-%m-%y')
                        AND DATE_FORMAT(endDate, '%d-%m-%y') >= DATE_FORMAT(CURDATE(), '%d-%m-%y') `;
    connection.query(select_sql, (err, result) => {
        (!err) ? res.status(200).json(result) : res.status(500).json(err);
    })
}
Task.addTask = async (task) => {
    let insert_sql = `insert into todolist.tasks(tasks.id,tasks.name,tasks.description,tasks.important,tasks.status,tasks.startDate,tasks.endDate)
        values(?,?,?,?,?,STR_TO_DATE(?,'%d-%m-%Y %H:%i'),STR_TO_DATE(?,'%d-%m-%Y %H:%i'))`;

    const data = await Promise.resolve([
        task.id,
        task.name,
        task.description,
        task.important,
        task.status,
        task.startDate,
        task.endDate
    ])
    connection.query(insert_sql, data, (err) => {
        err ? console.log(err) : console.log('thêm thành công!');
    })
}

Task.deleteTask = async (id) => {
    await deleteAllTaskDetail(id);
    let delete_sql = `delete from todolist.tasks where tasks.id = ${id}`;
    connection.query(delete_sql, (err) => {
        err ? console.log('Xóa thất bại') : console.log('xóa thành công!')
    })
}

Task.updateTaskStatus = async (id, status) => {
    let update_sql = `update todolist.tasks set tasks.status = ${status} where tasks.id = ${id}`;
    connection.query(update_sql, (err) => {
        err ? console.log('Update thất bại! status') : console.log('Update thành công! status');
    });
}

Task.updateTaskImportant = async (id, important) => {
    let update_sql = `update todolist.tasks set tasks.important = ${important} where tasks.id = ${id}`;
    connection.query(update_sql, (err) => {
        err ? console.log('Update thất bại! important') : console.log('Update thành công! important');
    });
}

Task.updateTaskName = async (id, name) => {
    if (name != '') {
        let update_sql = `update todolist.tasks set tasks.name = '${name}' where tasks.id = ${id}`;
        connection.query(update_sql, (err) => {
            err ? console.log('Update thất bại! name') : console.log('Update thành công! name');
        });
    }
}

Task.updateTaskDescription = async (id, description) => {
    if (description != '') {
        let update_sql = `update todolist.tasks set tasks.description = '${description}' where tasks.id = ${id}`;
        connection.query(update_sql, (err) => {
            err ? console.log('Update thất bại! description') : console.log('Update thành công!, description');
        });
    }
}

Task.checkExistOfTask = async (id) => {
    try {
        const select_sql = `SELECT id FROM todolist.tasks WHERE tasks.id = ${id}`;
        const result = await new Promise((resolve, reject) => {
            connection.query(select_sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
        return result.length == 0;
    } catch (err) {
        console.error('Error while checking task existence:', err);
        throw err;
    }
}

module.exports = Task;