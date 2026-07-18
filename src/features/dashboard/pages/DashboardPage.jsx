import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import ErrorState from "../../../components/feedback/ErrorState";
import { useDashboard } from "../hooks/useDashboard";
import CategoryBarChart from "../components/CategoryBarChart";
import DashboardSkeleton from "../components/DashboardSkeleton";
import IncidentTrendChart from "../components/IncidentTrendChart";
import RecentIncidentsTable from "../components/RecentIncidentsTable";
import SeverityPieChart from "../components/SeverityPieChart";
import StatCards from "../components/StatCards";
import TopServicesList from "../components/TopServicesList";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useDashboard();
  const dashboard = data?.data;

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
            OpsPilot AI
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "var(--app-text-muted)" }}>
            Operational overview of incidents, severity, and AI analysis confidence.
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          <Plus size={16} strokeWidth={2.2} />
          Upload Incident
        </Link>
      </header>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !dashboard ? (
        <ErrorState
          title="Couldn't load dashboard"
          description="The dashboard API is unavailable. Please try again."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="space-y-6">
          {isFetching && (
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
              Refreshing…
            </p>
          )}

          <StatCards summary={dashboard.summary} />

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <IncidentTrendChart data={dashboard.incidentTrend} />
            </div>
            <SeverityPieChart data={dashboard.severityDistribution} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CategoryBarChart data={dashboard.categoryDistribution} />
            </div>
            <TopServicesList data={dashboard.topAffectedServices} />
          </div>

          <RecentIncidentsTable incidents={dashboard.recentIncidents} />
        </div>
      )}
    </div>
  );
}
