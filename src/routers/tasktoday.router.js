const express = require('express');
const router = express.Router();
const TaskToDay = require('../controllers/TaskToday.controller');

//router hiển thị trang mydate
router.get('/', (req, res) => {
    res.render('tasktoday', { title: 'tasktoday', active: 'active' });
})
//router hiển thị trang detail từ trang mydate
router.get('/detail/:id', TaskToDay.handleShowTaskDetail);


//router API

//router api để lấy tasks
router.get('/tasksapi', TaskToDay.getTasksToDay);
router.get('/tasksapi/generateid', TaskToDay.handleGenerateId);
//router api để tạo task
router.post('/tasksapi', TaskToDay.handleCreateTask);
//router api để xóa task
router.delete('/tasksapi/:id', TaskToDay.handleDeleteTask);
//router api để update task
router.patch('/tasksapi/:id', TaskToDay.handleUpdateTask);

//router api để lấy task detail
router.get('/tasksapi/:id', TaskToDay.readTasksDetail);
//router api để tạo task detail
router.post('/tasksapi/:id', TaskToDay.handleCreateTaskDetail);
//router api để xóa 1 task detail
router.delete('/tasksapi/detail/:id/', TaskToDay.handleDeleteTaskDetail);
//router api để update status 1 task detail
router.patch('/tasksapi/detail/:id/', TaskToDay.handleUpdateTaskDetail);
module.exports = router;