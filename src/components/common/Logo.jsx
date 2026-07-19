import { Link } from "react-router-dom";

import OpsPilotIcon from "./OpsPilotIcon";

const SIZES = {
  sm: { icon: 28, text: "text-[15px]", gap: "gap-2", badge: "text-[9px] px-1.5 py-0.5" },
  md: { icon: 36, text: "text-[22px]", gap: "gap-2.5", badge: "text-[10px] px-1.5 py-0.5" },
  lg: { icon: 44, text: "text-[28px]", gap: "gap-3", badge: "text-[11px] px-2 py-0.5" },
  xl: { icon: 52, text: "text-[34px]", gap: "gap-3.5", badge: "text-xs px-2 py-1" },
};

/**
 * Brand lockup: simplified SVG mark + OpsPilot wordmark.
 * No tagline — keeps navbar and sidebar clean.
 */
export default function Logo({ to = "/", size = "md", className = "" }) {
  const tokens = SIZES[size] ?? SIZES.md;

  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center ${tokens.gap} ${className}`}
      aria-label="OpsPilot AI"
    >
      <OpsPilotIcon size={tokens.icon} />
      <span className={`inline-flex items-center gap-1.5 font-bold tracking-tight ${tokens.text}`}>
        <span style={{ color: "var(--app-text)" }}>
          Ops<span style={{ color: "var(--app-brand)" }}>Pilot</span>
        </span>
        <span
          className={`rounded font-bold uppercase leading-none tracking-wide text-white ${tokens.badge}`}
          style={{
            background:
              "linear-gradient(135deg, var(--app-brand) 0%, var(--app-brand-secondary) 100%)",
          }}
        >
          AI
        </span>
      </span>
    </Link>
  );
}
