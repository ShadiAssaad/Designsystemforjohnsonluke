import { useId, useState } from "react";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function score(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) && pw.length >= 10) s++;
  return Math.max(1, s);
}
const LEVELS = [
  { name: "", color: "#BABAC4" },
  { name: "Weak", color: "#DC2626" },
  { name: "Fair", color: "#D97706" },
  { name: "Good", color: "#00A864" },
  { name: "Strong", color: "#00A864" },
];

function PasswordField({
  label, initial = "", meter, forceError, disabled, forceFocus, helper,
}: {
  label: string; initial?: string; meter?: boolean; forceError?: string; disabled?: boolean; forceFocus?: boolean; helper?: string;
}) {
  const id = useId();
  const [value, setValue] = useState(initial);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [caps, setCaps] = useState(false);
  const [hover, setHover] = useState(false);
  const s = score(value);
  const focused = focus || forceFocus;
  const border = forceError ? "#DC2626" : focused ? BLUE : hover && !disabled ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)";

  const detect = (e: React.KeyboardEvent) => setCaps(e.getModifierState("CapsLock"));

  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontFamily: F, fontSize: 14, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", marginBottom: 6 }}>{label}</label>
      <div
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ height: 44, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 8, padding: "0 6px 0 12px", borderRadius: 6, background: disabled ? "#F4F4F6" : "#FFFFFF",
          border: `${focused || forceError ? 2 : 1}px solid ${border}`, transition: "border-color 140ms ease-out" }}
      >
        <input
          id={id} type={show ? "text" : "password"} value={value} disabled={disabled}
          autoComplete="new-password"
          aria-invalid={!!forceError}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => { setFocus(false); setCaps(false); }}
          onKeyDown={detect} onKeyUp={detect}
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 14, color: disabled ? "#BABAC4" : "#0A0A0F", cursor: disabled ? "not-allowed" : "text" }}
        />
        <button type="button" disabled={disabled} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow(!show)}
          style={{ border: "none", background: "transparent", padding: 8, borderRadius: 6, display: "flex", cursor: disabled ? "not-allowed" : "pointer", color: disabled ? "#BABAC4" : "#5A5A6A" }}>
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {caps && focus && (
        <p role="status" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontFamily: F, fontSize: 12, color: "#D97706" }}>
          <TriangleAlert size={14} /> Caps Lock is on
        </p>
      )}
      {meter && (
        <div style={{ marginTop: 10 }} aria-live="polite">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 4, borderRadius: 2, background: i <= s ? LEVELS[s].color : "#F4F4F6", transition: "background 180ms ease-out" }} />
            ))}
          </div>
          <p style={{ marginTop: 6, fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>
            {s ? <>Strength: <strong style={{ fontWeight: 700, color: s === 1 ? "#DC2626" : s === 2 ? "#D97706" : "#00A864" }}>{LEVELS[s].name}</strong></> : "Use 8+ characters with mixed case, numbers and a symbol."}
          </p>
        </div>
      )}
      {forceError && <p role="alert" style={{ marginTop: 6, fontFamily: F, fontSize: 12, color: "#DC2626" }}>{forceError}</p>}
      {helper && !forceError && !meter && <p style={{ marginTop: 6, fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{helper}</p>}
    </div>
  );
}

export function PasswordShowcase() {
  return (
    <section id="password" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Password Input</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Show and hide toggle, Caps Lock hint and a four-step strength meter.
      </p>
      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <p className="mb-5" style={eyebrow}>Live example</p>
        <div style={{ maxWidth: 400 }} className="mb-10">
          <PasswordField label="Client portal password" meter helper="" />
        </div>
        <p className="mb-5" style={eyebrow}>Strength steps</p>
        <div className="grid gap-6 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <PasswordField label="Weak" initial="studio" meter />
          <PasswordField label="Fair" initial="studio2026" meter />
          <PasswordField label="Good" initial="Studio2026" meter />
          <PasswordField label="Strong" initial="Studio2026!" meter />
        </div>
        <p className="mb-5" style={eyebrow}>States</p>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <PasswordField label="Focus" forceFocus initial="briefing" />
          <PasswordField label="Error" initial="abc" forceError="Password must be at least 8 characters." />
          <PasswordField label="Disabled" initial="locked-account" disabled />
        </div>
      </div>
    </section>
  );
}
