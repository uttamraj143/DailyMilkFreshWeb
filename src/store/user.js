import axiosInstance from "axiosConfig";

export const getUser = (token) => {
  return axiosInstance({
    method: "GET",
    url: "user/details",
    headers: {
      access_token: token,
    },
  });
};

export const listUsers = (type, access_token) => {
  return axiosInstance({
    method: "POST",
    url: "/user/listUsers",
    data: {
      type_of_user: type,
    },
    headers: { access_token: access_token },
  });
};

export const registerUser = (token) => {
  return axiosInstance({
    method: "POST",
    url: "/user/register/",
    headers: {
      access_token: token,
    },
  });
};
