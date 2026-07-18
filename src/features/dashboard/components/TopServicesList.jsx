import DashboardPanel from "./DashboardPanel";

export default function TopServicesList({ data }) {
  const services = data ?? [];
  const max = services[0]?.count || 1;

  return (
    <DashboardPanel title="Top Services">
      {services.length === 0 ? (
        <p className="flex h-[260px] items-center justify-center text-sm" style={{ color: "var(--app-text-muted)" }}>
          No affected services yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {services.map((item, index) => {
            const width = Math.max(8, Math.round((item.count / max) * 100));
            return (
              <li key={item.service}>
                <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
                        color: "var(--app-brand)",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate font-medium">{item.service}</span>
                  </span>
                  <span className="shrink-0 font-semibold">{item.count}</span>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--app-nav-hover)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${width}%`,
                      background:
                        "linear-gradient(90deg, var(--app-brand) 0%, var(--app-brand-secondary) 100%)",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardPanel>
  );
}
