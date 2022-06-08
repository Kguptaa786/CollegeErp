const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fake = require("../models/fake");
const jwt_decode = require("jwt-decode");
const Subject = require("../models/subject");

const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
  studentLogin: async (req, res) => {
    try {
      //validation needed
      const { registrationNumber, password } = req.body;

      const student = await Student.findOne({ registrationNumber });

      if (!student) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" });
      }
      const isCorrect = await bcrypt.compareSync(password, student.password);

      if (!isCorrect) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" }); //validation needed
      }

      const payload = {
        registrationNumber: student.registrationNumber,
        id: student._id,
        email: student.email,
        dob: student.dob,
        year: student.year,
        section: student.section,
        batch: student.batch,
        gender: student.gender,
        aadharNumber: student.aadharNumber,
        fatherName: student.fatherName,
        fatherContactNumber: student.fatherContactNumber,
        department: student.department,
        name: student.name,
        contactNumber: student.contactNumber,
      };

      const token = jwt.sign(payload, secretOrKey, { expiresIn: "1d" });
      return res.status(200).send({
        success: true,
        message: "Successfully Logged in",
        token: "Bearer " + token,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  allStudents: async (req, res) => {
    const { currRegistrationNumber, department, section, year } = req.body;
    if (!department || !section || !year) {
      return res
        .status(400)
        .send({ success: false, message: "All fields required" });
    }
    let students = await Student.find({ department, year, section });
    if (!students) {
      return res
        .status(400)
        .send({ success: false, message: "No student found" });
    }
    let filteredArr = students.filter(
      (student) => student.registrationNumber !== currRegistrationNumber
    );
    students = filteredArr;
    return res.status(200).send({
      success: true,
      message: "All Students are....",
      students: students,
    });
  },
  getStudentDetail: async (req, res) => {
    const { registrationNumber } = req.params;

    if (!registrationNumber) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid credential" });
    }
    const student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res
        .status(400)
        .send({ success: false, message: "No student found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Student found...", student: student });
  },
  subjectList: async (req, res) => {
    const { department, year } = req.query;
    console.log(req.query);
    const subjects = await Subject.find({ department, year });
    if (!subjects) {
      return res
        .status(400)
        .send({ success: false, message: "No subject found" });
    }
    return res.status(200).send({
      success: true,
      message: "Subject List ...",
      subjects: subjects,
    });
  },

  attendanceStatus: async (req, res, next) => {
    try {
      const studentId = req.query;
      console.log(studentId);
      const attendence = await Attendence.find({ student: studentId }).populate(
        "subject"
      );
      console.log(attendence);
      if (!attendence) {
        res.status(400).json({ message: "Attendence not found" });
      }
      res.status(200).json({
        result: attendence.map((att) => {
          let res = {};
          res.attendence = (
            (att.lectureAttended / att.totalLecturesByFaculty) *
            100
          ).toFixed(2);
          res.subjectCode = att.subject.subjectCode;
          res.subjectName = att.subject.name;
          res.maxHours = att.subject.totalLectures;
          res.absentHours = att.totalLecture - att.lectureAttended;
          res.lectureAttended = att.lectureAttended;
          res.totalLecturesByFaculty = att.totalLecture;
          return res;
        }),
      });
    } catch (err) {
      console.log("Error in fetching attendence", err.message);
    }
  },
  testPerformance: async (req, res, next) => {
    try {
      console.log("req.user", req.user);
      const { department, year, id } = req.user;
      const getMarks = await Mark.find({ department, student: id }).populate(
        "subject"
      );
      console.log("getMarks", getMarks);

      const test1 = getMarks.filter((obj) => {
        return obj.exam === "test1";
      });
      const test2 = getMarks.filter((obj) => {
        return obj.exam === "test2";
      });
      const test3 = getMarks.filter((obj) => {
        return obj.exam === "test3";
      });
      res.status(200).json({
        result: {
          test1,
          test2,
          test3,
        },
      });
    } catch (err) {
      return res.status(400).json({ "Error in getting marks": err.message });
    }
  },

  saveCurrentMessage: async (req, res) => {
    // console.log(req.body);
  },

  getMsg: async (req, res) => {
    const msg = await Fake.find({ room: "STU202201002_STU202201001" });
    return res.send({ msg });
  },
};
