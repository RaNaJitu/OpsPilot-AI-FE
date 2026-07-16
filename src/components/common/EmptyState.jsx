import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
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
        className={`flex items-center justify-center rounded-full ${
          compact ? "mb-3 h-10 w-10" : "mb-4 h-12 w-12"
        }`}
        style={{
          backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
          color: "var(--app-brand)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 16V8M8 12h8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
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
