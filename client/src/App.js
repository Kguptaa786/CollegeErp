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
import AllSubjects from "./pages/admin/AllSubjects";
import NavbarAdmin from "./components/NavbarAdmin";

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
          <Route path="/faculty/markAttendance" element={<MarkAttendance />} />
          <Route path="/faculty/uploadMarks" element={<UploadMarks />} />
          <Route path="/faculty/updatePassword" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
