/**
 * Unify runbook field names across GET detail vs POST generate.
 * Generate returns `prevention`; detail DTO returns `preventionChecklist`.
 */
export function normalizeRunbook(runbook) {
  if (!runbook || typeof runbook !== "object") return null;

  return {
    id: runbook.id ?? null,
    title: runbook.title || "Incident Runbook",
    estimatedResolutionTime: runbook.estimatedResolutionTime || null,
    immediateActions: asStringList(runbook.immediateActions),
    verificationSteps: asStringList(runbook.verificationSteps),
    rollbackPlan: asStringList(runbook.rollbackPlan),
    prevention: asStringList(
      runbook.prevention ?? runbook.preventionChecklist
    ),
    modelVersion: runbook.modelVersion || null,
    createdAt: runbook.createdAt || null,
    updatedAt: runbook.updatedAt || null,
  };
}

function asStringList(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          return String(item.action || item.step || item.text || JSON.stringify(item)).trim();
        }
        return String(item).trim();
      })
      .filter(Boolean);
  }
  if (typeof value === "string") return value.trim() ? [value.trim()] : [];
  return [];
}

/**
 * Backend GET /incidents/:id returns:
 * { incident, analysis, chatCount, runbook }
 *
 * Pages/components expect a flat incident with analysis fields merged in.
 * Older flat payloads are passed through unchanged.
 */
export function normalizeIncidentDetail(payload) {
  if (!payload || typeof payload !== "object") return payload;

  const body = payload.data;
  if (!body || typeof body !== "object") return payload;

  // Already flat (e.g. analyze mutation cache, upload response)
  if (body.id && body.title !== undefined && !body.incident) {
    return {
      ...payload,
      data: {
        ...body,
        runbook: normalizeRunbook(body.runbook),
      },
    };
  }

  if (!body.incident || typeof body.incident !== "object") {
    return payload;
  }

  return {
    ...payload,
    data: {
      ...body.incident,
      ...(body.analysis || {}),
      runbook: normalizeRunbook(body.runbook),
      chatCount: body.chatCount ?? 0,
    },
  };
}
