const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
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
  dob: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  gender: {
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
    required: true,
  },
  contactNumber: {
    type: Number,
  },
});

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
