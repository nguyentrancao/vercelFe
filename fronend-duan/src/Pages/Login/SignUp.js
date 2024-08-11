import {
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../../Redux/Auth/auth.action";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernamesFromApi, setUsernamesFromApi] = useState([]);
  const [emailsFromApi, setEmailsFromApi] = useState([]);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const toast = useToast();
  const { isAuth } = useSelector((store) => store.AuthManager);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { googleSignIn, user } = UserAuth(); // Lấy thông tin người dùng từ Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DATABASE_API_URL}/users/`,
        );
        setUsernamesFromApi(response.data.map((user) => user.username));
        setEmailsFromApi(response.data.map((user) => user.email));
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchData();
  }, []);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({
        position: "top",
        title: "Hãy điền đầy đủ thông tin",
        description: "Hãy kiểm tra lại",
        status: "error",
        duration: 500,
        isClosable: true,
      });
      return;
    }

    if (isValidEmail(email)) {
      try {
        const payload = {
          username,
          email,
          password,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_DATABASE_API_URL}/users/register`,
          payload,
        );

        if (response.data && response.data.error) {
          toast({
            title: "Lỗi đăng ký",
            description: response.data.error,
            status: "error",
            duration: 500,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Tạo tài khoản thành công",
            description: "Hãy kiểm tra email của bạn để xác thực tài khoản.",
            status: "success",
            duration: 500,
            isClosable: true,
          });

          setUserName("");
          setEmail("");
          setPassword("");

          setTimeout(() => {
            navigate("/login");
          }, 2200);
        }
      } catch (error) {
        console.error("Error: ", error);
        toast({
          position: "top",
          title: "Lỗi đăng ký",
          description: "Có lỗi xảy ra khi đăng ký tài khoản.",
          status: "error",
          duration: 500,
          isClosable: true,
        });
      }
    } else {
      toast({
        position: "top",
        title: "Email không hợp lệ",
        description: "Vui lòng nhập đúng định dạng email",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
      toast({
        position: "top",
        title: "Login Success",
        description: `Welcome ${username}`,
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  }, [isAuth, username, navigate, toast]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Use the name attribute to determine which field is being updated
    if (name === "username") {
      setUserName(value);

      // Check for duplicate username
      if (usernamesFromApi.includes(value)) {
        setIsUsernameDuplicate(true);
        toast({
          position: "top",
          title: "Username đã tồn tại",
          description: "Hãy sử dụng username khác",
          status: "error",
          duration: 500,
          isClosable: true,
        });
      } else {
        setIsUsernameDuplicate(false);
      }
    } else if (name === "email") {
      setEmail(value);

      // Check for duplicate email
      if (emailsFromApi.includes(value)) {
        setIsEmailDuplicate(true);
        toast({
          position: "top",
          title: "Email đã tồn tại",
          description: "Hãy sử dụng email khác",
          status: "error",
          duration: 500,
          isClosable: true,
        });
      } else {
        setIsEmailDuplicate(false);
      }
    }
  };
  return (
    <div className="form-container sign-up-container">
      <form>
        <h1>Tạo tài khoản</h1>
        <div className="social-container">
          <a href="#" onClick={handleGoogleSignIn} className="social">
           <i className="fab fa-google-plus-g" />
          </a>
          
        </div>
        <span>Hoặc đăng ký bằng email</span>
        <input
          type="text"
          name="username"
          placeholder="Nhập tên người dùng"
          value={username}
          onChange={handleChange}
          onBlur={handleChange} // Check duplicates on blur
          style={{ border: isUsernameDuplicate ? "1px solid red" : "" }}
          className={isUsernameDuplicate ? "shake-animation" : ""}
        />

        <input
          type="email"
          name="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={handleChange}
          onBlur={handleChange} // Check duplicates on blur
          style={{ border: isEmailDuplicate ? "1px solid red" : "" }}
          className={isEmailDuplicate ? "shake-animation" : ""}
        />

        <InputGroup>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <button className="action-btn" onClick={handleSubmit}>
          Đăng ký
        </button>
      </form>
    </div>
  );
}
export default SignUpForm;
