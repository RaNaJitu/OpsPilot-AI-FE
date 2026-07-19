import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Bot, Eraser, FileText, MessageSquare } from "lucide-react";

import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/feedback/ErrorState";
import Spinner from "../../../components/ui/Spinner";
import {
  CategoryBadge,
  SeverityBadge,
  StatusBadge,
} from "../../incidents/components/IncidentBadges";
import { useIncident } from "../../incidents/hooks/useIncident";
import { useIncidents } from "../../incidents/hooks/useIncidents";
import {
  getPrimaryService,
  truncateSummary,
} from "../../incidents/utils/incidentCard";
import {
  formatIncidentDate,
  formatRelativeTime,
} from "../../incidents/utils/incidentFormat";
import ChatBubble from "../components/ChatBubble";
import ChatComposer from "../components/ChatComposer";
import ChatEmptyState from "../components/ChatEmptyState";
import ConfidenceLabel from "../components/ConfidenceLabel";
import TypingIndicator from "../components/TypingIndicator";
import {
  useClearIncidentChat,
  useIncidentChatHistory,
  useSendIncidentChat,
} from "../hooks/useIncidentChat";

function getChatErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Couldn't send your message. Please try again."
  );
}

function HeaderMeta({ label, children }) {
  if (!children) return null;
  return (
    <div className="min-w-0">
      <p
        className="text-[10px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--app-text-muted)" }}
      >
        {label}
      </p>
      <div className="mt-0.5 text-xs font-medium">{children}</div>
    </div>
  );
}

