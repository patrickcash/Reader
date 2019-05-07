import axios from "axios";
import { SubmissionError } from "redux-form";
import history from "../utils/historyUtils.js";

import { LOGIN, LOGOUT } from "./types";

const LOGIN_URL = "http://localhost:5000/api/users/login";
const LOGOUT_URL = "http://localhost:5000/api/users/logout/";
const REGISTER_URL = "http://localhost:5000/api/users/register";

export function getUserToken(state) {
  return state.auth.token;
}

export function authLogin(token) {
  return {
    type: LOGIN,
    payload: token
  };
}

export function authLogout() {
  return {
    type: LOGOUT,
    payload: null
  };
}

// log the user in
export function loginUser(formValues, dispatch, props) {
  return axios
    .post(LOGIN_URL, formValues)
    .then(response => {
      // send token to reducer
      const token = response.data.token;
      dispatch(authLogin(token));

      // add token to local storage
      localStorage.setItem("token", token);

      history.push("/");
    })
    .catch(error => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

export const logoutUser = () => dispatch => {
  return axios
    .post(LOGOUT_URL)
    .then(response => {
      // remove token from local storage
      localStorage.removeItem("token");

      // let reducer know to update state
      dispatch(authLogout());

      history.push("/");
    })
    .catch(error => {
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
};

export function registerUser(formValues, dispatch, props) {
  return axios
    .post(REGISTER_URL, formValues)
    .then(response => {
      // send token to reducer
      const token = response.data.token;
      dispatch(authLogin(token));

      // add token to local storage
      localStorage.setItem("token", token);

      history.push("/");
    })
    .catch(error => {
      console.log("registration error " + error);
      // If request is bad...
      // Show an error to the user
      const processedError = processServerError(error.response.data);
      throw new SubmissionError(processedError);
    });
}

// Setup config with headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// combine any error to display to the user
function processServerError(error) {
  return Object.keys(error).reduce(
    function(newDict, key) {
      if (key === "non_field_errors") {
        newDict["_error"].push(error[key]);
      } else if (key === "token") {
        // token sent with request is invalid
        newDict["_error"].push("The link is not valid any more.");
      } else {
        newDict[key] = error[key];
      }

      return newDict;
    },
    { _error: [] }
  );
}
