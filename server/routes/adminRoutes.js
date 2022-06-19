const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  addStudent,
  addAdmin,
  adminLogin,
  addSubject,
  getAllStudent,
  addFaculty,
  getAllFaculty,
  getAllSubject,
  updatePassword,
} = require("../controllers/admincontroller");

router.post("/adminLogin", adminLogin);

router.post(
  "/admin/addAdmin",
  passport.authenticate("jwt", { session: false }),
  addAdmin
);

router.post(
  "/admin/addFaculty",
  passport.authenticate("jwt", { session: false }),
  addFaculty
);

router.post(
  "/admin/addStudent",
  passport.authenticate("jwt", { session: false }),
  addStudent
);

router.post(
  "/admin/addSubject",
  passport.authenticate("jwt", { session: false }),
  addSubject
);

router.post(
  "/admin/allStudents",
  passport.authenticate("jwt", { session: false }),
  getAllStudent
);

router.post(
  "/admin/allFaculties",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);

router.post(
  "/admin/allSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubject
);

router.post(
  "/admin/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

module.exports = router;
