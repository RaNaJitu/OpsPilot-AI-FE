function Block({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl border ${className}`}
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    />
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={`qa-${i}`} className="h-16" />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-24" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Block className="h-[340px] lg:col-span-2" />
        <Block className="h-[340px]" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Block className="h-[340px] lg:col-span-2" />
        <Block className="h-[340px]" />
      </div>
      <Block className="h-64" />
    </div>
  );
}
