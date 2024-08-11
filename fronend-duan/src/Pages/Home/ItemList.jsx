import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { v4 as uuid } from "uuid";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import {
  Flex,
  Text,
  Image,
  Square,
  Box,
  Center,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ItemList = ({ type, heading }) => {
  return (
    <Center>
      <Center
        mb="2"
        w={{ lg: "80%", base: "90%" }}
        display="flex"
        flexWrap="wrap"
      >
        <Flex
          justifyContent="center"
          w="100%"
          mt="6"
          cursor="pointer"
          textAlign="center"
        >
          <Box
            w="100%" // Adjust the width of the Swiper slider as needed
            m="auto"
            mt="1"
          >
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1366: {
                  slidesPerView: 5,
                  spaceBetween: 2,
                },
              }}
              grid={{ rows: 2, fill: "row" }}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Grid, Autoplay]}
              className="mySwiper"
            >
              {type.map((i) => (
                <Box key={uuid()}>
                  <SwiperSlide>
                    <Box
                      className="list"
                      p="2"
                      m={0.5}
                      borderRadius="15px"
                      borderWidth={1}
                      borderColor={"#ccc"}
                      h="auto"
                      bg="white"
                    >
                      <Link to={`/${i.type}/${i.id}`}>
                        <Box className="list" w="" h="auto">
                          <Box className="img">
                            <Square
                              m="auto"
                              w={{ lg: 200, base: 150 }}
                              h={{ lg: 200, base: 150 }}
                              transition="transform 0.3s ease-in-out"
                              _hover={{ transform: "scale(1.1)" }}
                            >
                              <Image
                                src={`${i.img}`}
                                maxW={{ lg: 200, base: 150 }}
                                maxH={{ lg: 150, base: 100 }}
                                objectFit={"fill"}
                              />
                            </Square>

                            <Text
                              mt="2"
                              height={["70px", "65px", "30px"]}
                              fontFamily={"Arial"}
                              color="#424245"
                              noOfLines={2}
                              textAlign="center"
                              fontSize={{ lg: "17px", base: "15px" }}
                              _hover={{ color: "blue" }}
                              fontWeight="700"
                            >
                              {i.name}
                            </Text>
                            <Box mt="3" m="10px 0 30px 0px">
                              <Flex justifyContent="center">
                                <Square>
                                  <Text
                                    color="gray.600"
                                    fontSize={{ lg: "14px", base: "12px" }}
                                  >
                                    Giá mới :{" "}
                                  </Text>
                                </Square>
                                <Square>
                                  <Text
                                    fontWeight="600"
                                    fontSize={{ lg: "18px", base: "14px" }}
                                    ml="1"
                                    color="red"
                                    _hover={{ color: "red" }}
                                  >
                                    {i.price &&
                                      i.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                  </Text>
                                </Square>
                              </Flex>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </Box>
                  </SwiperSlide>
                </Box>
              ))}
            </Swiper>
          </Box>
        </Flex>
        <Center w="80%" mt="2">
          <Link to={`/${heading}`}>
            <Button
              variant="outline"
              w="100%"
              mt="6"
              bg="white"
              color="#424245"
              _hover={{ color: "blue" }}
              fontWeight="700"
            >
              Xem thêm
            </Button>
          </Link>
        </Center>
      </Center>
    </Center>
  );
};

export default React.memo(ItemList);
