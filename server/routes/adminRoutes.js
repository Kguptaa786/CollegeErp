const express = require("express");
const router = express.Router();
const { addStudent } = require("../controllers/admincontroller");

router.post("/addStudent", addStudent);

module.exports = router;
