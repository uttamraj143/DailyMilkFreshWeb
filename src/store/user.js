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

export const listUsers = (type) => {
  return axiosInstance({
    method: "GET",
    url: "/user/listUsers",
    data: {
      type_of_user: type,
    },
    headers: { access_token: "access_token" },
  });
};
