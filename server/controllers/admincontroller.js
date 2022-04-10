const bcrypt = require("bcryptjs");
const Admin = require("./models/admin");
const Student = require("./models/student");
const Faculty = require("./models/faculty");
const Subject = require("./models/subject");

module.exports = {
  addAdmin: async (req, res, next) => {
    try {
      const { name, dob, email, contactNumber, department } = req.body;
      if (!name || !dob || !email || !contactNumber || !department) {
        res
          .status(400)
          .json({ success: failure, message: "some data feilds are entry " });
      }
      const if_already_present = await res.findOne(email);
      if (if_already_present) {
        res.send({ success: false, message: "email already existing" });
      }
      //regisration number generating
      let deptHelper;
      if (department == "C.S.E") {
        deptHelper = "00";
      } else if (department == "E.C.E") {
        deptHelper = "01";
      } else if (department == "E.E.E") {
        deptHelper = "02";
      } else if (department == "Chemical") {
        deptHelper = "03";
      } else if (department == "Mechanical") {
        deptHelper = "04";
      } else if (department == "Civil") {
        deptHelper = "05";
      } else {
        deptHelper = "06";
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(dob, 10);
      var date = new Date();
      const admins = await Admin.find({ department });
      let helper;
      if (admins.length < 10) {
        helper = "00" + admins.length.toString();
      } else if (students.length < 100 && students.length > 9) {
        helper = "0" + admins.length.toString();
      } else {
        helper = admins.length.toString();
      }

      const connections = ["ADM", date.getFullYear(), deptHelper, helper];

      const registrationNumber = conncetions.join("");
      const joiningYear = date.getFullYear();
      const newAdmin = await new Admin({
        name,
        email,
        registrationNumber,
        joiningYear,
        department,
        contactNumber,
        password: hashedPassword,
      });
      new Admin.save();
      return res.status(200).json({
        success: true,
        message: "Admin registerd successfully",
        response: newAdmin,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not registered" });
    }
  },

  getAllStudents: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const students = await Student.find({ department, year });
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      res.status(200).json({ result: students });
    } catch (e) {
      res.status(400).json({ message: "not found" });
    }
  },
  getAllStudents: async (req, res, next) => {
    try {
      const students = await Student.find({});
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      res.status(200).json({ result: students });
    } catch (e) {
      res.status(400).json({ message: "not found" });
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      //validation needed
      const { registrationNumber, password } = req.body;
      const admin = await Admin.findOne({ registrationNumber });
      if (!admin) {
      }
      const isCorrect = await bcrypt.compare(password, admin.password);
      if (!isCorrect) {
        res.status(404).json(error); //validation needed
      }
      const payload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        contactNumber: admin.contactNumber,
        avatar: admin.avatar,
        registrationNumber: admin.registrationNumber,
        joiningYear: admin.joiningYear,
        department: admin.department,
      };
    } catch (err) {
      console.log("Error in admin login", err.message);
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
        batch,
        gender,
        contactNumber,
        aadharNumber,
      } = req.data;
      const student = await Student.findOne({ email });
      if (student) {
        //validation
      }
      let departmentHelper;
      if (department === "C.S.E") {
        departmentHelper = "01";
      } else if (department === "E.C.E") {
        departmentHelper = "02";
      } else if (department === "E.E.E") {
        departmentHelper = "03";
      } else if (department === "Chemical") {
        departmentHelper = "04";
      } else if (department === "Mechanical") {
        departmentHelper = "05";
      } else if (department === "Civil") {
        departmentHelper = "06";
      } else {
        departmentHelper = "07";
      }

      const students = await Student.find({ department });
      let hashedPassword;
      hashedPassword = await bcrypt.hash(dob, 10);
      var date = new Date();
      let helper;
      if (students.length < 10) {
        helper = "00" + admins.length.toString();
      } else if (students.length < 100 && students.length > 9) {
        helper = "0" + admins.length.toString();
      } else {
        helper = students.length.toString();
      }
      var components = ["STU", date.getFullYear(), departmentHelper, helper];

      var registrationNumber = components.join("");
      const newStudent = await new Student({
        name,
        email,
        password: hashedPassword,
        registrationNumber,
        dob,
        year,
        department,
        section,
        batch,
        gender,
        contactNumber,
        aadharNumber,
      });
      await newStudent.save();
    } catch (e) {
      res.status(400);
    }
  },

  addFaculty: async (req, res, next) => {
    try {
      const {
        name,
        email,
        designation,
        year,
        department,
        dob,
        gender,
        contactNumber,
        aadharNumber,
      } = req.data;
      //take any variable name
      const faculty = await Faculty.findOne({ email });
      if (faculty) {
      }

      let departmentHelper;
      if (department === "C.S.E") {
        departmentHelper = "01";
      } else if (department === "E.C.E") {
        departmentHelper = "02";
      } else if (department === "E.E.E") {
        departmentHelper = "03";
      } else if (department === "Chemical") {
        departmentHelper = "04";
      } else if (department === "Mechanical") {
        departmentHelper = "05";
      } else if (department === "Civil") {
        departmentHelper = "06";
      } else {
        departmentHelper = "07";
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(dob, 10);
      var date = new Date();
      const facultycount = await Faculty.find({ department });
      let helper;
      if (facultycount.length < 10) {
        helper = "00" + facultycount.length.toString();
      } else if (facultycount.length < 100 && facultycount.length > 9) {
        helper = "0" + facultycount.length.toString();
      } else {
        helper = facultycount.length.toString();
      }
      var components = ["STU", date.getFullYear(), departmentHelper, helper];

      var registrationNumber = components.join("");
      const newFaculty = await new Faculty({
        name,
        email,
        password: hashedPassword,
        registrationNumber,
        dob,
        year,
        designation,
        department,
        gender,
        contactNumber,
        aadharNumber,
      });
      await newFaculty.save();
    } catch (e) {
      res.status(400);
    }
  },
  getAllFaculty: async (req, res, next) => {
    try {
      const faculties = await Faculty.find({});
      if (faculties.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: faculties });
    } catch (err) {
      res.status(400);
    }
  },

  addSubject: async (req, res, next) => {
    try {
      const { subject, subjectcode, totallectures, department, year } =
        req.data;
      const code = await Subject.findOne({ subjectcode });
      if (code) {
        res.status(404).json({ message: "already present" });
      }

      const newSubject = await new Subject({
        subject,
        subjectcode,
        totallectures,
        department,
        year,
      });
      await newSubject.save();
    } catch (e) {}
  },

  getAllSubjects: async (req, res, next) => {
    try {
      const allsubjects = await Subject.find({});
      if (allsubjects.length === 0) {
        res.status(404).json({ message: "no subject found" });
      }
      res.status(200).json(allsubjects);
    } catch (e) {}
  },

  getAllFaculty: async (req, res, next) => {
    try {
      const { department } = req.body;
      const allfaculties = await Faculty.find({ department });
      res.status(200).json({ result: allfaculties });
    } catch (e) {
      res.status(200);
    }
  },

  getAllSubjects: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const allSubjects = await Subject.find({ department, year });
      res.status(200).json({ result: allSubjects });
    } catch (err) {
      console.log("Error in gettting all students", err.message);
    }
  },
};
