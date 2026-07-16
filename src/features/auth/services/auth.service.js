import api from "../../../services/api";

export const googleLogin = (idToken) =>
  api.post("/auth/google-auth", {
    idToken,
  });

export const getProfile = () =>
  api.get("/auth/profile");

export const logout = () =>
  api.post("/auth/logout");