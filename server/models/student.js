const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    enum: ["A", "B", "C"],
  },
  batch: {
    type: Number,
    required: true,
  },
  studentGender: {
    type: String,
    enum: ["male", "female", "other"],
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
