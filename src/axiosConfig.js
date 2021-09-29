import axios from "axios";

const baseURL =
  process.env.REACT_APP_HOSTNAME ||
  "http://dailyfreshmilk-980670318.us-east-1.elb.amazonaws.com/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

export default axiosInstance;
