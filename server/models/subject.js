const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  totalLectures: {
    type: Number,
  },
  department: {
    type: String,
  },
  year: {
    type: String,
  },
});

const Subject = new mongoose.model("Subject", subjectSchema);
module.exports = Subject;
