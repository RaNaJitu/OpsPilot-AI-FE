import { SUGGESTED_CHIPS } from "../utils/suggestedPrompts";

export default function SuggestedChips({ disabled, onSelect }) {
  return (
    <div className="space-y-2">
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--app-text-muted)" }}
      >
        Suggested Questions
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(chip.prompt)}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:border-[var(--app-brand)] disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              borderColor: "color-mix(in srgb, var(--app-brand) 28%, var(--app-border))",
              backgroundColor:
                "color-mix(in srgb, var(--app-brand) 7%, var(--app-bg-elevated))",
              color: "var(--app-text)",
              boxShadow: "0 0 0 1px color-mix(in srgb, var(--app-brand) 6%, transparent)",
            }}
          >
            <span aria-hidden="true" className="text-[13px] leading-none">
              {chip.icon}
            </span>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
