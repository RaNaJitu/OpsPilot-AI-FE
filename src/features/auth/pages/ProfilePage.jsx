import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserAvatar from "../../../components/common/UserAvatar";
import ErrorState from "../../../components/feedback/ErrorState";
import { ProfilePageSkeleton } from "../../../components/feedback/PageSkeleton";
import { describeApiError } from "../../../utils/apiError";
import { useProfile } from "../hooks/useProfile";

function formatJoinedDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const profileQuery = useProfile({ retry: false });

  useEffect(() => {
    if (profileQuery.isError) {
      navigate("/", { replace: true });
    }
  }, [profileQuery.isError, navigate]);

  if (profileQuery.isLoading) return <ProfilePageSkeleton />;

  if (profileQuery.isError || !profileQuery.data) {
    const loadError = describeApiError(
      profileQuery.error,
      "Couldn't load profile"
    );
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
        <ErrorState
          variant={loadError.variant}
          title={loadError.title}
          description={loadError.description}
          retryLabel={loadError.retryLabel}
          onRetry={() => profileQuery.refetch()}
        />
      </div>
    );
  }

  const user = profileQuery.data;
  const displayName = user?.name ?? "User";
  const email = user?.email ?? "";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:flex-row md:gap-8 md:p-6 lg:p-8">
      <aside className="relative w-full shrink-0 md:w-[280px] lg:w-[300px]">
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <div className="relative h-28 bg-gradient-to-b from-[#e07830] via-[#8a3a18] to-[#1a0f0a]" />

          <div className="relative px-5 pb-8 pt-0">
            <div className="relative -mt-12 flex justify-center">
              <div
                className="rounded-full"
                style={{ boxShadow: "0 0 0 4px var(--app-bg-elevated)" }}
              >
                <UserAvatar name={displayName} avatarUrl={user?.avatar} size="xl" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold" style={{ color: "var(--app-brand)" }}>
                {displayName}
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--app-text-muted)" }}>
                {email || "No email"}
              </p>
              <p className="mt-3 text-xs" style={{ color: "var(--app-text-muted)" }}>
                Joined {formatJoinedDate(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section className="min-w-0 flex-1">
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <h3 className="text-sm font-semibold">Account</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div
              className="flex justify-between gap-4 border-b pb-3"
              style={{ borderColor: "var(--app-border)" }}
            >
              <dt style={{ color: "var(--app-text-muted)" }}>Name</dt>
              <dd className="font-medium">{displayName}</dd>
            </div>
            <div
              className="flex justify-between gap-4 border-b pb-3"
              style={{ borderColor: "var(--app-border)" }}
            >
              <dt style={{ color: "var(--app-text-muted)" }}>Email</dt>
              <dd className="truncate font-medium">{email || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt style={{ color: "var(--app-text-muted)" }}>Member since</dt>
              <dd className="font-medium">{formatJoinedDate(user?.createdAt)}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
