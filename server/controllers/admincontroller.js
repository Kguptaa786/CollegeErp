const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Subject = require("../models/subject");

module.exports = {
  adminLogin: async (req, res) => {
    try {
      //validation needed
      const { registrationNumber, password } = req.body;

      const admin = await Admin.findOne({ registrationNumber });

      if (!admin) {
        return res.status(400).json({ message: "No user available" });
      }
      const isCorrect = await bcrypt.compareSync(password, admin.password);

      if (!isCorrect) {
        return res.status(404).json({ message: "Invalid Credential" }); //validation needed
      }
      return res.status(200).json({ message: "Successfully Logged in.." });
    } catch (err) {
      console.log("Error in admin login", err.message);
    }
  },
  addAdmin: async (req, res, next) => {
    try {
      const { name, dob, email, gender, contactNumber, department } = req.body;
      if (!name || !dob || !email || !department) {
        res.status(400).json({ message: "some data fields are empty" });
      }

      const if_already_present = await Admin.findOne({ email });
      if (if_already_present) {
        return res.staus(400).json({ message: "email already existing" });
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
        registrationNumber: registrationNumber,
        joiningYear,
        department,
        contactNumber,
        password: hashedPassword,
      });
      await newAdmin.save();
      res.status(200).json({ message: "Added Successfully" });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
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
      } = req.body;

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
        contactNumber,
        aadharNumber,
      });
      await newStudent.save();
      res.json({ data: newStudent });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },

  addSubject: async (req, res, next) => {
    try {
      const { name, subjectCode, totalLectures, department, year } = req.body;

      const code = await Subject.findOne({ subjectCode });
      if (code) {
        return res.status(404).json({ message: "already present" });
      }

      const newSubject = await new Subject({
        name,
        subjectCode,
        totalLectures,
        department,
        year,
      });
      await newSubject.save();
      res.json({ data: newSubject });
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

      // const faculty = await Faculty.findOne({ email });
      // // if (faculty) {
      // // }

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
      res.json({ data: newFaculty });
    } catch (e) {
      res.status(400);
    }
  },

  getAllStudent: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const students = await Student.find({ department, year });
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      res.status(200).json({ data: students });
    } catch (e) {
      res.status(400).json({ message: "not found" });
    }
  },

  getAllFaculty: async (req, res, next) => {
    try {
      const { department } = req.body;
      const faculties = await Faculty.find({ department });

      if (faculties.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ data: faculties });
    } catch (err) {
      console.log(err);
    }
  },

  getAllSubject: async (req, res, next) => {
    try {
      const { department, year } = req.body;
      const subjects = await Subject.find({ department, year });
      if (subjects.length === 0) {
        res.status(404).json({ error: "no subject found" });
      }
      res.status(200).json({ data: subjects });
    } catch (e) {
      res.status(400).json({ error: "Something went wrong" });
    }
  },

  // getStudents: async (req, res, next) => {
  //   try {
  //     const { department, year } = req.body;
  //     const students = await Student.find({ department, year });
  //     if (students.length === 0) {
  //       return res.status(404).json({ message: "No students found" });
  //     }
  //     res.status(200).json({ result: students });
  //   } catch (e) {
  //     res.status(400).json({ message: "not found" });
  //   }
  // },

  // postAllFaculty:async(req,res,next)=>{
  //   try{

  //   }
  // }

  // getFaculty: async (req, res, next) => {
  //   try {
  //     const { department } = req.body;
  //     const allfaculties = await Faculty.find({ department });
  //     res.status(200).json({ result: allfaculties });
  //   } catch (e) {
  //     res.status(200);
  //   }
  // },

  // getAllSubjects: async (req, res, next) => {
  //   try {
  //     const { department, year } = req.body;
  //     const allSubjects = await Subject.find({ department, year });
  //     res.status(200).json({ result: allSubjects });
  //   } catch (err) {
  //     console.log("Error in gettting all students", err.message);
  //   }
  // },
};
