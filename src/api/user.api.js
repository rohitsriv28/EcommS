import { axiosInstance } from "../config/Axios";

async function fetchUser(uid) {
  return await axiosInstance.get(`/users/getAllByUserId/?userId=${uid}`);
}

async function patchUser(data, mul) {
  return await axiosInstance.patch(`/users/update/`, data, {
    headers: {
      "Content-Type": mul ? "multipart/form-data" : "application/json",
    },
  });
}

async function removeUserItem(itemId) {
  return await axiosInstance.delete(`/users/remove/${itemId}`);
}

export { fetchUser, patchUser, removeUserItem };
