const express = require('express');
const router = express.Router();
const courseController = require('../contollers/courseController');

const {verifyTokenAndRole} = require('../contollers/authController');

//create new course
router.post('/',verifyTokenAndRole(['admin']),courseController.createcourse);

//get all course
router.get('/',courseController.getallcourse);

//get single course by ID
router.get('/:id',courseController.getcoursebyID);

//update course by ID
router.put('/:id',verifyTokenAndRole(['admin']), courseController.updatecoursebyID);

//delete course by ID
router.delete('/:id',verifyTokenAndRole(['admin']),courseController.deletecoursebyID);

module.exports = router;