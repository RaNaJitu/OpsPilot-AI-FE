export default function Spinner({ size = "md", className = "" }) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";

  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClass} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
