const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    code:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'course',
        required: true
    },

    sessions:[{
        date: {
            type: Date,
            required: true
        },
        time: {
            type: Date,
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