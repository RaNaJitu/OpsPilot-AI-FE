import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

import { formatIncidentDate } from "../utils/incidentFormat";
import { SeverityBadge, StatusBadge } from "./IncidentBadges";

export default function IncidentCard({ incident, onDelete, deleting = false }) {
  return (
    <article
      className="rounded-xl border p-5 shadow-sm transition hover:border-[var(--app-brand)]"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold md:text-lg">{incident.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
          <p className="mt-3 text-sm" style={{ color: "var(--app-text-muted)" }}>
            {formatIncidentDate(incident.createdAt)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={`/incidents/${incident.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-[var(--app-nav-hover)]"
            style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
          >
            <Eye size={15} />
            View
          </Link>
          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete?.(incident)}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-[var(--app-nav-hover)] disabled:opacity-60"
            style={{ borderColor: "var(--app-border)", color: "var(--app-danger)" }}
          >
            <Trash2 size={15} />
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
