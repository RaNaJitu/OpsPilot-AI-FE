import { Link } from "react-router-dom";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  icon: Icon = FolderOpen,
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed text-center ${
        compact ? "px-5 py-8" : "px-6 py-14"
      }`}
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div
        className={`flex items-center justify-center rounded-2xl ${
          compact ? "mb-3 h-11 w-11" : "mb-4 h-14 w-14"
        }`}
        style={{
          backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
          color: "var(--app-brand)",
        }}
      >
        <Icon size={compact ? 20 : 26} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p
        className={`mt-2 max-w-md text-sm ${compact ? "leading-snug" : ""}`}
        style={{ color: "var(--app-text-muted)" }}
      >
        {description}
      </p>
      {(actionLabel && actionTo) || onAction ? (
        actionTo ? (
          <Link
            to={actionTo}
            className={`inline-flex rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 ${
              compact ? "mt-4" : "mt-6"
            }`}
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className={`inline-flex rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 ${
              compact ? "mt-4" : "mt-6"
            }`}
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            {actionLabel}
          </button>
        )
      ) : null}
    </div>
  );
}
