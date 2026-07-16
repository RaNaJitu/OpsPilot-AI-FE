export default function AiChatPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">AI Chat</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Ask OpsPilot about incidents, runbooks, and production health.
        </p>
      </header>

      <div
        className="flex min-h-[420px] flex-col rounded-xl border"
        style={{
          backgroundColor: "var(--app-bg-elevated)",
          borderColor: "var(--app-border)",
        }}
      >
        <div className="flex-1 p-6 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Start a conversation to investigate an incident.
        </div>
        <div className="border-t p-3" style={{ borderColor: "var(--app-border)" }}>
          <input
            type="text"
            placeholder="Ask about an error, service, or timeline..."
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--app-brand)]"
            style={{
              backgroundColor: "var(--app-input-bg)",
              borderColor: "var(--app-border)",
              color: "var(--app-text)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
