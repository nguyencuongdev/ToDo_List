const express = require('express');
const router = express.Router();
const MyDateController = require('../controllers/MyDate.controller');

//router hiển thị trang mydate
router.get('/', (req, res) => {
    res.render('mydate', { title: 'mydate', active: 'active' });
})
//router hiển thị trang detail từ trang mydate
router.get('/detail/:id', MyDateController.handleShowTaskDetail);


//router API

//router api để lấy tasks
router.get('/tasksapi', MyDateController.handleReadTask);
//router api để tạo task
router.post('/tasksapi', MyDateController.handleCreateTask);
//router api để xóa task
router.delete('/tasksapi/:id', MyDateController.handleDeleteTask);
//router api để update task
router.patch('/tasksapi/:id', MyDateController.handleUpdateTask);

//router api để lấy task detail
router.get('/tasksapi/:id', MyDateController.readTasksDetail);
//router api để tạo task detail
router.post('/tasksapi/:id', MyDateController.handleCreateTaskDetail);
//router api để xóa 1 task detail
router.delete('/tasksapi/detail/:id/', MyDateController.handleDeleteTaskDetail);
//router api để update status 1 task detail
router.patch('/tasksapi/detail/:id/', MyDateController.handleUpdateTaskDetail);
module.exports = router;