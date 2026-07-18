import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useChartTheme } from "../hooks/useChartTheme";
import { formatTrendLabel } from "../utils/chartTheme";
import DashboardPanel from "./DashboardPanel";

function TrendTooltip({ active, payload, label, theme }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-sm"
      style={{
        backgroundColor: theme.elevated,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <p className="font-semibold" style={{ color: "var(--app-text)" }}>
        {formatTrendLabel(label)}
      </p>
      <p className="mt-1">{payload[0].value} incidents</p>
    </div>
  );
}

export default function IncidentTrendChart({ data }) {
  const theme = useChartTheme();
  const series = data ?? [];
  const hasPoints = series.some((row) => row.count > 0);

  return (
    <DashboardPanel title="Incident Trend" action={<span className="text-xs" style={{ color: "var(--app-text-muted)" }}>Last 14 days</span>}>
      {!hasPoints ? (
        <p className="flex h-[260px] items-center justify-center text-sm" style={{ color: "var(--app-text-muted)" }}>
          No incidents in the last 14 days.
        </p>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.brand} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={theme.brand} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={theme.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={formatTrendLabel}
                tick={{ fill: theme.text, fontSize: 11 }}
                axisLine={{ stroke: theme.border }}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: theme.text, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip content={<TrendTooltip theme={theme} />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke={theme.brand}
                strokeWidth={2}
                fill="url(#trendFill)"
                activeDot={{ r: 4, fill: theme.brand }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardPanel>
  );
}
