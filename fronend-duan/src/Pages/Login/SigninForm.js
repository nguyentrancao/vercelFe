import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { login, loginGoogle } from "../../Redux/Auth/auth.action";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
function SignInForm() {
  const [loginCreds, setLoginCreds] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuth, username } = useSelector((store) => store.AuthManager);
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth(); // Lấy thông tin người dùng từ Firebase
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(); // Bắt đầu quá trình đăng nhập bằng Google
      // Không cần gọi dispatch(loginGoogle(user)) ở đây

      // Đợi đến khi người dùng được xác thực và thông tin người dùng sẵn sàng
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // Sau khi nhận được thông tin người dùng, thực hiện đăng nhập
          dispatch(loginGoogle(currentUser));
          // Hủy đăng ký theo dõi để ngừng lắng nghe thay đổi trạng thái
          unsubscribe();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCreds((prevLoginCreds) => ({
      ...prevLoginCreds,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginCreds));
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
      toast({
        position: "top",
        title: "Đăng nhập thành công",
        description: `Welcome ${username}`,
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  }, [isAuth, username, navigate, toast]);
  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <a href="#" onClick={handleGoogleSignIn} className="social">
            <i className="fab fa-google-plus-g" />
          </a>
         {/* <a></a>  */}
        </div>
        <span>hoặc sử dụng tài khoản</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <a href="/forgot">Quên mật khẩu ?</a>
        <button className="action-btn">Đăng nhập</button>
      </form>
    </div>
  );
}

export default SignInForm;
