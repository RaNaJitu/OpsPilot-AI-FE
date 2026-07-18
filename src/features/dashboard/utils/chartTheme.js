const SEVERITY_FALLBACK = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#f59e0b",
  LOW: "#10b981",
};

export function readCssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function getChartTheme() {
  return {
    text: readCssVar("--app-text-muted", "#64748b"),
    border: readCssVar("--app-border", "#e2e8f0"),
    brand: readCssVar("--app-brand", "#2563eb"),
    brandSecondary: readCssVar("--app-brand-secondary", "#4f46e5"),
    success: readCssVar("--app-success", "#10b981"),
    warning: readCssVar("--app-warning", "#f59e0b"),
    danger: readCssVar("--app-danger", "#ef4444"),
    elevated: readCssVar("--app-bg-elevated", "#ffffff"),
  };
}

export function severityColor(severity, theme) {
  switch (severity) {
    case "CRITICAL":
      return theme?.danger || SEVERITY_FALLBACK.CRITICAL;
    case "HIGH":
      return SEVERITY_FALLBACK.HIGH;
    case "MEDIUM":
      return theme?.warning || SEVERITY_FALLBACK.MEDIUM;
    case "LOW":
      return theme?.success || SEVERITY_FALLBACK.LOW;
    default:
      return theme?.text || "#64748b";
  }
}

export function formatConfidence(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }
  const num = Number(value);
  // Backend returns ~0–100 already (e.g. 90); tolerate 0–1 fractions.
  const pct = num <= 1 ? Math.round(num * 100) : Math.round(num);
  return `${pct}%`;
}

export function formatTrendLabel(dateKey) {
  if (!dateKey) return "";
  const date = new Date(`${dateKey}T00:00:00Z`);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
