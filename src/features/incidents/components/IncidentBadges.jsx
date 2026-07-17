import {
  formatStatusLabel,
  getSeverityTone,
  getStatusTone,
} from "../utils/incidentFormat";

const SEVERITY_DOT = {
  LOW: "#10b981",
  MEDIUM: "#f59e0b",
  HIGH: "#f97316",
  CRITICAL: "#ef4444",
};

export function StatusBadge({ status }) {
  const tone = getStatusTone(status);
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: tone.bg, color: tone.color }}
    >
      {formatStatusLabel(status)}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  if (!severity) return null;
  const tone = getSeverityTone(severity);
  const dot = SEVERITY_DOT[severity] || tone.color;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ backgroundColor: tone.bg, color: tone.color }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: dot }}
        aria-hidden="true"
      />
      {severity}
    </span>
  );
}

export function CategoryBadge({ category }) {
  if (!category) return null;

  return (
    <span
      className="inline-flex rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{
        backgroundColor: "color-mix(in srgb, var(--app-brand-secondary) 10%, transparent)",
        borderColor: "color-mix(in srgb, var(--app-brand-secondary) 30%, var(--app-border))",
        color: "var(--app-brand-secondary)",
      }}
    >
      {category}
    </span>
  );
}
