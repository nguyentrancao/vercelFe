// api.js

import axios from "axios";

export const fetchTotalProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/products/total`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total products:", error);
    throw error;
  }
};
export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/orders/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchProductQuantity = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/products`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product quantity:", error);
    throw error;
  }
};
export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/users`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DATABASE_API_URL}/orders/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
