import axios from "axios";

// export const BASE_URL = "http://192.168.1.132:3190" //sudha
// export const BASE_URL = "http://192.168.1.221:3130" //sir
export const BASE_URL = "https://ecomm.api.lennobyte.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const get = async (path) => {
  try {
    const response = await axiosInstance(path);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.data;
  } catch (error) {
    console.error("Error in get function:", error);
    throw error;
  }
};

export default get;

export const post = async (path, data, isFormData) => {
  return await axiosInstance.post(path, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

export const patchApi = async (path, data, isFormData) => {
  return await axiosInstance.patch(path, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};

export const putApi = async (path, data, isFormData) => {
  return await axiosInstance.put(path, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
};
