const express = require('express');
const router = express.Router();
const MyDate = require('../controllers/MyDate.controller');

router.get('/', (req, res) => {
    res.render('mydate');
})
router.get('/mydateapi', MyDate.handleReadTask);

router.post('/mydateapi', MyDate.handleCreateTask);

router.delete('/mydateapi/:id', MyDate.handDeleteTask);

router.patch('/mydateapi/:id', MyDate.handleUpdateTask);

router.get('/mydateapi/:id', MyDate.readTasksDetail);
module.exports = router;