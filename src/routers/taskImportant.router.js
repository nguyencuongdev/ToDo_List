const router = require('express').Router();
const TaskImportantController = require('../controllers/TaskImportant.controller');

router.get('/', (req, res) => {
    res.status(200).render('taskImportant', { title: 'important', active: 'active' });
});

router.get('/tasksapi', TaskImportantController.getTaskImportant);

module.exports = router;