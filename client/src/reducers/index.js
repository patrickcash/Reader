import { combineReducers } from "redux";
import feeds from "./feeds";
import auth from "./auth";
import { reducer as form } from "redux-form";

export default combineReducers({
  feeds,
  auth,
  form
});
