const Attendance = require("../models/attendance");
const Faculty = require("../models/faculty");
const Student = require("../models/student");
const Mark = require("../models/mark");
const Subject = require("../models/subject");

module.exports = {
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
  // facultyLogin: async (req, res, next) => {
  //   try {
  //     const { registrationnumber, password } = req.body;
  //     const faculty = await Faculty.findOne({ registrationnumber });
  //     if (!faculty) {
  //       return res.status(400).json({ message: "registration number not found" });
  //     }
  //     const isCorrect = await bcrypt.compare(password, faculty.password);
  //     if (!isCorrect) {
  //       res.status(200).json({ message: "incorrect password" });
  //     }
  //     // const payload{
  //     //     id: faculty.id, name: faculty.name, email: faculty.email,
  //     //     contactNumber: faculty.contactNumber, avatar: faculty.avatar,
  //     //     registrationNumber: faculty.registrationNumber,
  //     //     joiningYear: faculty.joiningYear,
  //     //     department: faculty.department
  //     // }
  //   } catch {}
  // };

  // updatePassword: async (req, res, next) => {
  //   try {
  //     const { registrationnumber, oldpassword, newpassword, confirmNewPassword } =
  //       req.body;
  //     if (!oldpassword || !newpassword || !confirmNewPassword) {
  //       res.status(400).json({ message: "all feild are required" });
  //     }
  //     if (newpassword !== confirmNewPassword) {
  //       return res.status(400).json({ message: "unequal both" });
  //     }
  //     const faculty = await Faculty.find({ registrationnumber });
  //     const isCorrect = await bcrypt.compare(oldpassword, faculty.password);
  //     if (!isCorrect) {
  //       return res.status(400).json({ message: "password not matching" });
  //     }
  //     const hashedpassword = await bcrypt.hash(newpassword, 10);
  //     faculty.password = hashedpassword;
  //     await faculty.save();
  //     res.status(200).json({ message: "password updated" });
  //   } catch (e) {
  //     console.log("errors in updating password");
  //   }
  // };

  // updateProfile: async (req, res, next) => {
  //   try {
  //     const {
  //       registrationnumber,
  //       profilepicture,
  //       gender,
  //       contactnumber,
  //       aadharnumber,
  //     } = req.data;
  //     const faculty = await Faculty.findOne({ registrationnumber });
  //     if (gender) {
  //       faculty.facultyGender = gender;
  //       await faculty.save();
  //     }
  //     if (contactnumber) {
  //       faculty.facultyContactNumber = contactnumber;
  //       await faculty.save();
  //     }
  //     if (aadharnumber) {
  //       faculty.facultyAadharNumber = aadharnumber;
  //       await faculty.save();
  //     }

  //     res.status(200).json({ message: "updated successfully" });
  //   } catch {
  //     console.log("error in updating profile");
  //   }
  // };

  // forgotPassword: async (req, res, next) => {
  //   try {
  //     const { email } = req.body;
  //     const faculty = await Faculty.findOne({ email: email });
  //     if (!faculty) {
  //       res.status(400).json({ message: "email not exist" });
  //     }
  //     function generateOtp() {
  //       var digits = "0123456789";
  //       let otp = "";
  //       for (let i = 0; i < 6; i++) {
  //         otp += digits[Math.floor(Math.random() * 10)];
  //       }
  //     }
  //     const OTP = await generateOtp();
  //     faculty.otp = OTP;
  //     await faculty.save();
  //     faculty.sendEmail(faculty.email, OTP, "OTP");
  //     res.status(200).json({ message: "check your mail box for otp" });
  //     const helper = async () => {
  //       faculty.otp = "";
  //       await faculty.save();
  //     };
  //     setTimeout(function () {
  //       helper();
  //     }, 300000);
  //   } catch (e) {}
  // };

  // postOTP: async (req, res, next) => {
  //   try {
  //     const { email, newpassword, confirmNewPassword, OTP } = req.body;
  //     if (newpassword !== confirmNewPassword) {
  //       return res.status(400).json({ message: "password not matching" });
  //     }
  //     const faculty = await Faculty.findOne({ email: email });
  //     if (OTP !== faculty.otp) {
  //       return res.status(400).json({ message: "incorrect OTP" });
  //     }
  //     const hashPassword = await bcrypt.hash(newpassword, 10);
  //     faculty.password = hashPassword;
  //     await faculty.save();
  //     return res.status(200).json({ message: "Password Changed" });
  //   } catch {}
  // };
};
