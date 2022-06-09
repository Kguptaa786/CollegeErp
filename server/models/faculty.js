const mongoose = require("mongoose");
const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  joiningYear: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  aadharNumber: {
    type: Number,
  },
});

const Faculty = new mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
