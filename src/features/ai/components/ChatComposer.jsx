import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

import config from "../../../config";
import SuggestedChips from "./SuggestedChips";

export default function ChatComposer({
  disabled,
  sending,
  onSend,
  draftValue = "",
  onDraftChange,
  showSuggestions = true,
}) {
  const [value, setValue] = useState(draftValue);

  useEffect(() => {
    setValue(draftValue);
  }, [draftValue]);

  const updateValue = (next) => {
    setValue(next);
    onDraftChange?.(next);
  };

  const submit = () => {
    const message = value.trim();
    if (!message || disabled || sending) return;
    onSend(message);
    updateValue("");
  };

  return (
    <div className="border-t" style={{ borderColor: "var(--app-border)" }}>
      {showSuggestions && !disabled && (
        <div className="px-3 pt-3 md:px-4">
          <SuggestedChips
            disabled={disabled || sending}
            onSelect={(prompt) => updateValue(prompt)}
          />
        </div>
      )}

      <form
        className="flex items-end gap-2 p-3 md:p-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <textarea
          rows={2}
          value={value}
          disabled={disabled || sending}
          onChange={(e) => updateValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={
            disabled
              ? "Select an analyzed incident to start chatting…"
              : "Ask about the root cause, timeline, prevention, fixes or impact…"
          }
          className="max-h-40 min-h-[62px] flex-1 resize-none rounded-xl border px-3.5 py-3 text-sm outline-none focus:border-[var(--app-brand)] disabled:opacity-60"
          style={{
            backgroundColor: "var(--app-input-bg)",
            borderColor: "var(--app-border)",
            color: "var(--app-text)",
          }}
        />
        <div className="flex flex-col items-end gap-1">
          <button
            type="submit"
            disabled={disabled || sending || !value.trim()}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--app-brand)" }}
          >
            <SendHorizontal size={16} />
            {sending ? "Sending…" : "Send"}
          </button>
          <p
            className="max-w-[7.5rem] text-right text-[9px] leading-tight tracking-wide"
            style={{ color: "color-mix(in srgb, var(--app-text-muted) 75%, transparent)" }}
          >
            Powered by {config.AI_MODEL}
          </p>
        </div>
      </form>
    </div>
  );
}
