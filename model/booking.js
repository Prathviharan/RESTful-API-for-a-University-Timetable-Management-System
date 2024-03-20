const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    starttime: {
        type: Date,
        required: true
    },
    endtime : {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('booking',bookingSchema);