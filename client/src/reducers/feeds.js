import { GET_FEEDS, ADD_FEED, DELETE_FEED } from "../actions/types.js";

const initialState = {
  feeds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDS:
      return { ...state, feeds: action.payload };
    case ADD_FEED:
      return { ...state, feeds: [...state.feeds, action.payload] };
    case DELETE_FEED:
      console.log("Delete_feed: " + action.payload);
      state.feeds.map(feed => console.log("Delete_feeds: " + feed.id));
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed._id !== action.payload)
      };
    default:
      return state;
  }
}
