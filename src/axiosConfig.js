import axios from "axios";

const baseurl = process.env.hostname;

export const axiosInstance = axios.create({
  baseURL: process.env.hostname,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

// export default axiosInstance;
