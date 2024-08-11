import React, { useEffect } from "react";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import { GetData } from "./OrderCheckout";
import { useState } from "react";

const MyCartLength = ({ item }) => {
  const breakpoints = {
    base: "320px", // 0px
    sm: "480px", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "600px", // ~768px
    lg: "800px", // ~992px
    xl: "768px", // ~1280px
    "2xl": "1024px", // ~1536px
  };
  const toast = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);


  }, []);
  return (
    <div width={{ "2xl": "" }}>
      <Flex
        border={"1px solid rgb(224, 224, 225)"}
        backgroundColor="rgb(255, 255, 255)"
        boxShadow={"rgb(0 0 0 / 6%) 0px 2px 2px"}
        borderRadius="4px"
        padding={"16px"}
        marginBottom={{ "2xl": "8px", base: "0" }}
        width={"100%"}
        justifyContent="space-between"
        marginTop={{ "2xl": "20px", base: "0" }}
      >
        <Box>
          <Heading fontWeight={600} fontSize="16px">
            Giỏ hàng ({item} sản phẩm)
          </Heading>
        </Box>
        <Box>
          <Heading fontWeight={600} fontSize="16px"></Heading>
        </Box>
      </Flex>
    </div>
  );
};

export default MyCartLength;
