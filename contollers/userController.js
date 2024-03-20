const user = require('../model/user');

//create user
exports.createuser = async (req,res) => {
    try{
        const user = new user(req.body);
        await user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({message: 'Invalid request'})
    }
};

//get all user
exports.getallusers = async(req,res) => {
    try{
        const user = await user.find();
        res.status(200).json({message: 'all users',user});
    }catch (error){
        res.status(500).json({
            message: 'Not get all Users',error
        });
    }
};

//get user by ID
exports.getuserbyID = async(req,res) => {
    try{
        const user = await user.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message: 'user not found'
            });
        }
        res.status(200).json({message: 'user',user});
    }catch (error){
        res.status(500).json({
            message: 'Not find user',error
        });
    }
};

//update user
exports.updateuser = async(req,res) => {
    try{
        const user = await user.findByIdAndUpdate(req.params.id,req.body,{new : true});
        if(!user){
            return res.status(404).json({
                message: 'user not found'
        });
        }
        res.status(200).json({message: 'user updated!!',user});
    }catch(error){
        res.status(500).json({
            message:'Failed to Update',error
        });
    }
};

//delete user
exports.deleteuserbyID = async(req,res) => {
    try{
        const user = await user.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({
                message: 'user not found'
        });
        }
        res.status(200).json({message: 'user Deleted!!',user});
    }catch(error){
        res.status(500).json({
            message:'Failed to Delete',error
        });
    }
};