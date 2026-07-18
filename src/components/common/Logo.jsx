import { Link } from "react-router-dom";

import logoLight from "../../assets/opspilot-logo.png";
import logoDark from "../../assets/opspilot-logo-dark.png";
import { useTheme } from "../../context/ThemeContext";

/** Wide lockup (~3.5:1). Size by width so the mark stays readable. */
const sizes = {
  sm: "w-[168px]",
  md: "w-[240px] lg:w-[280px]",
  lg: "w-[320px] max-w-full",
  xl: "w-[400px] max-w-full",
};

export default function Logo({ to = "/", size = "md", className = "" }) {
  const { isDark } = useTheme();
  const sizeClass = sizes[size] ?? sizes.md;

  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="OpsPilot AI — AI-Powered Site Reliability Engineer"
    >
      <img
        src={isDark ? logoDark : logoLight}
        alt="OpsPilot AI"
        className={`${sizeClass} h-auto object-contain object-left`}
        draggable={false}
      />
    </Link>
  );
}
