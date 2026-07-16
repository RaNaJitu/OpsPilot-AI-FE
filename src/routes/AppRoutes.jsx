import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import ProfilePage from "../features/auth/pages/ProfilePage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import HistoryPage from "../features/dashboard/pages/HistoryPage";
import SettingsPage from "../features/dashboard/pages/SettingsPage";
import IncidentsPage from "../features/incidents/pages/IncidentsPage";
import AiChatPage from "../features/ai/pages/AiChatPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/ai" element={<AiChatPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
