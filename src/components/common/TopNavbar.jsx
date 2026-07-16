import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile, logout } from "../../features/auth/services/auth.service";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9a6 6 0 1 1 12 0c0 3.5 1.5 5 2 6H4c.5-1 2-2.5 2-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data } = await getProfile();
        if (!cancelled) setUser(data?.data?.user ?? null);
      } catch (error) {
        console.error(error);
        if (!cancelled) navigate("/", { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/", { replace: true });
    }
  };

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
          <MenuIcon />
        </button>

        <label className="relative hidden min-w-0 max-w-md flex-1 sm:block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--app-text-muted)" }}>
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Search incidents, logs, services..."
            className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[var(--app-brand)]"
            style={{
              backgroundColor: "var(--app-input-bg)",
              borderColor: "var(--app-border)",
              color: "var(--app-text)",
            }}
          />
        </label>
      </div>

      <div ref={menuRef} className="flex shrink-0 items-center gap-2 md:gap-3">
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-[var(--app-nav-hover)]"
          aria-label="Notifications"
          style={{ color: "var(--app-text-muted)" }}
        >
          <BellIcon />
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
              <ChevronDown />
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
                onClick={handleLogout}
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
