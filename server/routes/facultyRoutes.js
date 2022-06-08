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

router.post(
  "/faculty/markAttendance",
  passport.authenticate("jwt", { session: false }),
  markAttendance
);

router.post(
  "/faculty/markAttendanceHelper",
  passport.authenticate("jwt", { session: false }),
  markAttendanceHelper
);

router.post(
  "/faculty/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

router.post(
  "/faculty/uploadMarksHelper",
  passport.authenticate("jwt", { session: false }),
  uploadMarksHelper
);

module.exports = router;
