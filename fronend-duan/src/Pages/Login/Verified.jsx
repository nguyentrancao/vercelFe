import { Box, Heading, Icon } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Verified = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");

    axios
      .get(
        `${process.env.REACT_APP_DATABASE_API_URL}/users/verify?email=${email}&token=${token}`,
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }, []);

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
        {message ? (
          <Icon as={FaCheckCircle} w={12} h={12} color="green.500" />
        ) : (
          <Icon as={FaTimesCircle} w={12} h={12} color="red.500" />
        )}
        <Heading as="h3" size="xl" mt={6} mb={2}>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </Heading>
      </Box>
    </div>
  );
};

export default Verified;
