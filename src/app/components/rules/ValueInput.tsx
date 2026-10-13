import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Plus } from "lucide-react";
import type { ConditionValue, Field, Operator, RangeValue, RelativeValue } from "./types";
import { PEOPLE } from "./data";
import { Avatar, Chip, F, SelectField, TextInput, Toggle, tokens } from "./primitives";

const C = tokens.colors;
const isRange = (v: ConditionValue): v is RangeValue => !!v && typeof v === "object" && !Array.isArray(v) && "from" in v;
const isRel = (v: ConditionValue): v is RelativeValue => !!v && typeof v === "object" && !Array.isArray(v) && "unit" in v;

export interface ValueInputProps {
  field?: Field;
  operator?: Operator;
  value: ConditionValue;
  onChange: (v: ConditionValue) => void;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
}

const fieldOptions = (f: Field) =>
  f.type === "person"
    ? PEOPLE.map((p) => ({ ...p, icon: <Avatar name={p.label} size={20} /> }))
    : f.options ?? [];

const Between = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: F, fontSize: 14, color: C.textSecondary }}>{children}</span>
);

/** Renders the right input for the field type + operator. Returns null if the operator needs no value. */
export function ValueInput({ field, operator, value, onChange, disabled, invalid, id }: ValueInputProps) {
  if (!field || !operator || operator.kind === "none") return null;
  const t = field.type;
  const numeric = t === "number" || t === "currency" || t === "percent";
  const inputType = t === "date" ? "date" : numeric ? "number" : "text";
  const adorn = {
    prefix: t === "currency" ? "£" : undefined,
    suffix: t === "percent" ? "%" : t === "number" ? field.unit : undefined,
  };
  const label = `${field.label} value`;

  if (operator.kind === "multi") {
    return (
      <MultiSelectField
        id={id}
        ariaLabel={label}
        options={fieldOptions(field)}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        disabled={disabled}
        invalid={invalid}
        avatars={t === "person"}
      />
    );
  }

  if (operator.kind === "relative") {
    const v: RelativeValue = isRel(value) ? value : { n: "", unit: "days" };
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <Between>last</Between>
        <TextInput id={id} aria-label="Number" type="number" min={1} inputMode="numeric" value={v.n} onChange={(n) => onChange({ ...v, n })} disabled={disabled} invalid={invalid} placeholder="7" width={72} />
        <SelectField ariaLabel="Unit" value={v.unit} onChange={(unit) => onChange({ ...v, unit: unit as RelativeValue["unit"] })} options={["days", "weeks", "months"].map((u) => ({ value: u, label: u }))} disabled={disabled} minWidth={96} />
      </span>
    );
  }

  if (operator.kind === "range") {
    const v: RangeValue = isRange(value) ? value : { from: "", to: "" };
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <TextInput id={id} aria-label={`${field.label} from`} type={inputType} value={v.from} onChange={(from) => onChange({ ...v, from })} disabled={disabled} invalid={invalid} placeholder={t === "date" ? undefined : "From"} {...adorn} width={t === "date" ? 150 : 110} />
        <Between>and</Between>
        <TextInput aria-label={`${field.label} to`} type={inputType} value={v.to} onChange={(to) => onChange({ ...v, to })} disabled={disabled} invalid={invalid} placeholder={t === "date" ? undefined : "To"} {...adorn} width={t === "date" ? 150 : 110} />
      </span>
    );
  }

  // single
  const str = typeof value === "string" ? value : "";
  if (t === "select" || t === "multiselect" || t === "person") {
    return <SelectField id={id} ariaLabel={label} value={str} onChange={onChange} options={fieldOptions(field)} placeholder={t === "person" ? "Choose person" : "Choose option"} disabled={disabled} invalid={invalid} minWidth={160} />;
  }
  if (t === "boolean") {
    return <Toggle ariaLabel={label} checked={value === true} onChange={onChange} disabled={disabled} />;
  }
  return (
    <TextInput
      id={id}
      aria-label={label}
      type={inputType}
      inputMode={numeric ? "decimal" : undefined}
      value={str}
      onChange={onChange}
      disabled={disabled}
      invalid={invalid}
      placeholder={t === "text" ? "Enter text" : t === "date" ? undefined : "0"}
      width={t === "date" ? 150 : numeric ? (t === "number" && field.unit ? 130 : 110) : 180}
      {...adorn}
    />
  );
}

/* ───────── Multi-select with chips ───────── */

export interface MultiSelectFieldProps {
  options: { value: string; label: string; description?: string }[];
  value: string[];
  onChange: (v: string[]) => void;
  ariaLabel: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  avatars?: boolean;
  id?: string;
}

export function MultiSelectField({ options, value, onChange, ariaLabel, placeholder = "Choose options", disabled, invalid, avatars, id }: MultiSelectFieldProps) {
  const toggle = (v: string) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  return (
    <Popover.Root>
      <div
        className="rb-field"
        aria-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: 4, padding: "5px 6px", minWidth: 180, maxWidth: "100%" }}
      >
        {value.map((v) => (
          <Chip key={v} label={labelOf(v)} disabled={disabled} leading={avatars ? <Avatar name={labelOf(v)} size={16} /> : undefined} onRemove={() => toggle(v)} />
        ))}
        <Popover.Trigger asChild disabled={disabled}>
          <button
            id={id}
            type="button"
            aria-label={`${ariaLabel}: add`}
            data-invalid={invalid || undefined}
            className="rb-f"
            style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 24, padding: "0 6px", border: 0, borderRadius: 6, background: "transparent", fontFamily: F, fontSize: 13, color: disabled ? C.textDisabled : value.length ? C.textSecondary : "#6B6B7B", cursor: disabled ? "not-allowed" : "pointer" }}
          >
            <Plus size={14} aria-hidden />
            {value.length ? "Add" : placeholder}
          </button>
        </Popover.Trigger>
      </div>
      <Popover.Portal>
        <Popover.Content className="rb-menu" align="start" sideOffset={4} style={{ minWidth: 220, maxHeight: 300, overflowY: "auto" }}>
          <div role="listbox" aria-multiselectable aria-label={ariaLabel}>
            {options.map((o) => {
              const on = value.includes(o.value);
              return (
                <button key={o.value} type="button" role="option" aria-selected={on} className="rb-item rb-f" onClick={() => toggle(o.value)}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${on ? C.blue : C.borderStrong}`, background: on ? C.blue : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {on && <Check size={12} color="#fff" aria-hidden />}
                  </span>
                  {avatars && <Avatar name={o.label} size={20} />}
                  <span style={{ flex: 1 }}>{o.label}</span>
                  {o.description && <span style={{ fontSize: 12, color: C.textSecondary }}>{o.description}</span>}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
