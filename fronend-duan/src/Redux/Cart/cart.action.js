import { CartError, CartLoading, CartSuccess } from "./cart.types";
import Cookies from "js-cookie";
import axios from "axios";

// Define the getCartByUserID function
function getCartByUserID(userID) {
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || {};
  return cartData[userID] || [];
}

export const getData = () => async (dispatch) => {
  dispatch({ type: CartLoading });
  try {
    // Get user ID from cookies
    const userID = Cookies.get("userID");

    // Fetch cart data using the getCartByUserID function
    let cart = getCartByUserID(userID);

    // Initialize an array to store responses
    let responses = [];

    // Make an HTTP request for each item in the cart
    for (let i = 0; i < cart.length; i++) {
      let url = `${process.env.REACT_APP_DATABASE_API_URL}/products/${cart[i].prodID}`;

      if (cart[i].colorID !== null) {
        url += `/${cart[i].colorID}`; 
      }

      if (cart[i].storageID !== null) {
        url += `/${cart[i].storageID}`;
      }
      if (cart[i].ramID!== null) {    
        url += `/ram/${cart[i].ramID}`;
      }

      const res = await axios.get(url, {});

      // Include quantity within the product data and push to responses array
      responses.push({
        cart: {
          ...res.data,
        },
        quantity: cart[i].quantity, // Use the quantity from the cart
      });
    }

    // Update the quantity in sessionStorage
    cart = cart.map((item, index) => ({
      ...item,
      quantity: responses[index].quantity,
    }));

    const cartData = {
      ...JSON.parse(sessionStorage.getItem("cart")),
      [userID]: cart,
    };
    sessionStorage.setItem("cart", JSON.stringify(cartData));

    // Dispatch the success action with the combined data
    dispatch({ type: CartSuccess, payload: responses });
  } catch (err) {
    // Dispatch the error action in case of any issues
    dispatch({ type: CartError, error: "Có lỗi khi tải dữ liệu từ API." });
  }
};
