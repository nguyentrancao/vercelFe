import axios from "axios";
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
} from "./products.type";
import Cookies from "js-cookie";

// Product actions here
export const getProducts =
  (typeOfProduct, brandOfProduct) => async (dispatch) => {
    const userID = Cookies.get("userID");
    // console.log("in the logi func");
    dispatch({ type: GET_PRODUCTS_LOADING });
    try {
      let responce = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/wishlist/${userID}`,
      );

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: responce.data });
    } catch (error) {
      // console.log("in the logi func catch");
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message });
    }
  };
