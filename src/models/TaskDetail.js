const TaskDetail = {};
const { clearConfigCache } = require('prettier');
const db = require('../common/databse.js');
const connection = db.getConnection();

TaskDetail.getTaskDetail = async (req, res) => {
    let id = req.params.id ?? false;
    if (id) {
        let selectTask_sql = `select * from todolist.tasks where tasks.id = ${+id}`;
        let selectListTaskDetail_sql = `select * from todolist.taskdetail where taskdetail.id= ${+id}`;
        const listTaskDetail = [];
        let task;
        connection.query(selectTask_sql, (err, result) => {
            (err) ? res.json(err) : task = { ...result[0] };
        })

        connection.query(selectListTaskDetail_sql, (err, result) => {
            (err) ? res.json(err) :
                result.forEach((item) => {
                    listTaskDetail.push({ ...item });
                })

            task.ListDetail = listTaskDetail;
            res.json(task);
        })
    }
}

module.exports = TaskDetail;