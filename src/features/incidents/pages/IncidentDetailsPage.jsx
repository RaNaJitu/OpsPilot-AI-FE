import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bot, Download, FileText, Sparkles, Trash2 } from "lucide-react";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Spinner from "../../../components/ui/Spinner";
import ErrorState from "../../../components/feedback/ErrorState";
import { DetailPageSkeleton } from "../../../components/feedback/PageSkeleton";
import { describeApiError, getApiErrorMessage } from "../../../utils/apiError";
import { appToast } from "../../../utils/toast";
import { useAnalyzeIncident } from "../hooks/useAnalyzeIncident";
import { useDeleteIncident } from "../hooks/useDeleteIncident";
import { useGenerateRunbook } from "../hooks/useGenerateRunbook";
import { useIncident } from "../hooks/useIncident";
import {
  formatFileSize,
  formatIncidentDate,
  formatRelativeTime,
  shortIncidentId,
} from "../utils/incidentFormat";
import { formatConfidenceLabel } from "../utils/incidentCard";
import { exportIncidentPdf } from "../utils/exportIncidentPdf";
import { SeverityBadge, StatusBadge } from "../components/IncidentBadges";
import AiAnalysisCard from "../components/AiAnalysisCard";
import RunbookCard from "../components/RunbookCard";

