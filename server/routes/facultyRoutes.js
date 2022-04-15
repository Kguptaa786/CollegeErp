const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  facultyLogin,
  updatePassword,
  updateProfile,
  markAttendence,
  uploadMarks,
  forgotPassword,
  postOTP,
} = require("../controller/facultyController");

router.post("/login", facultyLogin);

router.post("/updatePassword", updatePassword);

router.post(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

router.post(
  "/markAttendence",
  passport.authenticate("jwt", { session: false }),
  markAttendence
);

router.post(
  "/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

router.post(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  updateProfile
);

router.post(
  "/forgotPassword",
  passport.authenticate("jwt", { session: false }),
  forgotPassword
);

router.post("/postOTP", postOTP);

module.exports = router;
