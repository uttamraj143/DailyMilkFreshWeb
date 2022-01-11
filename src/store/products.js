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

export const getSingleProduct = (id, access_token) => {
  return axiosInstance({
    method: "POST",
    url: `product/${id}`,
    headers: { access_token: access_token },
  });
};

export const updateProduct = (access_token, id, data) => {
  return axiosInstance({
    method: "POST",
    url: `/product/${id}/update`,
    data: data,
    headers: { access_token: access_token },
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
