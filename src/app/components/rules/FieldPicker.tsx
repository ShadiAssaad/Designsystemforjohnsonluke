import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Search } from "lucide-react";
import { ENTITIES, FIELDS, FIELD_TYPE_ICON, FIELD_TYPE_LABEL, getField } from "./data";
import type { Field } from "./types";
import { F, tokens } from "./primitives";
import type { ForceState } from "./primitives";

const C = tokens.colors;

export interface FieldPickerProps {
  value?: string;
  onChange: (fieldId: string) => void;
  fields?: Field[];
  disabled?: boolean;
  invalid?: boolean;
  /** Dashed "Choose a field" look */
  incomplete?: boolean;
  id?: string;
  ariaLabel?: string;
  width?: number | string;
  minWidth?: number;
  forceState?: ForceState;
}

export function FieldPicker({ value, onChange, fields = FIELDS, disabled, invalid, incomplete, id, ariaLabel = "Field", width, minWidth = 170, forceState }: FieldPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const listId = React.useId();
  const current = getField(value) ?? fields.find((f) => f.id === value);
  const needle = q.trim().toLowerCase();
  const filtered = fields.filter((f) => !needle || f.label.toLowerCase().includes(needle) || f.entity.toLowerCase().includes(needle));
  const flat = ENTITIES.flatMap((e) => filtered.filter((f) => f.entity === e));

  React.useEffect(() => { setActive(0); }, [q, open]);
  React.useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const pick = (f: Field) => { onChange(f.id); setOpen(false); setQ(""); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && flat[active]) { e.preventDefault(); pick(flat[active]); }
  };
  const Icon = current ? FIELD_TYPE_ICON[current.type] : null;
  let idx = -1;

  return (
    <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ(""); }}>
      <Popover.Trigger asChild disabled={disabled}>
        <button
          id={id}
          type="button"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          className="rb-field rb-f"
          aria-disabled={disabled || undefined}
          data-invalid={invalid || undefined}
          data-incomplete={(incomplete && !current) || undefined}
          data-force={forceState}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "0 10px", height: 36, width, minWidth, cursor: disabled ? "not-allowed" : "pointer", textAlign: "left" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", color: current ? undefined : "#6B6B7B" }}>
            {Icon && <Icon size={14} aria-hidden style={{ color: disabled ? C.textDisabled : C.textSecondary, flexShrink: 0 }} />}
            {current ? current.label : "Choose a field"}
          </span>
          <ChevronDown size={14} aria-hidden style={{ flexShrink: 0, color: disabled ? C.textDisabled : C.textSecondary }} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rb-menu" align="start" sideOffset={4} style={{ width: 300, padding: 0 }} onOpenAutoFocus={(e) => { e.preventDefault(); document.getElementById(`${listId}-search`)?.focus(); }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
            <Search size={14} aria-hidden color={C.textSecondary} />
            <input
              id={`${listId}-search`}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={flat[active] ? `${listId}-${active}` : undefined}
              aria-label="Search fields"
              placeholder="Search fields"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKey}
              style={{ flex: 1, border: 0, outline: 0, fontFamily: F, fontSize: 14, color: C.ink, background: "transparent" }}
            />
          </div>
          <div id={listId} role="listbox" aria-label="Fields" style={{ maxHeight: 300, overflowY: "auto", padding: 4 }}>
            {flat.length === 0 && (
              <p style={{ margin: 0, padding: "16px 12px", fontFamily: F, fontSize: 14, color: C.textSecondary }}>No fields match “{q}”. Try a field name or an entity such as Budget.</p>
            )}
            {ENTITIES.map((entity) => {
              const group = filtered.filter((f) => f.entity === entity);
              if (!group.length) return null;
              return (
                <div key={entity} role="group" aria-label={entity}>
                  <div style={{ padding: "8px 10px 4px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary }}>{entity}</div>
                  {group.map((f) => {
                    idx += 1;
                    const i = idx;
                    const Ico = FIELD_TYPE_ICON[f.type];
                    return (
                      <div
                        key={f.id}
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={f.id === value}
                        className="rb-item"
                        data-highlighted={i === active ? "" : undefined}
                        onMouseMove={() => setActive(i)}
                        onClick={() => pick(f)}
                        style={{ fontWeight: f.id === value ? 700 : 400 }}
                      >
                        <Ico size={14} aria-hidden color={C.textSecondary} />
                        <span style={{ flex: 1 }}>{f.label}</span>
                        <span style={{ fontSize: 12, color: C.textSecondary }}>{FIELD_TYPE_LABEL[f.type]}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
