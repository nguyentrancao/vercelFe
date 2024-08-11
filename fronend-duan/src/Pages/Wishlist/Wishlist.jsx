import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
  Center,
  Image,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Auth/auth.action";
import { getProducts } from "../../Redux/Wishlist/products.action";
import WishProduct from "./WishProduct";
import Cookies from "js-cookie";

function Wishlist({ typeOfProduct }) {
  const productsList = useSelector((store) => store.product.data);
  const loading = useSelector((store) => store.product.loading);
  const error = useSelector((store) => store.product.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // getData(typeOfProduct).then((res) => setProductArr(res));
    dispatch(getProducts(typeOfProduct));
  }, [typeOfProduct, dispatch]);

  const handleDelete = (userID, prodID, storageID, colorID,ramID) => {
    axios
      .delete(`${process.env.REACT_APP_DATABASE_API_URL}/wishlist/`, {
        data: { userID, prodID, colorID, storageID, ramID },
      })
      .then((res) => {
        console.log(res);
        dispatch(getProducts(typeOfProduct)); // Fetch data again after delete
      })
      .catch((err) => console.log(err));
    toast({
      position: "top",
      title: "Product Deleted.",
      description: `Delete from wishlist`,
      status: "success",
      duration: 500,
      isClosable: true,
    });
    navigate("/wishlist");
  };

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
    <Center w={["90%", "100%", "80%"]} m="auto">
      <Box w="100%" m="auto" p="3px">
        <Box>
          <Box>
            <Heading p="5" marginBottom={5}>
              Sản phẩm yêu thích
            </Heading>
            {loading ? (
              <Heading
                size="3xl"
                textAlign="center"
                color="blue.400"
                marginTop={10}
                marginBottom="200px"
              >
                Loading...
              </Heading>
            ) : (
              <Grid
                templateColumns={[
                  "repeat(2, 1fr)",
                  "repeat(3,1fr)",
                  "repeat(3,1fr)",
                  "repeat(5,1fr)",
                ]}
                gap={3}
              >
                {productsList.map((elem, i) => {
                  // console.log("in the products page in the map method and elem is :- ", elem);
                  return (
                    <GridItem
                      key={elem.prodName + i}
                      w="100%"
                      bg="white.500"
                      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
                      padding="25px 25px 0px 25px"
                      _hover={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                        cursor: "pointer",
                      }}
                    >
                      <WishProduct
                        data={elem}
                        handleDelete={handleDelete}
                        typeOfProduct={typeOfProduct}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Center>
  );
}

export default Wishlist;
