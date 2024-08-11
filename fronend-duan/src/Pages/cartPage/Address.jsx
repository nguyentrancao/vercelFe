import "./cartstyle.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "react-slideshow-image/dist/styles.css";
import uuid from "react-uuid";
import { fetchProvinces, fetchDistricts } from '../../Redux/province';

const Address = () => {
  const breakpoints = {
    base: "320px",
    sm: "480px",
    md: "600px",
    lg: "800px",
    xl: "768px",
    "2xl": "1024px",
  };

  const [inputValueHo, setInputValueHo] = useState("");
  const [inputValueTen, setInputValueTen] = useState("");
  const [inputValueDiachi, setInputValueDiachi] = useState("");
  const [inputValueDuong, setInputValueDuong] = useState("");
  const [inputValueSdt, setInputValueSdt] = useState("");
  const [error, setError] = useState("");
  const [errorTen, setErrorTen] = useState("");
  const [errorDiachi, setErrorDiachi] = useState("");
  const [errorDuong, setErrorDuong] = useState("");
  const [errorSdt, setErrorSdt] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidQH, setIsValidQH] = useState(true);
  const [provinceName, setProvinceName] = useState('');


  const handleInputChangeHo = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setError("Họ không được bỏ trống");
    } else if (/[!@#$%^&*(),.?":{}|<>0-9]/.test(value)) {
      setError("Họ không được chứa ký tự đặc biệt");
    } else {
      setError("");
    }
    setInputValueHo(value);
  };

  const handleInputChangeTen = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setErrorTen("Tên không được bỏ trống");
    } else if (/[!@#$%^&*(),.?":{}|<>0-9]/.test(value)) {
      setErrorTen("Tên không được chứa ký tự đặc biệt");
    } else {
      setErrorTen("");
    }
    setInputValueTen(value);
  };

  const handleInputChangeDiachi = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setErrorDiachi("Địa chỉ không được bỏ trống");
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setErrorDiachi("Địa chỉ không được chứa ký tự đặc biệt");
    } else {
      setErrorDiachi("");
    }
    setInputValueDiachi(value);
  };

  const handleInputChangeDuong = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setErrorDuong("Đường không được bỏ trống");
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setErrorDuong("Đường không được chứa ký tự đặc biệt");
    } else {
      setErrorDuong("");
    }
    setInputValueDuong(value);
  };

  const handleInputChangeSdt = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setErrorSdt("Số điện thoại không được bỏ trống");
    } else if (/^\d{10,11}$/.test(value)) {
      setErrorSdt("");
    } else {
      setErrorSdt("Số điện thoại không đúng định dạng");
    }
    setInputValueSdt(value);
  };

  const username = Cookies.get("username");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useRef({});
  const toast = useToast();
  const navigate = useNavigate();

  const clearAddress = () => {
    const apiUrl = `${process.env.REACT_APP_DATABASE_API_URL}/users/address/${username}`;
    axios
      .delete(apiUrl)
      .then((response) => {
        console.log("Server response:", response.data);
        toast({
          title: "Địa chỉ được xóa thành công.",
          description: "Hãy thêm địa chỉ giao hàng mới.",
          status: "success",
          duration: 500,
          position: "top",
          isClosable: true,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  const handleAddressSubmit = () => {
    const newAddress = {
      username: username,
      firstname: address.current.setfirstname.value,
      lastname: address.current.setlastname.value,
      flat: address.current.setflat.value,
      state: provinceName,
      street: address.current.setstreet.value,
      city: address.current.setcity.value,
      mobile: address.current.setmobile.value,
    };
    if (
      !newAddress.firstname ||
      !newAddress.lastname ||
      !newAddress.flat ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.mobile
    ) {
      toast({
        title: "Vui lòng nhập đầy đủ thông tin",
        status: "error",
        duration: 500,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const apiUrl = `${process.env.REACT_APP_DATABASE_API_URL}/users/address`;
    if (!addressData || !Array.isArray(addressData) || addressData.length === 0) {
      axios
        .post(apiUrl, newAddress)
        .then((response) => {
          console.log("Server response:", response.data);
          toast({
            title: "Địa chỉ được thêm thành công.",
            description: "Chúng tôi sẽ sử dụng thông tin để liên hệ.",
            status: "success",
            duration: 500,
            position: "top",
            isClosable: true,
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding address:", error);
        });
    } else {
      axios
        .put(apiUrl, newAddress)
        .then((response) => {
          console.log("Server response:", response.data);
          toast({title: "Địa chỉ được cập nhật thành công.",
            description: "Chúng tôi sẽ sử dụng thông tin để liên hệ.",
            status: "success",
            duration: 500,
            isClosable: true,
            position: "top",
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating address:", error);
        });
    }
  };

  const [addressData, setAddressData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DATABASE_API_URL}/users/address/${username}`)
      .then((response) => {
        console.log("Server response:", response.data);
        setAddressData(response.data);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
      });
  }, [username]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    try {
      const districtsData = await fetchDistricts(provinceCode);
      setDistricts(districtsData);
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }

    const selectedProvinceObj = provinces.find(
      (province) => province.province_id === provinceCode
    );
    if (selectedProvinceObj) {
      setProvinceName(selectedProvinceObj.province_name);
    } else {
      setProvinceName(''); // Xóa tên thành phố nếu không tìm thấy
    }
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
  };
  console.log(districts,"log");

  const renderAddressData = () => {
    if (!addressData || !Array.isArray(addressData) || addressData.length === 0) {
      return (
        <Box w={{ "2xl": "66%", base: "80%" }}>
          <Text mt={{ "2xl": "5", base: "0" }} fontSize="15px" fontWeight="500" fontStyle="italic" width="100%">
            Bạn chưa có địa chỉ nhận hàng
          </Text>
        </Box>
      );
    }


    console.log(addressData,'llllllll');

    return addressData.map((data) => (
      <Accordion allowMultiple key={uuid()}>
        <AccordionItem>
          <h2>
            <Box w="100%" fontSize="18px" fontWeight="500">
              <Icon as={FaMapMarkerAlt} color="green.500" /> Địa chỉ giao hàng  
            </Box>
          </h2>
          <Box pb={4} display="flex" justifyContent="space-between">
          <Box>
              <Box>
                <Text fontWeight="500" fontSize="18px" mb="10px">
                  {data.firstname} {data.lastname}
                </Text>
                <Text fontSize="14px" mb="10px">
                 Địa chỉ:  {data.flat}, {data.street}, {data.city}, {data.state}
                </Text>
                <Text fontSize="14px" mb="10px">
                 SĐT:  {data.mobile}
                </Text>
              </Box>
              <Box>
                <Button
                  w="150px"
                  height="48px"
                  fontWeight="500"
                  border="1px solid #007BFF"
                  borderRadius="4px"
                  color="#007BFF"
                  backgroundColor="white"
                  fontSize="16px"
                  cursor="pointer"
                  _hover={{ background: "#007BFF", color: "white" }}
                  _active={{
                    background: "#007BFF",
                    transform: "scale(0.98)",
                  }}
                  onClick={onOpen}
                >
                  Sửa địa chỉ
                </Button>
              </Box>
            </Box>
          </Box>
        </AccordionItem>
      </Accordion>
    ));
  };

  return (
    <Box w={{ "2xl": "50%", base: "100%" }} px={{ base: 2, md: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          color="#000"
          fontWeight="500"
          fontSize="20px"
          padding={{ base: "10px 0", md: "20px 0" }}
        >
          Địa chỉ giao hàng của bạn
        </Box>
        <Button
          w="150px"
          height="48px"
          fontWeight="500"
          border="1px solid #007BFF"
          borderRadius="4px"
          color="#007BFF"
          backgroundColor="white"
          fontSize="16px"
          cursor="pointer"
          _hover={{ background: "#007BFF", color: "white" }}
          _active={{
            background: "#007BFF",
            transform: "scale(0.98)",
          }}
          onClick={onOpen}
        >
          Thêm địa chỉ
        </Button>
      </Box>
      {renderAddressData()}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nhập địa chỉ mới</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="4">
              <Input
                type="text"
                placeholder="Họ"
                ref={(el) => (address.current.setfirstname = el)}
                value={inputValueHo}
                onChange={handleInputChangeHo}
                isInvalid={error}
              />
              {error && <Text color="red">{error}</Text>}
              <Input
                type="text"
                placeholder="Tên"
                ref={(el) => (address.current.setlastname = el)}
                value={inputValueTen}onChange={handleInputChangeTen}
                isInvalid={errorTen}
              />
              {errorTen && <Text color="red">{errorTen}</Text>}
              <Input
                type="text"
                placeholder="Địa chỉ"
                ref={(el) => (address.current.setflat = el)}
                value={inputValueDiachi}
                onChange={handleInputChangeDiachi}
                isInvalid={errorDiachi}
              />
              {errorDiachi && <Text color="red">{errorDiachi}</Text>}
              <Input
                type="text"
                placeholder="Đường"
                ref={(el) => (address.current.setstreet = el)}
                value={inputValueDuong}
                onChange={handleInputChangeDuong}
                isInvalid={errorDuong}
              />
              {errorDuong && <Text color="red">{errorDuong}</Text>}
              <Input
                type="text"
                placeholder="Số điện thoại"
                ref={(el) => (address.current.setmobile = el)}
                value={inputValueSdt}
                onChange={handleInputChangeSdt}
                isInvalid={errorSdt}
              />
              {errorSdt && <Text color="red">{errorSdt}</Text>}
              <Select
                ref={(el) => (address.current.setstate = el)}
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option  value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.province_id} value={province.province_id}>
                    {province.province_name}
                  </option>
                ))}
              </Select>
              <Select
                ref={(el) => (address.current.setcity = el)}
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Chọn quận/huyện</option>
                {districts.map((district) => (
                  <option >
                    {district.district_name}
                  </option>
                ))}
              </Select>
              <Button onClick={handleAddressSubmit}>Xác nhận</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Address;