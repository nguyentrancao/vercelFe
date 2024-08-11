import React, { useState } from "react";

import "./login.css";
import SignInForm from "./SigninForm";
import SignUpForm from "./SignUp";

export function Login() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="AppForm">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Đã có tài khoản ?</h1>
              <p>Để sử dụng các chức năng khác, vui lòng đăng nhập</p>
              <button
                className="action-btn ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Đăng nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bạn chưa có tài khoản ?</h1>
              <p>Hãy đăng ký tài khoản để sử dụng mọi chức năng</p>
              <button
                className="action-btn ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
