import axios from "axios";

const API_URL = "http://localhost:5000/auth/register";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
