import { Activity, AlertTriangle, CheckCircle2, Gauge } from "lucide-react";

import { formatConfidence } from "../utils/chartTheme";

const CARDS = [
  {
    key: "totalIncidents",
    label: "Total Incidents",
    hint: "All time",
    icon: Activity,
    tone: "var(--app-brand)",
    format: (summary) => String(summary.totalIncidents ?? 0),
  },
  {
    key: "critical",
    label: "Critical",
    hint: "Severity CRITICAL",
    icon: AlertTriangle,
    tone: "var(--app-danger)",
    format: (summary) => String(summary.critical ?? 0),
  },
  {
    key: "resolved",
    label: "Resolved",
    hint: "Analysis completed",
    icon: CheckCircle2,
    tone: "var(--app-success)",
    format: (summary) => String(summary.resolved ?? 0),
  },
  {
    key: "averageConfidence",
    label: "Average Confidence",
    hint: "Across analyzed incidents",
    icon: Gauge,
    tone: "var(--app-brand-secondary)",
    format: (summary) => formatConfidence(summary.averageConfidence),
  },
];

export default function StatCards({ summary }) {
  const data = summary ?? {};

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map(({ key, label, hint, icon: Icon, tone, format }) => (
        <article
          key={key}
          className="rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
              {label}
            </p>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `color-mix(in srgb, ${tone} 14%, transparent)`,
                color: tone,
              }}
            >
              <Icon size={16} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: tone }}>
            {format(data)}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--app-text-muted)" }}>
            {hint}
          </p>
        </article>
      ))}
    </section>
  );
}
