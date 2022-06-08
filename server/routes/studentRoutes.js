const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  studentLogin,
  allStudents,
  getStudentDetail,
  attendanceStatus,
  getMsg,
  subjectList,
  testPerformance,
} = require("../controllers/studentcontroller");

router.post("/", studentLogin);

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
  "student/testPerformace",
  passport.authenticate("jwt", { session: false }),
  testPerformance
);

router.get(
  "/student/:registrationNumber",
  passport.authenticate("jwt", { session: false }),
  getStudentDetail
);

router.get("/getMsg", getMsg);

module.exports = router;
