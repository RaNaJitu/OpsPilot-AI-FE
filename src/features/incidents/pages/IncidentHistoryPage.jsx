import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import { useIncidents } from "../hooks/useIncidents";
import HistoryIncidentRow from "../components/HistoryIncidentRow";
import IncidentListSkeleton from "../components/IncidentListSkeleton";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PENDING", label: "Pending" },
  { value: "ANALYZING", label: "Analyzing" },
  { value: "FAILED", label: "Failed" },
];

const SEVERITY_OPTIONS = [
  { value: "", label: "All severities" },
  { value: "CRITICAL", label: "Critical" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

const DATE_PRESETS = [
  { value: "", label: "All dates" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function resolveDateRange(preset) {
  if (!preset) return { dateFrom: "", dateTo: "" };
  const days = preset === "7d" ? 7 : preset === "30d" ? 30 : preset === "90d" ? 90 : 0;
  if (!days) return { dateFrom: "", dateTo: "" };

  const to = new Date();
  const from = new Date();
  from.setUTCDate(from.getUTCDate() - (days - 1));
  from.setUTCHours(0, 0, 0, 0);

  return {
    dateFrom: toDateInputValue(from),
    dateTo: toDateInputValue(to),
  };
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block min-w-[140px] flex-1">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--app-text-muted)" }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-[var(--app-brand)]"
        style={{
          backgroundColor: "var(--app-input-bg)",
          borderColor: "var(--app-border)",
          color: "var(--app-text)",
        }}
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function IncidentHistoryPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [severity, setSeverity] = useState("");
  const [category, setCategory] = useState("");
  const [datePreset, setDatePreset] = useState("");
  const [knownCategories, setKnownCategories] = useState([]);

  const { dateFrom, dateTo } = useMemo(
    () => resolveDateRange(datePreset),
    [datePreset]
  );

  const { data, isLoading, isError, isFetching, refetch } = useIncidents({
    page,
    limit: 10,
    search,
    status,
    severity,
    category,
    dateFrom,
    dateTo,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [status, severity, category, datePreset]);

  const incidents = data?.data ?? [];
  const pagination = data?.pagination;

  useEffect(() => {
    setKnownCategories((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const incident of incidents) {
        if (incident.category && !next.has(incident.category)) {
          next.add(incident.category);
          changed = true;
        }
      }
      return changed ? [...next].sort((a, b) => a.localeCompare(b)) : prev;
    });
  }, [incidents]);

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All categories" },
      ...knownCategories.map((value) => ({ value, label: value })),
      ...(category && !knownCategories.includes(category)
        ? [{ value: category, label: category }]
        : []),
    ],
    [knownCategories, category]
  );

  const hasActiveFilters = Boolean(search || status || severity || category || datePreset);

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setSeverity("");
    setCategory("");
    setDatePreset("");
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Incident History</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Browse past investigations with filters for status, severity, category, and date.
        </p>
      </header>

      <label className="relative block max-w-2xl">
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
          placeholder="Search by title, service or category..."
          className="w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--app-brand)]"
          style={{
            backgroundColor: "var(--app-input-bg)",
            borderColor: "var(--app-border)",
            color: "var(--app-text)",
          }}
        />
      </label>

      <div
        className="rounded-xl border p-4"
        style={{
          backgroundColor: "var(--app-bg-elevated)",
          borderColor: "var(--app-border)",
        }}
      >
        <div className="flex flex-wrap items-end gap-3">
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
          />
          <FilterSelect
            label="Severity"
            value={severity}
            onChange={setSeverity}
            options={SEVERITY_OPTIONS}
          />
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={categoryOptions}
          />
          <FilterSelect
            label="Date"
            value={datePreset}
            onChange={setDatePreset}
            options={DATE_PRESETS}
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition hover:opacity-80"
              style={{ borderColor: "var(--app-border)", color: "var(--app-text-muted)" }}
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <IncidentListSkeleton />
      ) : isError ? (
        <ErrorState
          title="Couldn't load history"
          description="Check your connection and try again."
          onRetry={() => refetch()}
        />
      ) : incidents.length === 0 ? (
        <EmptyState
          title={
            hasActiveFilters
              ? "No matching incidents"
              : "No incidents uploaded yet."
          }
          description={
            hasActiveFilters
              ? "Try adjusting your search or filters."
              : "Upload your first log to start AI analysis."
          }
          actionLabel={hasActiveFilters ? undefined : "Upload Incident"}
          actionTo={hasActiveFilters ? undefined : "/upload"}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
              {pagination?.total
                ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )} of ${pagination.total}`
                : `${incidents.length} incidents`}
              {isFetching && !isLoading ? " · Updating…" : ""}
            </p>
          </div>

          {incidents.map((incident) => (
            <HistoryIncidentRow key={incident.id} incident={incident} />
          ))}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
                Page {pagination.page} of {pagination.totalPages}
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
    </div>
  );
}
