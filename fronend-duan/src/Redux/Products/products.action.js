import axios from "axios";
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
} from "./products.type";

// Product actions here
export const getProducts =
  (typeOfProduct, brandOfProduct) => async (dispatch) => {
    // console.log("in the logi func");
    dispatch({ type: GET_PRODUCTS_LOADING });
    try {
      let responce = await axios.get(
        `${process.env.REACT_APP_DATABASE_API_URL}/category/${typeOfProduct}`,
      );

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: responce.data });
    } catch (error) {
      // console.log("in the logi func catch");
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error.message });
    }
  };
