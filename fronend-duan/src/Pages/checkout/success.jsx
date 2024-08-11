import {
  Box,
  Button,
  Center,
  Heading,
  Table,
  Tbody,
  Td,
  Tr
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Icon } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [transactionData, setTransactionData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DATABASE_API_URL}/orders/vnpay_return${location.search}`,
        );

        console.log("Response from backend:", response.data);
        setTransactionData(response.data);

        // Gọi axios.post ở đây, sau khi đã có dữ liệu từ axios.get
        if (response.data) {
          const email = Cookies.get("email");
          await axios.post(`${process.env.REACT_APP_DATABASE_API_URL}/mail/`, {
            email: email,
            code: response.data.code,
            vnp_Amount: response.data.vnp_Amount,
            vnp_TxnRef: response.data.vnp_TxnRef,
            vnp_BankCode: response.data.vnp_BankCode,
            vnp_PayDate: response.data.vnp_PayDate,
            vnp_ResponseCode: response.data.vnp_ResponseCode,
            vnp_TransactionNo: response.data.vnp_TransactionNo,
            vnp_OrderInfo: response.data.vnp_OrderInfo,
          });
        }
      } catch (error) {
        console.error("Error calling backend API:", error);
      }
    };

    fetchData();
  }, []); // Thêm dependency array rỗng để đảm bảo useEffect chỉ chạy một lần khi component mount

  const {
    code,
    vnp_Amount,
    vnp_TxnRef,
    vnp_BankCode,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TransactionNo,
    vnp_OrderInfo,
  } = transactionData;

  // Check if vnp_PayDate is defined before using slice
  const formattedDate = vnp_PayDate
    ? `${vnp_PayDate.slice(0, 4)}-${vnp_PayDate.slice(
        4,
        6,
      )}-${vnp_PayDate.slice(6, 8)} ${vnp_PayDate.slice(
        8,
        10,
      )}:${vnp_PayDate.slice(10, 12)}:${vnp_PayDate.slice(12, 14)}`
    : "";
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Center w="100%" alignItems="center" display="flex" flexWrap="wrap">
      {code === "00" ? (
        <Center w="70%" display="flex" flexWrap="wrap">
          <Box
            w="100%"
            textAlign="center"
            style={{
              margin: "auto",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            <Icon as={FaCheckCircle} w={12} h={12} color="green.500" />
            <Heading as="h3" size="xl" mt={6} mb={2}>
              Đã giao dịch thành công
            </Heading>
          </Box>
          <Center
            w="50%"
            h="auto"
            borderRadius="15px"
            display="flex"
            flexWrap="wrap"
            boxShadow="xl"
            p={4}
            mt={4}
          >
            <Center>
              <Button onClick={toggleDropdown} mb={4} mx="auto">
                {isDropdownOpen ? "Ẩn bớt" : "Hiển thị thông tin giao dịch"}
              </Button>
            </Center>
            {isDropdownOpen && (
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Số tiền thanh toán:</Td>
                    <Td>
                      {parseInt(vnp_Amount / 100).toLocaleString("vi-VN")} đ
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Mã giao dịch:</Td>
                    <Td>{vnp_TxnRef}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mã Ngân hàng:</Td>
                    <Td>{vnp_BankCode}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mã GD của Ngân hàng:</Td>
                    <Td>{vnp_TransactionNo}</Td>
                  </Tr>
                  <Tr>
                    <Td>Thời gian thanh toán:</Td>
                    <Td>{formattedDate}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mã GD của VNPAY:</Td>
                    <Td>{vnp_TransactionNo}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mã đơn hàng:</Td>
                    <Td>{vnp_OrderInfo}</Td>
                  </Tr>
                  <Tr>
                    <Td>Mã GD của Người bán:</Td>
                    <Td>{vnp_TxnRef}</Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
          </Center>
        </Center>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "5px",
          }}
        >
          Giao dịch thất bại
        </p>
      )}

      <p
        style={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Box
          width="auto"
          h="auto"
          p="2"
          display="flex"
          justifyContent="center"
          background="blue.500"
        >
          <a href="/myorder" style={{ color: "white" }}>
            Tình trạng đơn hàng
          </a>
        </Box>
      </p>
    </Center>
  );
};

export default Success;
