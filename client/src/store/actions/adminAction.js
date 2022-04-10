import axios from "axios";
const url = "http://localhost:4000";

const setAdmin = (data) => {
  return {
    type: "SET_ADMIN",
    payload: data,
  };
};
const addFacultyFlag = (data) => {
  return {
    type: "ADD_FACULTY",
    payload: data,
  };
};
const addAdminFlag = (data) => {
  return {
    type: "ADD_ADMIN",
    payload: data,
  };
};
const addStudentFlag = (data) => {
  return {
    type: "ADD_STUDENT_FLAG",
    payload: data,
  };
};
const addSubjectFlag = (data) => {
  return {
    type: "ADD_SUBJECT",
    payload: data,
  };
};
const allFacultiesFlag = (data) => {
  return {
    type: "ALL_FACULTIES",
    payload: data,
  };
};
const allStudentFlag = (data) => {
  return {
    type: "ALL_STUDENTS",
    payload: data,
  };
};

export const addStudent = (studentCredential) => {
  return async (dispatch) => {
    // try {
    //   // console.log(studentCredential);
    //   const { data } = await axios({
    //     method: "POST",
    //     url: url + "/api/admin/addStudent",
    //     data: studentCredential,
    //   });
    //   dispatch(addStudentFlag(true));
    // } catch (err) {
    //   console.log(err);
    // }
    axios
      .post("http://localhost:4000/admin/addStudent", studentCredential)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
};
