import { Navigate, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import EmptyLayout from "../layouts/EmptyLayout";

import LandingPage from "../features/auth/pages/LandingPage";
import AboutPage from "../features/auth/pages/AboutPage";
import PricingPage from "../features/auth/pages/PricingPage";
import ProfilePage from "../features/auth/pages/ProfilePage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import IncidentsPage from "../features/incidents/pages/IncidentsPage";
import IncidentHistoryPage from "../features/incidents/pages/IncidentHistoryPage";
import UploadIncidentPage from "../features/incidents/pages/UploadIncidentPage";
import IncidentDetailsPage from "../features/incidents/pages/IncidentDetailsPage";
import IncidentAssistantPage from "../features/ai/pages/IncidentAssistantPage";
import NotFoundPage from "../features/errors/pages/NotFoundPage";
import ForbiddenPage from "../features/errors/pages/ForbiddenPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<EmptyLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<Navigate to="/#get-started" replace />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<UploadIncidentPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/incidents/:incidentId" element={<IncidentDetailsPage />} />
        <Route path="/assistant" element={<IncidentAssistantPage />} />
        <Route path="/ai" element={<Navigate to="/assistant" replace />} />
        <Route path="/history" element={<IncidentHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
