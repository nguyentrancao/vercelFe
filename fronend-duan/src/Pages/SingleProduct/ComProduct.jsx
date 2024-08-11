import { Box, Button, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import RatingBar from "../Products/RatingBar";

const ComProduct = ({ prodID }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userID] = useState(Cookies.get("userID") || "");
  const [prodRate, setProdRate] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "" && prodID && userID && prodRate) {
      const feedbackData = {
        prodID,
        userID,
        prodRate,
        comment: newComment,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DATABASE_API_URL}/feedback`,
          feedbackData,
        );

        if (response.status === 200) {
          setNewComment("");
          setProdRate("");
          setSubmitSuccess(true);
        } else {
          console.error("Thêm phản hồi thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi gửi phản hồi:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DATABASE_API_URL}/feedback/${prodID}`,
        );
        if (response.status === 200) {
          const data = response.data;
          setComments(data);
        } else {
          console.error("Lấy bình luận thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    }
    fetchComments();
  }, [prodID, submitSuccess]);

  useEffect(() => {
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  }, [submitSuccess]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DATABASE_API_URL}/feedback/${prodID}`,
        );
        if (response.status === 200) {
          const data = response.data;
          setComments(data);
        } else {
          console.error("Lấy bình luận thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    }
    fetchComments();
  }, [prodID]);

  return (
    <Box
      justifyContent="center"
      w={["100%","80%","80%"]}
      m="auto"
      mt="6"
      cursor="pointer"
      backgroundColor="#dfedfa"
      borderRadius="10px"
      height="auto"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 3px"
      padding="10px"
    >
      <Box>
        <div
          style={{
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              fontFamily: "Arial",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Đánh giá sản phẩm:
          </h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label
                  key={index}
                  style={{ marginRight: "5px", cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setProdRate(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    color={ratingValue <= prodRate ? "#ffc107" : "#ccc"}
                    style={{ marginRight: "2px" }}
                  />
                </label>
              );
            })}
          </div>
          <br />
          <Textarea
            outline="1px solid black"
            placeholder="Hãy nhận xét về sản phẩm này"
            backgroundColor="white"
            value={newComment}
            onChange={handleCommentChange}
          />
        </div>
        <Button
          m="1% 1%"
          fontSize={"10x"}
          borderRadius={"5px"}
          backgroundColor="blue.400"
          color="whiteAlpha.900"
          type="submit"
          onClick={handleCommentSubmit}
        >
          Nhận xét
        </Button>

        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <Box
                p={2}
                borderRadius="5px"
                fontWeight="bold.800"
                fontSize="0.7rem"
                backgroundColor="#FFFFFF"
                boxShadow="rgba(0, 0, 0, 0.15) 0px 0px 3px"
                width="auto"
                border="1px solid black"
              >
                <Text
                  text-transform="capitalize"
                  color="black"
                  fontWeight="500"
                  fontSize="20px"
                >
                  {comment.username}
                </Text>

                <Text padding={2}>
                  <RatingBar rating={comment.prodRate || 0.5} />
                </Text>
                <Text
                  m="none"
                  padding={2}
                  display="flex"
                  fontSize="20px"
                  flexWrap="wrap"
                  w="100%"
                  whiteSpace="normal"
                  h="auto"
                >
                  <p className="comment-outline">{comment.comment}</p>
                </Text>
                <Text padding={2}>Ngày bình luận: 11/00/1002</Text>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
export default ComProduct;
