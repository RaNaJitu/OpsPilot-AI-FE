export default function DashboardPanel({ title, action, children, className = "" }) {
  return (
    <section
      className={`rounded-xl border p-5 ${className}`}
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
