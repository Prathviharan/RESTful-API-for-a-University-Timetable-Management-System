const express = require('express');
const router = express.Router();
const courseController = require('../contollers/timetableController');

//middleware
const {verifyTokenAndRole} = require('../contollers/authController');
const timetable = require('../model/timetable');

//create new course
router.post('/:code/session',verifyTokenAndRole(['admin']),timetableContoller.createsession);

//update course by ID
router.put('/session/:sessionid',verifyTokenAndRole(['admin']), timetableContoller.updatesession);

//delete course by ID
router.delete('/session/:sessionid',verifyTokenAndRole(['admin']),timetableContoller.deletesession);

module.exports = router;