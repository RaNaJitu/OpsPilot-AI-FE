import { Bot, LayoutDashboard, FileText } from "lucide-react";

const PREVIEWS = [
  {
    id: "dashboard",
    title: "Dashboard",
    caption: "Live AI metrics",
    icon: LayoutDashboard,
    body: (
      <div className="space-y-2 p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {["24", "3", "91%"].map((v) => (
            <div
              key={v}
              className="rounded-md border px-2 py-1.5 text-center text-xs font-bold"
              style={{ borderColor: "var(--app-border)", color: "var(--app-brand)" }}
            >
              {v}
            </div>
          ))}
        </div>
        <div className="flex h-12 items-end gap-1">
          {[45, 60, 40, 80, 55, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                backgroundColor: "color-mix(in srgb, var(--app-brand) 45%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "assistant",
    title: "Incident Assistant",
    caption: "Context-aware investigation",
    icon: Bot,
    body: (
      <div className="space-y-2 p-3">
        <div
          className="ml-auto max-w-[85%] rounded-lg px-2.5 py-1.5 text-[10px]"
          style={{
            backgroundColor: "color-mix(in srgb, var(--app-brand) 14%, transparent)",
          }}
        >
          What is the root cause?
        </div>
        <div
          className="max-w-[90%] rounded-lg border px-2.5 py-1.5 text-[10px] leading-snug"
          style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-nav-hover)" }}
        >
          Memory limit reached after a traffic spike exhausted Redis maxmemory…
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {["Root Cause", "Timeline", "Runbook"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border px-2 py-0.5 text-[9px] font-medium"
              style={{ borderColor: "var(--app-border)" }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "details",
    title: "Incident Details",
    caption: "Evidence and recovery",
    icon: FileText,
    body: (
      <div className="space-y-2 p-3">
        <p className="text-[11px] font-semibold">Redis Memory Exhaustion</p>
        <p className="text-[10px] font-medium" style={{ color: "var(--app-success)" }}>
          91% High Confidence
        </p>
        <div
          className="rounded-md border px-2 py-1.5 text-[10px] leading-snug"
          style={{
            borderColor: "color-mix(in srgb, var(--app-brand) 22%, var(--app-border))",
            backgroundColor: "color-mix(in srgb, var(--app-brand) 6%, transparent)",
          }}
        >
          Immediate: scale Redis · flush idle keys · raise maxmemory alert
        </div>
      </div>
    ),
  },
];

export default function LandingPreviewStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PREVIEWS.map(({ id, title, caption, icon: Icon, body }) => (
        <figure
          key={id}
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--app-border)",
            backgroundColor: "var(--app-bg-elevated)",
          }}
        >
          <div
            className="border-b px-3 py-2.5"
            style={{ borderColor: "var(--app-border)", backgroundColor: "var(--app-nav-hover)" }}
          >
            <figcaption className="flex items-center gap-2 text-xs font-semibold">
              <Icon size={14} style={{ color: "var(--app-brand)" }} aria-hidden="true" />
              {title}
            </figcaption>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--app-text-muted)" }}>
              {caption}
            </p>
          </div>
          <div style={{ backgroundColor: "var(--app-bg)" }}>{body}</div>
        </figure>
      ))}
    </div>
  );
}
