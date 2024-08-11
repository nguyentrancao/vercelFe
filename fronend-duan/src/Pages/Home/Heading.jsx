import React from "react";
import { Flex, Text, Center, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./stylehome.css";

const Heading = ({ heading }) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <Flex gap="2">
      <Center
        width="100%"
        backgroundColor=""
        h="60px"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Text
            fontSize="2xl"
            width=""
            fontWeight="700"
            textColor="black"
            className="headingHome"
          >
            {heading}
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default Heading;
