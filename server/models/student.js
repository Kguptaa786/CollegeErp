const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  batch: {
    type: Number,
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
  fatherName: {
    type: String,
  },
  fatherContactNumber: {
    type: String,
  },
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
