import { combineReducers } from "redux";
import adminReducer from "./adminReducer";

const rootReducers = combineReducers({
  adminReducer,
});

export default rootReducers;
