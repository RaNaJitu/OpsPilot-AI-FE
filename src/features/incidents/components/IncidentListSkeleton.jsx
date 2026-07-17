export default function IncidentListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <div className="h-5 w-2/3 rounded" style={{ backgroundColor: "var(--app-nav-hover)" }} />
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-16 rounded-full" style={{ backgroundColor: "var(--app-nav-hover)" }} />
            <div className="h-5 w-20 rounded-full" style={{ backgroundColor: "var(--app-nav-hover)" }} />
          </div>
          <div className="mt-4 h-4 w-28 rounded" style={{ backgroundColor: "var(--app-nav-hover)" }} />
        </div>
      ))}
    </div>
  );
}
