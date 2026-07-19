import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useChartTheme } from "../hooks/useChartTheme";
import { severityColor } from "../utils/chartTheme";
import DashboardPanel from "./DashboardPanel";

const SEVERITY_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
const SEVERITY_LABEL = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

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
      <p className="font-semibold">{SEVERITY_LABEL[item.severity] || item.severity}</p>
      <p className="mt-1" style={{ color: theme.text }}>
        {item.count} incidents
      </p>
    </div>
  );
}

export default function SeverityPieChart({ data }) {
  const theme = useChartTheme();

  const bySeverity = new Map((data ?? []).map((row) => [row.severity, Number(row.count) || 0]));

  const legend = SEVERITY_ORDER.map((severity) => ({
    severity: severity,
    label: SEVERITY_LABEL[severity],
    count: bySeverity.get(severity) ?? 0,
    fill: severityColor(severity, theme),
  }));

  // Keep zero slices out of the donut, but always show the full legend.
  const series = legend.filter((row) => row.count > 0);
  const total = legend.reduce((sum, row) => sum + row.count, 0);

  return (
    <DashboardPanel title="Severity Distribution">
      {total === 0 ? (
        <div className="flex h-[240px] flex-col justify-center gap-4">
          <p className="text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
            No severity data yet.
          </p>
          <ul className="mx-auto w-full max-w-[180px] space-y-2">
            {legend.map((item) => (
              <li key={item.severity} className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
                <span className="font-semibold">0</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex h-[240px] flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-[170px] w-full sm:h-full sm:flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={series}
                  dataKey="count"
                  nameKey="label"
                  innerRadius={48}
                  outerRadius={72}
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
            {legend.map((item) => (
              <li key={item.severity} className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                    aria-hidden="true"
                  />
                  {item.label}
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
