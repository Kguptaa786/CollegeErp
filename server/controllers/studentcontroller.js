const Student = require("../models/student");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const Subject = require("../models/subject");
const Attendance = require("../models/attendance");
const Mark = require("../models/mark");
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
          .json({ success: false, message: "Invalid Credential" });
      }
      const isCorrect = await bcrypt.compareSync(password, student.password);

      if (!isCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Credential" }); //validation needed
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
      return res.status(200).json({
        success: true,
        message: "Successfully Logged in",
        token: "Bearer " + token,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  allStudents: async (req, res) => {
    const { currRegistrationNumber, department, section, year } = req.body;
    if (!department || !section || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    let students = await Student.find({ department, year, section });
    let filteredArr = students.filter(
      (student) => student.registrationNumber !== currRegistrationNumber
    );
    students = filteredArr;
    if (!students.length) {
      return res.status(200).json({
        success: false,
        message: "No student found",
        students: students,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Students are....",
      students: students,
    });
  },
  getStudentDetail: async (req, res) => {
    try {
      const { registrationNumber } = req.params;
      console.log();

      if (!registrationNumber) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credential" });
      }
      const student = await Student.findOne({ registrationNumber });
      if (!student) {
        return res
          .status(400)
          .json({ success: false, message: "No student found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Student found...", student: student });
    } catch (err) {
      console.log(err);
    }
  },
  subjectList: async (req, res) => {
    const year = jwt_decode(req.headers.authorization).year;
    const department = jwt_decode(req.headers.authorization).department;
    // console.log(req.headers.authorization);
    const subjects = await Subject.find({ department, year });
    // console.log(subjects);
    if (!subjects) {
      return res
        .status(400)
        .json({ success: false, message: "No subject found" });
    }
    return res.status(200).json({
      success: true,
      message: "Subject List ...",
      subjects: subjects,
    });
  },

  attendanceStatus: async (req, res, next) => {
    try {
      const studentId = jwt_decode(req.headers.authorization).id;
      const attendance = await Attendance.find({
        student: studentId,
      }).populate("subject");
      if (!attendance) {
        res.status(400).json({ message: "Attendence not found" });
      }
      res.status(200).json({
        result: attendance.map((att) => {
          let res = {};
          res.attendance = (
            (att.lectureAttended / att.totalLecture) *
            100
          ).toFixed(2);
          res.subjectCode = att.subject.subjectCode;
          res.subjectName = att.subject.name;
          res.maxHours = att.subject.totalLectures;
          res.absentHours = att.totalLecture - att.lectureAttended;
          res.lectureAttended = att.lectureAttended;
          res.totalLecture = att.totalLecture;
          return res;
        }),
      });
    } catch (err) {
      console.log("Error in fetching attendence", err.message);
    }
  },
  testPerformance: async (req, res, next) => {
    try {
      const id = jwt_decode(req.headers.authorization).id;
      const department = jwt_decode(req.headers.authorization).department;
      const getMarks = await Mark.find({ department, student: id }).populate(
        "subject"
      );

      const test1 = getMarks.filter((obj) => {
        return obj.exam === "test1";
      });
      const test2 = getMarks.filter((obj) => {
        return obj.exam === "test2";
      });
      const test3 = getMarks.filter((obj) => {
        return obj.exam === "test3";
      });
      return res.status(200).json({
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

  postPrivateChat: async (req, res, next) => {
    try {
      const {
        senderName,
        senderId,
        roomId,
        receiverRegistrationNumber,
        senderRegistrationNumber,
        message,
      } = req.body;

      const receiverStudent = await Student.findOne({
        registrationNumber: receiverRegistrationNumber,
      });
      const newMessage = await new Message({
        senderName,
        senderId,
        roomId,
        message,
        senderRegistrationNumber,
        receiverRegistrationNumber,
        receiverName: receiverStudent.name,
        receiverId: receiverStudent._id,
        createdAt: new Date(),
      });
      await newMessage.save();
    } catch (err) {
      console.log("Error in post private chat", err.message);
    }
  },
  getPrivateChat: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const swap = (input, value_1, value_2) => {
        let temp = input[value_1];
        input[value_1] = input[value_2];
        input[value_2] = temp;
      };
      const allMessage = await Message.find({ roomId });
      let tempArr = roomId.split("_");
      swap(tempArr, 0, 1);
      let secondRomId = tempArr[0] + "_" + tempArr[1];
      const allMessage2 = await Message.find({ roomId: secondRomId });
      let conversation = allMessage.concat(allMessage2);
      conversation.sort();
      return res.status(200).json({ result: conversation });
    } catch (err) {
      console.log("errr in getting private chat server side", err.message);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, registrationNumber } = req.body;
      const student = await Student.findOne({ registrationNumber });
      const isCorrect = await bcrypt.compareSync(oldPassword, student.password);
      if (!isCorrect) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Credential" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 4);
      student.password = hashedPassword;
      await student.save();
      return res
        .status(200)
        .json({ success: true, message: "Password update successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
