import axios from "axios";

const baseURL =
  "http://localhost:8000" || "https://dailyorganicfresh.dailyfresh.farm";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default axiosInstance;