export default function IncidentAssistantPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("incidentId") || "";
  const [sendError, setSendError] = useState("");
  const [draft, setDraft] = useState("");
  const [pendingUserMessage, setPendingUserMessage] = useState("");
  const bottomRef = useRef(null);

  const incidentsQuery = useIncidents({ page: 1, limit: 50, search: "" });
  const incidents = incidentsQuery.data?.data ?? [];

  const analyzedIncidents = useMemo(
    () => incidents.filter((item) => item.status === "COMPLETED"),
    [incidents]
  );

  const activeIncidentId = selectedId || "";

  const selectedFromList = useMemo(
    () => analyzedIncidents.find((item) => item.id === selectedId) ?? null,
    [analyzedIncidents, selectedId]
  );

  const selectedDetailQuery = useIncident(activeIncidentId || undefined);
  const selectedIncident =
    selectedDetailQuery.data?.data || selectedFromList || null;

  const historyQuery = useIncidentChatHistory(activeIncidentId || undefined);
  const sendMutation = useSendIncidentChat(activeIncidentId);
  const clearMutation = useClearIncidentChat(activeIncidentId);

  const messages = historyQuery.data?.data ?? [];
  const service = getPrimaryService(selectedIncident);
  const headerSummary = truncateSummary(
    selectedIncident?.summary || selectedIncident?.rootCause,
    180
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, sendMutation.isPending, pendingUserMessage]);

  const selectIncident = (id) => {
    setSendError("");
    setPendingUserMessage("");
    setDraft("");
    if (!id) {
      setSearchParams({});
      return;
    }
    setSearchParams({ incidentId: id });
  };

  const handleSend = (message) => {
    if (!activeIncidentId) return;
    setSendError("");
    setPendingUserMessage(message);
    setDraft("");
    sendMutation.mutate(message, {
      onSettled: () => setPendingUserMessage(""),
      onError: (error) => setSendError(getChatErrorMessage(error)),
    });
  };

  const historyBlocked =
    historyQuery.isError &&
    (historyQuery.error?.response?.data?.code === "ANALYSIS_REQUIRED" ||
      historyQuery.error?.response?.status === 400);

  const showEmptyConversation =
    Boolean(activeIncidentId) &&
    !historyQuery.isLoading &&
    !historyBlocked &&
    !historyQuery.isError &&
    messages.length === 0 &&
    !pendingUserMessage;

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-[1440px] flex-col gap-4 p-4 md:p-6 lg:p-8 xl:max-w-[1600px]">
      <header className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
            OpsPilot AI
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Incident Assistant</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
            Ask follow-up questions about a completed analysis — scoped to one incident.
          </p>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside
          className="flex min-h-0 flex-col rounded-xl border"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <div className="border-b px-4 py-3" style={{ borderColor: "var(--app-border)" }}>
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--app-text-muted)" }}
            >
              Incident
            </p>
            <select
              value={activeIncidentId}
              onChange={(e) => selectIncident(e.target.value)}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--app-brand)]"
              style={{
                backgroundColor: "var(--app-input-bg)",
                borderColor: "var(--app-border)",
                color: "var(--app-text)",
              }}
            >
              <option value="">Select an incident…</option>
              {analyzedIncidents.map((incident) => (
                <option key={incident.id} value={incident.id}>
                  {incident.title || "Untitled incident"}
                </option>
              ))}
            </select>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {incidentsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : analyzedIncidents.length === 0 ? (
              <EmptyState
                compact
                title="No analyzed incidents"
                description="Upload a log and run AI analysis first."
                actionLabel="Upload Incident"
                actionTo="/upload"
              />
            ) : (
              <ul className="space-y-2">
                {analyzedIncidents.map((incident) => {
                  const active = incident.id === activeIncidentId;
                  const itemService = getPrimaryService(incident);
                  const shortDate = formatIncidentDate(incident.createdAt);
                  const relative = formatRelativeTime(incident.createdAt);

                  return (
                    <li key={incident.id}>
                      <button
                        type="button"
                        onClick={() => selectIncident(incident.id)}
                        className={`w-full rounded-lg border px-3 py-2.5 text-left transition${
                          active ? " assistant-incident-active" : ""
                        }`}
                        style={{
                          borderColor: active ? "var(--app-brand)" : "var(--app-border)",
                          backgroundColor: active ? undefined : "transparent",
                        }}
                      >
                        {shortDate && shortDate !== "—" && (
                          <p
                            className="text-[10px] font-semibold uppercase tracking-wide"
                            style={{ color: "var(--app-text-muted)" }}
                          >
                            {shortDate}
                          </p>
                        )}
                        <p className="mt-0.5 truncate text-sm font-semibold">{incident.title}</p>

                        <div
                          className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px]"
                          style={{ color: "var(--app-text-muted)" }}
                        >
                          {itemService && <span className="font-mono">{itemService}</span>}
                          {itemService && relative && <span>·</span>}
                          {relative && <span>{relative}</span>}
                          {(itemService || relative) && incident.confidence != null && (
                            <span>·</span>
                          )}
                          <ConfidenceLabel value={incident.confidence} compact />
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <SeverityBadge severity={incident.severity} />
                          <StatusBadge status={incident.status} />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        <section
          className="flex min-h-[420px] min-w-0 flex-col overflow-hidden rounded-xl border lg:min-h-0"
          style={{
            backgroundColor: "var(--app-bg-elevated)",
            borderColor: "var(--app-border)",
          }}
        >
          <div
            className="border-b px-4 py-3 md:px-5"
            style={{ borderColor: "var(--app-border)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Bot size={18} style={{ color: "var(--app-brand)" }} />
                  <h2 className="truncate text-base font-semibold">
                    {selectedIncident?.title || "AI Incident Assistant"}
                  </h2>
                </div>
                <p className="mt-1 text-xs" style={{ color: "var(--app-text-muted)" }}>
                  {activeIncidentId
                    ? "Answers use this incident’s summary, root cause, timeline, and evidence."
                    : "Select an incident to begin."}
                </p>
              </div>

              {activeIncidentId && (
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/incidents/${activeIncidentId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition hover:opacity-80"
                    style={{
                      borderColor: "var(--app-border)",
                      color: "var(--app-brand)",
                      backgroundColor: "color-mix(in srgb, var(--app-brand) 6%, transparent)",
                    }}
                  >
                    <FileText size={13} />
                    Incident Details
                  </Link>
                  <button
                    type="button"
                    disabled={clearMutation.isPending || messages.length === 0}
                    onClick={() => clearMutation.mutate()}
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition hover:opacity-80 disabled:opacity-40"
                    style={{ borderColor: "var(--app-border)", color: "var(--app-text-muted)" }}
                    title="Clear conversation"
                  >
                    <Eraser size={13} />
                    Clear
                  </button>
                </div>
              )}
            </div>

            {selectedIncident && activeIncidentId && (
              <div className="mt-3 space-y-2.5">
                <div
                  className="grid gap-3 rounded-lg border px-3 py-2.5 sm:grid-cols-2 lg:grid-cols-4"
                  style={{ borderColor: "var(--app-border)" }}
                >
                  <HeaderMeta label="Category">
                    <CategoryBadge category={selectedIncident.category} />
                    {!selectedIncident.category && (
                      <span style={{ color: "var(--app-text-muted)" }}>—</span>
                    )}
                  </HeaderMeta>
                  <HeaderMeta label="Affected Service">
                    {service ? (
                      <span className="font-mono">{service}</span>
                    ) : (
                      <span style={{ color: "var(--app-text-muted)" }}>—</span>
                    )}
                  </HeaderMeta>
                  <HeaderMeta label="Severity">
                    <SeverityBadge severity={selectedIncident.severity} />
                    {!selectedIncident.severity && (
                      <span style={{ color: "var(--app-text-muted)" }}>—</span>
                    )}
                  </HeaderMeta>
                  <HeaderMeta label="Confidence">
                    <ConfidenceLabel value={selectedIncident.confidence} />
                    {selectedIncident.confidence == null && (
                      <span style={{ color: "var(--app-text-muted)" }}>—</span>
                    )}
                  </HeaderMeta>
                </div>

                {headerSummary && (
                  <div
                    className="rounded-lg border px-3 py-2.5"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--app-brand) 20%, var(--app-border))",
                      backgroundColor:
                        "color-mix(in srgb, var(--app-brand) 5%, transparent)",
                    }}
                  >
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: "var(--app-brand)" }}
                    >
                      Summary
                    </p>
                    <p
                      className="mt-1.5 line-clamp-3 text-[13.5px] font-semibold leading-relaxed tracking-[-0.01em]"
                      style={{ color: "var(--app-text)" }}
                    >
                      {headerSummary}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-5">
            {!activeIncidentId ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
                    color: "var(--app-brand)",
                  }}
                >
                  <MessageSquare size={22} />
                </span>
                <div>
                  <p className="text-base font-semibold">Hello 👋</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
                    Select an incident on the left to start asking questions.
                  </p>
                </div>
              </div>
            ) : historyQuery.isLoading ? (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <Spinner />
                <p className="text-sm" style={{ color: "var(--app-text-muted)" }}>
                  Loading conversation…
                </p>
              </div>
            ) : historyBlocked ? (
              <ErrorState
                title="Analysis required"
                description="Run AI analysis on this incident before using the assistant."
                onRetry={() => historyQuery.refetch()}
              />
            ) : historyQuery.isError ? (
              <ErrorState
                title="Couldn't load chat"
                description={getChatErrorMessage(historyQuery.error)}
                onRetry={() => historyQuery.refetch()}
              />
            ) : showEmptyConversation ? (
              <ChatEmptyState onSelectPrompt={setDraft} />
            ) : (
              <>
                {messages.map((item) => (
                  <ChatBubble key={item.id} role={item.role} message={item.message} />
                ))}
                {pendingUserMessage && (
                  <ChatBubble role="USER" message={pendingUserMessage} />
                )}
                {sendMutation.isPending && <TypingIndicator />}
              </>
            )}

            {sendError && (
              <p
                className="rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: "var(--app-danger)", color: "var(--app-danger)" }}
              >
                {sendError}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          <ChatComposer
            disabled={!activeIncidentId || historyBlocked}
            sending={sendMutation.isPending}
            onSend={handleSend}
            draftValue={draft}
            onDraftChange={setDraft}
            showSuggestions={Boolean(activeIncidentId) && !historyBlocked}
          />
        </section>
      </div>
    </div>
  );
}
