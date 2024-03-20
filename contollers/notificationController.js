const notification = require('../model/notification');

//send notification
exports.sendnotification = async (res,req) => {
    try{
        const { type,message, recipient } = req.body;
        const notification = new Notification({type,message,recipient});
        await notification.save();
        res.status(201).json({message : 'Notification Sent...',notification});
    }catch(error){
        res.status(500).json({message: 'Notification not Send',error});
    }
};

//send alert
exports.sendalert = async (req,res) => {
    try{
        const{userId,alerttype,message} = req.body;

        let notificationmessage = "";
        switch(alerttype){
            case "timetable":
                notificationmessage = `Timetable has been upadted : ${message}`;
                break;
            case "room":
                notificationmessage = `Room has been changed : ${message}`;
                break;
            case "announcement":
                notificationmessage = `Announcement : ${message}`;
                break;
            default:
                notificationmessage = message;

            console.log(`sending ${alerttype} alert to ${userId} - message ${notificationmessage}`);
            res.status(200).json({message: `${alerttype} successfully Sent`});
        }
    }catch(error){
        console.error(`Failed to send ${alerttype}`,error);
        res.status(500).json({message: `Failed to send ${alerttype}`,error});
    }
};