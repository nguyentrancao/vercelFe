import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  Text,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaWallet } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
const CheckoutBox = ({
  items,
  totalPrice,
  paybalPrice,
  discount,
  setVal,
  handleApply,
}) => {
  const breakpoints = {
    base: "320px", // 0px
    sm: "480px", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "600px", // ~768px
    lg: "800px", // ~992px
    xl: "768px", // ~1280px
    "2xl": "1024px", // ~1536px
  };
  const userID = Cookies.get("userID");
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || {};

  // Get the user's cart directly using the userID
  const userCart = cartData[userID] || [];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckout = async () => {
    const userID = Cookies.get("userID");
    const paymentMethod = selectedOption;
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || {};
    const userCart = cartData[userID] || [];
    const amount = paybalPrice;

    const bankCode = "VNBANK";
    const language = "vn";
    if (items === 0) {
      toast({
        title: "Please login and add items to cart",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (selectedOption === "cash") {
      setTimeout(async () => {
        // Remove the cart data for the specific userID
        delete cartData[userID];
        // Update the cartData in sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cartData));
        try {
          toast({
            title: "Thanh toán khi nhận hàng",
            description: "Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/");
          const response = await axios.post(
            `${process.env.REACT_APP_DATABASE_API_URL}/orders/cod`,
            {
              userID,
              amount,
              userCart,
            },
            {
              withCredentials: true,
            },
          );
        } catch (error) {
          console.error(error);
          toast({
            title: "Lỗi",
            description: "Có lỗi khi đặt hàng",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    } else {
      toast({
        title: "Thanh toán ngân hàng",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(async () => {
        //clear session storage for cart by userID

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_DATABASE_API_URL}/orders/create_payment_url`,
            {
              userID,
              amount,
              bankCode,
              language,
              userCart,
            },
            {
              withCredentials: true,
            },
          );

          // Check if vnpUrl exists in response data
          if (response.data) {
            delete cartData[userID];
            // Update the cartData in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(cartData));

            window.location.href = response.data;
          } else {
            console.error("No vnpUrl found in response data");
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  };
  const username = Cookies.get("username");
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DATABASE_API_URL}/users/address/${username}`,
      )
      .then((response) => {
        setAddressData(response.data);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });
  }, [username]);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var tomorrow = new Date();
  tomorrow.setTime(tomorrow.getTime() + 1000 * 3600 * 24);
  var dayName = new Array(
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  );
  var monName = new Array(
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  );
  var now = new Date();
  var dtString = dayName[now.getDay()] + " - " + now.getDate();
  var change =
    dayName[tomorrow.getDay()] +
    " - " +
    tomorrow.getDate() +
    ", " +
    monName[now.getMonth()] +
    ", " +
    tomorrow.getFullYear();
  return (
    <div>
      <Center
        w="100%"
        mt="5"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
      >
        <Box w="94%" mt={{ "2xl": "15px" }} mb={{ "2xl": "15px" }}>
          <Text fontSize={{ "2xl": "25px", base: "20px" }} fontWeight="700">
            Chọn phương thức thanh toán:
          </Text>
          <Flex
            w="auto"
            h="auto"
            display="flex"
            flexWrap={{ "2xl": "wrap" }}
            width="100%"
          >
            {["cash", "vnpay"].map((option) => (
              <Box
                width="100%"
                key={option}
                className={`payment-option ${
                  selectedOption === option ? "selected" : ""
                }`}
                style={{
                  backgroundColor:
                    selectedOption === option ? "#c6e0f7" : "white",

                  borderShadow:
                    selectedOption === option ? "0 0 0 3px #3182ce" : "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleOptionClick(option)}
              >
                <Center
                  marginBottom={{ "2xl": "5px", base: "0" }}
                  mt={{ "2xl": "15px", base: "12px" }}
                  display="flex"
                >
                  <Icon
                    as={option === "cash" ? FcHome : FaWallet}
                    ml={{ "2xl": "10", base: "3" }}
                    mr={{ "2xl": "10", base: "3" }}
                    mb={{ base: "5" }}
                    w={{ "2xl": "10", base: "5" }}
                    h={{ "2xl": "10", base: "5" }}
                    color="red"
                  />
                  <Text
                    width={{ "2xl": "auto", base: "80%" }}
                    fontSize={{ "2xl": "18px", base: "12px" }}
                  >
                    {option === "cash"
                      ? "Thanh toán khi nhận hàng"
                      : "Thanh toán qua ví VNPay"}
                  </Text>
                </Center>
              </Box>
            ))}
          </Flex>
        </Box>

        <Flex justifyContent="center" w="80%" m="2">
          <TbTruckDelivery size={20} color="gray" marginTop="1" />
          <Heading
            marginLeft="10px"
            fontSize={{ "2xl": "13px", base: "10px" }}
            color={"gray"}
            lineHeight={"20px"}
            width="100%"
          >
            Giao hàng nhanh:
            <Text>
              {dtString} / {change}
            </Text>
          </Heading>
        </Flex>
        <Box width={"90%"} mb="3">
          <InputGroup size="md" display="flex">
            <Input
              width="80%"
              placeholder="Mã giảm giá"
              onChange={(e) => setVal(e.target.value)}
            />

            <Button
              h="auto"
              _hover={{ backgroundColor: "rgb(54,129,240)", color: "#fff" }}
              borderRadius={"5px"}
              border="11px solid rgb(54,129,240)"
              color="#fff"
              backgroundColor="rgb(54,129,240)"
              onClick={handleApply}
              width={{ "2xl": "30%", base: "30%" }}
            >
              Áp dụng
            </Button>
          </InputGroup>
        </Box>

        <Box
          width="90%"
          border="1px solid #ccc"
          padding="10px"
          borderRadius="10px"
        >
          <Flex justifyContent="space-between" w="100%" mt="3">
            <Text
              fontFamily="inherit"
              color="gray"
              fontSize={{ "2xl": "18px", base: "12px" }}
              fontWeight="500"
            >
              Tạm tính ({items} sản phẩm):
            </Text>

            <Text
              fontWeight="500"
              fontSize={{ "2xl": "18px", base: "12px" }}
              color="red"
            >
              {totalPrice &&
                totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" w="100%">
            <Text
              fontFamily="inherit"
              color="gray"
              fontSize={{ "2xl": "18px", base: "12px" }}
              fontWeight="500"
            >
              Giảm giá:
            </Text>

            <Text
              fontWeight="500"
              fontSize={{ "2xl": "18px", base: "12px" }}
              color="green"
            >
              {discount &&
                discount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </Text>
          </Flex>

          <Flex justifyContent="space-between" w="100%">
            <Flex justifyContent="space-between" w="100%" display="flex-start">
              <Text
                mt="2"
                height="auto"
                fontFamily="inherit"
                color="#424245"
                fontSize={{ "2xl": "25px", base: "16px" }}
                fontWeight="700"
              >
                Tổng tiền:
              </Text>
            </Flex>

            <Text
              fontWeight="700"
              fontSize={{ "2xl": "25px", base: "16px" }}
              mt="2"
              color="red"
            >
              {paybalPrice &&
                paybalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </Text>
          </Flex>
        </Box>

        <Center w="90%">
          <Heading
            fontSize={{ "2xl": "15px", base: "12px" }}
            fontWeight="500"
            lineHeight={1.5}
            color={"rgb(102, 102, 102)"}
            marginTop="2"
            marginBottom={"5"}
          >
            Thanh toán tiện lợi. Đảm bảo 100% hàng chính hãng.
          </Heading>
        </Center>
        <Button
          w="90%"
          h="50px"
          borderRadius="10px"
          backgroundColor="#FF2323"
          _hover={{ color: "#4a90e2" }}
          onClick={() => {
            if (
              !addressData ||
              !Array.isArray(addressData) ||
              addressData.length === 0
            ) {
              toast({
                title: "Bạn chưa có địa chỉ giao hàng",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            } else if (selectedOption === null) {
              toast({
                title: "Bạn chưa chọn phương thức thanh toán",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            } else {
              handleCheckout();
            }
          }}
        >
          <Text color="white" m="auto">
            Tiến hành đặt hàng
          </Text>
        </Button>
        <Button
          mb="5"
          mt="2"
          w="90%"
          h="50px"
          border="1px solid #FF2323"
          borderRadius="10px"
          backgroundColor="white"
          _hover={{ color: "white" }}
          onClick={() => navigate("/")}
        >
          <Text color="#FF2323" m="auto">
            Chọn thêm sản phẩm khác
          </Text>
        </Button>
      </Center>
    </div>
  );
};

export default CheckoutBox;
