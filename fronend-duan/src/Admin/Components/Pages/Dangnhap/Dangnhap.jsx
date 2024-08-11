import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dangnhap = () => {
  const navigate = useNavigate();

  function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password-field").value;

    //Đặt 1 Admin ảo để đăng nhập quản trị
    if (username == "admin" && password == "123456") {
      toast("🦄 Đăng nhập thành công !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return true;
    }
    //Nếu không nhập gì mà nhấn đăng nhập thì sẽ báo lỗi
    if (username == "" && password == "") {
      toast("🦄 Hãy nhập tài khoản và mật khẩu !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;
    }
    //Nếu không nhập mật khẩu mà đúng tài khoản
    if (username == "admin" && password == "") {
      toast("🦄 Hãy nhập mật khẩu !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    //Nếu không nhập tài khoản sẽ báo lỗi
    if (username == null || username == "") {
      toast("🦄 Hãy nhập tài khoản !", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    //Nếu không nhập mật khẩu sẽ báo lỗi
    if (password == null || password == "") {
      toast("🦄 Hãy nhập mật khẩu !", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    //Nếu trống toàn bộ thì báo lỗi
    else {
      toast("Thông tin không chính xác", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return true;
    }
  }

  return (
    <body>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/team.jpg" alt="IMG" />
            </div>
            {/* <!--=====TIÊU ĐỀ======--> */}
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                <b>ĐĂNG NHẬP HỆ THỐNG </b>
              </span>
              {/* <!--=====FORM INPUT TÀI KHOẢN VÀ PASSWORD======--> */}
              <form action="">
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    placeholder="Tài khoản quản trị"
                    name="username"
                    id="username"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="bx bx-user"></i>
                  </span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    autocomplete="off"
                    className="input100"
                    type="password"
                    placeholder="Mật khẩu"
                    name="current-password"
                    id="password-field"
                  />
                  <span
                    toggle="#password-field"
                    className="bx fa-fw bx-hide field-icon click-eye"
                  ></span>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="bx bx-key"></i>
                  </span>
                </div>

                {/* <!--=====ĐĂNG NHẬP======--> */}
                <div className="container-login100-form-btn">
                  <input
                    type="button"
                    value="Đăng nhập"
                    id="submit"
                    onClick={validate}
                  />
                </div>
                {/* <!--=====LINK TÌM MẬT KHẨU======--> */}
                <div className="text-right p-t-12">
                  <a className="txt2" href="/Forgot">
                    Bạn quên mật khẩu?
                  </a>
                </div>
              </form>
              {/* <!--=====FOOTER======--> */}
           
            </form>
          </div>
        </div>
      </div>

      {/* <script src="/js/main.js"></script>
    <script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <script src="vendor/bootstrap/js/popper.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="vendor/select2/select2.min.js"></script>
    <script type="text/javascript">
        
        function myFunction() {
            var x = document.getElementById("myInput");
            if (x.type === "password") {
                x.type = "text"
            } else {
                x.type = "password";
            }
        }
        $(".click-eye").click(function () {
            $(this).toggleClass("bx-show bx-hide");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    </script> */}
    </body>
  );
};

export default Dangnhap;
