import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosInstance = axios.create({
  baseURL: "https://skintify-uit.onrender.com",
  timeout: 10000,
});

let isRefreshing = false;
let queue: any[] = [];

const processQueue = (token: string) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const message =
      error.response?.data?.message || error.message || "API Error";

    console.log("API Error:", message);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");

        const res = await axios.post(
          "https://skintify-uit.onrender.com",
          { refresh_token: refreshToken }
        );

        const newToken = res.data.access_token;

        await AsyncStorage.setItem("access_token", newToken);

        processQueue(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        await AsyncStorage.clear();
        // redirect login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
