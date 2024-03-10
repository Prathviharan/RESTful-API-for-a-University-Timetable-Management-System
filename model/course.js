const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    credits: {
        type: String,
        required: true
    },
    //refer the user
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('course',courseSchema);