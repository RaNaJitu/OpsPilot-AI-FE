import Spinner from "../ui/Spinner";

export default function Loading({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3"
      style={{ color: "var(--app-text-muted)" }}
    >
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
