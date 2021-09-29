import axios from "axios";

const baseURL = process.env.REACT_APP_HOSTNAME;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
});

export default axiosInstance;
