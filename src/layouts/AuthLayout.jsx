import { Outlet } from "react-router-dom";

import Logo from "../components/common/Logo";

export default function AuthLayout() {
  return (
    <div
      className="auth-shell relative flex min-h-screen flex-col"
      style={{ color: "var(--app-text)" }}
    >
      <div className="auth-shell__glow" aria-hidden="true" />
      <div className="auth-shell__grid" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mb-12 md:mb-14">
          <Logo to="/" size="lg" />
        </div>

        <div className="w-full max-w-[480px]">
          <Outlet />
        </div>
      </div>

      <footer
        className="relative z-10 px-4 pb-8 text-center text-xs"
        style={{ color: "var(--app-text-muted)" }}
      >
        <p>© {new Date().getFullYear()} OpsPilot AI</p>
        <p className="mt-1 opacity-80">Built for modern engineering teams</p>
      </footer>
    </div>
  );
}
