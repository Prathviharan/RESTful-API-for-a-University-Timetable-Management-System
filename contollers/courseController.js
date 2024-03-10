const course = require('../model/course');
const course = require('../model/course');

//create new course
exports.createcourse = async(req,res) => {
    try{
        const {
            name,
            code,
            description,
            credits
        } = req.body;

        const newcourse = new course({name,code,description,credits});
        await newcourse.save();

        res.status(201)({
            message: 'Course created!!',
            course: newcourse
        });
    }catch(error){
        res.status(500).json({
            message:'Failed to Create',
            error
        });
    }
};

//get all course
exports.getallcourse = async(req,res) => {
    try{
        const course = await course.find();
        res.status(200).json({course});
    }catch (error){
        res.status(500).json({
            message: 'Not get all Courses',error
        });
    }
};

//get course by ID
exports.getcoursebyID = async(req,res) => {
    try{
        const course = await course.findById(req.params.id);
        if(!course){
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        res.status(200).json({course});
    }catch (error){
        res.status(500).json({
            message: 'Not find Course',error
        });
    }
};

//update course
exports.updatecoursebyID = async(req,res) => {
    try{
        const {
            name,
            code,
            description,
            credits
        } = req.body;

        const course = await course.findByIdAndUpdate(req.params.id,
            {name,code,description,credits},{new : true});
        if(!course){
            return res.status(404).json({
                message: 'Course not found'
        });
        }
        res.status(200).json({message: 'Course updated!!',course});
    }catch(error){
        res.status(500).json({
            message:'Failed to Update',error
        });
    }
};

//delete course
exports.deletecoursebyID = async(req,res) => {
    try{
        const course = await course.findByIdAndDelete(req.params.id);
        if(!course){
            return res.status(404).json({
                message: 'Course not found'
        });
        }
        res.status(200).json({message: 'Course Deleted!!',course});
    }catch(error){
        res.status(500).json({
            message:'Failed to Delete',error
        });
    }
};