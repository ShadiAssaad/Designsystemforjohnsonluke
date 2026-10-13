import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Pencil, Zap } from "lucide-react";
import type { Trigger, TriggerDef } from "./types";
import { TRIGGERS, TRIGGER_CATEGORIES, defaultTrigger, fillTemplate, getTriggerDef } from "./data";
import { F, FieldError, Label, SelectField, tokens } from "./primitives";
import type { ForceState } from "./primitives";
import { nodeAttr } from "./utils";

const C = tokens.colors;

export interface TriggerSelectorProps {
  value: Trigger | null;
  onChange: (t: Trigger | null) => void;
  disabled?: boolean;
  error?: string;
  /** Param key the error refers to, to highlight that select */
  errorField?: string;
  forceState?: ForceState;
}

function IconTile({ def, size = 32 }: { def: TriggerDef; size?: number }) {
  const I = def.icon;
  return (
    <span aria-hidden style={{ width: size, height: size, borderRadius: 6, background: C.blueTint, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <I size={size / 2} color={C.blue} />
    </span>
  );
}

/** Template with params shown as "…" for the picker list. */
const listName = (def: TriggerDef) => def.name.replace(/\{[a-z]+\}/g, "…");

export function TriggerSelector({ value, onChange, disabled, error, errorField, forceState }: TriggerSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const def = getTriggerDef(value?.id);
  const errId = React.useId();

  const pill = (
    <Popover.Trigger asChild disabled={disabled}>
      <button
        type="button"
        className={def && value ? "rb-f rb-pill" : "rb-f rb-pill-empty"}
        data-force={forceState}
        aria-haspopup="dialog"
        aria-describedby={error ? errId : undefined}
        aria-disabled={disabled || undefined}
        data-invalid={error && !def ? "true" : undefined}
        style={
          def && value
            ? { display: "inline-flex", alignItems: "center", gap: 8, minHeight: 36, padding: "6px 14px 6px 12px", borderRadius: 9999, border: "none", background: disabled ? C.offWhite : C.blueTint, color: disabled ? C.textDisabled : C.blue, fontFamily: F, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", textAlign: "left", transition: "background 140ms ease-out" }
            : { display: "flex", alignItems: "center", gap: 12, width: "100%", minHeight: 56, padding: "10px 14px", borderRadius: 10, border: `1px dashed ${error ? C.danger : C.borderStrong}`, background: disabled ? C.offWhite : "#fff", color: disabled ? C.textDisabled : C.textSecondary, fontFamily: F, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", textAlign: "left" }
        }
      >
        {def && value ? (
          <>
            <def.icon size={14} aria-hidden />
            <span>
              {def.name.split(/(\{[a-z]+\})/).filter(Boolean).map((part, i) => {
                const isParam = /^\{[a-z]+\}$/.test(part);
                const seg = isParam ? fillTemplate(def, part, value.params)[0] : { text: part, placeholder: false };
                return <span key={i} style={{ fontWeight: isParam && !seg.placeholder ? 700 : 400, opacity: seg.placeholder ? 0.8 : 1 }}>{seg.text}</span>;
              })}
            </span>
            <Pencil size={13} aria-hidden style={{ marginLeft: 4 }} />
            <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Edit trigger</span>
          </>
        ) : (
          <>
            <Zap size={16} aria-hidden />
            <span>
              <span style={{ display: "block", fontWeight: 700, color: disabled ? C.textDisabled : C.ink }}>Choose a trigger</span>
              <span style={{ fontSize: 12 }}>The event that starts this rule</span>
            </span>
          </>
        )}
      </button>
    </Popover.Trigger>
  );

  return (
    <div {...nodeAttr("trigger")} tabIndex={-1} style={{ display: "flex", flexDirection: "column", gap: 10, outline: "none" }}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: def ? "flex-start" : "stretch" }}>{pill}</div>
        <Popover.Portal>
          <Popover.Content className="rb-menu" align="start" sideOffset={6} style={{ width: 400, maxWidth: "92vw", maxHeight: 420, overflowY: "auto", padding: 8 }}>
            <div role="listbox" aria-label="Triggers">
              {TRIGGER_CATEGORIES.map((cat) => (
                <div key={cat} role="group" aria-label={cat}>
                  <div style={{ padding: "8px 8px 6px" }}><Label>{cat}</Label></div>
                  {TRIGGERS.filter((t) => t.category === cat).map((t) => {
                    const selected = t.id === value?.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className="rb-item rb-f"
                        onClick={() => { onChange(selected && value ? value : defaultTrigger(t.id)); setOpen(false); }}
                        style={{ alignItems: "flex-start", gap: 12, padding: 10, background: selected ? C.blueTint : undefined }}
                      >
                        <IconTile def={t} />
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 14 }}>{listName(t)}</span>
                          <span style={{ display: "block", fontSize: 12, color: C.textSecondary, lineHeight: 1.4 }}>{t.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {def?.params && value && (
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, fontFamily: F, fontSize: 14, color: C.textSecondary }}>
          {def.name.split(/(\{[a-z]+\})/).filter(Boolean).map((part, i) => {
            const m = part.match(/^\{([a-z]+)\}$/);
            if (!m) return <span key={i}>{part}</span>;
            const p = def.params!.find((x) => x.key === m[1])!;
            return (
              <SelectField
                key={i}
                ariaLabel={p.label}
                value={value.params[p.key]}
                placeholder={`Choose ${p.label.toLowerCase()}`}
                options={p.options}
                disabled={disabled}
                invalid={!!error && errorField === p.key}
                onChange={(v) => onChange({ ...value, params: { ...value.params, [p.key]: v } })}
                minWidth={110}
                size="sm"
              />
            );
          })}
        </div>
      )}
      {error && <FieldError id={errId}>{error}</FieldError>}
    </div>
  );
}
