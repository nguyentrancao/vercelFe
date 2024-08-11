import {
  Box,
  Flex,
  Image,
  Square,
  Text
} from "@chakra-ui/react";
import React from "react";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RatingBar from "./RatingBar";

import { Link } from "react-router-dom";
import uuid from "react-uuid";

const HotProduct = ({ type }) => {
  return (
    <Box
      w="80%"
      m="auto"
      mt="6"
      cursor="pointer"
      backgroundColor="#9b000a"
      borderRadius="5px"
      css={{ "@media (max-width: 768px)": { display: "none" } }}
    >
      <Box display="flex" justifyContent="center" width="100%">
        <Text width="100%" backgroundColor="#9b000a" h="auto">
          <img
            src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/11/campaign/Frame-2-1200x120.png"
            width="100%"
          />{" "}
        </Text>
      </Box>

      <Box mt="2" ml="4" mr="4">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          // autoplay={{ delay:  }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1366: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          {type.map((i) => (
            <Box key={uuid()}>
              <SwiperSlide>
                <Link to="/computers/">
                  <Box
                    p="5"
                    ml="1"
                    height="auto"
                    mb="5"
                    backgroundColor="white"
                    borderRadius="10px"
                    transition="transform 2s ease-in-out"
                    boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                  >
                    <Box padding="10px" textAlign="left">
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </Box>
                    <Square
                      m="auto"
                      _hover={{ transform: "translateY(-10px)" }}
                    >
                      <Image src={`${i.img}`} alt={i.name} boxSize="160px" />
                    </Square>
                    <Box height="30px">
                      <Text
                        color="#424245"
                        noOfLines={2}
                        textAlign="center"
                        fontSize="15px"
                        fontWeight="bold"
                        _hover={{ color: "blue" }}
                      >
                        {i.name}
                      </Text>
                    </Box>
                    <Box mt="2.5" m="20px 0 30px 0" w="100%">
                      <Flex width="100%" display="flex" flexWrap="wrap">
                        <Box w="100%" textAlign="left">
                          <RatingBar rating={3} />
                        </Box>
                        <Square>
                          <Text color="gray.600" fontSize="14px" mt="2">
                            Giá mới :{" "}
                          </Text>
                        </Square>
                        <Square>
                          <Text
                            fontWeight="800"
                            fontSize="18px"
                            ml="2"
                            mt="2"
                            color="red"
                          >
                            {i.price &&
                              i.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                          </Text>
                        </Square>
                      </Flex>
                      {i.original !== 0 && (
                        <>
                          <Flex>
                            <Text
                              color="gray.600"
                              fontSize="14px"
                              mt="2"
                              mb="2"
                            >
                              Giá gốc:{" "}
                            </Text>
                            {"  "}
                            <Text
                              as="s"
                              color="gray.600"
                              fontSize="14px"
                              ml="2"
                              mt="2"
                              mb="2"
                            >
                              {i.original &&
                                i.original.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </Text>
                          </Flex>
                          <Box
                            padding="3px"
                            borderRadius="5px"
                            w="50%"
                            color="#EC4C0A"
                            bg="#FEB373"
                            mt="2"
                            textAlign="center"
                            mb="10"
                          >
                            <Text fontSize="10px" fontWeight="500">
                              GIẢM GIÁ SỐC
                            </Text>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Link>
              </SwiperSlide>
            </Box>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HotProduct;
