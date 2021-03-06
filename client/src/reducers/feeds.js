import {
  GET_FEEDS,
  ADD_FEED,
  DELETE_FEED,
  GET_FEED_ITEMS,
  GET_ITEM_CONTENTS
} from "../actions/types.js";

const initialState = {
  feeds: [],
  feedItems: {},
  feedItemContent: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDS:
      return { ...state, feeds: action.payload };
    case ADD_FEED:
      return { ...state, feeds: [...state.feeds, action.payload] };
    case DELETE_FEED:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.url !== action.payload)
      };
    case GET_FEED_ITEMS:
      return { ...state, feedItems: action.payload };
    case GET_ITEM_CONTENTS:
      return {
        ...state,
        feedItemContent: state.feedItems[action.payload]
      };
    default:
      return state;
  }
}
