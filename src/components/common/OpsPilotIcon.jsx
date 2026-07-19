import { useId } from "react";

/**
 * OpsPilot mark: shield + pulse + one circuit line.
 * Scales cleanly as favicon, navbar, and hero lockup.
 */
export default function OpsPilotIcon({ className = "", size = 32, title }) {
  const rawId = useId();
  const gradId = `opspilot-shield-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gradId} x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.55" stopColor="#2563eb" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        fill={`url(#${gradId})`}
        d="M24 3c.4 0 10.8 3.4 14.8 5.5.5.3.8.8.8 1.4v12.6c0 9.8-6.5 17.6-15.1 21.3a1.2 1.2 0 0 1-1.1 0C14.9 40.1 8.4 32.3 8.4 22.5V9.9c0-.6.3-1.1.8-1.4C13.2 6.4 23.6 3 24 3Z"
      />

      {/* Pulse line */}
      <path
        d="M11.5 23.5h6.2l2.4-7.2 3.2 14.2 2.6-10.2h10.6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* One circuit line + node */}
      <path
        d="M31.5 23.5v6.2h5"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <circle cx="36.5" cy="29.7" r="2" fill="#fff" />
    </svg>
  );
}
