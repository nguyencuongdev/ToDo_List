const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
})
router.use('/login', require('./login.router'));
router.use('/signup', require('./signup.router'));
router.use('/mydate', require('./tasktoday.router'));
router.use('/taskimportant', require('./taskImportant.router'));
router.use('/alltasks', require('./alltasks.router'));
module.exports = router;