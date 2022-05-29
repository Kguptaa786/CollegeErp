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
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  joiningYear: {
    type: Number,
  },
  department: {
    type: String,
  },
  dob: {
    type: String,
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
