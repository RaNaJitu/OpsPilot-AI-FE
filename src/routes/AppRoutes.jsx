import { Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/Login/LoginPage";
import DashboardPage from "../features/auth/pages/Dashboard/DashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
    </Routes>
  );
}