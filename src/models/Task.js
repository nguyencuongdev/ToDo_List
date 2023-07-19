const db = require('../common/databse.js');
const connection = db.getConnection();
const ExceptionDatabse = require('../common/ExceptionDatabase.js');
const Task = {};

Task.getTasks = async (req, res) => {
    connection.query('SELECT * FROM todolist.tasks', (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    })
}

Task.getTasksToDay = async (req, res) => {
    let select_sql = `SELECT *
                        FROM todolist.tasks
                        WHERE DATE_FORMAT(startDate, '%d-%m-%y') <= DATE_FORMAT(CURDATE(), '%d-%m-%y')
                        AND DATE_FORMAT(endDate, '%d-%m-%y') >= DATE_FORMAT(CURDATE(), '%d-%m-%y') `;
    connection.query(select_sql, (err, result) => {
        (err) ? res.status(500).json(err) : res.status(200).json(result);
    })
}

Task.getTasksImportant = async (req, res) => {
    let selectTask_sql = `select * from todolist.tasks where tasks.important = true`;
    connection.query(selectTask_sql, (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    })
}

Task.addTask = async (task) => {
    try {
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
        await new Promise((resolve, reject) => {
            connection.query(insert_sql, data, (err) => {
                if (err) reject(new ExceptionDatabse('Lỗi add task'));
                console.log('Add thành công!');
                resolve();
            })
        })
    }
    catch (err) {
        throw err;
    }
}

Task.createTaskImportant = async (task) => {
    try {
        task.important = true;
        await Task.addTask(task);
    }
    catch (err) {
        throw err;
    }
}


Task.deleteTask = async (id) => {
    try {
        let delete_sql = `delete from todolist.tasks where tasks.id = ${id}`;
        await new Promise((resolve, reject) => {
            connection.query(delete_sql, (err) => {
                if (err) reject(new ExceptionDatabse('Lỗi delete task'));
                console.log('Delete thành công!');
                resolve();
            })
        })
    }
    catch (err) {
        throw err;
    }
}

Task.updateTaskStatus = async (id, status) => {
    try {
        let update_sql = `update todolist.tasks set tasks.status = ${status} where tasks.id = ${id}`;
        await new Promise((resolve, reject) => {
            connection.query(update_sql, (err) => {
                if (err) reject(new ExceptionDatabse('Lỗi update status'));
                console.log('Update thành công! status');
                resolve();
            });
        })
    }
    catch (err) {
        throw err;
    }
}

Task.updateTaskImportant = async (id, important) => {
    try {
        let update_sql = `update todolist.tasks set tasks.important = ${important} where tasks.id = ${id}`;
        await new Promise((resolve, reject) => {
            connection.query(update_sql, (err) => {
                if (err) reject(new ExceptionDatabse('Lỗi update important'));
                console.log('Update thành công! important');
                resolve();
            })
        })
    }
    catch (err) {
        throw err;
    }
}

Task.updateTaskName = async (id, name) => {
    try {
        if (name != '') {
            let update_sql = `update todolist.tasks set tasks.name = '${name}' where tasks.id = ${id}`;
            await new Promise((resolve, reject) => {
                connection.query(update_sql, (err) => {
                    if (err) reject(new ExceptionDatabse('Lỗi update name'));
                    console.log('Update thành công! name');
                    resolve();
                })
            })
        }
    }
    catch (err) {
        throw err;
    }
}

Task.updateTaskDescription = async (id, description) => {
    try {
        if (description != '') {
            let update_sql = `update todolist.tasks set tasks.description = '${description}' where tasks.id = ${id}`;
            await new Promise((resolve, reject) => {
                connection.query(update_sql, (err) => {
                    if (err) reject(new ExceptionDatabse('Lỗi update description'));
                    console.log('Update thành công! description');
                    resolve();
                })
            })
        }
    }
    catch (err) {
        throw err;
    }
}

Task.generateId = async () => {
    try {
        let select_sql = `SELECT id FROM todolist.tasks order by id desc limit 1`;
        const result = await new Promise((resolve, reject) => {
            connection.query(select_sql, (err, result) => {
                if (err) reject(new Exception(err.message));
                else resolve(result);
            })
        })
        if (result.length == 0) return 0;
        return result[0].id;
    }
    catch (err) {
        throw err;
    }
}

module.exports = Task;