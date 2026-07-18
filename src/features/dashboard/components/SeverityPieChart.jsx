import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useChartTheme } from "../hooks/useChartTheme";
import { severityColor } from "../utils/chartTheme";
import DashboardPanel from "./DashboardPanel";

function PieTooltip({ active, payload, theme }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-sm"
      style={{
        backgroundColor: theme.elevated,
        borderColor: theme.border,
        color: "var(--app-text)",
      }}
    >
      <p className="font-semibold">{item.severity}</p>
      <p className="mt-1" style={{ color: theme.text }}>
        {item.count} incidents
      </p>
    </div>
  );
}

export default function SeverityPieChart({ data }) {
  const theme = useChartTheme();
  const series = (data ?? [])
    .filter((row) => row.count > 0)
    .map((row) => ({
      ...row,
      fill: severityColor(row.severity, theme),
    }));
  const total = series.reduce((sum, row) => sum + row.count, 0);

  return (
    <DashboardPanel title="Severity Distribution">
      {total === 0 ? (
        <p className="flex h-[260px] items-center justify-center text-sm" style={{ color: "var(--app-text-muted)" }}>
          No severity data yet.
        </p>
      ) : (
        <div className="flex h-[260px] flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-[180px] w-full sm:h-full sm:flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={series}
                  dataKey="count"
                  nameKey="severity"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={2}
                  stroke="none"
                >
                  {series.map((entry) => (
                    <Cell key={entry.severity} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip theme={theme} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="w-full space-y-2 sm:w-36">
            {series.map((item) => (
              <li key={item.severity} className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                    aria-hidden="true"
                  />
                  {item.severity}
                </span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardPanel>
  );
}
