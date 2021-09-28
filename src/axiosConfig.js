import axios from "axios";

const baseURL = process.env.REACT_APP_HOSTNAME;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default axiosInstance;
