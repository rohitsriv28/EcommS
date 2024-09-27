import { axiosInstance } from "../config/Axios";

async function addCart(data) {
  return await axiosInstance.post(`/cart/create`, data);
}

async function fetchCart(uid) {
  return await axiosInstance.get(`/cart/getAllByUserId/?userId=${uid}`);
}

async function patchCart(itemId, data) {
  return await axiosInstance.patch(`/cart/update/${itemId}`, data);
}

async function removeCartItem(itemId) {
  return await axiosInstance.delete(`/cart/remove/${itemId}`);
}

async function deleteCart(ids) {
  return await axiosInstance.delete(`/cart/deleteAll`, {
    data: { ids },
  });
}

export { addCart, fetchCart, patchCart, removeCartItem, deleteCart };
