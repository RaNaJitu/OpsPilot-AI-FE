import { Bot, Check } from "lucide-react";

import { EMPTY_STATE_PROMPTS } from "../utils/suggestedPrompts";

const CONTEXT_ITEMS = [
  "Root Cause",
  "Timeline",
  "Evidence",
  "Recommendations",
  "Prevention",
];

export default function ChatEmptyState({ onSelectPrompt }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-lg flex-col justify-center gap-5 px-1 py-4">
      <div
        className="rounded-xl border px-4 py-4 text-left"
        style={{
          borderColor: "color-mix(in srgb, var(--app-brand) 24%, var(--app-border))",
          backgroundColor: "color-mix(in srgb, var(--app-brand) 6%, var(--app-bg-elevated))",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "color-mix(in srgb, var(--app-brand) 14%, transparent)",
              color: "var(--app-brand)",
            }}
          >
            <Bot size={16} />
          </span>
          <p className="text-sm font-semibold">OpsPilot AI</p>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--app-text)" }}>
          I’m ready to answer questions about this incident.
        </p>
        <p
          className="mt-3 text-[10px] font-semibold uppercase tracking-wide"
          style={{ color: "var(--app-text-muted)" }}
        >
          Context available
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
          {CONTEXT_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "var(--app-text)" }}
            >
              <Check size={12} style={{ color: "var(--app-success)" }} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p
          className="text-center text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--app-text-muted)" }}
        >
          Suggested AI Prompts
        </p>
        <ul className="mt-3 space-y-2">
          {EMPTY_STATE_PROMPTS.map((prompt) => (
            <li key={prompt.text}>
              <button
                type="button"
                onClick={() => onSelectPrompt?.(prompt.text)}
                className="flex w-full items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition hover:border-[var(--app-brand)]"
                style={{
                  borderColor: "color-mix(in srgb, var(--app-brand) 22%, var(--app-border))",
                  backgroundColor:
                    "color-mix(in srgb, var(--app-brand) 5%, var(--app-bg-elevated))",
                  color: "var(--app-text)",
                }}
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {prompt.icon}
                </span>
                {prompt.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
