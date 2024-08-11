import React from "react";
import { Grid, Box, Center, Flex } from "@chakra-ui/react";
import {
  FooterCard1,
  FooterCard2,
  FooterCard4,
  FooterCard3,
  FooterCard5,
  FooterCard6,
} from "./FooterCard";
import {
  ProductCategories,
  SiteInfo,
  ResourcesCenter,
  Policies,
  AtmOnline,
} from "./FooterDetail";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Footer = () => {

  return (
    <Center>
      <Box
        bg="#FFFFFF"
        color="#55555"
        justifyContent="space-around"
        mt={{ lg: 20, base: 10 }}
        mb={20}
        w={"100%"}
      // alignItems={"center"}
      >
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
            "2xl": "repeat(4,1fr)",
          }}
          // gap={6}
          justifyContent="space-evenly"
          m="auto"
          w="80%"
          p="2"
          lineHeight="32px"
        >
          <FooterCard1 type={ProductCategories} heading="Danh mục " />
          <FooterCard2 type={SiteInfo} heading="Về chúng tôi" />
          <FooterCard3 type={ResourcesCenter} heading="Hỗ trợ khách hàng" />

          <FooterCard4 type={Policies} heading="Chính sách mua hàng" />
        </Grid>
        <Flex

          // gap={6}
          justifyContent="flex-start"
          m="auto"
          w="80%"

        >
          <FooterCard6 type={ProductCategories} heading="Phương thức thanh toán " />
          <FooterCard5 heading="Danh sách các ngân hàng thanh toán online" />
        </Flex>
      </Box>
    </Center>
  );
};

export default Footer;
