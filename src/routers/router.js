const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
})
router.use('/login', require('./login.router'));
router.use('/signup', require('./signup.router'));
router.use('/mydate', require('./mydate.router'));
router.use('/taskimportant', require('./taskImportant.router'));
module.exports = router;