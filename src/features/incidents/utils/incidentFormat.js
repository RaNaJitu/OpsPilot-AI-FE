export function formatIncidentDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatIncidentDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Timeline-friendly: date line + time line */
export function formatTimelineTimestamp(value) {
  if (!value) return { date: "Unknown time", time: null };

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { date: String(value), time: null };
  }

  return {
    date: date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: `${date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })} UTC`,
  };
}

export function formatClockTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatDurationMs(ms) {
  if (ms === null || ms === undefined || Number.isNaN(Number(ms))) return null;
  const seconds = Number(ms) / 1000;
  return `${seconds.toFixed(2)} sec`;
}

export function formatFileSize(bytes) {
  if (bytes === null || bytes === undefined || Number.isNaN(Number(bytes))) {
    return null;
  }
  const size = Number(bytes);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatRelativeTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
}

export function shortIncidentId(id) {
  if (!id) return "—";
  return String(id).slice(-5).toUpperCase();
}

export function formatStatusLabel(status) {
  if (!status) return "Unknown";
  return String(status)
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function getStatusTone(status) {
  switch (status) {
    case "COMPLETED":
      return {
        bg: "color-mix(in srgb, var(--app-success) 14%, transparent)",
        color: "var(--app-success)",
      };
    case "ANALYZING":
      return {
        bg: "color-mix(in srgb, var(--app-brand) 14%, transparent)",
        color: "var(--app-brand)",
      };
    case "FAILED":
      return {
        bg: "color-mix(in srgb, var(--app-danger) 14%, transparent)",
        color: "var(--app-danger)",
      };
    case "PENDING":
    default:
      return {
        bg: "color-mix(in srgb, var(--app-warning) 14%, transparent)",
        color: "var(--app-warning)",
      };
  }
}

export function getSeverityTone(severity) {
  switch (severity) {
    case "CRITICAL":
      return {
        bg: "color-mix(in srgb, var(--app-danger) 16%, transparent)",
        color: "var(--app-danger)",
      };
    case "HIGH":
      return {
        bg: "color-mix(in srgb, #f97316 16%, transparent)",
        color: "#ea580c",
      };
    case "MEDIUM":
      return {
        bg: "color-mix(in srgb, var(--app-warning) 16%, transparent)",
        color: "var(--app-warning)",
      };
    case "LOW":
      return {
        bg: "color-mix(in srgb, var(--app-success) 16%, transparent)",
        color: "var(--app-success)",
      };
    default:
      return {
        bg: "var(--app-nav-hover)",
        color: "var(--app-text-muted)",
      };
  }
}
