import React, { useState, useEffect } from "react";
import { Box, Image, Center, Flex, AspectRatio } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import uuid from "react-uuid";

const BannerCenter = ({ type }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box cursor="pointer">
      <Center>
        <Box width="100%" justifyContent="center">
          {type.map((i) => (
            <Box className="bannerheader" key={uuid()} h="auto" display="flex">
              {isMobile ? (
                <video controls autoPlay>
                  <source
                    src={require("./videoQuangcao/quangcao.mp4")}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <Image src={`${i.imgbnct}`} width="100%" />
              )}
            </Box>
          ))}
        </Box>
      </Center>
    </Box>
  );
};

export default BannerCenter;
