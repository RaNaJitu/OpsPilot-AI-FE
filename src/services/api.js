import axios from "axios";

import config from "../config";
import { getApiErrorCode, isNetworkError } from "../utils/apiError";
import { appToast } from "../utils/toast";

const api = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

const AUTH_SKIP_REFRESH = [
  "/auth/google-auth",
  "/auth/refresh-token",
  "/auth/logout",
];

/**
 * Access cookie missing OR invalid/expired → try refresh.
 * Refresh cookie may still be valid when the access cookie is gone.
 */
const REFRESHABLE_401_CODES = new Set([
  "ACCESS_TOKEN_MISSING",
  "INVALID_ACCESS_TOKEN",
  "TOKEN_EXPIRED",
]);

let isRefreshing = false;
let failedQueue = [];
const recentGlobalToasts = new Map();

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

const shouldSkipRefresh = (url = "") =>
  AUTH_SKIP_REFRESH.some((path) => url.includes(path));

const isRefreshableAuthError = (code) => REFRESHABLE_401_CODES.has(code);

const redirectToLanding = () => {
  if (window.location.pathname !== "/") {
    window.location.assign("/");
  }
};

const toastOnce = (key, message, type = "error") => {
  const now = Date.now();
  const last = recentGlobalToasts.get(key) || 0;
  if (now - last < 4000) return;
  recentGlobalToasts.set(key, now);
  if (type === "error") appToast.error(message);
  else appToast.info(message);
};

const notifyGlobalHttpError = (error, originalRequest) => {
  if (originalRequest?.skipGlobalError) return;

  if (isNetworkError(error)) {
    toastOnce("network", "No Internet — check your connection and retry.");
    return;
  }

  const status = error.response?.status;
  if (status === 403) {
    toastOnce("403", "Access denied.");
    return;
  }
  if (status >= 500) {
    toastOnce("500", "Something went wrong on our side. Please try again.");
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    // Backend uses `error` (e.g. ACCESS_TOKEN_MISSING); accept `code` as fallback.
    const errorCode = getApiErrorCode(error);

    const canRefresh =
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !shouldSkipRefresh(originalRequest.url) &&
      isRefreshableAuthError(errorCode);

    if (!canRefresh) {
      notifyGlobalHttpError(error, originalRequest);
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
      await api.post("/auth/refresh-token");
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      redirectToLanding();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
