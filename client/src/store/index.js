import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
