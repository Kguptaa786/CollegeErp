const express = require("express");
const router = express.Router();
const { addStudent } = require("../controllers/admincontroller");

router.get("/addStudent", addStudent);

module.exports = router;
