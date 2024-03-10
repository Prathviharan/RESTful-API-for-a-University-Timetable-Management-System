const express = require('express');
const router = express.Router();
const authcontroller = require('../contollers/authController');

//user login
router.post ('/login',authcontroller.login);

//user logout
router.post('/logout',authcontroller.logout);

module.exports = router;