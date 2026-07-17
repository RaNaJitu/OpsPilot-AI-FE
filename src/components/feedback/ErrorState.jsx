export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  onRetry,
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <h3 className="text-base font-semibold" style={{ color: "var(--app-danger)" }}>
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm" style={{ color: "var(--app-text-muted)" }}>
        {description}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
