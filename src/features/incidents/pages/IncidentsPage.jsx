import EmptyState from "../../../components/common/EmptyState";

export default function IncidentsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Upload logs and track production failures.
        </p>
      </header>

      <EmptyState
        title="No incidents yet"
        description="Upload your first production log to get AI-powered root cause analysis."
        actionLabel="Upload Log"
        onAction={() => {}}
      />
    </div>
  );
}
