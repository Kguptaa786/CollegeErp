const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const Admin = require("../models/admin");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Subject = require("../models/subject");

const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
  adminLogin: async (req, res, next) => {
    try {
      //validation needed
      const { registrationNumber, password } = req.body;

      if (!registrationNumber || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      }

      const admin = await Admin.findOne({ registrationNumber });

      if (!admin) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" });
      }

      const isCorrect = await bcrypt.compareSync(password, admin.password);

      if (!isCorrect) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" }); //validation needed
      }

      const payload = {
        registrationNumber: admin.registrationNumber,
        id: admin._id,
        email: admin.email,
        dob: admin.dob,
        department: admin.department,
        name: admin.name,
        contactNumber: admin.contactNumber,
        avatar: admin.avatar,
        gender: admin.gender,
        joiningYear: admin.joiningYear,
      };

      const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });
      return res.status(200).send({
        success: true,
        message: "Successfully Logged in",
        token: "Bearer " + token,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addAdmin: async (req, res, next) => {
    try {
      const { name, dob, email, gender, contactNumber, department } = req.body;
      if (!name || !dob || !email || !department) {
        return res
          .status(400)
          .send({ success: false, message: "Some data fields are empty" });
      }

      const if_already_present = await Admin.findOne({ email });

      if (if_already_present) {
        return res
          .staus(400)
          .send({ success: false, message: "Email already existing" });
      }

      //regisration number generating

      let departmentHelper;

      if (department === "CE") {
        departmentHelper = "01";
      } else if (department === "CSE") {
        departmentHelper = "02";
      } else if (department === "ECE") {
        departmentHelper = "03";
      } else if (department === "EE") {
        departmentHelper = "04";
      } else if (department === "ME") {
        departmentHelper = "05";
      } else if (department === "MME") {
        departmentHelper = "06";
      } else if (department === "CHEM") {
        departmentHelper = "07";
      }

      const admins = await Admin.find({ department });
      const len = admins.length + 1;
      const joiningYear = new Date(Date.now()).getFullYear();

      let helper;
      if (admins.length < 10) {
        helper = "00" + len.toString();
      } else if (admins.length < 100 && admmins.length > 9) {
        helper = "0" + len.toString();
      } else {
        helper = len.toString();
      }

      const registrationNumber =
        "ADM" + joiningYear.toString() + departmentHelper + helper;

      const hashedPassword = await bcrypt.hash(dob, 4);

      const newAdmin = await new Admin({
        name,
        email,
        gender,
        dob,
        registrationNumber: registrationNumber,
        joiningYear,
        department,
        contactNumber,
        password: hashedPassword,
      });
      await newAdmin.save();
      return res
        .status(200)
        .send({ success: true, message: "Admin added successfully" });
    } catch (err) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    }
  },

  addStudent: async (req, res, next) => {
    try {
      const {
        name,
        email,
        dob,
        year,
        department,
        section,
        gender,
        contactNumber,
        aadharNumber,
        fatherContactNumber,
        fatherName,
      } = req.body;

      if (!name || !dob || !email || !department || !year || !section) {
        return res
          .status(400)
          .send({ success: false, message: "Some data fields are empty" });
      }

      const if_already_present = await Student.findOne({ email });

      if (if_already_present) {
        return res
          .staus(400)
          .send({ success: false, message: "Email already existing" });
      }

      let departmentHelper;

      if (department === "CE") {
        departmentHelper = "01";
      } else if (department === "CSE") {
        departmentHelper = "02";
      } else if (department === "ECE") {
        departmentHelper = "03";
      } else if (department === "EE") {
        departmentHelper = "04";
      } else if (department === "ME") {
        departmentHelper = "05";
      } else if (department === "MME") {
        departmentHelper = "06";
      } else if (department === "CHEM") {
        departmentHelper = "07";
      }

      const students = await Student.find({ department });
      const len = students.length + 1;
      const batch = new Date(Date.now()).getFullYear().toString();

      let helper;
      if (students.length < 10) {
        helper = "00" + len.toString();
      } else if (students.length < 100 && students.length > 9) {
        helper = "0" + len.toString();
      } else {
        helper = len.toString();
      }

      const registrationNumber =
        "STU" + batch.toString() + departmentHelper + helper;

      const hashedPassword = await bcrypt.hash(dob, 4);
      const newStudent = await new Student({
        name,
        email,
        password: hashedPassword,
        registrationNumber: registrationNumber,
        dob,
        year,
        department,
        section,
        batch,
        gender,
        fatherContactNumber,
        fatherName,
        contactNumber,
        aadharNumber,
      });
      await newStudent.save();
      return res
        .status(200)
        .send({ success: true, message: "Student added successfully..." });
    } catch (e) {
      console.log(e);
    }
  },

  addSubject: async (req, res, next) => {
    try {
      const { name, subjectCode, totalLectures, department, year } = req.body;

      if (!name || !subjectCode || !department || !year) {
        return res
          .status(400)
          .send({ success: false, message: "All field required" });
      }

      const code = await Subject.findOne({ subjectCode });
      if (code) {
        return res.status(404).send({ message: "already present" });
      }

      const newSubject = await new Subject({
        name,
        subjectCode,
        totalLectures,
        department,
        year,
      });
      await newSubject.save();
      res
        .status(200)
        .send({ success: true, message: "Subject Added Successfully" });
    } catch (e) {
      console.log(e);
    }
  },

  addFaculty: async (req, res, next) => {
    try {
      const {
        name,
        email,
        designation,
        department,
        dob,
        gender,
        contactNumber,
        aadharNumber,
      } = req.body;

      if (!name || !dob || !email || !department) {
        return res
          .status(400)
          .send({ success: false, message: "Some data fields are empty" });
      }

      const if_already_present = await Faculty.findOne({ email });

      if (if_already_present) {
        return res
          .staus(400)
          .send({ success: false, message: "Email already existing" });
      }

      let departmentHelper;

      if (department === "CE") {
        departmentHelper = "01";
      } else if (department === "CSE") {
        departmentHelper = "02";
      } else if (department === "ECE") {
        departmentHelper = "03";
      } else if (department === "EE") {
        departmentHelper = "04";
      } else if (department === "ME") {
        departmentHelper = "05";
      } else if (department === "MME") {
        departmentHelper = "06";
      } else if (department === "CHEM") {
        departmentHelper = "07";
      }

      const faculties = await Faculty.find({ department });
      const len = faculties.length + 1;
      const joiningYear = new Date(Date.now()).getFullYear().toString();

      let helper;
      if (faculties.length < 10) {
        helper = "00" + len.toString();
      } else if (faculties.length < 100 && faculties.length > 9) {
        helper = "0" + len.toString();
      } else {
        helper = len.toString();
      }

      const registrationNumber =
        "FAC" + joiningYear.toString() + departmentHelper + helper;

      const hashedPassword = await bcrypt.hash(dob, 4);

      const newFaculty = await new Faculty({
        name,
        email,
        password: hashedPassword,
        registrationNumber: registrationNumber,
        dob,
        joiningYear,
        designation,
        department,
        gender,
        contactNumber,
        aadharNumber,
      });
      await newFaculty.save();
      return res
        .status(200)
        .send({ success: true, message: "Faculty Added Successfully" });
    } catch (e) {
      console.log(e);
    }
  },

  getAllStudent: async (req, res) => {
    try {
      const { department, year } = req.body;
      const students = await Student.find({ department, year });

      if (students.length === 0) {
        return res
          .status(200)
          .send({ success: true, message: "No students found" });
      }
      return res.status(200).send({ success: true, students: students });
    } catch (e) {
      console.log(e);
    }
  },

  getAllFaculty: async (req, res, next) => {
    try {
      const { department } = req.body;
      const faculties = await Faculty.find({ department });

      if (faculties.length === 0) {
        return res
          .status(200)
          .send({ success: true, message: "No Record Found" });
      }
      res.status(200).send({ success: true, faculties: faculties });
    } catch (err) {
      console.log(err);
    }
  },

  getAllSubject: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const subjects = await Subject.find({ department, year });
      if (subjects.length === 0) {
        return res
          .status(200)
          .send({ success: true, message: "No Record Found" });
      }
      return res.status(200).send({ success: true, subjects: subjects });
    } catch (e) {
      console.log(e);
    }
  },
};
