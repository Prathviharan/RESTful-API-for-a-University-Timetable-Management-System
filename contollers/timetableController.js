const timetable = require('../model/timetable');
const course = require('../model/course');

//create session
exports.createsession = async(req,res) => {
    try{
        const {code,day,time,faculty,location} = req.body;
        const timetable = await timetable.findOne({code});

        if(!timetable)
        {
            return res.status(404).json({message: 'Not Found TimeTable'})
        }

        timetable.sessions.push({day,time,faculty,location});
        await timetable.save();
        res.status(201).json({message: 'Session Created!!', timetable});
    }catch(error){
        res.status(500).json({message: 'Failed to create session', error});
    }
};

//update session
exports.updatesession = async(req,res) => {
    try{
        const {day,time,faculty,location} = req.body;
        const timetable = await timetable.findOneAndUpdate(
            {'sessions.id': req.params.sessionsid},
            {$set: {
                'sessions.$.day':day,
                'sessions.$.time': time,
                'sessions.$.faculty': faculty,
                'sessions.$.location': location
            }},
            {new: true}
        );

        if(!timetable)
        {
            return res.status(404).json({message: 'Session Not Found '})
        }
        res.status(200).json({message: 'Session Updated!!', timetable});
    }catch(error){
        res.status(500).json({message: 'Failed to update session', error});
    }
};

//delete session
exports.deletesession = async(req,res) => {
    try{
        const timetable = await timetable.findOneAndDelete(
            {'sessions.id': req.params.sessionsid},
            {$pull:{
                sessions: {
                    id: req.params.sessionsid
                }
            }},
            {new: true}
        );

        if(!timetable)
        {
            return res.status(404).json({message: 'Session Not Found '})
        }
        res.status(200).json({message: 'Session Deleted!!', timetable});
    }catch(error){
        res.status(500).json({message: 'Failed to delete session', error});
    }
};