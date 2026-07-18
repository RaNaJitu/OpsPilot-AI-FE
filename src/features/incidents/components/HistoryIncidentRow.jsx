import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

import { formatIncidentDate } from "../utils/incidentFormat";
import { CategoryBadge, SeverityBadge, StatusBadge } from "./IncidentBadges";

export default function HistoryIncidentRow({ incident }) {
  return (
    <article
      className="rounded-xl border px-4 py-4 transition hover:border-[var(--app-brand)] md:px-5"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold">{incident.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
            <CategoryBadge category={incident.category} />
          </div>
          <p className="mt-2 text-sm" style={{ color: "var(--app-text-muted)" }}>
            {formatIncidentDate(incident.createdAt)}
          </p>
        </div>

        <Link
          to={`/incidents/${incident.id}`}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-[var(--app-nav-hover)]"
          style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
        >
          <Eye size={15} />
          View
        </Link>
      </div>
    </article>
  );
}
