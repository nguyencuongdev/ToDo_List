const express = require('express');
const router = express.Router();
const MyDateController = require('../controllers/MyDate.controller');

router.get('/', (req, res) => {
    res.render('mydate', { title: 'mydate', active: 'active' });
})
router.get('/tasksapi', MyDateController.handleReadTask);

router.post('/tasksapi', MyDateController.handleCreateTask);
router.post('/tasksapi/:id', MyDateController.handleCreateTaskNext);

router.delete('/tasksapi/:id', MyDateController.handleDeleteTask);

router.patch('/tasksapi/:id', MyDateController.handleUpdateTask);

router.get('/tasksapi/:id', MyDateController.readTasksDetail);
module.exports = router;