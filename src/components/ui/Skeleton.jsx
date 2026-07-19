export default function Skeleton({ className = "", rounded = "xl" }) {
  const radius =
    rounded === "full"
      ? "rounded-full"
      : rounded === "lg"
        ? "rounded-lg"
        : rounded === "md"
          ? "rounded-md"
          : "rounded-xl";

  return (
    <div
      className={`animate-pulse ${radius} ${className}`}
      style={{ backgroundColor: "var(--app-nav-hover)" }}
      aria-hidden="true"
    />
  );
}
