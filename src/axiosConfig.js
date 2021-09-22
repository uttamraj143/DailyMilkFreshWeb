import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://dailyfreshmilk-980670318.us-east-1.elb.amazonaws.com/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
