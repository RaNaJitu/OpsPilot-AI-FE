import { useMemo } from "react";

import ErrorState from "../../../components/feedback/ErrorState";
import { useDashboard } from "../hooks/useDashboard";
import CategoryBarChart from "../components/CategoryBarChart";
import DashboardSkeleton from "../components/DashboardSkeleton";
import IncidentTrendChart from "../components/IncidentTrendChart";
import QuickActions from "../components/QuickActions";
import RecentIncidentsTable from "../components/RecentIncidentsTable";
import SeverityPieChart from "../components/SeverityPieChart";
import StatCards from "../components/StatCards";
import TopServicesList from "../components/TopServicesList";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = useDashboard();
  const dashboard = data?.data;

  const { runbookHref, assistantHref } = useMemo(() => {
    const completed = (dashboard?.recentIncidents ?? []).find(
      (item) => item.status === "COMPLETED"
    );
    if (!completed?.id) {
      return { runbookHref: "/incidents", assistantHref: "/assistant" };
    }
    return {
      runbookHref: `/incidents/${completed.id}`,
      assistantHref: `/assistant?incidentId=${completed.id}`,
    };
  }, [dashboard?.recentIncidents]);

  return (
    <div className="mx-auto max-w-[1440px] space-y-5 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header>
        <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
          OpsPilot AI
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--app-text-muted)" }}>
          AI-powered Site Reliability Engineering Dashboard
        </p>
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
        <div className="space-y-5">
          {isFetching && (
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
              Refreshing…
            </p>
          )}

          <QuickActions runbookHref={runbookHref} assistantHref={assistantHref} />

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
