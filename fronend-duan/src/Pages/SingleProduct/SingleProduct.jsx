import {
  Center,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../Redux/SingleProduct/SingleProduct.action";
import { RotatingLines } from "react-loader-spinner";
import RelateProduct from "./RelateProduct";
import ComProduct from "./ComProduct";
import { ColorFilter, StorageValueFilter, RamFilter } from "./Filter";
import ProductTable from "./ProductTable";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
const postSingleData = async (data) => {
  const userID = Cookies.get("userID");
  if (!userID) {
    throw new Error("Chưa đăng nhập");
  } else {
    const prodID = data.prodID;
    const colorID = data.colorID;
    const storageID = data.storageID;
    const ramID = data.ramID;
    //cartID tự tăng giá trị
    const cartID = Math.floor(Math.random() * 1000000000);
    const productData = {
      cartID,
      userID,
      prodID,
      colorID,
      storageID,
      ramID,
      quantity: 1,
    };
    const cartData = JSON.parse(sessionStorage.getItem("cart")) || {};
    if (!cartData[userID]) {
      cartData[userID] = [];
    }
    const existingProductIndex = cartData[userID].findIndex(
      (product) =>
        product.prodID === prodID &&
        product.colorID === colorID &&
        product.storageID === storageID &&
        product.ramID === ramID,
    );
    if (existingProductIndex !== -1) {
      throw new Error("Product already exists in the cart");
    } else {
      cartData[userID].push(productData);
    }
    sessionStorage.setItem("cart", JSON.stringify(cartData));
  }
};
export const postSingleDataWish = async (data) => {
  const userID = Cookies.get("userID");
  if (!userID) {
    throw new Error("Chưa đăng nhập");
  } else {
    try {
      const prodID = data.prodID;
      const colorID = data.colorID;
      const storageID = data.storageID;
      const ramID = data.ramID;
      // Tạo dữ liệu gửi đi kết hợp với userID và prodID
      const postData = {
        prodID,
        colorID,
        storageID,
        userID,
        ramID,
      };
      //get wishlist and check if the product is already in the wishlist

      let response = await axios.post(
        `${process.env.REACT_APP_DATABASE_API_URL}/wishlist/`,
        postData,
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
const SingleProduct = (props) => {
  const { userID } = useSelector((store) => store.AuthManager);
  const toast = useToast();
  const { typeOfProduct } = props;
  const [filters, setFilters] = useState({
    color: "",
    storage_value: "",
    ram: "",
  });

  const applyFilters = () => {
    let filteredProducts = singleDatas;

    // Apply color filter
    if (filters.color) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filters.color,
      );
    }

    // Apply storage value filter
    if (filters.storage_value) {
      filteredProducts = filteredProducts.filter(
        (product) => product.storage_value === filters.storage_value,
      );
    }
    // Apply ram filter
    if (filters.ram) {
      filteredProducts = filteredProducts.filter(
        (product) => product.ram === filters.ram,
      );
    }
    return filteredProducts;
  };

  const params = useParams();

  // const [singleData, setSingleData] = useState({});

  var navigate = useNavigate();

  const singleDatas = useSelector((store) => store.singleProduct.data);
  // console.log("in the singleProductPage and the singleData is :-",singleData);
  const loading = useSelector((store) => store.singleProduct.loading);
  const error = useSelector((store) => store.singleProduct.error);

  const dispatch = useDispatch();
  const handlePost = (prodID, colorID, storageID, ramID) => {
    postSingleData({ prodID, colorID, storageID, ramID })
      .then((res) => {
        toast({
          position: "top",
          title: "Đã thêm vào giỏ",
          status: "success",
          duration: 500,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error handling post:", error);

        // Check if the error is due to an existing product
        if (error.message === "Product already exists in the cart") {
          // Handle it appropriately, e.g., display a different toast
          toast({
            position: "top",
            title: "Sản phẩm đã tồn tại trong giỏ",
            status: "warning",
            duration: 500,
            isClosable: true,
          });
        } else if (error.message === "Chưa đăng nhập") {
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
          // Handle other errors
          toast({
            position: "top",
            title: "Lỗi",
            status: "error",
            duration: 500,
            isClosable: true,
          });
        }
      });
  };
  const debouncedHandlePost = useCallback(
    debounce(
      (prodID, colorID, storageID, ramID, userID) =>
        handlePost(prodID, colorID, storageID, ramID, userID),
      500,
    ),
    [],
  );
  const applyColorFilter = (selectedColor) => {
    setFilters({ ...filters, color: selectedColor });
  };
  const applyRamFilter = (selectedRam) => {
    setFilters({ ...filters, ram: selectedRam });
  };
  const applyStorageValueFilter = (selectedValue) => {
    setFilters({ ...filters, storage_value: selectedValue });
  };
  const colors =
    singleDatas && Array.isArray(singleDatas)
      ? [...new Set(singleDatas.map((product) => product.color))]
      : [];

  const storageValues =
    singleDatas && Array.isArray(singleDatas)
      ? [...new Set(singleDatas.map((product) => product.storage_value))]
      : [];

  const rams =
    singleDatas && Array.isArray(singleDatas)
      ? [...new Set(singleDatas.map((product) => product.ram))]
      : [];
  const handleWish = (prodID, colorID, storageID, ramID) => {
    postSingleDataWish({ prodID, colorID, storageID, ramID })
      .then((res) => {
        toast({
          position: "top",
          title: "Đã thêm vào yêu thích",
          status: "success",
          duration: 500,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error handling post:", error);
        // Handle the error as needed, e.g., display an error toast
        if ((error.message = "Chưa đăng nhập")) {
          toast({
            position: "top",
            title: "Vui lòng đăng nhập trước",
            status: "error",
            duration: 500,
            isClosable: true,
          });
          navigate("/login");
        }
      });
  };
  const debouncedHandleWish = useCallback(
    debounce(
      (prodID, colorID, storageID, ramID, userID) =>
        handleWish(prodID, colorID, storageID, ramID, userID),
      500,
    ),
    [],
  );
  useEffect(() => {
    dispatch(getSingleProduct(typeOfProduct, params.id));
  }, [dispatch, typeOfProduct, params.id]);
  if (error) {
    return (
      <Heading
        size="3xl"
        textAlign="center"
        color="red.500"
        marginTop={10}
        marginBottom="200px"
      >
        Some thing went wrong...
      </Heading>
    );
  }

  return (
    <>
      {loading ? (
        <Center>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Center>
      ) : (
        // Box tổng
        <Box>
          {Array.isArray(singleDatas) && (
            <Box>
              <Box
                width="90%"
                m="0 0 0 4%"
                p=" 1% 8% "
                justifyContent="center"
                alignitem="center"
              >
                <Text color="gray.500" marginBottom={5}>
                  Article ID: {singleDatas[0].prodID}
                </Text>
                <Heading size="md" marginBottom={5}>
                  {singleDatas[0].prodName}
                </Heading>
                <hr />
              </Box>
              <div className="griditem">
                <Grid
                  className="grid"
                  h={["auto", "auto", "auto"]}
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(10,1fr)",
                  ]}
                >
                  <GridItem
                    rowSpan={[1, 1, 7]}
                    colSpan={[6, 6, 5]}
                    m="0 0 0 18%"
                    p=" 2% 8% "
                    justifyContent="center"
                    alignitem="center"
                    style={{
                      border: "none",
                    }}
                  >
                    <Image
                      className="Image"
                      textAlign="center"
                      w={["65%", "400px", "600px"]}
                      height="auto"
                      justifyContent="center"
                      src={applyFilters()[0].prodImg}
                      _hover={{ cursor: "crosshair" }}
                    />
                    <Box
                      display="flex"
                      m={5}
                      css={{
                        "@media (max-width: 768px)": { display: "none" },
                      }}
                    >
                      <Image
                        m={2}
                        p={2}
                        borderRadius={"5px"}
                        border="1px solid #e0e0e0;"
                        textAlign="center"
                        width="25%"
                        src={applyFilters()[0].prodImg}
                        _hover={{ cursor: "crosshair" }}
                      />
                      <Image
                        m={2}
                        p={2}
                        borderRadius={"5px"}
                        border="1px solid #e0e0e0;"
                        textAlign="center"
                        width="25%"
                        src={applyFilters()[0].prodImg}
                        _hover={{ cursor: "crosshair" }}
                      />
                      <Image
                        m={2}
                        p={2}
                        borderRadius={"5px"}
                        border="1px solid #e0e0e0;"
                        textAlign="center"
                        width="25%"
                        src={applyFilters()[0].prodImg}
                        _hover={{ cursor: "crosshair" }}
                      />
                    </Box>
                    {/* Chi tieet  */}
                    <Box
                      className="box-chitiet"
                      css={{
                        "@media (max-width: 768px)": { display: "none" },
                      }}
                    >
                      <Heading size="sm" marginBottom={3}>
                        Thông số kĩ thuật
                      </Heading>
                      <UnorderedList
                        color="gray.600"
                        fontSize="sm"
                        marginBottom={4}
                      >
                        <ListItem>
                          Tên: {singleDatas[0].prodName}{" "}
                          <span style={{ color: "#2871c4" }}>Read T&C</span>
                        </ListItem>
                        <ListItem>
                          Ứng dụng phổ biến: Clip TVFPT PlayGalaxy Play
                          (Fim+)MyTVNetflixNhaccuatuiPOPS KidsSpotify Trình
                          duyệt webTV 360 VieON VTVcab ON YouTube YouTube Kids{" "}
                          <span style={{ color: "#2871c4" }}>Read T&C</span>
                        </ListItem>
                        <ListItem>
                          Công nghệ hình ảnh:Active HDRChế độ game HGiG Chế độ
                          hình ảnh phù hợp nội dung Dải màu rộng Nano Color Giảm
                          độ trễ chơi game Auto Low Latency Mode (ALLM)HDR
                          Dynamic Tone MappingHDR10 ProHLGNâng cấp hình ảnh AI
                          Picture Pro 4KNâng cấp độ phân giải 4K AI Upscaling
                          Tương thích bộ mã hóa Video decoder (VP9, AV1)Tương
                          thích HEVC{" "}
                          <span style={{ color: "#2871c4" }}>Read T&C</span>
                        </ListItem>
                      </UnorderedList>
                      <Heading size="sm" marginBottom={3}>
                        Thông tin sản phẩm (1){" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "#2871c4",
                          }}
                        >
                          Read T&C
                        </span>
                      </Heading>
                      <UnorderedList
                        color="gray.600"
                        fontSize="sm"
                        marginBottom={4}
                      >
                        <ListItem>
                          {singleDatas[0].prodName} có thiết kế Airslim không
                          viền 3 cạnh sang trọng và tinh tế. Mang lại tổng thể
                          cho không gian trưng bày thêm điểm nhấn vô cùng ấn
                          tượng.
                          <br />
                          Màn hình {singleDatas[0].prodName} cùng chân đế vững
                          chắc phù hợp trưng bày các không gian như: Phòng
                          khách, phòng ngủ, phòng họp,...{" "}
                          <span style={{ color: "#2871c4" }}>
                            View all Standard Credit Cards EMI options
                          </span>
                        </ListItem>
                      </UnorderedList>
                    </Box>
                  </GridItem>
                  <GridItem
                    colSpan={[4, 3, 4]}
                    rowSpan={[9, 7]}
                    className="thanhtoan"
                  >
                    <Box>
                      <Box
                        p={7}
                        width={["100%", "91%", "91%"]}
                        borderRadius="10px"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                        }}
                      >
                        <Heading size="md" marginBottom={5}>
                          {singleDatas[0].prodName}
                        </Heading>
                        <Heading size="lg" marginBottom={5} color="red">
                          {applyFilters()[0].prodPrice &&
                            applyFilters()[0].prodPrice.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              },
                            )}
                        </Heading>
                        {applyFilters()[0].prodSale !== 0 && (
                          <>
                            <Text fontSize="lg" marginBottom={3}>
                              Giá gốc:{" "}
                              {applyFilters()[0].prodPriceSale &&
                                applyFilters()[0].prodPriceSale.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  },
                                )}
                              <span
                                style={{ textDecoration: "line-through" }}
                              ></span>
                              <span
                                style={{ fontSize: "12px", padding: "20px" }}
                              >
                                (Bao gồm tất cả các loại thuế)
                              </span>
                            </Text>
                            <Text
                              fontSize="sm"
                              color="#eb5757"
                              style={{ fontWeight: "bold" }}
                              marginBottom={3}
                            >
                              Giảm tới: {applyFilters()[0].prodSale}%
                            </Text>
                          </>
                        )}
                        {applyFilters()[0].color != null && (
                          <ColorFilter
                            colors={colors}
                            applyFilter={applyColorFilter}
                          />
                        )}
                        {applyFilters()[0].storage_value != null && (
                          <StorageValueFilter
                            storageValues={storageValues}
                            applyFilter={applyStorageValueFilter}
                          />
                        )}
                        {applyFilters()[0].ram != null && (
                          <RamFilter rams={rams} applyFilter={applyRamFilter} />
                        )}

                        <Text
                          fontSize="sm"
                          style={{ fontWeight: "bold" }}
                          marginBottom={3}
                        >
                          Hỗ trợ trả góp lãi xuất lên đến 0%/tháng |{" "}
                          <span style={{ color: "#2871c4" }}>Xem thêm</span>
                        </Text>
                        <Text
                          fontSize="lg"
                          style={{ fontWeight: "bold" }}
                          marginBottom={3}
                        >
                          Miễn phí vận chuyển!
                        </Text>
                        <Flex w="full" justifyContent="space-between">
                          <Button
                            w="49%"
                            color="white"
                            bg="red"
                            borderRadius="10px"
                            fontSize="lg"
                            p={6}
                            _hover={{ bg: "blue.800" }}
                            onClick={() =>
                              handlePost(
                                applyFilters()[0].prodID,
                                applyFilters()[0].colorID,
                                applyFilters()[0].storageID,
                                applyFilters()[0].ramID,
                                userID,
                              )
                            }
                          >
                            Thêm vào giỏ hàng
                          </Button>
                          <Button
                            w="49%"
                            color="white"
                            bg="orangered"
                            borderRadius="10px"
                            fontSize="lg"
                            p={6}
                            _hover={{ backgroundColor: "orangered" }}
                            onClick={() =>
                              handleWish(
                                applyFilters()[0].prodID,
                                applyFilters()[0].colorID,
                                applyFilters()[0].storageID,
                                applyFilters()[0].ramID,
                                userID,
                              )
                            }
                          >
                            Yêu thích
                          </Button>
                        </Flex>
                        <Box
                          className="thanhtoan_text"
                          m="5% 0%"
                          border="solid #f7e9f7 2px"
                          borderRadius="5px"
                        >
                          <Heading
                            display="inline-block"
                            position="relative"
                            padding="0 2.5rem 0"
                            margin="0 auto"
                            fontSize="1.3rem"
                          >
                            Các khuyến mãi khác
                          </Heading>
                          <Text margin="2%">
                            .
                            <span style={{ padding: "5%" }}>
                              Giảm giá khi mua trong giờ phát sóng live tream
                            </span>{" "}
                            <br />.
                            <span style={{ padding: "5%" }}>
                              Dùng thử 30 ngày, đổi máy không cần lý do
                            </span>{" "}
                            <br />.
                            <span style={{ padding: "5%" }}>
                              Bảo hành thân máy 12 tháng
                            </span>{" "}
                            <br />.
                            <span style={{ padding: "5%" }}>
                              Giảm 200k - 300k cho Học Sinh/ Sinh Viên/ Giáo
                              Viên
                            </span>{" "}
                            <br />.
                            <span style={{ padding: "5%" }}>
                              Giao hàng toàn quốc (miễn phí nội thành HCM)
                            </span>{" "}
                            <br />.
                            <span style={{ padding: "5%" }}>
                              Mã giảm 100.000đ áp dụng đơn hàng từ 500.000đ
                            </span>{" "}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className="box-table"
                      mt={5}
                      display={["none", "block", "block"]}
                    >
                      <ProductTable product={applyFilters()[0]} />
                    </Box>
                  </GridItem>
                </Grid>
              </div>
              <Box className="box-slide">
                <RelateProduct type={singleDatas[0].prodType} />
                <ComProduct prodID={singleDatas[0].prodID} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
export default SingleProduct;
