import React from "react";
import { Text, Button, Center } from "@chakra-ui/react";

const Btn = () => {
  return (
    <Center>
      <Button
        background="#68cdf8"
        color="whiteAlpha.900"
        borderRadius="3xl"
        border="1px"
        p="5"
        _hover={{
          background: "whiteAlpha.900",
          color: "#003380",
          borderRadius: "3xl",
          p: "5",
          border: "1px",
          variant: "outline",
        }}
      >
        <Text fontSize="xl" fontWeight="200">
          Xem tất cả
        </Text>
      </Button>
    </Center>
  );
};

export default Btn;
