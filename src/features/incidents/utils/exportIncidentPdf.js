import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { formatIncidentDate, formatIncidentDateTime } from "./incidentFormat";
import { normalizeRunbook } from "./normalizeIncident";

function asList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function confidenceLabel(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "—";
  const num = Number(value);
  const pct = num <= 1 ? Math.round(num * 100) : Math.round(num);
  return `${pct}%`;
}

function ensureSpace(doc, y, needed = 24) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - 16) {
    doc.addPage();
    return 18;
  }
  return y;
}

function sectionTitle(doc, title, y) {
  y = ensureSpace(doc, y, 16);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(37, 99, 235);
  doc.text(title, 14, y);
  y += 3;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, doc.internal.pageSize.getWidth() - 14, y);
  return y + 8;
}

function bodyText(doc, text, y, options = {}) {
  const {
    size = 10,
    color = [15, 23, 42],
    bold = false,
    maxWidth = doc.internal.pageSize.getWidth() - 28,
  } = options;

  const content = String(text || "—");
  doc.setFont("helvetica", bold ? "bold" : "normal");
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(content, maxWidth);
  y = ensureSpace(doc, y, lines.length * (size * 0.45) + 4);
  doc.text(lines, 14, y);
  return y + lines.length * (size * 0.45) + 4;
}

function bulletList(doc, items, y) {
  const list = asList(items);
  if (!list.length) return bodyText(doc, "—", y);

  for (const item of list) {
    const text =
      typeof item === "string"
        ? item
        : item?.event || item?.description || item?.log || JSON.stringify(item);
    y = ensureSpace(doc, y, 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    const lines = doc.splitTextToSize(`•  ${text}`, doc.internal.pageSize.getWidth() - 28);
    doc.text(lines, 14, y);
    y += lines.length * 4.6 + 2;
  }
  return y + 2;
}

export function exportIncidentPdf(incident) {
  if (!incident) return;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const runbook = normalizeRunbook(incident.runbook);
  const timeline = asList(incident.timeline);
  const evidence = asList(incident.evidence);
  const recommendations = asList(incident.recommendations);
  const prevention = asList(incident.prevention);
  const services = asList(incident.affectedServices);

  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42);
  doc.text("OpsPilot AI — Incident Report", 14, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated ${formatIncidentDateTime(new Date().toISOString())}`, 14, y);
  y += 10;

  y = sectionTitle(doc, "1. Incident Details", y);
  autoTable(doc, {
    startY: y,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 1.5 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 48 } },
    body: [
      ["Title", incident.title || "—"],
      ["Status", incident.status || "—"],
      ["Severity", incident.severity || "—"],
      ["Category", incident.category || "—"],
      ["Created", formatIncidentDate(incident.createdAt)],
      ["Analyzed", incident.analyzedAt ? formatIncidentDateTime(incident.analyzedAt) : "—"],
      ["Confidence", confidenceLabel(incident.confidence)],
      ["Affected Services", services.length ? services.join(", ") : "—"],
    ],
  });
  y = (doc.lastAutoTable?.finalY || y) + 10;

  y = sectionTitle(doc, "2. AI Analysis", y);
  y = bodyText(doc, "Summary", y, { bold: true, size: 10, color: [100, 116, 139] });
  y = bodyText(doc, incident.summary, y);
  y = bodyText(doc, "Root Cause", y, { bold: true, size: 10, color: [100, 116, 139] });
  y = bodyText(doc, incident.rootCause, y);

  y = sectionTitle(doc, "3. Timeline", y);
  if (!timeline.length) {
    y = bodyText(doc, "No timeline events.", y);
  } else {
    for (const item of timeline) {
      const stamp = item?.timestamp || "Unknown time";
      const event = item?.event || item?.description || String(item);
      y = bodyText(doc, stamp, y, { bold: true, size: 9, color: [100, 116, 139] });
      y = bodyText(doc, event, y);
    }
  }

  y = sectionTitle(doc, "4. Evidence", y);
  if (!evidence.length) {
    y = bodyText(doc, "No evidence captured.", y);
  } else {
    evidence.forEach((item, index) => {
      y = bodyText(doc, `Log snippet ${index + 1}`, y, {
        bold: true,
        size: 9,
        color: [100, 116, 139],
      });
      y = bodyText(doc, item?.log || String(item), y, { size: 9 });
      if (item?.explanation) {
        y = bodyText(doc, "Explanation", y, { bold: true, size: 9, color: [100, 116, 139] });
        y = bodyText(doc, item.explanation, y);
      }
    });
  }

  y = sectionTitle(doc, "5. Recommendations", y);
  y = bulletList(
    doc,
    recommendations.map((item) => (typeof item === "string" ? item : JSON.stringify(item))),
    y
  );

  if (prevention.length) {
    y = sectionTitle(doc, "6. Prevention (Analysis)", y);
    y = bulletList(
      doc,
      prevention.map((item) => (typeof item === "string" ? item : JSON.stringify(item))),
      y
    );
  }

  y = sectionTitle(doc, runbook ? "7. Runbook" : "7. Runbook (not generated)", y);
  if (!runbook) {
    y = bodyText(doc, "Generate a runbook from the incident details page to include it here.", y);
  } else {
    y = bodyText(doc, runbook.title, y, { bold: true, size: 12 });
    if (runbook.estimatedResolutionTime) {
      y = bodyText(doc, `Estimated resolution: ${runbook.estimatedResolutionTime}`, y, {
        size: 10,
        color: [37, 99, 235],
        bold: true,
      });
    }

    y = bodyText(doc, "Immediate Actions", y, { bold: true, size: 10, color: [100, 116, 139] });
    y = bulletList(doc, runbook.immediateActions, y);
    y = bodyText(doc, "Verification", y, { bold: true, size: 10, color: [100, 116, 139] });
    y = bulletList(doc, runbook.verificationSteps, y);
    y = bodyText(doc, "Rollback Plan", y, { bold: true, size: 10, color: [100, 116, 139] });
    y = bulletList(doc, runbook.rollbackPlan, y);
    y = bodyText(doc, "Prevention", y, { bold: true, size: 10, color: [100, 116, 139] });
    y = bulletList(doc, runbook.prevention, y);
  }

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `OpsPilot AI · Page ${page} of ${pageCount}`,
      14,
      doc.internal.pageSize.getHeight() - 8
    );
  }

  const safeTitle = String(incident.title || "incident")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  doc.save(`opspilot-${safeTitle || "report"}.pdf`);
}
