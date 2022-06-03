const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fake = require("../models/fake");

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
  saveCurrentMessage: async (req, res) => {
    // console.log(req.body);
  },
  getMsg: async (req, res) => {
    const msg = await Fake.find({ room: "STU202201002_STU202201001" });
    return res.send({ msg });
  },
};
