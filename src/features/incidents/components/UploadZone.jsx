import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";

const ALLOWED_EXTENSIONS = [".log", ".txt", ".json"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

function getExtension(filename = "") {
  const idx = filename.lastIndexOf(".");
  return idx >= 0 ? filename.slice(idx).toLowerCase() : "";
}

export function validateLogFile(file) {
  if (!file) return "Please select a log file.";

  const ext = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return "Only .log, .txt and .json files are supported.";
  }

  if (file.size > MAX_SIZE_BYTES) {
    return "Maximum upload size is 10 MB.";
  }

  return null;
}

export default function UploadZone({ file, onFileSelect, disabled = false, error }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const next = fileList?.[0];
      if (next) onFileSelect(next);
    },
    [onFileSelect]
  );

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".log,.txt,.json,text/plain,application/json"
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);
          if (!disabled) handleFiles(event.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition"
        style={{
          backgroundColor: isDragging
            ? "color-mix(in srgb, var(--app-brand) 8%, var(--app-bg-elevated))"
            : "var(--app-bg-elevated)",
          borderColor: error
            ? "var(--app-danger)"
            : isDragging
              ? "var(--app-brand)"
              : "var(--app-border)",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span
          className="mb-3 flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
            color: "var(--app-brand)",
          }}
        >
          <Upload size={20} strokeWidth={1.8} />
        </span>
        <p className="text-sm font-medium">Drop .log .txt .json</p>
        <p className="mt-1 text-sm" style={{ color: "var(--app-text-muted)" }}>
          or
        </p>
        <p className="mt-1 text-sm font-semibold" style={{ color: "var(--app-brand)" }}>
          Browse Files
        </p>
      </button>

      {error && (
        <p className="mt-2 text-sm" style={{ color: "var(--app-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
