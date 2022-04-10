const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    senderName: {
        type: String
    },
    receiverName: {
        type: String
    },
    senderRegistrationNumber: {
        type: String
    },
    receiverRegistrationNumber: {
        type: String
    },
    message:{
        type:String,
    },
    
})

const Message=new mongoose.model('Message',messageSchema);
module.exports=Message;