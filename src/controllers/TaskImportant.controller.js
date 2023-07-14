const TaskImportant = {};
const db = require('../common/databse.js');
const connection = db.getConnection();
TaskImportant.getTaskImportant = async (req, res) => {
    let selectTask_sql = `select * from todolist.tasks where tasks.important = true`;
    connection.query(selectTask_sql, (err, result) => {
        err ? res.status(500).json(err) : res.status(200).json(result);
    })
}
module.exports = TaskImportant;