import axiosInstance from "axiosConfig";

export const assigningUsersToAgent = (data) => {
  return axiosInstance({
    method: "POST",
    url: "/agentuser/assignUser",
    headers: { access_token: data.access_token },
    data: data.assign_data,
  });
};
