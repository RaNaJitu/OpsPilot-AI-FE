import api from "../../../services/api";

export const googleLogin = (idToken) =>
  api.post("/auth/google-auth", {
    idToken,
  });

export const getProfile = () => api.post("/auth/profile");

export const logout = () => api.post("/auth/logout");
