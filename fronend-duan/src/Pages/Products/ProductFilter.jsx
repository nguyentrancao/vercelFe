import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Menu,
  Select,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Productbox.css";

const ProductFilter = ({
  typeOfProduct,
  filter,
  handleFilterChange,
  onTypeChangeStore,
}) => {
  const [type, setType] = useState(typeOfProduct);

  useEffect(() => {
    setType(typeOfProduct);
  }, [typeOfProduct]);
  console.log(type);
  const [isLargerThan1100] = useMediaQuery("(min-width: 1100px)");
  const [isLargerThan750px] = useMediaQuery("(min-width: 750px)");
  const [islesserThan740px] = useMediaQuery("(max-width: 750px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const CategoryProduct = () => {
    if (
      type === "phone" ||
      type === "apple/phone" ||
      type === "xiaomi" ||
      type === "samsung"
    ) {
      return (
        <Flex
          className="grid-container"
          css={{
            "@media (max-width: 768px)": {
              display: "block",
              justifyItems: "center",
            },
          }}
        >
          <Box>
            <Link href="/apple/phone">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"
                />
              </Box>
            </Link>
          </Box>
          <Box>
            <Link href="/xiaomi">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png"
                />
              </Box>
            </Link>
          </Box>
          <Box>
            <Link href="/samsung">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png"
                />
              </Box>
            </Link>
          </Box>
        </Flex>
      );
    } else if (
      type === "laptop" ||
      type === "asus" ||
      type === "acer" ||
      type === "lenovo" ||
      type === "hp"
    ) {
      return (
        <Flex className="grid-container">
          <Box>
            <Link href="/asus">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-asus-149x40.png"
                />
              </Box>
            </Link>
          </Box>
          <Box>
            <Link href="/acer">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-acer-149x40.png"
                />
              </Box>
            </Link>
          </Box>
          <Box>
            <Link href="/lenovo">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-lenovo-149x40.png"
                />
              </Box>
            </Link>
          </Box>
          <Box>
            <Link href="/hp">
              <Box className="text-btn">
                <img
                  width="100%"
                  height="75px"
                  src="https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png"
                />
              </Box>
            </Link>
          </Box>
        </Flex>
      );
    } else {
      return <Box></Box>;
    }
  };

  const CategoryProduct2 = () => {
    if (
      type === "phone" ||
      type === "apple/phone" ||
      type === "xiaomi" ||
      type === "samsung"
    ) {
      return (
        <Flex
          className="grid-container"
          css={{ "@media (max-width: 768px)": { display: "block" } }}
        >
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="128gb"
              onClick={onTypeChangeStore}
            >
              128GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="256gb"
              onClick={onTypeChangeStore}
            >
              256GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="512gb"
              onClick={onTypeChangeStore}
            >
              512GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="1tgb"
              onClick={onTypeChangeStore}
            >
              1TGB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value=""
              onClick={onTypeChangeStore}
            >
              ALL
            </Button>
          </Box>
        </Flex>
      );
    } else if (
      type === "laptop" ||
      type === "asus" ||
      type === "acer" ||
      type === "lenovo" ||
      type === "hp"
    ) {
      return (
        <Flex
          className="grid-container"
          css={{ "@media (max-width: 768px)": { display: "block" } }}
        >
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="8gb"
              onClick={onTypeChangeStore}
            >
              8GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="16gb"
              onClick={onTypeChangeStore}
            >
              16GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="32gb"
              onClick={onTypeChangeStore}
            >
              32GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value="64gb"
              onClick={onTypeChangeStore}
            >
              64GB
            </Button>
          </Box>
          <Box>
            <Button
              fontWeight="450"
              bg="white"
              className="text-btn1"
              value=""
              onClick={onTypeChangeStore}
            >
              ALL
            </Button>
          </Box>
        </Flex>
      );
    } else {
      return (
        <>
          <Box></Box>
        </>
      );
    }
  };

  const CategoryProduct3 = () => {
    if (
      type === "phone" ||
      type === "apple/phone" ||
      type === "xiaomi" ||
      type === "samsung"
    ) {
      return (
        <VStack
          justifyContent={"space-around"}
          alignItems="flex-start"
          gap="5px"
          m="auto"
          p="auto"
          paddingLeft={10}
          paddingTop={10}
        >
          <Box borderBottom={"1px solid #555"}>
            <Link href="/apple/phone">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Iphone
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link href="/xiaomi">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Xiaomi
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link href="/samsung">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Samsung
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link to="">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                <CategoryProduct2 />
              </Heading>
            </Link>
          </Box>
        </VStack>
      );
    } else if (
      type === "laptop" ||
      type === "asus" ||
      type === "acer" ||
      type === "lenovo" ||
      type === "hp"
    ) {
      return (
        <VStack
          justifyContent={"space-around"}
          alignItems="flex-start"
          gap="5px"
          m="auto"
          p="auto"
          paddingLeft={10}
          paddingTop={10}
        >
          <Box borderBottom={"1px solid #555"}>
            <Link href="/asus">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Asus
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link href="/acer">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Acer
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link href="/lenovo">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Lenovo
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link href="/hp">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                Hp
              </Heading>
            </Link>
          </Box>
          <Box borderBottom={"1px solid #555"}>
            <Link to="">
              <Heading
                w={"200px"}
                marginBottom={5}
                cursor={"pointer"}
                fontSize={"17px"}
                fontWeight="bold"
                color="#55555"
              >
                <CategoryProduct2 />
              </Heading>
            </Link>
          </Box>
        </VStack>
      );
    }
  };
  if (isLargerThan1100) {
    return (
      <div className="filter_1">
        <Box
          width="80%"
          height="76px"
          margin="0 0 0 10%"
          display="flex"
          justifyContent="space-between"
          borderRadius="3px"
        >
          <Flex width="65%">
            <Menu>
              <CategoryProduct />
            </Menu>
          </Flex>
        </Box>
        <Box
          width="80%"
          height="76px"
          margin="0 0 0% 10%"
          display="flex"
          justifyContent="space-between"
        >
          <CategoryProduct2 />
          <Flex width="14%" padding="15px 0px">
            <Box
              w="100%"
              fontWeight="bold.800"
              height="px"
              fontSize="0.7rem"
              backgroundColor="#FFFFFF"
              boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 3px"
            >
              <Select value={filter} onChange={handleFilterChange} mb={4}>
                <option value="all">Tất cả sản phẩm</option>
                <option value="lowToHigh">Giá: Tăng dần</option>
                <option value="highToLow">Giá: Giảm dần</option>
                <option value="sale">Giảm giá</option>
              </Select>
            </Box>
          </Flex>
        </Box>
      </div>
    );
  } else if (isLargerThan750px) {
    return (
      <>
        <Box
          alignItems="center"
          margin="auto"
          m="16% 0% 3% 0%"
          gap={0}
          px="0%"
          bg="#ccc"
          display="flex"
          justifyContent="space-between"
          h="80px"
          zIndex={2}
        >
          <Box m="auto" w="60%">
            <Box ref={btnRef} color="white" colorScheme="teal" onClick={onOpen}>
              <GiHamburgerMenu fontSize={"50px"} />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent
                bg="#FFFFFF"
                color="#55555"
                justifyContent={"flex-end"}
              >
                <DrawerCloseButton fontSize={20} margin={2} />
                <DrawerBody>
                  <VStack
                    justifyContent={"space-around"}
                    alignItems="flex-start"
                    gap="5px"
                    m="auto"
                    p="auto"
                    paddingLeft={10}
                    paddingTop={10}
                  >
                    <Box borderBottom={"1px solid #555"}>
                      <Link href="/apple/phone">
                        <Heading
                          w={"200px"}
                          marginBottom={5}
                          cursor={"pointer"}
                          fontSize={"17px"}
                          fontWeight="bold"
                          color="#55555"
                        >
                          Iphon
                        </Heading>
                      </Link>
                    </Box>
                    <Box borderBottom={"1px solid #555"}>
                      <Link href="/xiaomi">
                        <Heading
                          w={"200px"}
                          marginBottom={5}
                          cursor={"pointer"}
                          fontSize={"17px"}
                          fontWeight="bold"
                          color="#55555"
                        >
                          Xiaomi
                        </Heading>
                      </Link>
                    </Box>
                    <Box borderBottom={"1px solid #555"}>
                      <Link href="/samsung">
                        <Heading
                          w={"200px"}
                          marginBottom={5}
                          cursor={"pointer"}
                          fontSize={"17px"}
                          fontWeight="bold"
                          color="#55555"
                        >
                          Samsung
                        </Heading>
                      </Link>
                    </Box>
                    <Box borderBottom={"1px solid #555"}>
                      <Link to="">
                        <Heading
                          w={"200px"}
                          marginBottom={5}
                          cursor={"pointer"}
                          fontSize={"17px"}
                          fontWeight="bold"
                          color="#55555"
                        >
                          <CategoryProduct2 />
                        </Heading>
                      </Link>
                    </Box>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
          <Box m="auto">
            <Flex width="100%" mb="25%">
              <Box
                w="100%"
                fontWeight="bold.800"
                height="px"
                fontSize="0.5rem"
                boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 3px"
              >
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  mb={4}
                  bg="white"
                >
                  <option value="all">Tất cả sản phẩm</option>
                  <option value="lowToHigh">Giá: Tăng dần</option>
                  <option value="highToLow">Giá: Giảm dần</option>
                  <option value="sale">Giảm giá</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </Box>
      </>
    );
  } else if (islesserThan740px) {
    return (
      <>
        <Box
          alignItems="center"
          margin="auto"
          m="0% 0% 3% 0%"
          gap={0}
          px="0%"
          bg="#ccc"
          display="flex"
          justifyContent="space-between"
          h="80px"
          zIndex={2}
        >
          <Box m="auto">
            <Box ref={btnRef} color="white" colorScheme="teal" onClick={onOpen}>
              <GiHamburgerMenu fontSize={"50px"} />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent
                bg="#FFFFFF"
                color="#55555"
                justifyContent={"flex-end"}
              >
                <DrawerCloseButton fontSize={20} margin={2} />
                <DrawerBody>
                  <CategoryProduct3 />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
          <Box m="auto">
            <Flex width="100%" mb="25%">
              <Box
                w="100%"
                fontWeight="bold.800"
                height="px"
                fontSize="0.7rem"
                boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 3px"
              >
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  mb={4}
                  bg="white"
                >
                  <option value="all">Tất cả sản phẩm</option>
                  <option value="lowToHigh">Giá: Tăng dần</option>
                  <option value="highToLow">Giá: Giảm dần</option>
                  <option value="sale">Giảm giá</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </Box>
      </>
    );
  }
};
export default ProductFilter;
