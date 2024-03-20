const booking = require('../model/booking');

//create new booking
exports.createbooking = async (res,req) => {
    try{
        const{roomID,date,starttime,endtime} = req.body;
        //overlaps checker
        const overlapbooking = await booking.findOne({
            roomID,
            $or: [
                //check new booking overlap with existing
                //start time of existing booking > than proposed booking
                {starttime: { $lt: endtime}},

                //end time of existing booking < than propoesd booking
                {endtime: { $gt: starttime }},

                //if existing booking starts during new booking
                //start time of an existing booking  >= than start time of proposed booking and < end time of propesd booking
                {starttime: { $gte: starttime, $lt:endtime }},

                //if existing booking ends during new booking
                 //end time of an existing booking  > than start time of proposed booking and <= end time of propesd booking
                {endtime: { $gt:starttime, $lte: endtime}}
            ]

        });
        if(overlapbooking){
            return res.status(400).json({message: 'Booking Overlap...'});
        }

        //new booking created
        const newbooking = new booking({
            roomID,
            userID: req.userID,
            starttime,
            endtime
        });
        await newbooking.save();
        res.status(201).json({message: 'Booking Created', booking: newbooking});
    }catch(error){
        res.status(500).json({message: 'Failed to Create',error});
    }
};

//get all bookings
exports.getallbookings = async(req,res) => {
    try{
        const bookings = await booking.find();
        res.status(200).json({bookings});
    }catch(error){
        res.status(500)({message: 'not get all bookings',error});
    }
};

//get booking by ID
exports.getbookingbyID = async(res,req) => {
    try{
        const booking = await booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({message : 'Booking not Found'});
        }
        res.status(200).json({booking});
    }catch(error){
        res.status(500).json({message: 'Failed to get booking',error});
    }
};

//update can make conflict in the timetable

//delete booking by ID
exports.deletebookingbyID = async(res,req) => {
    try{
        const booking = await booking.findByIdAndDelete(req.params.id);
        if(!booking){
            return res.status(404).json({message : 'Booking not Found'});
        }
        res.status(200).json({message: 'Booking deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'Failed to delete',error});
    }
};