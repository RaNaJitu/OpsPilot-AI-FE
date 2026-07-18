import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  Bot,
  History,
  Settings,
  UserRound,
} from "lucide-react";

import Logo from "./Logo";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/incidents", label: "Incidents", icon: AlertTriangle },
  { to: "/assistant", label: "Incident Assistant", icon: Bot },
  { to: "/history", label: "Incident History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
];

function navClassName({ isActive }) {
  return [
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
    isActive ? "" : "hover:bg-[var(--app-nav-hover)]",
  ].join(" ");
}

function navStyle({ isActive }) {
  if (isActive) {
    return {
      backgroundColor: "var(--app-nav-active-bg)",
      color: "var(--app-nav-active-text)",
    };
  }
  return { color: "var(--app-text)" };
}

export default function Sidebar({ onNavigate }) {
  return (
    <aside
      className="flex h-full w-60 shrink-0 flex-col border-r"
      style={{
        backgroundColor: "var(--app-sidebar-bg)",
        borderColor: "var(--app-border)",
        color: "var(--app-text)",
      }}
    >
      <div
        className="flex h-14 items-center border-b px-3"
        style={{ borderColor: "var(--app-border)" }}
      >
        <Logo to="/dashboard" size="sm" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onNavigate}
              className={navClassName}
              style={navStyle}
            >
              <Icon size={18} strokeWidth={1.8} className="shrink-0 opacity-90" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-3" style={{ borderColor: "var(--app-border)" }}>
        <NavLink
          to="/profile"
          onClick={onNavigate}
          className={navClassName}
          style={navStyle}
        >
          <UserRound size={18} strokeWidth={1.8} className="shrink-0 opacity-90" />
          <span>Profile</span>
        </NavLink>
      </div>
    </aside>
  );
}
