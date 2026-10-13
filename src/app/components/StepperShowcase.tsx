import React, { useState } from "react";
import { Check, X } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
type St = "upcoming" | "current" | "complete" | "error";

const steps = [
  { t: "Client details", d: "Name, sector and lead contact" },
  { t: "Scope", d: "Touchpoints included in the audit" },
  { t: "Stakeholders", d: "Who we interview, and when" },
  { t: "Review", d: "Confirm and start the audit" },
];

const css = `
.jl-st-btn:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

function Dot({ s, n }: { s: St; n: number }) {
  const m: Record<St, React.CSSProperties> = {
    upcoming: { background: "#FFFFFF", border: "2px solid rgba(0,0,0,0.20)", color: "#5A5A6A" },
    current: { background: "#1B1BFF", border: "2px solid #1B1BFF", color: "#FFFFFF" },
    complete: { background: "#00A864", border: "2px solid #00A864", color: "#FFFFFF" },
    error: { background: "#FEE8E8", border: "2px solid #DC2626", color: "#DC2626" },
  };
  return (
    <div
      aria-current={s === "current" ? "step" : undefined}
      style={{ width: 32, height: 32, borderRadius: 9999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 14, fontWeight: 700, boxSizing: "border-box", ...m[s] }}
    >
      {s === "complete" ? <Check size={16} strokeWidth={2.5} /> : s === "error" ? <X size={16} strokeWidth={2.5} /> : n}
    </div>
  );
}

const sub = (s: St) => (s === "error" ? "Needs attention" : s === "complete" ? "Complete" : s === "current" ? "In progress" : "Upcoming");
const subColor = (s: St) => (s === "error" ? "#DC2626" : s === "complete" ? "#00A864" : "#5A5A6A");

function Horizontal({ states }: { states: St[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {states.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 112, textAlign: "center" }}>
            <Dot s={s} n={i + 1} />
            <div>
              <p style={{ margin: 0, fontFamily: F, fontSize: 14, fontWeight: s === "current" ? 700 : 400, color: s === "upcoming" ? "#5A5A6A" : "#0A0A0F" }}>{steps[i].t}</p>
              <p style={{ margin: 0, fontFamily: F, fontSize: 12, color: subColor(s) }}>{sub(s)}</p>
            </div>
          </div>
          {i < states.length - 1 && (
            <div style={{ flex: 1, height: 2, marginTop: 15, background: s === "complete" ? "#00A864" : "rgba(0,0,0,0.10)", minWidth: 16 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Vertical({ states }: { states: St[] }) {
  return (
    <div>
      {states.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Dot s={s} n={i + 1} />
            {i < states.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 32, background: s === "complete" ? "#00A864" : "rgba(0,0,0,0.10)" }} />}
          </div>
          <div style={{ paddingBottom: 24 }}>
            <p style={{ margin: 0, fontFamily: F, fontSize: 14, fontWeight: s === "current" ? 700 : 400, color: s === "upcoming" ? "#5A5A6A" : "#0A0A0F", lineHeight: "32px" }}>{steps[i].t}</p>
            <p style={{ margin: 0, fontFamily: F, fontSize: 12, color: subColor(s) }}>{s === "error" ? "Add at least one stakeholder" : steps[i].d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 16px" }}>{children}</p>
);

export function StepperShowcase() {
  const [cur, setCur] = useState(0);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<number | null>(null);

  const states: St[] = steps.map((_, i) => (err === i ? "error" : done || i < cur ? "complete" : i === cur ? "current" : "upcoming"));

  const next = () => {
    if (cur === 2 && err === null) { setErr(2); return; } // demo validation
    setErr(null);
    if (cur === steps.length - 1) setDone(true);
    else setCur(cur + 1);
  };
  const back = () => { setErr(null); setDone(false); setCur(Math.max(0, cur - 1)); };
  const reset = () => { setErr(null); setDone(false); setCur(0); };

  const btn: React.CSSProperties = { padding: "8px 16px", borderRadius: 6, fontFamily: F, fontSize: 14, cursor: "pointer" };

  return (
    <section id="steppers" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Navigation</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Steppers</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Multi-step progress in horizontal and vertical layouts with upcoming, current, complete and error states.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <Label>States reference</Label>
        <div style={{ overflowX: "auto", marginBottom: 32 }}>
          <div style={{ minWidth: 520 }}><Horizontal states={["complete", "current", "upcoming", "error"]} /></div>
        </div>

        <Label>Interactive: Brand audit setup</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div style={{ overflowX: "auto" }}><div style={{ minWidth: 520 }}><Horizontal states={states} /></div></div>
          </div>
          <div><Vertical states={states} /></div>
        </div>

        <div style={{ marginTop: 24, padding: 16, background: "#F4F4F6", borderRadius: 10 }}>
          <p style={{ margin: "0 0 4px", fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F" }}>
            {done ? "Brand audit is ready to start" : steps[cur].t}
          </p>
          <p role="status" style={{ margin: 0, fontFamily: F, fontSize: 14, color: err !== null ? "#DC2626" : "#5A5A6A" }}>
            {done ? "All four steps are complete." : err !== null ? "Add at least one stakeholder to continue, then press Next again." : steps[cur].d}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, borderTop: "1px solid rgba(0,0,0,0.10)", paddingTop: 16 }}>
          <button className="jl-st-btn" onClick={back} disabled={cur === 0 && !done} style={{ ...btn, border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", color: cur === 0 && !done ? "#BABAC4" : "#0A0A0F", cursor: cur === 0 && !done ? "not-allowed" : "pointer" }}>Back</button>
          {done ? (
            <button className="jl-st-btn" onClick={reset} style={{ ...btn, border: "none", background: "#1B1BFF", color: "#FFFFFF", fontWeight: 700 }}>Start over</button>
          ) : (
            <button className="jl-st-btn" onClick={next} style={{ ...btn, border: "none", background: "#1B1BFF", color: "#FFFFFF", fontWeight: 700 }}>{cur === steps.length - 1 ? "Finish" : "Next"}</button>
          )}
        </div>
      </div>
    </section>
  );
}
