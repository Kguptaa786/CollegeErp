const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  addStudent,
  addAdmin,
  adminLogin,
  getAllStudent,
  addFaculty,
  getAllFaculty,
} = require("../controllers/admincontroller");

router.post("/login", adminLogin);
router.post("/addAdmin", addAdmin);
router.post(
  "/getStudents",
  passport.authenticate("jwt", { session: false }),
  getStudents
);
router.post(
  "/getAllStudent",
  passport.authenticate("jwt", { session: false }),
  getAllStudent
);
router.post(
  "/addStudent",
  passport.authenticate("jwt", { session: false }),
  addStudent
);
router.post(
  "/addFaculty",
  passport.authenticate("jwt", { session: false }),
  addFaculty
);
router.get(
  "/getAllFaculty",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);
router.post(
  "/addSubject",
  passport.authenticate("jwt", { session: false }),
  addSubject
);
router.get(
  "/getAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);
router.post(
  "/getFaculty",
  passport.authenticate("jwt", { session: false }),
  addSubject
);
router.get(
  "/getSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
module.exports = router;
