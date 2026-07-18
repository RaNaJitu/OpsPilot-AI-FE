import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import { useDeleteIncident } from "../../../hooks/useDeleteIncident";
import { useIncidents } from "../../../hooks/useIncidents";
import IncidentCard from "../components/IncidentCard";
import IncidentListSkeleton from "../components/IncidentListSkeleton";

const SEARCH_DEBOUNCE_MS = 400;

export default function IncidentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [search, setSearch] = useState(urlSearch.trim());
  const [pendingDelete, setPendingDelete] = useState(null);

  const { data, isLoading, isError, isFetching, refetch } = useIncidents({
    page,
    limit: 10,
    search,
  });
  const deleteMutation = useDeleteIncident();

  // Keep input in sync when navigating via navbar / shared links
  useEffect(() => {
    setSearchInput((current) => (current === urlSearch ? current : urlSearch));
    setSearch(urlSearch.trim());
    setPage(1);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = searchInput.trim();
      setPage(1);
      setSearch(next);

      if (next === urlSearch.trim()) return;

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next) params.set("search", next);
          else params.delete("search");
          return params;
        },
        { replace: true }
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchInput, urlSearch, setSearchParams]);

  const incidents = data?.data ?? [];
  const pagination = data?.pagination;
  const deletingId = deleteMutation.isPending ? pendingDelete?.id : null;

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => setPendingDelete(null),
      onError: () => setPendingDelete(null),
    });
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Incidents</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
            Review uploaded logs, status, and investigation history.
          </p>
        </div>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          <Plus size={16} strokeWidth={2.2} />
          Upload Incident
        </Link>
      </header>

      <label className="relative block max-w-xl">
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--app-text-muted)" }}
        >
          <Search size={16} />
        </span>
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search incidents..."
          className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--app-brand)]"
          style={{
            backgroundColor: "var(--app-input-bg)",
            borderColor: "var(--app-border)",
            color: "var(--app-text)",
          }}
        />
      </label>

      {isLoading ? (
        <IncidentListSkeleton />
      ) : isError ? (
        <ErrorState
          title="Couldn't load incidents"
          description="Check your connection and try again."
          onRetry={() => refetch()}
        />
      ) : incidents.length === 0 ? (
        <EmptyState
          title={search ? "No matching incidents" : "No incidents yet"}
          description={
            search
              ? "Try a different search term."
              : "Upload your first production log to get AI-powered root cause analysis."
          }
          actionLabel={search ? undefined : "Upload Incident"}
          actionTo={search ? undefined : "/upload"}
        />
      ) : (
        <div className="space-y-3">
          {isFetching && !isLoading && (
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
              Updating...
            </p>
          )}
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              deleting={deletingId === incident.id}
              onDelete={setPendingDelete}
            />
          ))}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
                Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
                  style={{ borderColor: "var(--app-border)" }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
                  style={{ borderColor: "var(--app-border)" }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
