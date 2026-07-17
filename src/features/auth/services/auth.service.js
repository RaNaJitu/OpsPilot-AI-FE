import api from "../../../services/api";

export const googleLogin = (idToken) =>
  api.post("/auth/google-auth", {
    idToken,
  });

export const getProfile = () =>
  api.post("/auth/profile");

export const refreshToken = () =>
  api.post("/auth/refresh-token");

export const logout = () =>
  api.post("/auth/logout");
