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
} = require("../controllers/admincontroller");

router.post("/adminLogin", adminLogin);

router.post("/admin/addAdmin", addAdmin);

router.post("/admin/addFaculty", addFaculty);

router.post("/admin/addStudent", addStudent);

router.post("/admin/addSubject", addSubject);

router.post("/admin/allStudents", getAllStudent);

router.post("/admin/allFaculties", getAllFaculty);

router.post("/admin/allSubjects", getAllSubject);

// router.post("/admin/allFaculties", postAllFaculty);

// router.post(
//   "/getStudents",
//   passport.authenticate("jwt", { session: false }),
//   getStudents
// );

// router.post(
//   "/addStudent",
//   passport.authenticate("jwt", { session: false }),
//   addStudent
// );

// router.post(
//   "/getFaculty",
//   passport.authenticate("jwt", { session: false }),
//   addSubject
// );
// router.get(
//   "/getSubjects",
//   passport.authenticate("jwt", { session: false }),
//   getAllSubjects
// );
module.exports = router;
