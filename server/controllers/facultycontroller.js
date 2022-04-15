const Attendence = require("../models/attendence");
const Faculty = require("./models/faculty");
const Student = require("./models/student");
const Marks = require("./models/marks");
facultyLogin: async (req, res, next) => {
  try {
    const { registrationnumber, password } = req.body;
    const faculty = await Faculty.findOne({ registrationnumber });
    if (!faculty) {
      return res.status(400).json({ message: "registration number not found" });
    }
    const isCorrect = await bcrypt.compare(password, faculty.password);
    if (!isCorrect) {
      res.status(200).json({ message: "incorrect password" });
    }
    // const payload{
    //     id: faculty.id, name: faculty.name, email: faculty.email,
    //     contactNumber: faculty.contactNumber, avatar: faculty.avatar,
    //     registrationNumber: faculty.registrationNumber,
    //     joiningYear: faculty.joiningYear,
    //     department: faculty.department
    // }
  } catch {}
};

updatePassword: async (req, res, next) => {
  try {
    const { registrationnumber, oldpassword, newpassword, confirmNewPassword } =
      req.body;
    if (!oldpassword || !newpassword || !confirmNewPassword) {
      res.status(400).json({ message: "all feild are required" });
    }
    if (newpassword !== confirmNewPassword) {
      return res.status(400).json({ message: "unequal both" });
    }
    const faculty = await Faculty.find({ registrationnumber });
    const isCorrect = await bcrypt.compare(oldpassword, faculty.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "password not matching" });
    }
    const hashedpassword = await bcrypt.hash(newpassword, 10);
    faculty.password = hashedpassword;
    await faculty.save();
    res.status(200).json({ message: "password updated" });
  } catch (e) {
    console.log("errors in updating password");
  }
};

updateProfile: async (req, res, next) => {
  try {
    const {
      registrationnumber,
      profilepicture,
      gender,
      contactnumber,
      aadharnumber,
    } = req.data;
    const faculty = await Faculty.findOne({ registrationnumber });
    if (gender) {
      faculty.facultyGender = gender;
      await faculty.save();
    }
    if (contactnumber) {
      faculty.facultyContactNumber = contactnumber;
      await faculty.save();
    }
    if (aadharnumber) {
      faculty.facultyAadharNumber = aadharnumber;
      await faculty.save();
    }

    res.status(200).json({ message: "updated successfully" });
  } catch {
    console.log("error in updating profile");
  }
};
markAttendence: async (req, res, next) => {
  try {
    const { selectedStudents, subjectCode, department, year, section } =
      req.body;

    const sub = await Subject.find({ subjectCode });
    const allStudents = await Student.find({ department, year, section });

    //selected students are those students  which are marked and send
    var filteredArr = allStudents.filter(function (item) {
      return selectedStudents.indexOf(item.id) === -1; //here we are checking student not present in selected student
    });

    //filter arr are those which are not selected

    //here we are just updating total lectures by faculty in non selected students
    for (var a = 0; a < filteredArr.length; a++) {
      const pre = await Attendence.findOne({
        student: filteredArr[a]._id,
        subjectCode: sub._id,
      });
      if (!pre) {
        const attendence = await new Attendence({
          student: filteredArr[a]._id,
          subjectCode: sub._id,
        });
        attendence.totalLecturesByFaculty++;
        await attendence.save();
      } else {
        pre.totalLecturesByFaculty++;
        await pre.save();
      }
    }

    //now we are updating selected  students by increasing count of lectures attended

    for (var a = 0; a < selectedStudents.length; a++) {
      const pre = await Attendence.findOne({
        student: selectedStudents[a],
        subjectCode: sub._id,
      });
      if (!pre) {
        const attendence = await new Attendence({
          student: selectedStudents[a].student,
          subjectCode: selectedStudents[a].subjectCode,
        });
        attendence.totalLecturesByFaculty++;
        attendence.lecturesAttended++;
        await attendence.save();
      } else {
        pre.totalLecturesByFaculty++;
        pre.lecturesAttended++;
        await pre.save();
      }
    }
    res.status(200).json({ message: "successfully update" });
  } catch {}
};

uploadMarks: async (req, res, next) => {
  try {
    const { department, year, section, subjectcode, exam, totalmarks, marks } =
      req.body;
    const isalreadypresent = await Marks.find({
      department: department,
      year: year,
      section: section,
      subjectCode: subjectcode,
      exam: exam,
      totalMarks: totalmarks,
    });
    if (isalreadypresent !== 0) {
      return res.status(400).json({ message: "marks already present" });
    }
    for (var a = 0; a < marks.length; a++) {
      const newMarks = await new Marks({
        department,
        year,
        section,
        subjectcode,
        exam,
        totalmarks,
        marks: marks[a],
      });
      await newMarks.save();
      res.status(200).json({ message: "Marks uploaded successfully" });
    }
  } catch {}
};

forgotPassword: async (req, res, next) => {
  try {
    const { email } = req.body;
    const faculty = await Faculty.findOne({ email: email });
    if (!faculty) {
      res.status(400).json({ message: "email not exist" });
    }
    function generateOtp() {
      var digits = "0123456789";
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
    }
    const OTP = await generateOtp();
    faculty.otp = OTP;
    await faculty.save();
    faculty.sendEmail(faculty.email, OTP, "OTP");
    res.status(200).json({ message: "check your mail box for otp" });
    const helper = async () => {
      faculty.otp = "";
      await faculty.save();
    };
    setTimeout(function () {
      helper();
    }, 300000);
  } catch (e) {}
};

postOTP: async (req, res, next) => {
  try {
    const { email, newpassword, confirmNewPassword, OTP } = req.body;
    if (newpassword !== confirmNewPassword) {
      return res.status(400).json({ message: "password not matching" });
    }
    const faculty = await Faculty.findOne({ email: email });
    if (OTP !== faculty.otp) {
      return res.status(400).json({ message: "incorrect OTP" });
    }
    const hashPassword = await bcrypt.hash(newpassword, 10);
    faculty.password = hashPassword;
    await faculty.save();
    return res.status(200).json({ message: "Password Changed" });
  } catch {}
};
