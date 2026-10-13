import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function Stepper({ dir, onClick, disabled, forceHover }: { dir: "dec" | "inc"; onClick: () => void; disabled: boolean; forceHover?: boolean }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const Icon = dir === "dec" ? Minus : Plus;
  return (
    <button
      type="button"
      aria-label={dir === "dec" ? "Decrease" : "Increase"}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        width: 40, alignSelf: "stretch", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        background: disabled ? "transparent" : active ? "#E4E4FF" : hover || forceHover ? "#EEEEFF" : "transparent",
        color: disabled ? "#BABAC4" : BLUE, cursor: disabled ? "not-allowed" : "pointer", transition: "background 140ms ease-out",
      }}
    >
      <Icon size={16} />
    </button>
  );
}

function NumberField({
  label, initial, min, max, step = 1, unit, error, disabled, helper, forceFocus,
}: {
  label: string; initial: number; min?: number; max?: number; step?: number; unit?: string; error?: string; disabled?: boolean; helper?: string; forceFocus?: boolean;
}) {
  const id = useId();
  const [text, setText] = useState(String(initial));
  const [focus, setFocus] = useState(false);
  const n = Number(text);
  const valid = text.trim() !== "" && !Number.isNaN(n);
  const atMin = min !== undefined && valid && n <= min;
  const atMax = max !== undefined && valid && n >= max;
  const clamp = (v: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
  const bump = (d: number) => setText(String(clamp((valid ? n : min ?? 0) + d * step)));
  const focused = focus || forceFocus;

  const outOfRange = valid && ((min !== undefined && n < min) || (max !== undefined && n > max));
  const err = error ?? (outOfRange ? `Enter a value between ${min} and ${max}.` : undefined);
  const border = err ? "#DC2626" : focused ? BLUE : "rgba(0,0,0,0.10)";

  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontFamily: F, fontSize: 14, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", marginBottom: 6 }}>{label}</label>
      <div style={{ display: "inline-flex", alignItems: "center", height: 44, boxSizing: "border-box", borderRadius: 6, overflow: "hidden", background: disabled ? "#F4F4F6" : "#FFFFFF",
        border: `${focused || err ? 2 : 1}px solid ${border}`, transition: "border-color 140ms ease-out" }}>
        <Stepper dir="dec" disabled={disabled || atMin} onClick={() => bump(-1)} />
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 4px", borderLeft: "1px solid rgba(0,0,0,0.10)", borderRight: "1px solid rgba(0,0,0,0.10)", alignSelf: "stretch" }}>
          <input
            id={id}
            inputMode="decimal"
            role="spinbutton"
            aria-valuenow={valid ? n : undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-invalid={!!err}
            value={text}
            disabled={disabled}
            onChange={(e) => setText(e.target.value.replace(/[^0-9.-]/g, ""))}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false); if (valid) setText(String(clamp(n))); }}
            onKeyDown={(e) => { if (e.key === "ArrowUp") { e.preventDefault(); bump(1); } if (e.key === "ArrowDown") { e.preventDefault(); bump(-1); } }}
            style={{ width: unit ? 48 : 64, textAlign: "center", border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 16, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", cursor: disabled ? "not-allowed" : "text" }}
          />
          {unit && <span style={{ fontFamily: F, fontSize: 14, color: disabled ? "#BABAC4" : "#5A5A6A", paddingRight: 8 }}>{unit}</span>}
        </div>
        <Stepper dir="inc" disabled={disabled || atMax} onClick={() => bump(1)} />
      </div>
      {err ? <p role="alert" style={{ marginTop: 6, fontFamily: F, fontSize: 12, color: "#DC2626" }}>{err}</p>
        : helper ? <p style={{ marginTop: 6, fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{helper}</p> : null}
    </div>
  );
}

export function NumberInputShowcase() {
  return (
    <section id="numberinput" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Number Input</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Stepper buttons with optional min, max and unit suffix. Steppers disable at the limits; arrow keys also step.
      </p>
      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div><p className="mb-4" style={eyebrow}>Default</p><NumberField label="Workshop attendees" initial={8} /></div>
          <div><p className="mb-4" style={eyebrow}>Unit: days</p><NumberField label="Sprint length" initial={10} min={1} max={30} unit="days" helper="Between 1 and 30 days." /></div>
          <div><p className="mb-4" style={eyebrow}>Unit: %</p><NumberField label="Deposit" initial={25} min={0} max={100} step={5} unit="%" /></div>
          <div><p className="mb-4" style={eyebrow}>At minimum</p><NumberField label="Review rounds" initial={1} min={1} max={5} helper="Minimum reached." /></div>
          <div><p className="mb-4" style={eyebrow}>At maximum</p><NumberField label="Review rounds" initial={5} min={1} max={5} helper="Maximum reached." /></div>
          <div><p className="mb-4" style={eyebrow}>Focus</p><NumberField label="Team size" initial={4} min={1} max={12} forceFocus /></div>
          <div><p className="mb-4" style={eyebrow}>Error</p><NumberField label="Phase duration" initial={45} unit="days" error="Phases cannot exceed 30 days." /></div>
          <div><p className="mb-4" style={eyebrow}>Disabled</p><NumberField label="Contract term" initial={12} unit="days" disabled /></div>
        </div>
      </div>
    </section>
  );
}
