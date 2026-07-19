import { Bot } from "lucide-react";

import Spinner from "../../../components/ui/Spinner";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <span
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "color-mix(in srgb, var(--app-brand-secondary) 14%, transparent)",
          borderColor: "color-mix(in srgb, var(--app-brand-secondary) 30%, var(--app-border))",
          color: "var(--app-brand-secondary)",
        }}
      >
        <Bot size={16} />
      </span>
      <div
        className="inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-sm"
        style={{
          backgroundColor: "var(--app-nav-hover)",
          borderColor: "var(--app-border)",
          color: "var(--app-text-muted)",
          borderTopLeftRadius: "0.35rem",
        }}
      >
        <Spinner size="sm" />
        OpsPilot AI is analyzing…
      </div>
    </div>
  );
}
