const express = require('express');
const router = express.Router();
const MyDate = require('../controllers/MyDate.controller');

router.get('/', (req, res) => {
    res.render('mydate');
})
router.get('/mydateapi', MyDate.getIndex);
router.delete('/mydateapi/:id', MyDate.handDeleteTask);
router.post('/mydateapi', MyDate.handleCreateTask);
router.patch('/mydateapi/:id', MyDate.handleUpdateTaskStatus);
module.exports = router;