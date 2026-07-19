export function getPrimaryService(incident) {
  if (!incident) return null;
  if (Array.isArray(incident.affectedServices)) {
    const first = incident.affectedServices.find(
      (item) => typeof item === "string" && item.trim()
    );
    if (first) return first.trim();
  }
  if (typeof incident.affectedService === "string" && incident.affectedService.trim()) {
    return incident.affectedService.trim();
  }
  return null;
}

export function formatConfidencePercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null;
  }
  const num = Number(value);
  const pct = num <= 1 ? Math.round(num * 100) : Math.round(num);
  return `${pct}%`;
}

export function truncateSummary(text, max = 140) {
  if (!text || typeof text !== "string") return null;
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}
