const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
    unique: true,
  },
  studentRegistrationNumber: {
    type: String,
    required: true,
  },
  studentDob: {
    type: Date,
    required: true,
  },
  studentYear: {
    type: Number,
    required: true,
  },
  studentDepartment: {
    type: String,
    required: true,
  },
  studentSection: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
  },
  studentBatch: {
    type: Number,
    required: true,
  },
  studentGender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  studentContactNumber: {
    type: Number,
    unique: true,
  },
  studentAadharNumber: {
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
