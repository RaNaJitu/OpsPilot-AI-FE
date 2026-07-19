import {
  AlertTriangle,
  Bot,
  FileQuestion,
  ServerCrash,
  ShieldOff,
  Upload,
  WifiOff,
} from "lucide-react";

const VARIANT_META = {
  default: {
    Icon: AlertTriangle,
    accent: "var(--app-danger)",
    retryLabel: "Try again",
  },
  offline: {
    Icon: WifiOff,
    accent: "var(--app-warning)",
    title: "No Internet",
    description: "Check your connection and try again.",
    retryLabel: "Retry",
  },
  ai: {
    Icon: Bot,
    accent: "var(--app-danger)",
    title: "AI Analysis Failed",
    description: "The model couldn’t finish this analysis. You can retry.",
    retryLabel: "Retry",
  },
  upload: {
    Icon: Upload,
    accent: "var(--app-danger)",
    title: "Upload Failed",
    description: "We couldn’t upload your log file. Please try again.",
    retryLabel: "Try Again",
  },
  forbidden: {
    Icon: ShieldOff,
    accent: "var(--app-danger)",
    title: "Access denied",
    description: "You don’t have permission to view this resource.",
    retryLabel: "Try again",
  },
  notFound: {
    Icon: FileQuestion,
    accent: "var(--app-text-muted)",
    title: "Not found",
    description: "This resource may have been moved or deleted.",
    retryLabel: "Try again",
  },
  server: {
    Icon: ServerCrash,
    accent: "var(--app-danger)",
    title: "Something went wrong on our side",
    description: "Please try again in a moment.",
    retryLabel: "Retry",
  },
};

export default function ErrorState({
  variant = "default",
  title,
  description,
  onRetry,
  retryLabel,
}) {
  const meta = VARIANT_META[variant] || VARIANT_META.default;
  const Icon = meta.Icon;
  const resolvedTitle = title ?? meta.title ?? "Something went wrong";
  const resolvedDescription =
    description ?? meta.description ?? "Please try again.";
  const resolvedRetry = retryLabel ?? meta.retryLabel;

  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
      role="alert"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${meta.accent} 14%, transparent)`,
          color: meta.accent,
        }}
      >
        <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold" style={{ color: meta.accent }}>
        {resolvedTitle}
      </h3>
      <p className="mt-2 max-w-md text-sm" style={{ color: "var(--app-text-muted)" }}>
        {resolvedDescription}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          {resolvedRetry}
        </button>
      )}
    </div>
  );
}
