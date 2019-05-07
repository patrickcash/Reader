import axios from "axios";
import { tokenConfig } from "./auth";

import { GET_FEEDS, ADD_FEED, DELETE_FEED } from "./types";

const feeds_url = "http://localhost:5000/api/feeds/";

// Get the feeds from the backend
export const getFeeds = () => (dispatch, getState) => {
  axios
    .get(feeds_url, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: GET_FEEDS,
        payload: response.data
      });
    })
    .catch(error => {
      // If request is bad...
      // Show an error to the user
      console.log(error);
    });
};

// Add the new feed to the backend
export const addFeed = feed => (dispatch, getState) => {
  axios
    .post(feeds_url, feed, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_FEED,
        payload: response.data
      });
    })
    .catch(error => {
      // If request is bad...
      // Show an error to the user
      console.log(error);
    });
};

// Delete the feed with passed in id
export const deleteFeed = id => (dispatch, getState) => {
  axios
    .delete(`${feeds_url}${id}`, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: DELETE_FEED,
        payload: id
      });
    })
    .catch(error => {
      // If request is bad...
      // Show an error to the user
      console.log(error);
    });
};
