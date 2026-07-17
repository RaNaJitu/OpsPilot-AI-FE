import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, X } from "lucide-react";

import { useUploadIncident } from "../../../hooks/useUploadIncident";
import UploadZone, { validateLogFile } from "../components/UploadZone";

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getErrorMessage(error) {
  const apiMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message;

  if (!apiMessage) return "Upload failed. Please try again.";

  const lower = String(apiMessage).toLowerCase();
  if (lower.includes("duplicate") || lower.includes("already been uploaded")) {
    return "Duplicate file uploaded.";
  }
  if (lower.includes("10 mb") || lower.includes("file too large") || lower.includes("filesize")) {
    return "Maximum upload size is 10 MB.";
  }
  if (lower.includes(".log") || lower.includes("invalid") || lower.includes("supported")) {
    return "Only .log, .txt and .json files are supported.";
  }

  return apiMessage;
}

export default function UploadIncidentPage() {
  const navigate = useNavigate();
  const mutation = useUploadIncident();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formError, setFormError] = useState("");
  const [progress, setProgress] = useState(0);

  const isUploading = mutation.isPending;

  const canSubmit = useMemo(() => {
    return Boolean(title.trim() && file && !fileError && !isUploading);
  }, [title, file, fileError, isUploading]);

  const handleFileSelect = (nextFile) => {
    const validationError = validateLogFile(nextFile);
    setFileError(validationError || "");
    setFormError("");
    setFile(validationError ? null : nextFile);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Incident title is required.");
      return;
    }

    const validationError = validateLogFile(file);
    if (validationError) {
      setFileError(validationError);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("file", file);

    setProgress(0);

    mutation.mutate(
      {
        formData,
        onUploadProgress: (eventProgress) => {
          if (!eventProgress.total) return;
          const percent = Math.round((eventProgress.loaded * 100) / eventProgress.total);
          setProgress(percent);
        },
      },
      {
        onSuccess: (payload) => {
          const incidentId = payload?.data?.id;
          if (incidentId) {
            navigate(`/incidents/${incidentId}`);
            return;
          }
          setFormError("Upload succeeded but incident id was missing.");
        },
        onError: (error) => {
          setFormError(getErrorMessage(error));
          setProgress(0);
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6 lg:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Upload Incident</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          Upload a production log file. AI analysis comes next.
        </p>
      </header>

      <form
        onSubmit={handleUpload}
        className="space-y-6 rounded-2xl border p-5 shadow-sm md:p-6"
        style={{
          backgroundColor: "var(--app-bg-elevated)",
          borderColor: "var(--app-border)",
        }}
      >
        <div>
          <label htmlFor="incident-title" className="mb-2 block text-sm font-medium">
            Incident Title
          </label>
          <input
            id="incident-title"
            type="text"
            value={title}
            disabled={isUploading}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Redis memory leak in production"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-[var(--app-brand)]"
            style={{
              backgroundColor: "var(--app-input-bg)",
              borderColor: "var(--app-border)",
              color: "var(--app-text)",
            }}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Drag & Drop File</p>
          <UploadZone
            file={file}
            onFileSelect={handleFileSelect}
            disabled={isUploading}
            error={fileError}
          />
        </div>

        {file && !fileError && (
          <div
            className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
            style={{ borderColor: "var(--app-border)" }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
                  color: "var(--app-brand)",
                }}
              >
                <FileText size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={isUploading}
              onClick={() => {
                setFile(null);
                setFileError("");
              }}
              className="rounded-lg p-2 transition hover:bg-[var(--app-nav-hover)]"
              aria-label="Remove selected file"
              style={{ color: "var(--app-text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading...</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--app-nav-hover)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "var(--app-brand)",
                }}
              />
            </div>
          </div>
        )}

        {formError && (
          <p className="text-sm" style={{ color: "var(--app-danger)" }}>
            ❌ {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
