import axios from "axios";

const baseURL = process.env.hostname;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "X-Custom-Header": 'foobar'},
});
