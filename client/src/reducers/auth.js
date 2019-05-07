import { LOGIN, LOGOUT } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true, token: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false, token: null };
    default:
      return state;
  }
}
