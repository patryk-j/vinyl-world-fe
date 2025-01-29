import axios from "axios";

const config = { baseURL: "http://localhost:5000" };
const instance = axios.create(config);
instance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("token") || "";
    config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
