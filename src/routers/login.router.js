const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/Login.controller');
router.get('/', LoginController.getIndex);

module.exports = router;