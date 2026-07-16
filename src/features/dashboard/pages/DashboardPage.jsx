import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from "../../../components/common/EmptyState";
import { getProfile } from "../../auth/services/auth.service";

const stats = [
  {
    label: "Total Incidents",
    value: "0",
    hint: "No incidents yet",
    tone: "var(--app-text)",
  },
  {
    label: "Critical",
    value: "0",
    hint: "Today",
    tone: "var(--app-danger)",
  },
  {
    label: "Healthy Services",
    value: "—",
    hint: "Awaiting data",
    tone: "var(--app-success)",
  },
  {
    label: "AI Tokens Used",
    value: "0",
    hint: "This month",
    tone: "var(--app-brand)",
  },
];

const healthItems = [
  { label: "Critical", value: "0", color: "var(--app-danger)" },
  { label: "Warning", value: "0", color: "var(--app-warning)" },
  { label: "Resolved", value: "0", color: "var(--app-success)" },
];

function firstName(name) {
  if (!name) return "there";
  return name.trim().split(/\s+/)[0];
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await getProfile();
        if (!cancelled) setUser(data?.data?.user ?? null);
      } catch {
        // TopNavbar already handles auth redirect
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header>
        <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
          Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome back, {firstName(user?.name)} 👋
        </h1>
        <p
          className="mt-2 max-w-xl whitespace-pre-line text-sm leading-relaxed md:text-base"
          style={{ color: "var(--app-text-muted)" }}
        >
          {`Monitor production incidents,
identify root causes,
and reduce MTTR using AI.`}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border p-5 shadow-sm"
            style={{
              backgroundColor: "var(--app-bg-elevated)",
              borderColor: "var(--app-border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight" style={{ color: stat.tone }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--app-text-muted)" }}>
              {stat.hint}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Recent Incidents</h2>
            <Link
              to="/incidents"
              className="text-sm font-medium"
              style={{ color: "var(--app-brand)" }}
            >
              View all
            </Link>
          </div>
          <EmptyState
            compact
            title="No incidents analyzed yet"
            description="Upload your first production log to get AI-powered root cause analysis."
            actionLabel="Upload Log"
            actionTo="/incidents"
          />
        </div>

        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <h2 className="text-base font-semibold">Incident Health</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {healthItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                style={{ borderColor: "var(--app-border)" }}
              >
                <span className="inline-flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span style={{ color: "var(--app-text)" }}>{item.label}</span>
                </span>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/ai"
            className="mt-5 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            Ask OpsPilot AI
          </Link>
        </div>
      </section>
    </div>
  );
}
