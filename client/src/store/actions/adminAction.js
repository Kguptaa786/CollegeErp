import { AdminActionTypes } from "../actionTypes";

export const addAdmin = (admin) => {
  return {
    type: AdminActionTypes.ADD_ADMIN,
    payload: admin,
  };
};

export const addStudent = (admin) => {
  return {
    type: AdminActionTypes.ADD_STUDENT,
    payload: admin,
  };
};
