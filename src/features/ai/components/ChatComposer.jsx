import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatComposer({ disabled, sending, onSend }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const message = value.trim();
    if (!message || disabled || sending) return;
    onSend(message);
    setValue("");
  };

  return (
    <form
      className="flex items-end gap-2 border-t p-3 md:p-4"
      style={{ borderColor: "var(--app-border)" }}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <textarea
        rows={1}
        value={value}
        disabled={disabled || sending}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={
          disabled
            ? "Select an analyzed incident to start chatting…"
            : "Ask anything about this incident…"
        }
        className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:border-[var(--app-brand)] disabled:opacity-60"
        style={{
          backgroundColor: "var(--app-input-bg)",
          borderColor: "var(--app-border)",
          color: "var(--app-text)",
        }}
      />
      <button
        type="submit"
        disabled={disabled || sending || !value.trim()}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: "var(--app-brand)" }}
      >
        <SendHorizontal size={16} />
        {sending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
