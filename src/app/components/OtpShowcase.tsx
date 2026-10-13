import { useId, useRef, useState } from "react";
import { Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };
const LEN = 6;

type Status = "idle" | "error" | "success";

function Otp({ label, initial = "", status = "idle", disabled, forceFocusIndex, verifyCode }: {
  label: string; initial?: string; status?: Status; disabled?: boolean; forceFocusIndex?: number; verifyCode?: string;
}) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length: LEN }, (_, i) => initial[i] ?? ""));
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  const [result, setResult] = useState<Status>(status);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const lid = useId();

  const finish = (d: string[]) => {
    if (verifyCode && d.every(Boolean)) setResult(d.join("") === verifyCode ? "success" : "error");
    else if (status === "idle") setResult("idle");
  };
  const update = (d: string[]) => { setDigits(d); if (verifyCode) finish(d); };
  const focusAt = (i: number) => refs.current[Math.max(0, Math.min(LEN - 1, i))]?.focus();

  const color = result === "error" ? "#DC2626" : result === "success" ? "#00A864" : BLUE;
  const msg = result === "error" ? "That code is incorrect. Request a new one." : result === "success" ? "Code verified." : null;

  return (
    <div>
      <p id={lid} style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", marginBottom: 8 }}>{label}</p>
      <div role="group" aria-labelledby={lid} style={{ display: "flex", gap: 8 }}>
        {digits.map((d, i) => {
          const focused = focusIdx === i || forceFocusIndex === i;
          const borderColor = result !== "idle" ? color : focused ? BLUE : d ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)";
          return (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              disabled={disabled}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${i + 1} of ${LEN}`}
              aria-invalid={result === "error"}
              onFocus={(e) => { setFocusIdx(i); e.target.select(); }}
              onBlur={() => setFocusIdx(null)}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(-1);
                const next = [...digits]; next[i] = v; update(next);
                if (v) focusAt(i + 1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i]) { e.preventDefault(); const n = [...digits]; if (i > 0) { n[i - 1] = ""; update(n); focusAt(i - 1); } }
                if (e.key === "ArrowLeft") { e.preventDefault(); focusAt(i - 1); }
                if (e.key === "ArrowRight") { e.preventDefault(); focusAt(i + 1); }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
                if (!text) return;
                const n = Array.from({ length: LEN }, (_, k) => text[k] ?? "");
                update(n); focusAt(Math.min(text.length, LEN - 1));
              }}
              style={{
                width: 48, height: 56, boxSizing: "border-box", textAlign: "center", fontFamily: F, fontSize: 24, fontWeight: 700,
                color: disabled ? "#BABAC4" : "#0A0A0F", background: disabled ? "#F4F4F6" : result === "error" ? "#FEE8E8" : result === "success" ? "#EEFAF4" : "#FFFFFF",
                border: `${focused || result !== "idle" ? 2 : 1}px solid ${borderColor}`, borderRadius: 6, outline: "none", cursor: disabled ? "not-allowed" : "text",
                transition: "border-color 140ms ease-out, background 140ms ease-out", padding: 0,
              }}
            />
          );
        })}
      </div>
      {msg && (
        <p role={result === "error" ? "alert" : "status"} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontFamily: F, fontSize: 12, color }}>
          {result === "success" && <Check size={14} />}{msg}
        </p>
      )}
    </div>
  );
}

export function OtpShowcase() {
  return (
    <section id="otp" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>One-Time Code</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Six boxes that auto-advance as you type. Paste a full code to fill every box at once.
      </p>
      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
          <div>
            <p className="mb-4" style={eyebrow}>Live (code is 428193)</p>
            <Otp label="Verification code" verifyCode="428193" />
            <p style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A", marginTop: 10 }}>Try typing, pasting “428193”, or Backspace to go back.</p>
          </div>
          <div><p className="mb-4" style={eyebrow}>Default (empty)</p><Otp label="Client portal code" /></div>
          <div><p className="mb-4" style={eyebrow}>Focus</p><Otp label="Client portal code" initial="42" forceFocusIndex={2} /></div>
          <div><p className="mb-4" style={eyebrow}>Filled</p><Otp label="Client portal code" initial="428193" /></div>
          <div><p className="mb-4" style={eyebrow}>Error</p><Otp label="Client portal code" initial="428100" status="error" /></div>
          <div><p className="mb-4" style={eyebrow}>Success</p><Otp label="Client portal code" initial="428193" status="success" /></div>
          <div><p className="mb-4" style={eyebrow}>Disabled</p><Otp label="Client portal code" initial="428" disabled /></div>
        </div>
      </div>
    </section>
  );
}
