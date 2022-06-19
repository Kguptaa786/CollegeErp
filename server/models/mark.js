const mongoose = require("mongoose");
const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  exam: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  year: {
    type: String,
  },
  section: {
    type: String,
  },
  mark: {
    type: Number,
    default: 0,
  },
  totalMark: {
    type: Number,
    default: 100,
  },
});

const Mark = new mongoose.model("Mark", markSchema);
module.exports = Mark;
