import React, { useEffect, useState } from "react";
import { Box, Center, Grid, GridItem, Heading, Button } from "@chakra-ui/react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BannersCenter, PrApplePhone, PrSale } from "../Home/CardDetails";
import Product from "./Product";
import ProductFilter from "./ProductFilter";
import SlideProuct from "./SlideProduct";

const Products = ({ typeOfProduct }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [typeStorePhone, setTypeStorePhone] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(12);
  const error = useSelector((store) => store.product.error);
  useEffect(() => {
    onGetData();
  }, [typeOfProduct]);
  const onGetData = async () => {
    setFilter("all");
    setLoading(true);
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/category/${typeOfProduct}`,
      );
      console.log("in the logic func try", response.data);
      if (response.data) {
        setFilteredProducts(response.data || []);
        console.log(
          "list type of list product",
          "typeOfProduct",
          typeOfProduct,
          response.data.map((el) => el.prodType),
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleFilterChange = (event) => {
    const selectedFilter = event?.target?.value;
    setFilter(selectedFilter);
    console.log(selectedFilter);
  };
  const onTypeChangeStore = (event) => {
    const selectedFilter = event?.target?.value;
    setTypeStorePhone(selectedFilter);
  };
  const listData = () => {
    // type: ""/"256GB" /"128gb"

    switch (filter) {
      case "lowToHigh":
        return filteredProducts.sort((a, b) => a.prodPrice - b.prodPrice);
      case "highToLow":
        return filteredProducts.sort((a, b) => b.prodPrice - a.prodPrice);
      case "sale":
        return filteredProducts.filter((product) => product.prodSale > 0);
      default:
        return filteredProducts;
    }
  };
  const DataFilter = () => {
    if (typeOfProduct === "phone") {
      switch (typeStorePhone) {
        case "1tgb":
          return listData().filter((el) => el?.storage_value === "1TGB");
        case "512gb":
          return listData().filter((el) => el?.storage_value === "512GB");
        case "256gb":
          return listData().filter((el) => el?.storage_value === "256GB");
        case "128gb":
          return listData().filter((el) => el?.storage_value === "128GB");

        default:
          return listData();
      }
    } else if (typeOfProduct === "laptop") {
      switch (typeStorePhone) {
        case "6gb":
          return listData().filter((el) => el?.ram === "8GB");
        case "16gb":
          return listData().filter((el) => el?.ram === "16GB");
        case "32gb":
          return listData().filter((el) => el?.ram === "32GB");
        case "64gb":
          return listData().filter((el) => el?.ram === "64GB");
        default:
          return listData();
      }
    } else {
      return listData();
    }
  };
  const loadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
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
        Something went wrong...
      </Heading>
    );
  }
  return (
    <Box p="5">
      <Box>
        <SlideProuct type={BannersCenter} />
      </Box>
      <ProductFilter
        onTypeChangeStore={onTypeChangeStore}
        typeOfProduct={typeOfProduct}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {loading ? (
        <Box h={20}>
          <Box></Box>
          <Center>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              height={50}
              visible={true}
            />
          </Center>
        </Box>
      ) : (
        <Grid
          width="80%"
          m="auto"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
          ]}
          gap={2}
          css={{
            "@media (max-width: 768px)": {
              marginLeft: "0",
              width: "100%",
              templateColumns: "none",
            },
          }}
        >
          {DataFilter()
            .filter((elem) => elem.QTY > 0)
            .slice(0, visibleProducts)
            .map((elem, i) => {
              return (
                <GridItem
                  key={elem.prodName + i}
                  w="100%"
                  h="100%"
                  bg="white.500"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
                  padding="5%"
                  _hover={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                    cursor: "pointer",
                  }}
                >
                  <Product data={elem} typeOfProduct={typeOfProduct} />
                </GridItem>
              );
            })}
        </Grid>
      )}
      {visibleProducts < listData().length && (
        <Center mt="3">
          <Button onClick={loadMore} colorScheme="blue" variant="outline">
            Xem thêm
          </Button>
        </Center>
      )}
    </Box>
  );
};
export default Products;
