const enrollment = require('../model/enrollment');

//students enrollment
exports.enrollincourse = async (req,res) => {
    try{
        const {courseID} = req.body;
        const userID = req.userID;
        const enrollment = new enrollment({courseID,userID});
        await enrollment.save();
        res.status(201).json({message: 'Enrolled to Course...',enrollment});
    }catch(error){
        res.status(500).json({message: 'Enrollment is Failled!!!',error})
    }
};

//view all enrollments by faculty & admin
exports.getallenrollments = async (req,res) => {
    try{
        const enrollments = await enrollment.find();
        res.status(200).json(enrollments);
    }
    catch(error){
        res.status(500).json({message: 'Failled to get all Enrollments!!!',error})
    }
};

//view enrollment by student
exports.getstudentenrollments = async (req,res) => {
    try{
        const userID = req.userID;
        const enrollments = await enrollment.find({userID});
        res.status(200).json(enrollments);
    }
    catch(error){
        res.status(500).json({message: 'Failled to get Enrollments!!!',error})
    }
};

//delete enrollment of student(admin)
exports.deleteenrollment = async (req,res) => {
    try{
        const {enrollmentID}= req.params;
        await enrollment.findByIdAndDelete(enrollmentID);
        res.status(200).json({message: 'Enrollment Deleted'});
    }
    catch(error){
        res.status(500).json({message: 'Failled to Delete Enrollments!!!',error})
    }
};