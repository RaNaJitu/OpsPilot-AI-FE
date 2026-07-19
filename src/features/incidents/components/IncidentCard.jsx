import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { formatIncidentDateTime } from "../utils/incidentFormat";
import {
  formatConfidencePercent,
  getPrimaryService,
  truncateSummary,
} from "../utils/incidentCard";
import { CategoryBadge, SeverityBadge, StatusBadge } from "./IncidentBadges";

function MetaItem({ label, children }) {
  if (!children) return null;
  return (
    <div className="min-w-0">
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--app-text-muted)" }}
      >
        {label}
      </p>
      <div className="mt-1 text-sm font-medium leading-snug">{children}</div>
    </div>
  );
}

export default function IncidentCard({
  incident,
  onDelete,
  deleting = false,
  showDelete = true,
}) {
  const service = getPrimaryService(incident);
  const confidence = formatConfidencePercent(incident.confidence);
  const summary = truncateSummary(incident.summary || incident.rootCause);

  return (
    <article
      className="rounded-xl border p-4 shadow-sm transition hover:border-[var(--app-brand)] md:p-5"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h3 className="text-base font-semibold leading-snug md:text-lg">
              {incident.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
              <CategoryBadge category={incident.category} />
            </div>
          </div>

          {summary && (
            <div
              className="rounded-lg border px-3 py-2.5"
              style={{
                borderColor: "color-mix(in srgb, var(--app-brand) 22%, var(--app-border))",
                backgroundColor: "color-mix(in srgb, var(--app-brand) 6%, transparent)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--app-brand)" }}
              >
                AI Summary
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--app-text)" }}>
                “{summary}”
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetaItem label="Uploaded">
              <span style={{ color: "var(--app-text-muted)" }}>
                {formatIncidentDateTime(incident.createdAt)}
              </span>
            </MetaItem>
            <MetaItem label="Service">
              {service ? (
                <span className="font-mono text-[13px]">{service}</span>
              ) : (
                <span style={{ color: "var(--app-text-muted)" }}>—</span>
              )}
            </MetaItem>
            <MetaItem label="Category">
              {incident.category || (
                <span style={{ color: "var(--app-text-muted)" }}>—</span>
              )}
            </MetaItem>
            <MetaItem label="Confidence">
              {confidence ? (
                <span style={{ color: "var(--app-brand)" }}>{confidence}</span>
              ) : (
                <span style={{ color: "var(--app-text-muted)" }}>Not analyzed</span>
              )}
            </MetaItem>
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-center gap-2 lg:flex-col lg:items-stretch lg:justify-center">
          <Link
            to={`/incidents/${incident.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 lg:flex-none"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            View Incident
          </Link>
          {showDelete && (
            <button
              type="button"
              disabled={deleting}
              onClick={() => onDelete?.(incident)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-[var(--app-nav-hover)] disabled:opacity-60"
              style={{ borderColor: "var(--app-border)", color: "var(--app-danger)" }}
            >
              <Trash2 size={14} />
              {deleting ? "…" : "Delete"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
