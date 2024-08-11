import React from "react";
import { Box, Image, Center, Flex } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import uuid from "react-uuid";
import "./stylehome.css";

const ItemCard1 = ({ type }) => {
  return (
    <Box cursor="pointer">
      <Center>
        <Box width="70%" justifyContent="center" className="bannercenter">
          <Slide>
            {type.map((i) => (
              <Flex key={uuid()} h="220px" justifyContent="space-between">
                <Box flex="1">
                  <Image
                    src={`${i.img1}`}
                    alt={i.caption}
                    className="BannerTrai"
                    p="1"
                    borderRadius="15px"
                  />

                  <Image
                    src={`${i.img2}`}
                    alt={i.caption}
                    className="BannerPhai"
                    p="1"
                    borderRadius="15px"
                  />
                </Box>
              </Flex>
            ))}
          </Slide>
        </Box>
      </Center>
    </Box>
  );
};

export default ItemCard1;