export default function IncidentDetailsPage() {
  const { incidentId } = useParams();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");
  const [runbookError, setRunbookError] = useState("");
  const [analysisDurationSec, setAnalysisDurationSec] = useState(null);

  const { data, isLoading, isError, error, refetch, isFetching } = useIncident(incidentId, {
    refetchInterval: (query) =>
      query.state.data?.data?.status === "ANALYZING" ? 3000 : false,
  });
  const deleteMutation = useDeleteIncident();
  const analyzeMutation = useAnalyzeIncident();
  const runbookMutation = useGenerateRunbook(incidentId);
  const loadError = describeApiError(error, "Couldn't load incident");

  const incident = data?.data;
  const confidence = incident ? formatConfidenceLabel(incident.confidence) : null;
  const isAnalyzing =
    analyzeMutation.isPending || incident?.status === "ANALYZING";
  const canUseAiExtras = incident?.status === "COMPLETED";

  const handleDelete = () => {
    deleteMutation.mutate(incidentId, {
      onSuccess: () => {
        appToast.success("Incident archived");
        navigate("/incidents", { replace: true });
      },
      onError: () => appToast.error("Couldn't delete incident"),
    });
  };

  const handleAnalyze = () => {
    setAnalyzeError("");
    setAnalysisDurationSec(null);
    const startedAt = performance.now();
    analyzeMutation.mutate(incidentId, {
      onSuccess: () => {
        const elapsed = (performance.now() - startedAt) / 1000;
        setAnalysisDurationSec(Number(elapsed.toFixed(2)));
        appToast.success("AI analysis completed");
      },
      onError: (err) => {
        setAnalyzeError(
          getApiErrorMessage(err, "AI analysis failed. Please try again.")
        );
        appToast.error("AI analysis failed");
        refetch();
      },
    });
  };

  const handleGenerateRunbook = () => {
    setRunbookError("");
    runbookMutation.mutate(undefined, {
      onSuccess: () => appToast.success("Runbook generated"),
      onError: (err) => {
        setRunbookError(
          getApiErrorMessage(err, "Couldn't generate runbook. Please try again.")
        );
        appToast.error("Couldn't generate runbook");
      },
    });
  };

  const handleExportPdf = () => {
    exportIncidentPdf(incident);
    appToast.success("PDF exported");
  };

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (isError || !incident) {
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
        <ErrorState
          variant={isError ? loadError.variant : "notFound"}
          title={isError ? loadError.title : "Incident not found"}
          description={
            isError
              ? loadError.description
              : "It may have been deleted, or you don't have access."
          }
          retryLabel={isError ? loadError.retryLabel : "Try again"}
          onRetry={() => refetch()}
        />
        <div className="mt-4">
          <Link to="/incidents" className="text-sm font-medium" style={{ color: "var(--app-brand)" }}>
            Back to incidents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/incidents"
            className="inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--app-text-muted)" }}
          >
            <ArrowLeft size={14} />
            Incidents
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{incident.title}</h1>
          {confidence && (
            <p className="mt-1.5 text-sm">
              <span
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--app-text-muted)" }}
              >
                AI Confidence
              </span>
              <span className="ml-2 font-semibold" style={{ color: confidence.tone }}>
                <span aria-hidden="true">{confidence.emoji}</span> {confidence.percent}{" "}
                <span className="font-medium" style={{ color: "var(--app-text-muted)" }}>
                  {confidence.level}
                </span>
              </span>
            </p>
          )}
          <p className="mt-1.5 text-sm" style={{ color: "var(--app-text-muted)" }}>
            ID #{shortIncidentId(incident.id)}
            <span className="mx-2 opacity-40">·</span>
            {formatIncidentDate(incident.createdAt)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={incident.status} />
            <SeverityBadge severity={incident.severity} />
            {isFetching && isAnalyzing && (
              <span className="text-xs" style={{ color: "var(--app-text-muted)" }}>
                Refreshing...
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleAnalyze}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            {isAnalyzing ? <Spinner size="sm" /> : <Sparkles size={15} />}
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </button>

          {canUseAiExtras && (
            <Link
              to={`/assistant?incidentId=${incident.id}`}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--app-border)", color: "var(--app-brand)" }}
            >
              <Bot size={15} />
              Ask Assistant
            </Link>
          )}

          <button
            type="button"
            onClick={handleExportPdf}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
            style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
          >
            <Download size={15} />
            Export PDF
          </button>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold disabled:opacity-50"
            style={{ borderColor: "var(--app-border)", color: "var(--app-danger)" }}
          >
            <Trash2 size={15} />
            Archive
          </button>
        </div>
      </div>

      {analyzeError && (
        <ErrorState
          variant="ai"
          title="AI Analysis Failed"
          description={analyzeError}
          retryLabel="Retry"
          onRetry={handleAnalyze}
        />
      )}

      {isAnalyzing && (
        <div
          className="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm"
          style={{
            backgroundColor: "color-mix(in srgb, var(--app-brand) 8%, var(--app-bg-elevated))",
            borderColor: "var(--app-border)",
            color: "var(--app-text)",
          }}
        >
          <Spinner size="sm" />
          <div>
            <p className="font-medium">AI is analyzing your logs...</p>
            <p style={{ color: "var(--app-text-muted)" }}>
              This may take a moment. Results will appear below.
            </p>
          </div>
        </div>
      )}

      <AiAnalysisCard incident={incident} analysisDurationSec={analysisDurationSec} />

      <RunbookCard
        runbook={incident.runbook}
        canGenerate={canUseAiExtras}
        generating={runbookMutation.isPending}
        generateError={runbookError}
        onGenerate={handleGenerateRunbook}
      />

      <section
        className="rounded-2xl border p-5 md:p-6"
        style={{
          backgroundColor: "var(--app-bg-elevated)",
          borderColor: "var(--app-border)",
        }}
      >
        <h2
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "var(--app-text-muted)" }}
        >
          Uploaded Files
        </h2>
        {incident.files?.length ? (
          <ul className="mt-3 space-y-2">
            {incident.files.map((file) => {
              const sizeLabel = formatFileSize(file.size);
              const relative = formatRelativeTime(file.createdAt);
              return (
                <li
                  key={file.id}
                  className="flex items-start gap-3 rounded-lg border px-3 py-3"
                  style={{ borderColor: "var(--app-border)" }}
                >
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--app-brand) 10%, transparent)",
                      color: "var(--app-brand)",
                    }}
                  >
                    <FileText size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{file.originalName}</p>
                    <p className="mt-0.5 text-xs" style={{ color: "var(--app-text-muted)" }}>
                      {[sizeLabel, relative ? `Uploaded ${relative}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm" style={{ color: "var(--app-text-muted)" }}>
            No files attached.
          </p>
        )}
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Archive Incident?"
        description="The incident will be archived. Log files will be removed from disk."
        confirmLabel="Archive"
        cancelLabel="Cancel"
        loading={deleteMutation.isPending}
        onCancel={() => {
          if (!deleteMutation.isPending) setConfirmOpen(false);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
