import IncidentTrendChart from "../../dashboard/components/IncidentTrendChart";
import RecentIncidentsTable from "../../dashboard/components/RecentIncidentsTable";
import SeverityPieChart from "../../dashboard/components/SeverityPieChart";
import StatCards from "../../dashboard/components/StatCards";

/** Demo payload shaped like GET /dashboard — renders the real dashboard UI. */
const DEMO = {
  summary: {
    totalIncidents: 24,
    critical: 3,
    resolved: 18,
    averageConfidence: 0.91,
  },
  incidentTrend: [
    { date: "2026-07-08", count: 1 },
    { date: "2026-07-09", count: 2 },
    { date: "2026-07-10", count: 1 },
    { date: "2026-07-11", count: 3 },
    { date: "2026-07-12", count: 2 },
    { date: "2026-07-13", count: 4 },
    { date: "2026-07-14", count: 3 },
    { date: "2026-07-15", count: 5 },
    { date: "2026-07-16", count: 2 },
    { date: "2026-07-17", count: 4 },
    { date: "2026-07-18", count: 3 },
    { date: "2026-07-19", count: 4 },
  ],
  severityDistribution: [
    { severity: "CRITICAL", count: 3 },
    { severity: "HIGH", count: 6 },
    { severity: "MEDIUM", count: 9 },
    { severity: "LOW", count: 6 },
  ],
  recentIncidents: [
    {
      id: "demo-1",
      title: "Redis Memory Exhaustion",
      severity: "CRITICAL",
      status: "COMPLETED",
      createdAt: "2026-07-19T08:12:00.000Z",
    },
    {
      id: "demo-2",
      title: "Auth Latency Spike",
      severity: "HIGH",
      status: "COMPLETED",
      createdAt: "2026-07-18T16:40:00.000Z",
    },
    {
      id: "demo-3",
      title: "Nginx Upstream Timeout",
      severity: "MEDIUM",
      status: "ANALYZING",
      createdAt: "2026-07-18T11:05:00.000Z",
    },
  ],
};

/**
 * Real OpsPilot dashboard UI (with demo data) inside a browser frame.
 * This is the product — not a generic illustration.
 */
export default function LandingHeroShot() {
  return (
    <div
      className="landing-mockup relative w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--app-border)",
        backgroundColor: "var(--app-bg-elevated)",
        boxShadow:
          "0 28px 56px -24px color-mix(in srgb, var(--app-brand) 30%, transparent), 0 14px 28px -14px rgb(0 0 0 / 20%)",
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-3 py-2.5"
        style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-nav-hover)" }}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <div
          className="ml-2 flex-1 truncate rounded-md px-2.5 py-1 text-[10px] font-medium"
          style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text-muted)" }}
        >
          app.opspilot.ai / dashboard
        </div>
      </div>

      {/* Scale the real dashboard into the hero frame */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--app-bg)", height: "min(420px, 58vw)" }}
      >
        <div
          className="pointer-events-none origin-top-left select-none"
          style={{
            width: "152%",
            transform: "scale(0.66)",
            padding: "1rem 1.1rem 1.25rem",
          }}
          aria-hidden="true"
        >
          <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
            OpsPilot AI
          </p>
          <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
            AI-powered Site Reliability Engineering Dashboard
          </p>

          <div className="mt-4 space-y-4">
            <StatCards summary={DEMO.summary} />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <IncidentTrendChart data={DEMO.incidentTrend} />
              </div>
              <SeverityPieChart data={DEMO.severityDistribution} />
            </div>
            <RecentIncidentsTable incidents={DEMO.recentIncidents} />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{
            background:
              "linear-gradient(to top, var(--app-bg), color-mix(in srgb, var(--app-bg) 20%, transparent))",
          }}
        />
      </div>
    </div>
  );
}
