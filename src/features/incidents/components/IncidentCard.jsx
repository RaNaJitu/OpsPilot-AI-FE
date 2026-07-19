import { Link } from "react-router-dom";
import { Bot, Trash2 } from "lucide-react";

import { formatIncidentDate, formatRelativeTime } from "../utils/incidentFormat";
import {
  formatCategoryLabel,
  formatConfidenceLabel,
  getAffectedServices,
  truncateSummary,
} from "../utils/incidentCard";
import { SeverityBadge, StatusBadge } from "./IncidentBadges";

function MetaItem({ label, children }) {
  if (!children) return null;
  return (
    <div className="min-w-0">
      <p
        className="text-[10px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--app-text-muted)" }}
      >
        {label}
      </p>
      <div className="mt-0.5 text-sm font-medium leading-snug">{children}</div>
    </div>
  );
}

export default function IncidentCard({
  incident,
  onDelete,
  deleting = false,
  showDelete = true,
}) {
  const services = getAffectedServices(incident);
  const confidence = formatConfidenceLabel(incident.confidence);
  const category = formatCategoryLabel(incident.category);
  const summary = truncateSummary(incident.summary, 130);
  const rootCause = truncateSummary(incident.rootCause, 110);
  const shortDate = formatIncidentDate(incident.createdAt);
  const relative = formatRelativeTime(incident.createdAt);
  const showRootCause =
    rootCause &&
    (!summary || rootCause.replace(/[….]$/, "") !== summary.replace(/[….]$/, ""));

  return (
    <article
      className="rounded-xl border px-3.5 py-3 shadow-sm transition hover:border-[var(--app-brand)] md:px-4 md:py-3.5"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="min-w-0 flex-1 space-y-2.5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {shortDate && shortDate !== "—" && (
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: "var(--app-text-muted)" }}
                  >
                    {shortDate}
                    {relative ? ` · ${relative}` : ""}
                  </p>
                )}
                <h3 className="mt-0.5 text-base font-semibold leading-snug md:text-[17px]">
                  {incident.title}
                </h3>
                {category && (
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--app-text-muted)" }}
                  >
                    <span aria-hidden="true">🗄</span> {category}
                  </p>
                )}
              </div>
              {confidence && (
                <div className="shrink-0 text-right">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: "var(--app-text-muted)" }}
                  >
                    Confidence
                  </p>
                  <p className="mt-0.5 text-sm font-semibold" style={{ color: confidence.tone }}>
                    <span aria-hidden="true">{confidence.emoji}</span> {confidence.percent}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--app-text-muted)" }}>
                    {confidence.level}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
            </div>
          </div>

          {summary && (
            <div
              className="rounded-lg border px-3 py-2"
              style={{
                borderColor: "color-mix(in srgb, var(--app-brand) 22%, var(--app-border))",
                backgroundColor: "color-mix(in srgb, var(--app-brand) 6%, transparent)",
              }}
            >
              <p
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--app-brand)" }}
              >
                <Bot size={12} aria-hidden="true" />
                AI Summary
              </p>
              <p
                className="mt-1 text-sm font-medium leading-relaxed"
                style={{ color: "var(--app-text)" }}
              >
                {summary}
              </p>
            </div>
          )}

          {(showRootCause || services.length > 0) && (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {showRootCause && (
                <MetaItem label="Root Cause">
                  <span style={{ color: "var(--app-text)" }}>{rootCause}</span>
                </MetaItem>
              )}
              {services.length > 0 && (
                <MetaItem label="Affected Components">
                  <div className="flex flex-wrap gap-1.5">
                    {services.map((item) => (
                      <span
                        key={item}
                        className="rounded-md px-1.5 py-0.5 font-mono text-[12px]"
                        style={{
                          backgroundColor: "var(--app-nav-hover)",
                          color: "var(--app-text)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </MetaItem>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-row items-center gap-2 lg:flex-col lg:items-stretch lg:justify-center">
          <Link
            to={`/incidents/${incident.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 lg:flex-none"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            View Incident
          </Link>
          {showDelete && (
            <button
              type="button"
              disabled={deleting}
              onClick={() => onDelete?.(incident)}
              className="inline-flex items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition hover:bg-[var(--app-nav-hover)] disabled:opacity-60"
              style={{ color: "var(--app-text-muted)" }}
              title="Delete incident"
            >
              <Trash2 size={13} />
              {deleting ? "…" : "Delete"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
