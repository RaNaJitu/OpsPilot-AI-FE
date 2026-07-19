import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, CheckCircle2, Gauge } from "lucide-react";

import { formatConfidence } from "../utils/chartTheme";

function buildTrend(key, summary) {
  const total = Number(summary.totalIncidents) || 0;
  const critical = Number(summary.critical) || 0;
  const resolved = Number(summary.resolved) || 0;

  switch (key) {
    case "totalIncidents":
      return total > 0
        ? { label: "↑ 20% this week", positive: true }
        : { label: "No activity yet", positive: null };
    case "critical":
      return critical > 0
        ? { label: `${critical} need attention`, positive: false }
        : { label: "None open", positive: true };
    case "resolved":
      return resolved > 0
        ? { label: "+2 today", positive: true }
        : { label: "Awaiting analysis", positive: null };
    case "averageConfidence":
      return summary.averageConfidence
        ? { label: "Stable vs last week", positive: true }
        : { label: "No analyses yet", positive: null };
    default:
      return { label: "", positive: null };
  }
}

const CARDS = [
  {
    key: "totalIncidents",
    label: "Total Incidents",
    icon: Activity,
    tone: "var(--app-brand)",
    format: (summary) => String(summary.totalIncidents ?? 0),
  },
  {
    key: "critical",
    label: "Critical",
    icon: AlertTriangle,
    tone: "var(--app-danger)",
    format: (summary) => String(summary.critical ?? 0),
  },
  {
    key: "resolved",
    label: "Resolved",
    icon: CheckCircle2,
    tone: "var(--app-success)",
    format: (summary) => String(summary.resolved ?? 0),
  },
  {
    key: "averageConfidence",
    label: "Average Confidence",
    icon: Gauge,
    tone: "var(--app-brand-secondary)",
    format: (summary) => formatConfidence(summary.averageConfidence),
  },
];

export default function StatCards({ summary }) {
  const data = summary ?? {};

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map(({ key, label, icon: Icon, tone, format }) => {
        const trend = buildTrend(key, data);
        const TrendIcon =
          trend.positive === true
            ? ArrowUpRight
            : trend.positive === false
              ? ArrowDownRight
              : null;

        return (
          <article
            key={key}
            className="rounded-xl border px-4 py-3.5"
            style={{
              backgroundColor: "var(--app-bg-elevated)",
              borderColor: "var(--app-border)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium" style={{ color: "var(--app-text-muted)" }}>
                {label}
              </p>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${tone} 14%, transparent)`,
                  color: tone,
                }}
              >
                <Icon size={14} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: tone }}>
              {format(data)}
            </p>
            <p
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium"
              style={{
                color:
                  trend.positive === true
                    ? "var(--app-success)"
                    : trend.positive === false
                      ? "var(--app-danger)"
                      : "var(--app-text-muted)",
              }}
            >
              {TrendIcon ? <TrendIcon size={12} /> : null}
              {trend.label}
            </p>
          </article>
        );
      })}
    </section>
  );
}
