import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Flex,
  Text,
  Image,
  Square,
  Badge,
  Heading,
  useToast,
  Center,
  Button,
} from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import "./stylehome.css";

const BlogHome = ({ type, heading }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_API_URL}/blog`,
      );
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Center>
      <Box w={{ lg: "80%", base: "90%" }} mt={10} mb={10}>
        <Flex justifyContent={"space-between"} mb={5}>
          <Box>
            <Text
              fontSize={{ lg: "2x1", base: "22px" }}
              width=""
              fontWeight="700"
              textColor="black"
              className="headingHome"
            >
              {heading}
            </Text>
          </Box>
          <Box>
            {/* <Button
                            border="1px"
                            mr={2}
                            borderRadius={20}
                            className="custom-prev"
                        >
                            <ArrowBackIcon fontSize={30} />
                        </Button>
                        <Button border="1px" borderRadius={20} className="custom-next">
                            <ArrowForwardIcon fontSize={30} />
                        </Button> */}
          </Box>
        </Flex>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 3000 }}
          speed={1000}
          effect="fade" // Hiệu ứng chuyển slide
          // navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          // navigation
          onSlideChange
          breakpoints={{
            0: {
              slidesPerView: 1,
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
              spaceBetween: 6,
            },
            1366: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
          }}
        >
          {data.map((i) => (
            <Box Box key={uuid()}>
              <SwiperSlide>
                <Link to={`/blog/${i.blogID}`}>
                  <Center>
                    <Box
                      w={"100%"}
                      p="2"
                      bgColor={"white"}
                      m={1}
                      borderRadius={15}
                    >
                      <Image
                        borderRadius={15}
                        src={`${i.thumbnail}`}
                        w={"100%"}
                        maxH={{ lg: 250, base: 200 }}
                      />
                      <Center>
                        <Box>
                          <Text
                            mt={5}
                            fontWeight={500}
                            fontSize={18}
                            color={"black"}
                          >
                            {i.title}
                          </Text>
                        </Box>
                      </Center>
                    </Box>
                  </Center>
                </Link>
              </SwiperSlide>
            </Box>
          ))}
        </Swiper>
      </Box>
    </Center>
  );
};

export default React.memo(BlogHome);
