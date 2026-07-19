import { formatConfidenceLabel } from "../../incidents/utils/incidentCard";

export default function ConfidenceLabel({ value, compact = false }) {
  const meta = formatConfidenceLabel(value);
  if (!meta) return null;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 font-medium" style={{ color: meta.tone }}>
        <span aria-hidden="true">{meta.emoji}</span>
        {meta.percent}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: meta.tone }}>
      <span aria-hidden="true">{meta.emoji}</span>
      <span>{meta.percent}</span>
      <span style={{ color: "var(--app-text-muted)" }}>{meta.level}</span>
    </span>
  );
}
