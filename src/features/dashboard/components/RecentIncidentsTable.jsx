import { Link } from "react-router-dom";

import { formatIncidentDate } from "../../incidents/utils/incidentFormat";
import { SeverityBadge, StatusBadge } from "../../incidents/components/IncidentBadges";
import DashboardPanel from "./DashboardPanel";

export default function RecentIncidentsTable({ incidents }) {
  const rows = incidents ?? [];

  return (
    <DashboardPanel
      title="Recent Incidents"
      action={
        <Link to="/incidents" className="text-sm font-medium" style={{ color: "var(--app-brand)" }}>
          View all
        </Link>
      }
    >
      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
          No incidents yet. Upload a log to get started.
        </p>
      ) : (
        <div className="-mx-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr
                className="border-y text-xs uppercase tracking-wide"
                style={{
                  borderColor: "var(--app-border)",
                  color: "var(--app-text-muted)",
                }}
              >
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Severity</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-b last:border-b-0"
                  style={{ borderColor: "var(--app-border)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--app-nav-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td className="px-5 py-3">
                    <Link
                      to={`/incidents/${incident.id}`}
                      className="font-medium hover:underline"
                      style={{ color: "var(--app-text)" }}
                    >
                      {incident.title || "Untitled incident"}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    {incident.severity ? (
                      <SeverityBadge severity={incident.severity} />
                    ) : (
                      <span style={{ color: "var(--app-text-muted)" }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={incident.status} />
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: "var(--app-text-muted)" }}>
                    {formatIncidentDate(incident.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardPanel>
  );
}
