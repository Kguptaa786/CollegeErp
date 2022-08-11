const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema({
  roomId: {
    type: String,
  },
  senderRegistrationNumber: {
    type: String,
  },
  receiverRegistrationNumber: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Conversation = new mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
