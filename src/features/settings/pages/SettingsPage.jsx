import {
  Bot,
  Info,
  LogOut,
  Settings2,
  Shield,
  UserRound,
} from "lucide-react";

import UserAvatar from "../../../components/common/UserAvatar";
import ErrorState from "../../../components/feedback/ErrorState";
import Loading from "../../../components/feedback/Loading";
import config from "../../../config";
import { useLogout } from "../../auth/hooks/useLogout";
import { useProfile } from "../../auth/hooks/useProfile";

const STACK = [
  "React",
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "OpenAI",
];

function SettingsSection({ icon: Icon, title, children }) {
  return (
    <section
      className="rounded-2xl border p-5 md:p-6"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
            color: "var(--app-brand)",
          }}
        >
          <Icon size={16} />
        </span>
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, children, last = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${last ? "" : "border-b"}`}
      style={{ borderColor: "var(--app-border)" }}
    >
      <dt className="text-sm" style={{ color: "var(--app-text-muted)" }}>
        {label}
      </dt>
      <dd className="min-w-0 text-right text-sm font-medium">{children}</dd>
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--app-text-muted)" }}
      >
        {label}
      </span>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full cursor-default rounded-lg border px-3 py-2.5 text-sm outline-none"
        style={{
          backgroundColor: "var(--app-input-bg)",
          borderColor: "var(--app-border)",
          color: "var(--app-text)",
        }}
      />
    </label>
  );
}

export default function SettingsPage() {
  const profileQuery = useProfile({ retry: false });
  const { logoutUser, isLoggingOut } = useLogout();

  if (profileQuery.isLoading) {
    return <Loading label="Loading settings..." />;
  }

  if (profileQuery.isError) {
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
        <ErrorState
          title="Couldn't load settings"
          description="Your session may have expired. Try signing in again."
          onRetry={() => profileQuery.refetch()}
        />
      </div>
    );
  }

  const user = profileQuery.data;
  const displayName = user?.name ?? "User";
  const email = user?.email ?? "—";

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <div className="flex items-center gap-2">
          <Settings2 size={22} style={{ color: "var(--app-brand)" }} />
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </div>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Account, AI configuration, and product information.
        </p>
      </header>

      <SettingsSection icon={UserRound} title="Profile">
        <div className="flex items-center gap-4 border-b pb-4" style={{ borderColor: "var(--app-border)" }}>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--app-text-muted)" }}>
              Avatar
            </p>
            <UserAvatar name={displayName} avatarUrl={user?.avatar} size="lg" />
          </div>
        </div>
        <dl>
          <InfoRow label="Name">{displayName}</InfoRow>
          <InfoRow label="Email">
            <span className="truncate">{email}</span>
          </InfoRow>
          <InfoRow label="Provider" last>
            Google
          </InfoRow>
        </dl>
      </SettingsSection>

      <SettingsSection icon={Bot} title="AI Configuration">
        <p className="mb-4 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Values used by the OpsPilot backend for analysis, chat, and runbooks.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <ReadOnlyField label="Model" value={config.AI_MODEL} />
          <ReadOnlyField label="Temperature" value={String(config.AI_TEMPERATURE)} />
          <ReadOnlyField label="Max Tokens" value={String(config.AI_MAX_TOKENS)} />
        </div>
      </SettingsSection>

      <SettingsSection icon={Shield} title="Security">
        <p className="mb-4 text-sm" style={{ color: "var(--app-text-muted)" }}>
          End your session and clear authentication cookies on this device.
        </p>
        <button
          type="button"
          disabled={isLoggingOut}
          onClick={logoutUser}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-60"
          style={{
            borderColor: "color-mix(in srgb, var(--app-danger) 40%, var(--app-border))",
            color: "var(--app-danger)",
            backgroundColor: "color-mix(in srgb, var(--app-danger) 8%, transparent)",
          }}
        >
          <LogOut size={15} />
          {isLoggingOut ? "Signing out…" : "Logout"}
        </button>
      </SettingsSection>

      <SettingsSection icon={Info} title="About">
        <dl>
          <InfoRow label="Product">{config.APP_NAME}</InfoRow>
          <InfoRow label="Version">{config.APP_VERSION}</InfoRow>
          <InfoRow label="Built with" last>
            <div className="flex flex-wrap justify-end gap-1.5">
              {STACK.map((item) => (
                <span
                  key={item}
                  className="rounded-md border px-2 py-0.5 text-xs font-medium"
                  style={{
                    borderColor: "var(--app-border)",
                    backgroundColor: "var(--app-nav-hover)",
                    color: "var(--app-text)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </InfoRow>
        </dl>
      </SettingsSection>
    </div>
  );
}
