const Attendance = require("../models/attendance");
const Faculty = require("../models/faculty");
const Student = require("../models/student");
const Mark = require("../models/mark");
const Subject = require("../models/subject");

const secretOrKey = process.env.SECRET_OR_KEY;

module.exports = {
  facultyLogin: async (req, res) => {
    try {
      //validation needed
      const { registrationNumber, password } = req.body;

      const faculty = await Faculty.findOne({ registrationNumber });

      if (!faculty) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" });
      }
      const isCorrect = await bcrypt.compareSync(password, faculty.password);

      if (!isCorrect) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid Credential" }); //validation needed
      }

      const payload = {
        registrationNumber: faculty.registrationNumber,
        id: faculty._id,
        email: faculty.email,
        dob: faculty.dob,
        department: faculty.department,
        name: faculty.name,
        contactNumber: faculty.contactNumber,
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
  markAttendance: async (req, res) => {
    try {
      const { department, year, section } = req.body;
      const students = await Student.find({ department, year, section });
      const allSubjectCode = await Subject.find({ department, year });
      res.status(200).json({ data: students, allSubjectCode: allSubjectCode });
    } catch (err) {
      console.log(err);
    }
  },
  markAttendanceHelper: async (req, res) => {
    try {
      const { department, year, section, subjectId, checkedValue } = req.body;
      const selectedStudents = checkedValue;
      const allStudents = await Student.find({ department, year, section });

      let filteredArr = allStudents.filter(function (item) {
        return selectedStudents.indexOf(item.id) === -1;
      });

      //for absent student
      for (let i = 0; i < filteredArr.length; i++) {
        const pre = await Attendance.findOne({
          student: filteredArr[i]._id,
          subject: subjectId,
        });
        if (!pre) {
          const newAttendance = new Attendance({
            student: filteredArr[i]._id,
            subject: subjectId,
          });
          newAttendance.totalLecture += 1;
          await newAttendance.save();
        } else {
          pre.totalLecture += 1;
          await pre.save();
        }
      }

      //for present student
      for (let i = 0; i < selectedStudents.length; i++) {
        const pre = await Attendance.findOne({
          student: selectedStudents[i],
          subject: subjectId,
        });
        if (!pre) {
          const newAttendance = new Attendance({
            student: selectedStudents[i],
            subject: subjectId,
          });
          newAttendance.totalLecture += 1;
          newAttendance.lectureAttended += 1;
          await newAttendance.save();
        } else {
          pre.totalLecture += 1;
          pre.lectureAttended += 1;
          await pre.save();
        }
      }
      res.status(200).json({ message: "Attendance Mark Successfully" });
    } catch (err) {
      console.log(err);
    }
  },

  uploadMarks: async (req, res) => {
    try {
      const { department, year, section } = req.body;
      const students = await Student.find({ department, year, section });
      const allSubjectCode = await Subject.find({ department, year });
      res.status(200).json({ data: students, allSubjectCode: allSubjectCode });
    } catch (err) {
      console.log(err);
    }
  },
  uploadMarksHelper: async (req, res) => {
    try {
      const { department, year, section, subjectId, exam, marks, totalMark } =
        req.body;
      const isAlready = await Mark.find({
        department,
        year,
        section,
        exam,
        subject: subjectId,
      });

      if (isAlready) {
        return res.status(200).json({ message: "Mark Already Uploaded" });
      }

      for (let i = 0; i < marks.length; i++) {
        const newMark = await new Mark({
          student: marks[i]._id,
          subject: subjectId,
          department,
          year,
          section,
          exam,
          mark: marks[i].value,
          totalMark,
        });
        await newMark.save();
      }
      res.status(200).json({ message: "Mark Upload Successfully" });
    } catch (err) {
      console.log(err);
    }
  },
};
