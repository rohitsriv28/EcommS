import { axiosInstance } from "../config/Axios";

async function fetchInventory(productId) {
  return await axiosInstance.get(`/inventory/getById/${productId}`);
}

export { fetchInventory };
