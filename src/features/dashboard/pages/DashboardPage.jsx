import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import { useIncidents } from "../../../hooks/useIncidents";
import IncidentCard from "../../incidents/components/IncidentCard";
import IncidentListSkeleton from "../../incidents/components/IncidentListSkeleton";
import { useDeleteIncident } from "../../../hooks/useDeleteIncident";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useMemo, useState } from "react";
import { getProfile } from "../../auth/services/auth.service";
import { useQuery } from "@tanstack/react-query";

function firstName(name) {
  if (!name) return "there";
  return name.trim().split(/\s+/)[0];
}

export default function DashboardPage() {
  const [pendingDelete, setPendingDelete] = useState(null);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await getProfile();
      return data?.data?.user ?? null;
    },
  });

  const { data, isLoading, isError, refetch } = useIncidents({ page: 1, limit: 5 });
  const deleteMutation = useDeleteIncident();

  const incidents = data?.data ?? [];
  const pagination = data?.pagination;

  const stats = useMemo(() => {
    const total = pagination?.total ?? incidents.length;
    const critical = incidents.filter((item) => item.severity === "CRITICAL").length;
    const completed = incidents.filter((item) => item.status === "COMPLETED").length;
    const pending = incidents.filter((item) => item.status === "PENDING").length;

    return [
      {
        label: "Total Incidents",
        value: String(total),
        hint: total === 0 ? "No incidents yet" : "All time",
        tone: "var(--app-text)",
      },
      {
        label: "Critical",
        value: String(critical),
        hint: "In recent list",
        tone: "var(--app-danger)",
      },
      {
        label: "Completed",
        value: String(completed),
        hint: "Analyzed",
        tone: "var(--app-success)",
      },
      {
        label: "Pending",
        value: String(pending),
        hint: "Awaiting analysis",
        tone: "var(--app-warning)",
      },
    ];
  }, [incidents, pagination]);

  const healthItems = [
    {
      label: "Critical",
      value: String(incidents.filter((i) => i.severity === "CRITICAL").length),
      color: "var(--app-danger)",
    },
    {
      label: "Warning",
      value: String(incidents.filter((i) => i.severity === "MEDIUM" || i.severity === "HIGH").length),
      color: "var(--app-warning)",
    },
    {
      label: "Resolved",
      value: String(incidents.filter((i) => i.status === "COMPLETED").length),
      color: "var(--app-success)",
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            Welcome back, {firstName(profileQuery.data?.name)} 👋
          </h1>
          <p
            className="mt-2 max-w-xl whitespace-pre-line text-sm leading-relaxed md:text-base"
            style={{ color: "var(--app-text-muted)" }}
          >
            {`Monitor production incidents,
identify root causes,
and reduce MTTR using AI.`}
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          <Plus size={16} strokeWidth={2.2} />
          Upload Incident
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border p-5 shadow-sm"
            style={{
              backgroundColor: "var(--app-bg-elevated)",
              borderColor: "var(--app-border)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight" style={{ color: stat.tone }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--app-text-muted)" }}>
              {stat.hint}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Recent Incidents</h2>
            <Link to="/incidents" className="text-sm font-medium" style={{ color: "var(--app-brand)" }}>
              View all
            </Link>
          </div>

          {isLoading ? (
            <IncidentListSkeleton count={3} />
          ) : isError ? (
            <ErrorState
              title="Couldn't load incidents"
              description="Please try again."
              onRetry={() => refetch()}
            />
          ) : incidents.length === 0 ? (
            <EmptyState
              compact
              title="No incidents analyzed yet"
              description="Upload your first production log to get AI-powered root cause analysis."
              actionLabel="Upload Log"
              actionTo="/upload"
            />
          ) : (
            <div className="space-y-3">
              {incidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  deleting={deleteMutation.isPending && pendingDelete?.id === incident.id}
                  onDelete={setPendingDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <h2 className="text-base font-semibold">Incident Health</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {healthItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                style={{ borderColor: "var(--app-border)" }}
              >
                <span className="inline-flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </span>
                <span className="font-semibold" style={{ color: item.color }}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/ai"
            className="mt-5 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            Ask OpsPilot AI
          </Link>
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Incident?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteMutation.isPending}
        onCancel={() => {
          if (!deleteMutation.isPending) setPendingDelete(null);
        }}
        onConfirm={() => {
          if (!pendingDelete) return;
          deleteMutation.mutate(pendingDelete.id, {
            onSuccess: () => setPendingDelete(null),
            onError: () => setPendingDelete(null),
          });
        }}
      />
    </div>
  );
}
