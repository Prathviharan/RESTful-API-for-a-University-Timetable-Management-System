const express = require('express');
const router = express.Router()
module.exports = router;
//model
const model = require('../model/model');


//Post
router.post('/post',async (req,res) => {
    const data = new model({
        name: req.body.name,
        age: req.body.age
    })
    //msg success or error
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})//postman not show data and mongodb also

//get all
router.get('/getAll',async(req,res) => {
    try{
        const data = await model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
})

//get by ID
router.get('/getOne/:id',async(req,res) => {
    try{
        const data = await model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//update by ID
router.patch('/update/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await model.findByIdAndUpdate(
            id,updatedData,options
        )
        res.send(result)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//delete by ID
router.delete('/delete:id', async(req,res) => {
    try{
        const id = req.params.id;
        const data = await model.findByIdAndDelete(id)
        res.send(`${data.name} has been deleted`)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})//not working
