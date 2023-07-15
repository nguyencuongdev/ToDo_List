const TaskDetail = {};
const db = require('../common/databse.js');
const Task = require('./Task.js');
const connection = db.getConnection();

TaskDetail.getTaskDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let selectTask_sql = `select * from todolist.tasks where tasks.id = ${+id}`;
        let selectListTaskDetail_sql = `select * from todolist.taskdetail where taskdetail.id= ${+id}`;
        let task;
        try {
            task = await new Promise((resolve, reject) => {
                connection.query(selectTask_sql, (err, result) => {
                    if (err) reject(err);
                    else if (result.length > 0) resolve({ ...result[0] });
                    else resolve({});
                })
            })
        } catch (err) {
            throw new Error("Error try vấn thông tin của task from the database");
        }
        let ListDetail;
        try {
            ListDetail = await new Promise((resolve, reject) => {
                connection.query(selectListTaskDetail_sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const listDetail = result.map(item => ({ ...item }));
                        resolve(listDetail);
                    }
                })
            })
        } catch (err) {
            throw new Error("Error truy vấn List task detail from the database");
        }
        //add list to task object and return reponse api
        task.ListDetail = ListDetail;
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


TaskDetail.addTaskDetail = async (ListTaskDetail) => {
    let insert_sql = `insert into todolist.taskdetail (idTaskDetail,name, status, id)
                     values (?, ?, ?, ?)`;
    for (let i = 0; i < ListTaskDetail.length; i++) {
        const data = [
            ListTaskDetail[i].idTaskDetail,
            ListTaskDetail[i].name,
            ListTaskDetail[i].status,
            ListTaskDetail[i].id
        ];
        connection.query(insert_sql, data, (err) => {
            err ? console.log(err) : console.log('thêm thành công! task detail');
        })
    }
}

TaskDetail.deleteAllTaskDetail = async (id) => {
    let delete_sql = `delete from todolist.taskdetail where taskdetail.id = ${id}`;
    connection.query(delete_sql, (err) => {
        err ? console.log('Xóa thất bại! all tasks detail') : console.log('xóa thành công! all tasks detail')
    })
}
module.exports = TaskDetail;