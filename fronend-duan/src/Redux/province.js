// src/api.js
import axios from "axios";

const API_URL = "https://vapi.vnappmob.com/api/province";

export const fetchProvinces = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

export const fetchDistricts = async (provinceCode) => {
  try {
    const response = await axios.get(`${API_URL}/district/${provinceCode}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};