import * as React from "react";
import { F, Tip, tokens } from "./primitives";

const C = tokens.colors;

export interface ConnectorProps {
  value: "and" | "or";
  onChange: (v: "and" | "or") => void;
  disabled?: boolean;
}

/** AND / OR segmented toggle. Applies to every row in the group. */
export function Connector({ value, onChange, disabled }: ConnectorProps) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const opts: ("and" | "or")[] = ["and", "or"];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = opts[(i + 1) % 2];
      onChange(next);
      refs.current[(i + 1) % 2]?.focus();
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Tip label="Applies to every condition in this group" side="right">
        <div role="radiogroup" aria-label="Match type for this group" style={{ display: "inline-flex", border: `1px solid ${disabled ? C.border : C.borderStrong}`, borderRadius: 6, overflow: "hidden", background: "#fff" }}>
          {opts.map((o, i) => {
            const on = value === o;
            return (
              <button
                key={o}
                ref={(el) => { refs.current[i] = el; }}
                type="button"
                role="radio"
                aria-checked={on}
                aria-disabled={disabled || undefined}
                tabIndex={on ? 0 : -1}
                className="rb-f"
                onClick={() => !disabled && onChange(o)}
                onKeyDown={(e) => !disabled && onKey(e, i)}
                style={{ height: 24, minWidth: 44, padding: "0 10px", border: 0, borderLeft: i ? `1px solid ${C.border}` : 0, fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", background: on ? (disabled ? C.offWhite : C.blue) : "transparent", color: on ? (disabled ? C.textDisabled : "#fff") : disabled ? C.textDisabled : C.textSecondary, cursor: disabled ? "not-allowed" : "pointer", transition: "background 140ms ease-out, color 140ms ease-out" }}
              >
                {o}
              </button>
            );
          })}
        </div>
      </Tip>
      <span aria-hidden style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}
