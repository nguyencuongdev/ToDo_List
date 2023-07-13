const express = require('express');
const router = express.Router();
const MyDate = require('../controllers/MyDate.controller');

router.get('/', (req, res) => {
    res.render('mydate');
})
router.get('/mydateapi', MyDate.getIndex);
router.post('/', MyDate.createTask);

module.exports = router;