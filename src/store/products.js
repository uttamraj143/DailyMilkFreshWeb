import axiosInstance from "axiosConfig";

export const listProducts = (num, access_token) => {
  return axiosInstance({
    method: "POST",
    url: "product/get",
    data: {
      availability: num,
    },
    headers: { access_token: access_token },
  });
};

export const updateProduct = (data) => {
  return axiosInstance({
    method: "POST",
    url: `/user/${data.access_token}/verify/${data.otp}`,
    data: {
      availability: data.num,
    },
  });
};

export const addProduct = (data) => {
  return axiosInstance({
    method: "POST",
    url: "product/add",
    data: data.product,
    headers: { access_token: data.access_token },
  });
};
