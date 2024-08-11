import React from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();

  function validate() {
    var email = document.getElementById("email").value;
    if (email == null || email == "") {
      toast("🦄 Bạn chưa nhập email !", {
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
  }

  function RegexEmail(emailInputBox) {
    var emailStr = document.getElementById(emailInputBox).value;
    var emailRegexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var isvalid = emailRegexStr.test(emailStr);
    if (!isvalid) {
      toast("🦄 Bạn vui lòng nhập đúng định dạng email!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //   emailInputBox.focus;
    } else {
      toast(
        " 🦄 Chúng tôi vừa gửi cho bạn email hướng dẫn đặt lại mật khẩu vào địa chỉ cho bạn",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
      );
      //   emailInputBox.focus;
      window.location = "#";
    }
  }
  return (
    /*  PHẦN NỘI DUNG KHÔI PHỤC MẬT KHẨU   */
    <body>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/fg-img.png" alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                <b>KHÔI PHỤC MẬT KHẨU</b>
              </span>
              <form action="custommer.html">
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Bạn cần nhập đúng thông tin như: ex@abc.xyz"
                >
                  <input
                    className="input100"
                    type="text"
                    placeholder="Nhập email"
                    name="emailInput"
                    id="emailInput"
                    value=""
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="bx bx-mail-send"></i>
                  </span>
                </div>
                <div className="container-login100-form-btn">
                  <input
                    type="button"
                    onclick="return RegexEmail('emailInput')"
                    value="Lấy mật khẩu"
                  />
                </div>

                <div className="text-center p-t-12">
                  <a className="txt2" href="/dangnhap">
                    Trở về đăng nhập
                  </a>
                </div>
              </form>
           
            </form>
          </div>
        </div>
      </div>
      {/* <script src="/js/main.js"></script>
   <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
   <script src="vendor/bootstrap/js/popper.js"></script>
   <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
   <script src="vendor/select2/select2.min.js"></script> */}
    </body>
  );
};

export default Forgot;
