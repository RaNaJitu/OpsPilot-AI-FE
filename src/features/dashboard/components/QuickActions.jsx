import { Link } from "react-router-dom";
import { BookOpen, Bot, Plus } from "lucide-react";

const ACTIONS = [
  {
    to: "/upload",
    label: "Upload Incident",
    description: "Drop a production log",
    icon: Plus,
    primary: true,
  },
  {
    to: "/incidents",
    label: "Generate Runbook",
    description: "From a completed analysis",
    icon: BookOpen,
    primary: false,
  },
  {
    to: "/assistant",
    label: "Ask AI",
    description: "Incident Assistant",
    icon: Bot,
    primary: false,
  },
];

export default function QuickActions({ runbookHref, assistantHref }) {
  const links = ACTIONS.map((action) => {
    if (action.label === "Generate Runbook" && runbookHref) {
      return { ...action, to: runbookHref };
    }
    if (action.label === "Ask AI" && assistantHref) {
      return { ...action, to: assistantHref };
    }
    return action;
  });

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold" style={{ color: "var(--app-text-muted)" }}>
        Quick Actions
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {links.map(({ to, label, description, icon: Icon, primary }) => (
          <Link
            key={label}
            to={to}
            className="group flex items-center gap-3 rounded-xl border px-4 py-3 transition hover:border-[var(--app-brand)]"
            style={{
              backgroundColor: primary
                ? "color-mix(in srgb, var(--app-brand) 10%, var(--app-bg-elevated))"
                : "var(--app-bg-elevated)",
              borderColor: primary
                ? "color-mix(in srgb, var(--app-brand) 35%, var(--app-border))"
                : "var(--app-border)",
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: primary
                  ? "var(--app-brand)"
                  : "color-mix(in srgb, var(--app-brand) 12%, transparent)",
                color: primary ? "#fff" : "var(--app-brand)",
              }}
            >
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{label}</span>
              <span className="block text-xs" style={{ color: "var(--app-text-muted)" }}>
                {description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
