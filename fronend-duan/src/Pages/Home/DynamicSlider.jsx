import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { v4 as uuid } from "uuid";
import { Autoplay, Grid } from "swiper/modules";
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
import "./stylehome.css";

const DynamicSlider = ({ type, heading }) => {
  return (
    <Center>
      <Center
        mb="2"
        w={{ lg: "80%", base: "90%" }}
        display="flex"
        flexWrap="wrap"
      >
        <Box
          display={{ lg: "none", sm: "block" }}
          w="100%"
          h="auto"
          position="relative"
          overflow="hidden"
          borderRadius="15px"
          mt={5}
        >
          <Image
            src="//isotech-demo.myshopify.com/cdn/shop/files/Watch_Banner_7b3ae013-75a3-479c-a76f-7c2eea9d4a9e_1500x.png?v=1696738786"
            alt="Smart Watch"
            height="100%"
            loading="lazy"
            borderRadius="15px"
            zIndex={1}
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Stack
            ml="35px"
            mb="125%"
            position="absolute"
            bottom={4}
            zIndex={1} // Đặt zIndex của Stack lên cao hơn hình ảnh
          >
            <Box
              //hiện box này bên trên banner image và trong box này có text overlay và button show now có width bên trong Image
              color="white"
              r={1}
              p="5px"
              w="100%"
              h="auto"
              borderColor={"#555"}
            >
              <h3>SmartWatch</h3>
              <p>
                Làm chủ thời gian và công nghệ với đồng hồ thông minh hiện đại
              </p>
              <Link to="/smartwatch">
                <Button>Xem thêm</Button>
              </Link>
            </Box>
          </Stack>
        </Box>
        <Flex
          justifyContent="center"
          w="100%"
          mt="6"
          cursor="pointer"
          textAlign="center"
        >
          <Box
            display={{ lg: "block", base: "none" }}
            w="30%"
            h="auto"
            position="relative"
            overflow="hidden"
            borderRadius="15px"
            m={1}
            mr={"1%"}
          >
            <Image
              src="//isotech-demo.myshopify.com/cdn/shop/files/Watch_Banner_7b3ae013-75a3-479c-a76f-7c2eea9d4a9e_1500x.png?v=1696738786"
              alt="Smart Watch"
              height="100%"
              loading="lazy"
              borderRadius="15px"
              zIndex={1}
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
            />
            <Stack
              ml="35px"
              mb="135%"
              position="absolute"
              bottom={4}
              zIndex={1} // Đặt zIndex của Stack lên cao hơn hình ảnh
            >
              <Box
                //hiện box này bên trên banner image và trong box này có text overlay và button show now có width bên trong Image
                color="white"
                right={1}
                p="2"
                w="90%"
                h="auto"
                borderColor={"#555"}
              >
                <h3>SmartWatch</h3>
                <p>
                  Làm chủ thời gian và công nghệ với đồng hồ thông minh hiện đại
                </p>
                <Link to="/smartwatch">
                  <Button>Xem thêm</Button>
                </Link>
              </Box>
            </Stack>
          </Box>
          {/* Banner Image */}

          {/* Text Overlay */}

          {/* Swiper Slider */}
          <Box
            w={{ lg: "70%", base: "100%" }} // Adjust the width of the Swiper slider as needed
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
                  slidesPerView: 2,
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
                  slidesPerView: 4,
                  spaceBetween: 5,
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
                        <Box className="list" p="2" w="" h="auto">
                          <Box className="img">
                            <Square
                              m="auto"
                              w={100}
                              h={200}
                              transition="transform 0.3s ease-in-out"
                              _hover={{ transform: "scale(1.1)" }}
                            >
                              <Image
                                src={`${i.img}`}
                                maxW={200}
                                maxH={150}
                                objectFit={"fill"}
                              />
                            </Square>

                            <Text
                              mt="2"
                              height="70px"
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
      </Center>
    </Center>
  );
};

export default React.memo(DynamicSlider);
