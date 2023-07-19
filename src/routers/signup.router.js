const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/Signup.controller');

router.get('/', SignupController.showView);

router.post('/', SignupController.handleCreateAccount);
module.exports = router;