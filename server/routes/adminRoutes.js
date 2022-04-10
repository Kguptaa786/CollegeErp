const express = require('express')
const router = express.Router();
const {addStudent}=require('../controllers/admincontroller');

router.get('admin/addStudent',addStudent);
module.exports = router;