import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
          color: "var(--app-brand)",
        }}
      >
        <FileQuestion size={28} />
      </div>
      <p className="text-sm font-semibold" style={{ color: "var(--app-text-muted)" }}>
        404
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-md text-sm" style={{ color: "var(--app-text-muted)" }}>
        That URL doesn’t match any screen in OpsPilot. Check the link or head back to the
        dashboard.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          Go to Dashboard
        </Link>
        <Link
          to="/"
          className="rounded-lg border px-4 py-2.5 text-sm font-semibold"
          style={{ borderColor: "var(--app-border)" }}
        >
          Landing page
        </Link>
      </div>
    </div>
  );
}
