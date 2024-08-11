import { Box, Button, FormControl, FormLabel, Heading, Icon, Input, Link } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Resetpass = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    // Check if email and token are present in the URL
    if (!email || !token) {
      navigate("/404"); // Navigate to 404 page if email or token is missing
    }
  }, [navigate]);

  const handleResetPassword = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    // Check if email and token are present before making the API call
    if (!email || !token) {
      navigate("/404"); // Navigate to 404 page if email or token is missing
      return;
    }

    axios
      .put(`${process.env.REACT_APP_DATABASE_API_URL}/users/resetpass`, {
        email,
        token,
        password,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  const handleNavigate = () => {
    if (message) {
      navigate("/login");
    } else if (error) {
      navigate("/forgot");
    }
  };

  return (
    <div>
      <Box
        w="100%"
        textAlign="center"
        style={{
          margin: "auto",
          marginTop: "50px",
          marginBottom: "20px",
        }}
      >
        {message && <Icon as={FaCheckCircle} w={12} h={12} color="green.500" />}
        {error && <Icon as={FaTimesCircle} w={12} h={12} color="red.500" />}
        <Heading as="h3" size="xl" mt={6} mb={2}>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </Heading>
        {!message && (
          <Box maxW="md" mx="auto" mt={8} p={4}>
            <form>
              <FormControl id="email" mb={4}>
                <FormLabel>Nhập mật khẩu mới</FormLabel>
                <div>
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </FormControl>
              <Button
                type="button"
                colorScheme="blue"
                size="lg"
                w="full"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </form>
          </Box>
        )}
        {(message || error) && (
          <Link onClick={handleNavigate}>
            Go to {message ? "Login" : "Forgot Password"}
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Resetpass;
