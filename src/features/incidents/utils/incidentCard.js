export function getAffectedServices(incident, max = 4) {
  if (!incident) return [];

  const fromList = Array.isArray(incident.affectedServices)
    ? incident.affectedServices
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    : [];

  if (fromList.length > 0) {
    return fromList.slice(0, max);
  }

  if (typeof incident.affectedService === "string" && incident.affectedService.trim()) {
    return [incident.affectedService.trim()];
  }

  return [];
}

export function getPrimaryService(incident) {
  return getAffectedServices(incident, 1)[0] || null;
}

export function formatCategoryLabel(category) {
  if (!category || typeof category !== "string") return null;
  const cleaned = category.trim();
  if (!cleaned) return null;
  return cleaned
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function confidenceToPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }
  const num = Number(value);
  return num <= 1 ? Math.round(num * 100) : Math.round(num);
}

export function formatConfidencePercent(value) {
  const pct = confidenceToPercent(value);
  return pct === null ? null : `${pct}%`;
}

/** Rich confidence label for UI: "🟢 91% High Confidence" */
export function formatConfidenceLabel(value) {
  const pct = confidenceToPercent(value);
  if (pct === null) return null;

  if (pct >= 80) {
    return { percent: `${pct}%`, level: "High Confidence", emoji: "🟢", tone: "var(--app-success)" };
  }
  if (pct >= 55) {
    return { percent: `${pct}%`, level: "Medium Confidence", emoji: "🟡", tone: "var(--app-warning)" };
  }
  return { percent: `${pct}%`, level: "Low Confidence", emoji: "🟠", tone: "#ea580c" };
}

export function truncateSummary(text, max = 140) {
  if (!text || typeof text !== "string") return null;
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}
