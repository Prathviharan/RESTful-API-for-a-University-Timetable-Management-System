const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    notifytime: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Notification',notificationSchema);