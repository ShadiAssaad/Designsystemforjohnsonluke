import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Braces } from "lucide-react";
import { TOKENS } from "./data";
import type { TokenDef } from "./data";
import { Btn, Chip, F, tokens } from "./primitives";

const C = tokens.colors;
const SPLIT = /(\{[a-z_]+\.[a-z_]+\})/;

export interface TokenFieldProps {
  /** Plain string with tokens inline, e.g. "Budget alert: {project.name}" */
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  tokens?: TokenDef[];
  disabled?: boolean;
  invalid?: boolean;
  ariaLabel: string;
  id?: string;
}

/** Text field where {tokens} render as removable blue chips; "Insert field" adds one at the caret. */
export function TokenField({ value, onChange, placeholder, tokens: defs = TOKENS, disabled, invalid, ariaLabel, id }: TokenFieldProps) {
  const parts = value.split(SPLIT); // even = text, odd = token
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const last = React.useRef<{ i: number; pos: number }>({ i: parts.length - 1, pos: parts[parts.length - 1].length });
  const pending = React.useRef<{ i: number; pos: number } | null>(null);

  React.useEffect(() => {
    if (pending.current) {
      const { i, pos } = pending.current;
      pending.current = null;
      const el = refs.current[i];
      el?.focus();
      el?.setSelectionRange(pos, pos);
    }
  });

  const setPart = (i: number, text: string) => onChange(parts.map((p, j) => (j === i ? text : p)).join(""));
  const insert = (token: string) => {
    const i = Math.min(last.current.i, parts.length - 1);
    const idx = i % 2 === 0 ? i : i + 1;
    const text = parts[idx] ?? "";
    const pos = Math.min(last.current.pos, text.length);
    const next = [...parts];
    next[idx] = text.slice(0, pos) + token + text.slice(pos);
    // new token sits at index idx+1, text after at idx+2
    const joined = next.join("");
    pending.current = { i: idx + 2, pos: 0 };
    last.current = { i: idx + 2, pos: 0 };
    onChange(joined);
  };
  const removeToken = (i: number) => {
    const merged = parts[i - 1] + parts[i + 1];
    const next = [...parts.slice(0, i - 1), merged, ...parts.slice(i + 2)];
    pending.current = { i: i - 1, pos: parts[i - 1].length };
    onChange(next.join(""));
  };
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    const el = e.currentTarget;
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const atEnd = el.selectionStart === el.value.length && el.selectionEnd === el.value.length;
    if (e.key === "Backspace" && atStart && i > 0) { e.preventDefault(); removeToken(i - 1); }
    else if (e.key === "ArrowLeft" && atStart && i > 0) { e.preventDefault(); const p = refs.current[i - 2]; p?.focus(); p?.setSelectionRange(p.value.length, p.value.length); }
    else if (e.key === "ArrowRight" && atEnd && i < parts.length - 1) { e.preventDefault(); const n = refs.current[i + 2]; n?.focus(); n?.setSelectionRange(0, 0); }
  };

  const groups = Array.from(new Set(defs.map((d) => d.group)));

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0, flex: 1 }}>
      <div
        className="rb-field"
        aria-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        onClick={(e) => { if (e.target === e.currentTarget) refs.current[parts.length - 1]?.focus(); }}
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, padding: "5px 8px", flex: 1, minWidth: 200, cursor: disabled ? "not-allowed" : "text" }}
      >
        {parts.map((p, i) =>
          i % 2 === 1 ? (
            <Chip key={i} mono label={p} disabled={disabled} tabIndex={-1} onRemove={() => removeToken(i)} />
          ) : (
            <input
              key={i}
              id={i === 0 ? id : undefined}
              ref={(el) => { refs.current[i] = el; }}
              aria-label={i === 0 ? ariaLabel : `${ariaLabel}, text after token`}
              aria-invalid={invalid || undefined}
              data-invalid={invalid && i === 0 ? "true" : undefined}
              disabled={disabled}
              value={p}
              placeholder={parts.length === 1 && i === 0 ? placeholder : undefined}
              onChange={(e) => setPart(i, e.target.value)}
              onFocus={(e) => { last.current = { i, pos: e.currentTarget.selectionStart ?? p.length }; }}
              onSelect={(e) => { last.current = { i, pos: e.currentTarget.selectionStart ?? p.length }; }}
              onKeyDown={(e) => onKey(e, i)}
              style={{ width: i === parts.length - 1 ? undefined : `${Math.max(p.length, 0) + 1}ch`, flex: i === parts.length - 1 ? "1 1 80px" : "0 0 auto", minWidth: i === parts.length - 1 ? 80 : 4, height: 24, fontFamily: F, fontSize: 14 }}
            />
          ),
        )}
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild disabled={disabled}>
          <Btn variant="secondary" size="sm" disabled={disabled} leftIcon={<Braces size={14} aria-hidden />} style={{ height: 36 }}>
            Insert field
          </Btn>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="rb-menu" align="end" sideOffset={4} style={{ minWidth: 240 }} onCloseAutoFocus={(e) => { if (pending.current) e.preventDefault(); }}>
            {groups.map((g, gi) => (
              <React.Fragment key={g}>
                {gi > 0 && <DropdownMenu.Separator className="rb-sep" />}
                <DropdownMenu.Label style={{ padding: "6px 10px 2px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary }}>{g}</DropdownMenu.Label>
                {defs.filter((d) => d.group === g).map((d) => (
                  <DropdownMenu.Item key={d.token} className="rb-item" onSelect={() => insert(d.token)}>
                    <span style={{ flex: 1 }}>{d.label}</span>
                    <code style={{ fontSize: 12, color: C.blue, fontFamily: "ui-monospace, Menlo, monospace" }}>{d.token}</code>
                  </DropdownMenu.Item>
                ))}
              </React.Fragment>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
