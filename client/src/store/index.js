import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./reducers/adminReducer";

const middleware = [thunk];

const store = createStore(
  adminReducer,
  compose(applyMiddleware(...middleware))
);

export default store;
