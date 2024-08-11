import Cookies from "js-cookie";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./auth.types";

const init = {
  isAuth: false,
  token: "",
  username: "",
  email: "",
  admin: "",
  userID: "",
  loading: false,
  error: false,
};

// Load the initial state from the cookie (if it exists)
const initialStateFromCookie = Cookies.get("authState");

export const Authreducer = (
  state = initialStateFromCookie ? JSON.parse(initialStateFromCookie) : init,
  { type, payload },
) => {
  switch (type) {
    case LOGIN_LOADING: {
      const newState = {
        ...state,
        loading: true,
        error: false,
      };
      Cookies.set("authState", JSON.stringify(newState)); // Save the updated state to the cookie
      return newState;
    }
    case LOGIN_ERROR: {
      const newState = {
        ...state,
        loading: false,
        error: true,
      };
      Cookies.set("authState", JSON.stringify(newState)); // Save the updated state to the cookie
      return newState;
    }
    case LOGIN_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        error: false,
        token: payload.token,
        isAuth: true,
        username: payload.username,
        email: payload.email,
        admin: payload.admin,
        userID: payload.userID,
      };
      Cookies.set("authState", JSON.stringify(newState)); // Save the updated state to the cookie
      return newState;
    }
    case LOGOUT: {
      // Remove the cookie when logging out
      Cookies.remove("authState");
      return {
        ...init,
      };
    }
    default: {
      return state;
    }
  }
};
