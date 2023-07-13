const express = require('express');
const router = express.Router();
const MyDate = require('../controllers/MyDate.controller');

router.get('/', (req, res) => {
    res.render('mydate');
})
router.get('/mydateapi', MyDate.handleReadTask);
router.delete('/mydateapi/:id', MyDate.handDeleteTask);
router.post('/mydateapi', MyDate.handleCreateTask);
router.patch('/mydateapi/:id', MyDate.handleUpdateTask);
module.exports = router;