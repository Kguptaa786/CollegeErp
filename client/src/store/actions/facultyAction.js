const fetchStudentHelper = (data) => {
  return {
    type: "FETCH_STUDENT_HELPER",
    payload: data,
  };
};
const subjectCodeListHelper = (data) => {
  return {
    type: "SUBJECT_CODE_LIST_HELPER",
  };
};
