const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/Signup.controller');

router.get('/', SignupController.getIndex);
module.exports = router;