import { axiosInstance } from "axiosConfig";

const userlogin = (data) => {
  // let headers = {
  //   "tom-Header": "loginBar",
  // };
  return axiosInstance({
    method: "POST",
    url: "user/login",
    data: data,
  });
};

// const get = id => {
//   return http.get(`/tutorials/${id}`);
// };

// const handleLogin = data => {
//   return http.post("/tutorials", data);
// };

export default {
  userlogin,
};
