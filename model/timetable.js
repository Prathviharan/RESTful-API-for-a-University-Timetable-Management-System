const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    code:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'course',
        required: true
    },

    sessions:[{
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        location: {
            type: String,
            required: true
        },
    }]
});

module.exports = mongoose.model('timetable',timetableSchema);