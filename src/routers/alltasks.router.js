const router = require('express').Router();
const Tasks = require('../controllers/Tasks.controller');
const Task = require('../models/Task');

//router hiển thị trang alltasks
router.get('/', (req, res) => {
    res.render('alltasks', { title: 'alltask', active: 'active' });
})
//router hiển thị trang detail từ trang alltasks
router.get('/detail/:id', Tasks.handleShowTaskDetail);


//router API

//router api để lấy tasks
router.get('/tasksapi', Tasks.getTasks);
//router api để tạo task
router.post('/tasksapi', Tasks.handleCreateTask);
//router api để xóa task
router.delete('/tasksapi/:id', Tasks.handleDeleteTask);
//router api để update task
router.patch('/tasksapi/:id', Tasks.handleUpdateTask);

//router api để lấy task detail
router.get('/tasksapi/:id', Tasks.readTasksDetail);
//router api để tạo task detail
router.post('/tasksapi/:id', Tasks.handleCreateTaskDetail);
//router api để xóa 1 task detail
router.delete('/tasksapi/detail/:id/', Tasks.handleDeleteTaskDetail);
//router api để update status 1 task detail
router.patch('/tasksapi/detail/:id/', Tasks.handleUpdateTaskDetail);
module.exports = router;

module.exports = router;