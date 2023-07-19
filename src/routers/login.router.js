const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/Login.controller');
router.get('/', LoginController.showView);

module.exports = router;