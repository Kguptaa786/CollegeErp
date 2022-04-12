import { AdminActionTypes } from "../actionTypes";

const initialState = { name: "Krishna" };
const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AdminActionTypes.ADD_STUDENT:
      return [...state, payload];
    default:
      return state;
  }
};

export default adminReducer;
