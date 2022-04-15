const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  year: {
    type: Number,
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
  batch: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    unique: true,
  },
  aadharNumber: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
