const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  studentLogin,
  allStudents,
  getStudentDetail,
  attendanceStatus,
  getPrivateChat,
  postPrivateChat,
  subjectList,
  testPerformance,
  updatePassword,
} = require("../controllers/studentcontroller");

router.post("/studentLogin", studentLogin);

router.post(
  "/student/students",
  passport.authenticate("jwt", { session: false }),
  allStudents
);

router.get(
  "/student/subjectList",
  passport.authenticate("jwt", { session: false }),
  subjectList
);

router.get(
  "/student/attendanceStatus",
  passport.authenticate("jwt", { session: false }),
  attendanceStatus
);

router.get(
  "/student/testPerformance",
  passport.authenticate("jwt", { session: false }),
  testPerformance
);

router.post(
  "/student/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

router.get("/student/:registrationNumber", getStudentDetail);

router.get("/student/chat/:roomId", getPrivateChat);

router.post("/student/chat/:roomId", postPrivateChat);

module.exports = router;
