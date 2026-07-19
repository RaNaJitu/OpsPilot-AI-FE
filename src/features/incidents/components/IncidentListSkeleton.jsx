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
            <div className="h-5 w-16 rounded-md" style={{ backgroundColor: "var(--app-nav-hover)" }} />
          </div>
          <div
            className="mt-4 h-16 w-full rounded-lg"
            style={{ backgroundColor: "var(--app-nav-hover)" }}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((__, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-14 rounded" style={{ backgroundColor: "var(--app-nav-hover)" }} />
                <div className="h-4 w-24 rounded" style={{ backgroundColor: "var(--app-nav-hover)" }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
