import { Link, useLocation } from "react-router-dom";

import Logo from "../../../components/common/Logo";
import ThemeToggle from "../../../components/common/ThemeToggle";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
];

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-sm font-semibold transition hover:opacity-90"
      style={{
        color: active ? "var(--app-brand)" : "var(--app-text)",
        backgroundColor: active
          ? "color-mix(in srgb, var(--app-brand) 10%, transparent)"
          : "transparent",
      }}
    >
      {label}
    </Link>
  );
}

export default function LandingNav({ onSignIn }) {
  const { pathname } = useLocation();

  return (
    <header className="landing-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo to="/" size="md" />

        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              label={link.label}
              active={pathname === link.to}
            />
          ))}
          <ThemeToggle />
          {onSignIn ? (
            <button
              type="button"
              onClick={onSignIn}
              className="rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
            >
              Sign In
            </button>
          ) : (
            <Link
              to="/#get-started"
              className="rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
