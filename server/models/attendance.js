const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  totalLecture: {
    type: Number,
    default: 0,
  },
  lectureAttended: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
});

const Attendance = new mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
