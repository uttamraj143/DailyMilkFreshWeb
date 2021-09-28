import axiosInstance from "axiosConfig";

export const userlogin = (data) => {
  return axiosInstance({
    method: "POST",
    url: "user/login",
    data: data,
  });
};

export const getToken = (authcode) => {
  return axiosInstance({
    method: "POST",
    url: "oauth/token",
    headers: {
      grant_type: "code",
      code: authcode,
    },
  });
};

export const getUser = (token) => {
  return axiosInstance({
    method: "GET",
    url: "user/details",
    headers: {
      access_token: token,
    },
  });
};
