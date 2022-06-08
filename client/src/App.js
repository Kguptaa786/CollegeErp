import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminProfile from "./pages/admin/AdminProfile";
import AddFaculty from "./pages/admin/AddFaculty";
import AddStudent from "./pages/admin/AddStudent";
import AddAdmin from "./pages/admin/AddAdmin";
import AddSubject from "./pages/admin/AddSubject";
import AllFaculties from "./pages/admin/AllFaculties";
import AllStudents from "./pages/admin/AllStudents";
import FacultyStudentLoginPage from "./pages/FacultyStudentLoginPage";
import MarkAttendance from "./pages/faculty/MarkAttendance";
import UploadMarks from "./pages/faculty/UploadMarks";
import UpdatePassword from "./pages/faculty/UpdatePassword";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import AllSubjects from "./pages/admin/AllSubjects";
import StudentProfile from "./pages/student/StudentProfile";
import Students from "./pages/student/Students";
import PeerStudent from "./pages/student/PeerStudent";
import ChatPage from "./pages/student/ChatPage";
import SubjectList from "./pages/student/SubjectList";
import AttendanceStatus from "./pages/student/AttendanceStatus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FacultyStudentLoginPage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/addStudent" element={<AddStudent />} />
          <Route path="/admin/addFaculty" element={<AddFaculty />} />
          <Route path="/admin/addAdmin" element={<AddAdmin />} />
          <Route path="/admin/addSubject" element={<AddSubject />} />
          <Route path="/admin/allFaculties" element={<AllFaculties />} />
          <Route path="/admin/allStudents" element={<AllStudents />} />
          <Route path="/admin/allSubjects" element={<AllSubjects />} />
          <Route path="/faculty" element={<FacultyProfile />} />
          <Route path="/faculty/markAttendance" element={<MarkAttendance />} />
          <Route path="/faculty/uploadMarks" element={<UploadMarks />} />
          <Route path="/faculty/updatePassword" element={<UpdatePassword />} />
          <Route path="/student" element={<StudentProfile />} />
          <Route
            path="/student/:registrationNumber"
            element={<PeerStudent />}
          />
          <Route path="/student/students" element={<Students />} />
          <Route path="/student/subjectList" element={<SubjectList />} />
          <Route
            path="/student/attendanceStatus"
            element={<AttendanceStatus />}
          />
          <Route path="/student/chat/:room" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
