import axios from "axios";
import { BASE_URL } from "../api/base.api";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BASE_URL,
  withCredentials: true,
});

let tokenPromise = null;

export const setupInterceptors = (getToken, setToken, updateUser) => {
  tokenPromise = new Promise((resolve) => {
    const token = getToken();
    if (token) {
      resolve(token);
    } else {
      resolve(null);
    }
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await tokenPromise;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.get(`${BASE_URL}/auth/refresh`, {
            withCredentials: true,
          });
          const { accessToken, user } = response.data;
          setToken(accessToken);
          updateUser(user);

          tokenPromise = Promise.resolve(accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};

export const updateToken = (newToken) => {
  tokenPromise = Promise.resolve(newToken);
};
