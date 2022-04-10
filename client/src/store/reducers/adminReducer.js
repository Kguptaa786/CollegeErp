import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  admin: {},
  addFaculty: false,
  addStudent: false,
  addAdmin: false,
  addSubject: false,
  allFaculty: [],
  allStudent: [],
  allSubject: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload,
      };
    case "ADD_STUDENT_FLAG":
      return {
        ...state,
        addStudentFlag: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
