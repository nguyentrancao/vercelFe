import React, { useState } from "react";
import {
  Input,
  FormLabel,
  Box,
  Button,
  Heading,
  FormControl,
} from "@chakra-ui/react";

import Cookies from "js-cookie";
//import chakraUI toast
import { useToast } from "@chakra-ui/react";
import { Toast } from "bootstrap";
const ChangePass = () => {
  const userID = Cookies.get("userID");
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        position: "top",
        title: "Mật khẩu mới và xác nhận mật khẩu không khớp",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Your fetch logic here
    // Ensure to replace the placeholder URL with your actual backend endpoint
    const response = await fetch(
      `${process.env.REACT_APP_DATABASE_API_URL}/users/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID,
          oldPassword: currentPassword,
          newPassword,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast({
        position: "top",
        title: "Đổi mật khẩu thành công",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: data.error || "Có lỗi xảy ra khi đổi mật khẩu",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      id="chang-pwd"
      maxW={["100%", "30%"]}
      mx="auto"
      mt="40px"
      p="20px"
      borderWidth="1px"
      borderRadius="md"
      className="profile-container"
    >
      <Heading mb="20px">Đổi mật khẩu</Heading>

      <form>
        <FormControl mb="20px">
          <FormLabel>Mật khẩu hiện tại</FormLabel>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mb="20px">
          <FormLabel>Mật khẩu mới</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FormControl>

        <FormControl mb="20px">
          <FormLabel>Xác nhận mật khẩu</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Đổi mật khẩu
        </Button>
      </form>
    </Box>
  );
};

export default ChangePass;
