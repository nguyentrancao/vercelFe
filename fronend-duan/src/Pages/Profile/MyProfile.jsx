"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  FormLabel,
  Avatar,
  Stack,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  Textarea,
  Text,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
} from "@chakra-ui/react";
import "react-slideshow-image/dist/styles.css";

import MyOrder from "./MyOrder";
import ChangePass from "./ChangePass";
import { useToast } from "@chakra-ui/react";

export default function MyProfile() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const handleFormChange = (newStep) => {
    setStep(newStep);
    setProgress((newStep - 1) * 33.33);
  };

  return (
    <>
      <Box width={["100%", "90%", "80%"]} p={6} m="5px auto" as="form">
        <ButtonGroup w="100%">
          <Flex w="100%" justifyContent="center">
            <Box w={["100%", "300px", "50%"]} display={["block","flex","flex"]}>
              <Button
                onClick={() => handleFormChange(1)}
                isDisabled={step === 1}
                bg="#4a90e2"
                color="white"
                variant="solid"
                fontSize="20px"
                w={["100%", "300px", "300px"]}
                height="50px"
                mr="5%"
              >
                Đơn hàng
              </Button>
              <Button
                onClick={() => handleFormChange(2)}
                isDisabled={step === 2}
                bg="#4a90e2"
                color="white"
                variant="solid"
                fontSize="20px"
                w={["100%", "300px", "300px"]}
                height="50px"
                mr="5%"
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Flex>
        </ButtonGroup>
        {step === 1 ? <MyOrder /> : <ChangePass />}
      </Box>
    </>
  );
}
