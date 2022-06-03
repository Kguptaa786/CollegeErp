const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  facultyLogin,
  updatePassword,
  updateProfile,
  markAttendance,
  markAttendanceHelper,
  uploadMarks,
  uploadMarksHelper,
  forgotPassword,
  postOTP,
} = require("../controllers/facultycontroller");

router.post("/", facultyLogin);

router.post("/faculty/markAttendance", markAttendance);

router.post("/faculty/markAttendanceHelper", markAttendanceHelper);

router.post("/faculty/uploadMarks", uploadMarks);

router.post("/faculty/uploadMarksHelper", uploadMarksHelper);

module.exports = router;
