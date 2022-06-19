const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  senderName: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  senderRegistrationNumber: {
    type: String,
  },
  receiverRegistrationNumber: {
    type: String,
  },
  roomId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
