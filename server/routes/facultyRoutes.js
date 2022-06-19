const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  facultyLogin,
  updatePassword,
  markAttendance,
  markAttendanceHelper,
  uploadMarks,
  uploadMarksHelper,
} = require("../controllers/facultycontroller");

router.post("/facultyLogin", facultyLogin);

router.post(
  "/faculty/markAttendance",
  passport.authenticate("jwt", { session: false }),
  markAttendance
);

router.post("/faculty/markAttendanceHelper", markAttendanceHelper);

router.post(
  "/faculty/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

router.post("/faculty/uploadMarksHelper", uploadMarksHelper);

router.post(
  "/faculty/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

module.exports = router;
