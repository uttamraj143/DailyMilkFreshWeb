import axios from "axios";

const baseURL =
  process.env.REACT_APP_HOSTNAME || "http://dailyorganicfresh.dailyfresh.farm";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default axiosInstance;
