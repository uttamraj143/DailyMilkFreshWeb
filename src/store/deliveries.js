import axiosInstance from "axiosConfig";

export const listDeliveryTypes = (access_token) => {
  return axiosInstance({
    method: "GET",
    url: "deliverytype/listdeliverytypes",
    headers: { access_token: access_token },
  });
};

export const updateDeliveryTypes = (access_token, senddata, id) => {
  return axiosInstance({
    method: "POST",
    url: `deliverytype/${id}/updatedeliverytype`,
    headers: { access_token: access_token },
    data: senddata,
  });
};

export const addDeliveryTypes = (data) => {
  return axiosInstance({
    method: "POST",
    url: "deliverytype/adddeliverytype",
    data: data,
    headers: { access_token: data.access_token },
  });
};
