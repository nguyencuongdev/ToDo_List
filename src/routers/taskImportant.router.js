const router = require('express').Router();
const TaskImportantController = require('../controllers/TaskImportant.controller');

//router hiển thị trang taskImportant
router.get('/', (req, res) => {
    res.status(200).render('taskImportant', { title: 'important', active: 'active' });
});

//router hiển thị trang detail từ trang mydate
router.get('/detail/:id', TaskImportantController.handleShowTaskDetail);

// router API
//router api để lấy tasks important
router.get('/tasksapi', TaskImportantController.getTasksImportant);
router.post('/tasksapi', TaskImportantController.handleCreateTask)
router.get('/tasksapi/generateid', TaskImportantController.handleGenerateId);
router.patch('/tasksapi/:id', TaskImportantController.handleUpdateTask);
router.delete('/tasksapi/:id', TaskImportantController.handleDeleteTask);

//router api để lấy task detail
router.get('/tasksapi/:id', TaskImportantController.readTasksDetail);
//router api để tạo task detail
router.post('/tasksapi/:id', TaskImportantController.handleCreateTaskDetail);
//router api để xóa 1 task detail
router.delete('/tasksapi/detail/:id/', TaskImportantController.handleDeleteTaskDetail);
//router api để update status 1 task detail
router.patch('/tasksapi/detail/:id/', TaskImportantController.handleUpdateTaskDetail);
module.exports = router;