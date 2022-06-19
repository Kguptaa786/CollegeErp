const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  totalLectures: {
    type: Number,
    default: 10,
  },
  year: {
    type: String,
  },
  attendance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attandance",
  },
});

const Subject = new mongoose.model("Subject", subjectSchema);
module.exports = Subject;
