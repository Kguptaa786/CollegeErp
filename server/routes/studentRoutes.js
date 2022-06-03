const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  studentLogin,
  allStudents,
  forgetPassword,
  postOTP,
  updateProfile,
  updatePassword,
  getMarks,
  getAllSubjects,
  getStudentDetail,
  saveCurrentMessage,
  getMsg,
} = require("../controllers/studentcontroller");

router.post("/", studentLogin);

router.post("/student/students", allStudents);

router.get("/student/:registrationNumber", getStudentDetail);

router.get("/getMsg", getMsg);

// router.post("/student/students/saveCurrentMessage", saveCurrentMessage);

// router.post("/forgotPassword", forgotPassword);

// router.post("/postOTP", postOTP);

// router.post(
//   "/updateProfile",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("avatar"),
//   updateProfile
// );

// router.post(
//   "/updatePassword",
//   passport.authenticate("jwt", { session: false }),
//   updatePassword
// );

// router.get(
//   "/getMarks",
//   passport.authenticate("jwt", { session: false }),
//   getMarks
// );

// router.get(
//   "/getAllSubjects",
//   passport.authenticate("jwt", { session: false }),
//   getAllSubjects
// );

// router.get(
//   "/checkAttendence",
//   passport.authenticate("jwt", { session: false }),
//   checkAttendence
// );

module.exports = router;
