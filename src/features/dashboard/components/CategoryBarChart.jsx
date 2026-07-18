import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartTheme } from "../hooks/useChartTheme";
import DashboardPanel from "./DashboardPanel";

function BarTooltip({ active, payload, theme }) {
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
      <p className="font-semibold">{item.category}</p>
      <p className="mt-1" style={{ color: theme.text }}>
        {item.count} incidents
      </p>
    </div>
  );
}

export default function CategoryBarChart({ data }) {
  const theme = useChartTheme();
  const series = (data ?? []).slice(0, 8);

  return (
    <DashboardPanel title="Top Categories">
      {series.length === 0 ? (
        <p className="flex h-[260px] items-center justify-center text-sm" style={{ color: "var(--app-text-muted)" }}>
          No categories yet. Analyze incidents to populate this chart.
        </p>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={series}
              layout="vertical"
              margin={{ top: 4, right: 12, left: 8, bottom: 0 }}
            >
              <CartesianGrid stroke={theme.border} strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fill: theme.text, fontSize: 11 }}
                axisLine={{ stroke: theme.border }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="category"
                width={88}
                tick={{ fill: theme.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={{ fill: "transparent" }} content={<BarTooltip theme={theme} />} />
              <Bar dataKey="count" fill={theme.brandSecondary} radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardPanel>
  );
}
