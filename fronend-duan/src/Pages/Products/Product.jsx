import React, { useCallback } from "react";

import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { BsSuitHeart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import RatingBar from "./RatingBar";
import "./product.css";
import { getProducts } from "../../Redux/Wishlist/products.action";
import debounce from "lodash.debounce";
const postSingleDataWish = async (data) => {
  const userID = Cookies.get("userID");

  if (userID === undefined) {
    throw new Error("userID is undefined");
  }

  try {
    const postData = {
      prodID: data.prodID,
      colorID: data.colorID,
      storageID: data.storageID,
      userID: userID,
      ramID: data.ramID,
    };
    const responseGet = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/wishlist/${userID}`,
    );
    const wishlist = responseGet.data;

    const productExists = wishlist.some(
      (product) =>
        product.prodID === data.prodID &&
        product.colorID === data.colorID &&
        product.storageID === data.storageID &&
        product.ramID === data.ramID,
    );

    if (productExists) {
      throw new Error("Product already exists in the wishlist");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DATABASE_API_URL}/wishlist/`,
          postData,
        );
        return response.data;
      } catch (error) {
        console.log("An error occurred while posting data: ", error);
        throw error;
      }
    }
  } catch (error) {
    console.log("An error occurred while getting wishlist data: ", error);
    throw error;
  }
};
// const singleData = useSelector((store) => store.singleProduct.data);

const Product = (props, rating) => {
  const { data } = props;
  const {
    prodType,
    prodID,
    prodName,
    prodImg,
    prodPrice,
    prodPriceSale,
    prodSale,
    prodRateAvg,
  } = data;
  const userID = Cookies.get("userID");
  var navigate = useNavigate();
  const toast = useToast();
  const handleWish = async () => {
    try {
      await postSingleDataWish(data);
      toast({
        position: "top",
        title: "Đã thêm vào yêu thích",
        status: "success",
        duration: 500,
        isClosable: true,
      });
    } catch (error) {
      if (error.message === "Product already exists in the wishlist") {
        toast({
          position: "top",
          title: "Sản phẩm đã tồn tại trong yêu thích",
          status: "error",
          duration: 500,
          isClosable: true,
        });
      } else if (error.message === "userID is undefined") {
        toast({
          position: "top",
          title: "Vui lòng đăng nhập trước",
          description: "Bạn cần đăng nhập để thực hiện chức năng này",
          status: "error",
          duration: 500,
          isClosable: true,
        });
        navigate("/login");
      } else {
        console.log("no error: ", error);
      }
    }
  };
  const debouncedHandleWish = useCallback(
    debounce((prodID) => handleWish(prodID), 500),
    [],
  );
  console.log(data, "logdata");
  return (
    <div className="div_1">
      <Link to={`/${prodType}/${prodID}`}>
        <Box h={[280, 360, 450]}>
          <Box padding="10px">
            <FontAwesomeIcon icon={faEye} /> Xem
          </Box>
          <Center>
            <Image
              src={prodImg}
              alt={prodName}
              w={["auto", "80%", "auto"]}
              h={["100px", "80%", "200px"]}
              objectFit="cover"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "translateY(-10px)" }}
            />
          </Center>
          {prodSale !== 0 && (
            <Box className="div_2">
              <Box
                className="box_1"
                fontSize={{ base: "15px", md: "20px", lg: "18px" }}
                h={["20px", "40px", "70px"]}
              >
                {prodName}
              </Box>
              <Box w="100%" marginBottom="2" marginLeft={5}>
                <RatingBar rating={prodRateAvg || 0.5} />
                <Heading
                  as="h3"
                  fontSize={{ base: "10px", md: "15px", lg: "13px" }}
                  color="red"
                  fontWeight="black"
                >
                  Giá mới:{" "}
                  {prodPrice &&
                    prodPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </Heading>
                <Text
                  fontSize={{ base: "10px", md: "15px", lg: "13px" }}
                  m="auto"
                  mt={2}
                  fontWeight="bold"
                  color="blackAlpha.600"
                  textDecoration="line-through"
                >
                  Giá gốc:{" "}
                  {prodPriceSale &&
                    prodPriceSale.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </Text>
              </Box>
              <Badge
                borderRadius="5px"
                width="auto"
                px="2"
                backgroundColor="#fff0e9"
                color="#eb5757"
                fontSize={{ base: "10px", md: "15px", lg: "13px" }}
                ml="5%"
              >
                Giá ưu đãi
              </Badge>
            </Box>
          )}
          {prodSale === 0 && (
            <Box className="div_2">
              <Box
                className="box_1"
                h={["20px", "40px", "70px"]}
                fontSize={{ base: "15px", md: "15px", lg: "18px" }}
              >
                {prodName}
              </Box>
              <Box w="100%" marginBottom="2" marginLeft={5}>
                <RatingBar rating={prodRateAvg || 0.5} />
                <Heading
                  as="h3"
                  fontSize={{ base: "10px", md: "15px", lg: "13px" }}
                  color="red"
                  fontWeight="black"
                >
                  Giá:{" "}
                  {prodPrice &&
                    prodPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </Heading>
              </Box>
              <Badge
                borderRadius="5px"
                width="auto"
                px="2"
                backgroundColor="#fff0e9"
                color="#eb5757"
                fontSize={{ base: "10px", md: "15px", lg: "13px" }}
                ml="5%"
              >
                Giá tốt
              </Badge>
            </Box>
          )}
        </Box>
      </Link>
      <Button onClick={() => debouncedHandleWish(prodID)}>
        <BsSuitHeart /> Yêu Thích
      </Button>
    </div>
  );
};

export default Product;
