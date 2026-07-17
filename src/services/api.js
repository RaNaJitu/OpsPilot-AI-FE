import axios from "axios";

import config from "../config";

const api = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

const AUTH_SKIP_REFRESH = [
  "/auth/google-auth",
  "/auth/refresh-token",
  "/auth/logout",
];

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

const shouldSkipRefresh = (url = "") =>
  AUTH_SKIP_REFRESH.some((path) => url.includes(path));

const redirectToLogin = () => {
  if (window.location.pathname !== "/") {
    window.location.assign("/");
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Cookies are httpOnly — refresh uses refreshToken cookie automatically
      await api.post("/auth/refresh-token");
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
