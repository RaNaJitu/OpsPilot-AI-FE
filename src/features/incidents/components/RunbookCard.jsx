import {
  CheckCircle2,
  Clock3,
  BookOpen,
  RotateCcw,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

function Checklist({ items }) {
  if (!items?.length) {
    return (
      <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
        No steps listed.
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-2.5 text-sm leading-relaxed">
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--app-success)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ icon: Icon, title, accent, children }) {
  return (
    <div
      className="rounded-xl border p-4 md:p-5"
      style={{ borderColor: "var(--app-border)" }}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`,
            color: accent,
          }}
        >
          <Icon size={15} />
        </span>
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function RunbookCard({
  runbook,
  canGenerate,
  generating,
  generateError,
  onGenerate,
}) {
  const hasRunbook = Boolean(runbook?.title || runbook?.immediateActions?.length);

  return (
    <section
      className="space-y-5 rounded-2xl border p-5 md:p-6"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BookOpen size={18} style={{ color: "var(--app-danger)" }} />
            <h2 className="text-base font-semibold">
              {hasRunbook ? runbook.title : "Incident Runbook"}
            </h2>
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
            Actionable recovery steps generated from the AI analysis.
          </p>
        </div>

        {canGenerate && (
          <button
            type="button"
            disabled={generating}
            onClick={onGenerate}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            <Sparkles size={15} />
            {generating
              ? "Generating…"
              : hasRunbook
                ? "Regenerate Runbook"
                : "Generate Runbook"}
          </button>
        )}
      </div>

      {generateError && (
        <p
          className="rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--app-danger)", color: "var(--app-danger)" }}
        >
          {generateError}
        </p>
      )}

      {!hasRunbook ? (
        <div
          className="rounded-xl border border-dashed px-4 py-10 text-center"
          style={{ borderColor: "var(--app-border)" }}
        >
          <p className="text-sm font-medium">No runbook yet</p>
          <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
            {canGenerate
              ? "Generate a recovery runbook from this incident’s analysis."
              : "Complete AI analysis first, then generate a runbook."}
          </p>
        </div>
      ) : (
        <>
          {runbook.estimatedResolutionTime && (
            <div
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{
                borderColor: "color-mix(in srgb, var(--app-brand) 30%, var(--app-border))",
                backgroundColor: "color-mix(in srgb, var(--app-brand) 8%, var(--app-bg-elevated))",
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--app-brand) 16%, transparent)",
                  color: "var(--app-brand)",
                }}
              >
                <Clock3 size={18} />
              </span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--app-text-muted)" }}
                >
                  Estimated Resolution Time
                </p>
                <p className="mt-0.5 text-lg font-semibold tracking-tight">
                  {runbook.estimatedResolutionTime}
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <Section icon={Zap} title="Immediate Actions" accent="var(--app-warning)">
              <Checklist items={runbook.immediateActions} />
            </Section>

            <Section icon={CheckCircle2} title="Verification" accent="var(--app-success)">
              <Checklist items={runbook.verificationSteps} />
            </Section>

            <Section icon={RotateCcw} title="Rollback Plan" accent="var(--app-brand)">
              <Checklist items={runbook.rollbackPlan} />
            </Section>

            <Section icon={Shield} title="Prevention" accent="var(--app-brand-secondary)">
              <Checklist items={runbook.prevention} />
            </Section>
          </div>
        </>
      )}
    </section>
  );
}
