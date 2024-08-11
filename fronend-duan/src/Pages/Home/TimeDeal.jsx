import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Square,
  Heading,
  Center,
  Button,
} from "@chakra-ui/react";
import { Navigation, Autoplay, Pagination, Grid } from "swiper/modules";
import { Swiper, SwiperSlide, slidesPerView } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import axios from "axios";

import { Link } from "react-router-dom";
import uuid from "react-uuid";
import "./stylehome.css";

const TimeDeal = ({ type, heading }) => {
  const [thoiGianConLai, setThoiGianConLai] = useState({
    gio: 0,
    phut: 0,
    giay: 0,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const thoiGianKetThuc = new Date();
    thoiGianKetThuc.setHours(23);
    thoiGianKetThuc.setMinutes(59);
    thoiGianKetThuc.setSeconds(59);

    const interval = setInterval(() => {
      const thoiGianHienTai = new Date();
      const thoiGianConLai = tinhThoiGianConLai(
        thoiGianHienTai,
        thoiGianKetThuc,
      );

      if (
        thoiGianConLai.gio >= 0 &&
        thoiGianConLai.phut >= 0 &&
        thoiGianConLai.giay >= 0
      ) {
        setThoiGianConLai(thoiGianConLai);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const tinhThoiGianConLai = (thoiGianHienTai, thoiGianKetThuc) => {
    const thoiGianConLai = Math.floor(
      (thoiGianKetThuc - thoiGianHienTai) / 1000,
    ); // Đổi sang giây

    const gio = Math.floor(thoiGianConLai / 3600);
    const phut = Math.floor((thoiGianConLai % 3600) / 60);
    const giay = thoiGianConLai % 60;

    return { gio, phut, giay };
  };

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    try {
      let responce = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/products`,
      );

      if (responce.data) {
        setFilteredProducts(responce.data || []);
      }
    } catch (error) { }
  };
  const listDataSale = filteredProducts.filter(
    (product) => product.prodSale > 0,
  );

  return (
    <Box
      justifyContent="center"
      w={{ lg: "80%", base: "90%" }}
      m="auto"
      mt="3"
      cursor="pointer"
      textAlign="center"
      backgroundColor="black"
      borderRadius="15px"
    >
      <Heading
        h="auto"
        textAlign="center"
        display="flex"
        w="100%"
        borderRadius="15px"
      >
        <Box width="100%" h={{ lg: 'auto', base: 10 }}>
          <Image
            borderRadius="15px"
            src="https://cdn.tgdd.vn/2023/11/campaign/GIF-BF-DESK-1200x120.gif"
            width="100%"
            h={{ lg: 'auto', base: 50 }}
          />
        </Box>
        <Box
          mt={{ lg: 6, base: 1 }}
          display="flex "
          mb="1"
          ml={{ lg: 6, base: 2 }}

          style={{ position: "absolute" }}
        >
          <Box mr="4" borderRadius="20px" display={{ lg: 'block', base: 'none' }}>
            {" "}
            <img
              width="40px"
              height="75px"
              src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/homev2/lightning-ic.png"
            />
          </Box>

          <Text>
            <Text fontSize={{ lg: 40, base: 13 }} color="#ffd559" mb={{ base: 0 }}>
              {" "}
              GIỜ VÀNG DEAL SỐC
            </Text>
            <Text fontFamily="-moz-initial" fontSize={{ lg: 24, base: 8 }} color="#fff" mt="3" display={{ lg: 'block', base: 'block' }} >
              <Text>
                {" "}
                <i>Kết thúc trong</i>{" "}
                <span
                  style={{
                    backgroundColor: "#ffe252",
                    borderRadius: "9px",
                    padding: "5px",
                    marginRight: "5px",
                    color: "black",
                  }}
                >
                  {thoiGianConLai.gio.toString().padStart(2, "0")}
                </span>
                :
                <span
                  style={{
                    backgroundColor: "#ffe252",
                    borderRadius: "9px",
                    padding: "5px",
                    marginRight: "5px",
                    color: "black",
                  }}
                >
                  {thoiGianConLai.phut.toString().padStart(2, "0")}
                </span>
                :
                <span
                  style={{
                    backgroundColor: "#ffe252",
                    borderRadius: "9px",
                    padding: "5px",
                    marginRight: "5px",
                    color: "black",
                  }}
                >
                  {thoiGianConLai.giay.toString().padStart(2, "0")}{" "}
                </span>
              </Text>{" "}
            </Text>
          </Text>
        </Box>
      </Heading>

      <Box mt="1" bachgroundColor="white">
        <Swiper
          slidesPerView={3}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={30}
          autoplay={{
            delay: 100000,
            disableOnInteraction: false,
          }}
          modules={[Grid, Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 1,
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
              slidesPerView: 5,
              spaceBetween: 1,
            },
          }}
        >
          {listDataSale.map((i) => (
            <Box key={uuid()}>
              <SwiperSlide>
                <Link to={`/${i.prodType}/${i.prodID}`}>
                  <Box
                    key={i.prodID}
                    className="list"
                    p="2"
                    mt="4"
                    m={{ lg: 2, base: 1 }}
                    backgroundColor="white"
                    borderRadius="15px "
                    // boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                    w=""
                    h="auto"
                    boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                  >
                    <Box className="img">
                      <Square
                        m="auto"
                        w={{ lg: 200, base: 150 }}
                        h={{ lg: 200, base: 150 }}
                        transition="transform 0.3s ease-in-out"
                        _hover={{ transform: "scale(1.1)" }}
                      >
                        <Image
                          src={`${i.prodImg}`}
                          maxW={{ base: 150, lg: 200 }}
                          maxH={{ base: 100, lg: 150 }}
                          objectFit={"cover"}
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
                        {i.prodName.substring(0, i.prodName.length / 0.5) +
                          "..."}
                      </Text>
                      <Box mt="2.5" m="10px 10px 10px 10px">
                        <Flex>
                          <Square>
                            <Text
                              color="gray.600"
                              fontSize={{ lg: "14px", base: "12px" }}
                              m="auto"
                            >
                              Giá mới:{" "}
                            </Text>
                          </Square>
                          <Square>
                            <Text
                              textAlign="center"
                              fontWeight="650"
                              fontSize={{ lg: "18px", base: "14px" }}
                              m="auto"
                              ml="1"
                              color="red"
                              _hover={{ color: "red" }}
                            >
                              {i.prodPrice &&
                                i.prodPrice.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </Text>
                          </Square>
                        </Flex>
                        {i.prodSale !== 0 && (
                          <>
                            <Flex>
                              <Text
                                color="gray.600"
                                fontSize={{ lg: "14px", base: "12px" }}
                                mb="2%"
                              >
                                Giá gốc:{" "}
                              </Text>
                              {"  "}
                              <Text
                                as="s"
                                color="gray.600"
                                fontSize={{ lg: "14px", base: "12px" }}
                                ml="2"
                              >
                                {i.prodPriceSale &&
                                  i.prodPriceSale.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                              </Text>
                            </Flex>
                            {i.prodSale >= 20 ? (
                              <Box
                                borderRadius="5px"
                                w={{ lg: "70%", base: "100%" }}
                                backgroundImage="linear-gradient(135deg, rgb(255, 87, 87) 0%, rgb(255, 0, 0) 100%)"
                                color="#fff "
                                _hover={{ color: "black" }}
                                mt=""
                                textAlign="center"
                              >
                                <Text
                                  fontSize={{ lg: "13px", base: "12px" }}
                                  fontWeight="500"
                                >
                                  GIẢM GIÁ SỐC -{i.prodSale}%
                                </Text>
                              </Box>
                            ) : (
                              <Flex>
                                <Text
                                  color="gray.600"
                                  fontSize={{ lg: "14px", base: "12px" }}
                                >
                                  Giảm giá:{" "}
                                </Text>
                                {"  "}
                                <Text
                                  bgColor="#fff0e9"
                                  color="#eb5757"
                                  fontSize={{ lg: "14px", base: "12px" }}
                                  fontWeight="700"
                                  borderRadius="5px"
                                  ml="1"
                                >
                                  -{i.prodSale}%
                                </Text>
                              </Flex>
                            )}
                          </>
                        )}
                        <Box
                          display="flex"
                          backgroundColor="yellow"
                          borderRadius="15px"
                        >
                          <Box ml="3%">
                            <img
                              width="20px"
                              height="auto"
                              src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/fs-iconfire.png"
                            />
                          </Box>
                          <Box m={{ lg: "1% 3%", base: "3% 3%" }}>
                            <Text
                              m="auto"
                              fontSize={{ lg: "auto", base: "12px" }}
                            >
                              <b>Còn {i.QTY}/100 suất</b>
                            </Text>
                          </Box>
                        </Box>
                      </Box>
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

export default TimeDeal;
