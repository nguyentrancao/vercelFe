import React from "react";
import { Box, Text, Image, Heading, GridItem, Grid } from "@chakra-ui/react";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Link } from "react-router-dom";
import uuid from "react-uuid";

const CateFeature = ({ type }) => {
  const rows = [];
  for (let i = 0; i < 2; i++) {
    const row = [];
    for (let j = i * 8; j < i * 8 + 8 && j < type.length; j++) {
      row.push(
        <td key={j} style={{ textAlign: "center" }}>
          <Link to={`${type[j].prodType}`}>
            <div
              style={{
                borderRadius: "10px",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={type[j].imgcatehot}
                alt={type[j].name}
                style={{ width: "60px", height: "60px", marginBottom: "10px" }}
              />
              <p
                className="cateName"
                style={{
                  height: "60px",
                  width: "150px",
                  marginTop: "0",
                  wordWrap: "break-word",
                  padding: "5px",
                  margin: "2px",
                }}
              >
                {type[j].name}
              </p>
            </div>
          </Link>
        </td>,
      );
    }
    rows.push(<tr key={i}>{row}</tr>);
  }
  return (
    <Box className="cateFuture">
      <Heading
        fontSize="3xl"
        display="flex"
        justifyContent="center"
        textAlign="center"
        textColor="black"
        mt="2%"
      >
        DANH MỤC NỔI BẬT
      </Heading>

      <Box
        justifyContent="center"
        w="70%"
        m="auto"
        padding={"20px"}
        cursor="pointer"
        textAlign="center"
        display="flex"
        flexWrap="wrap"
        textSizeAdjust="auto"
        bg="whiteAlpha.500"
        borderRadius={"10px"}
      >
        <table>
          <tbody>{rows}</tbody>
        </table>
      </Box>
    </Box>
  );
};

export default CateFeature;
