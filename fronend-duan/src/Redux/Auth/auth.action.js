import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./auth.types";

export const loginGoogle = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  try {
    // Lấy thông tin username và token từ user object
    const username = user.displayName;
    const email = user.email;

    Cookies.set("username", username);
    let res = await axios.post(
      `${process.env.REACT_APP_DATABASE_API_URL}/users/googleusers`,
      { username, email }, // Pass the username and email as an object to the post request
    );
    const userID = res.data.payload.userID;

    Cookies.set("userID", userID);
    Cookies.set("email", email);
    // Gọi action Redux để cập nhật trạng thái đăng nhập
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { username, userID, email },
    });

    console.log("Login with Google successful:");
    return;
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message });
    console.log("Error during Google login:", e);
    return null;
  }
};

export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    let res = await axios.post(
      `${process.env.REACT_APP_DATABASE_API_URL}/users/login`,
      creds,
    );
    const token = res.data.token; // Lấy token từ phản hồi
    const username = res.data.payload.username;
    const admin = res.data.payload.admin;
    const email = res.data.payload.email;
    //lấy userID từ header token
    const userID = res.data.payload.userID;
    Cookies.set("token", token);
    Cookies.set("username", username);
    Cookies.set("admin", admin);
    Cookies.set("userID", userID);
    Cookies.set("email", email);

    // Dispatch action để lưu token vào Redux store với payload chứa dữ liệu
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, username, admin, userID },
    });

    console.log("Login successful:", res.data);
    return token; // Trả về token
  } catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message });
    alert("Login failed");
    return null; // Trả về null nếu có lỗi
  }
};

export const logout = () => {
  // Remove the token from Local Storage
  Cookies.remove("token");
  Cookies.remove("username");
  Cookies.remove("admin");
  Cookies.remove("userID");
  Cookies.remove("email");
  return { type: LOGOUT };
};
