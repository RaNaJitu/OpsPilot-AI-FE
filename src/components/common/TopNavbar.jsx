import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

import { useLogout } from "../../features/auth/hooks/useLogout";
import { useProfile } from "../../features/auth/hooks/useProfile";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const SEARCH_DEBOUNCE_MS = 400;

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const menuRef = useRef(null);

  const profileQuery = useProfile({
    retry: false,
  });
  const { logoutUser } = useLogout();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("search") || ""
  );

  useEffect(() => {
    if (profileQuery.isError) {
      navigate("/", { replace: true });
    }
  }, [profileQuery.isError, navigate]);

  useEffect(() => {
    if (location.pathname === "/incidents") {
      setSearchInput(searchParams.get("search") || "");
    }
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const next = searchInput.trim();
    const timer = setTimeout(() => {
      if (location.pathname === "/incidents") {
        const current = searchParams.get("search") || "";
        if (current === next) return;
        if (next) {
          navigate(`/incidents?search=${encodeURIComponent(next)}`, { replace: true });
        } else {
          navigate("/incidents", { replace: true });
        }
        return;
      }

      if (!next) return;
      navigate(`/incidents?search=${encodeURIComponent(next)}`);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput, location.pathname, searchParams, navigate]);

  useEffect(() => {
    if (!profileOpen) return;

    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [profileOpen]);

  const user = profileQuery.data;
  const loading = profileQuery.isLoading;
  const displayName = user?.name ?? "User";

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b px-4"
      style={{
        backgroundColor: "var(--app-header-bg)",
        color: "var(--app-text)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="shrink-0 rounded-lg p-1.5 transition hover:bg-[var(--app-nav-hover)] lg:hidden"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        <label className="relative min-w-0 max-w-md flex-1">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--app-brand)" }}
          >
            <Search size={16} />
          </span>
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search incidents..."
            className="w-full rounded-lg border-2 py-2.5 pl-9 pr-3 text-sm font-medium outline-none transition focus:border-[var(--app-brand)]"
            style={{
              backgroundColor: "var(--app-bg-elevated)",
              borderColor: "color-mix(in srgb, var(--app-brand) 28%, var(--app-border))",
              color: "var(--app-text)",
              boxShadow: "0 1px 2px color-mix(in srgb, var(--app-text) 6%, transparent)",
            }}
          />
        </label>
      </div>

      <div ref={menuRef} className="flex shrink-0 items-center gap-2 md:gap-3">
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-[var(--app-nav-hover)]"
          aria-label="Notifications"
          title="Notifications coming soon"
          disabled
          style={{ color: "var(--app-text-muted)", opacity: 0.55 }}
        >
          <Bell size={18} />
        </button>

        <ThemeToggle />

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-lg p-1 transition hover:bg-[var(--app-nav-hover)]"
            aria-label={`${displayName} menu`}
            aria-expanded={profileOpen}
            disabled={loading}
          >
            {loading ? (
              <span
                className="h-8 w-8 animate-pulse rounded-full"
                style={{ backgroundColor: "var(--app-toggle-bg)" }}
              />
            ) : (
              <UserAvatar name={displayName} avatarUrl={user?.avatar} />
            )}
            <span className="hidden md:inline" style={{ color: "var(--app-text-muted)" }}>
              <ChevronDown size={12} />
            </span>
          </button>

          {profileOpen && user && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border shadow-xl"
              style={{
                backgroundColor: "var(--app-menu-bg)",
                color: "var(--app-text)",
                borderColor: "var(--app-border)",
              }}
            >
              <div
                className="flex items-center gap-3 border-b px-4 py-3"
                style={{ borderColor: "var(--app-border)" }}
              >
                <UserAvatar name={displayName} avatarUrl={user?.avatar} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{displayName}</p>
                  <p className="truncate text-xs" style={{ color: "var(--app-text-muted)" }}>
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--app-nav-hover)]"
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-sm"
                style={{ color: "var(--app-danger)" }}
                onClick={() => {
                  setProfileOpen(false);
                  logoutUser();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
