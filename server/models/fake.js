const mongoose = require("mongoose");
const fakeSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  message: {
    type: String,
  },
  room: {
    type: String,
  },
});

const Fake = new mongoose.model("Fake", fakeSchema);
module.exports = Fake;
