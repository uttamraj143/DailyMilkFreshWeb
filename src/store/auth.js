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

export const forgotpasswordToken = (phoneNumber) => {
  return axiosInstance({
    method: "POST",
    url: "user/forgot",
    data: {
      phone_no: phoneNumber,
    },
  });
};

export const changePassword = (data) => {
  return axiosInstance({
    method: "POST",
    url: `user/${data.code}/password`,
    data: {
      pin: 1234,
      npassword: data.newpassword,
    },
  });
};
