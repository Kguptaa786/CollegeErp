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

router.post("/faculty/markAttendance", markAttendance);
router.post("/faculty/markAttendanceHelper", markAttendanceHelper);
router.post("/faculty/uploadMarks", uploadMarks);
router.post("/faculty/uploadMarksHelper", uploadMarksHelper);

// router.post("/facultyLogin", facultyLogin);

// router.post("/updatePassword", updatePassword);

// router.post(
//   "/updateProfile",
//   passport.authenticate("jwt", { session: false }),
//   updateProfile
// );

// router.post\(
//   "/uploadMarks",
//   passport.authenticate("jwt", { session: false }),
//   uploadMarks
// );

// router.post(
//   "/updateProfile",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("avatar"),
//   updateProfile
// );

// router.post(
//   "/forgotPassword",
//   passport.authenticate("jwt", { session: false }),
//   forgotPassword
// );

// router.post("/postOTP", postOTP);

module.exports = router;
