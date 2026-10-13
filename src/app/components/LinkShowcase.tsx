import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const F = "'Rethink Sans', sans-serif";

const css = `
.jl-ln{font-family:${F};color:#1B1BFF;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;cursor:pointer;border-radius:2px;transition:color 140ms ease-out}
.jl-ln:hover,.jl-ln.is-hover{color:#0A0A9E;text-decoration-thickness:2px}
.jl-ln:focus-visible,.jl-ln.is-focus{outline:2px solid #1B1BFF;outline-offset:2px}
.jl-ln.visited,.jl-ln:visited{color:#5A2BB0}
.jl-ln-arrow{display:inline-flex;align-items:center;gap:6px;font-weight:700;text-decoration:none}
.jl-ln-arrow:hover,.jl-ln-arrow.is-hover{text-decoration:underline}
.jl-ln-arrow svg{transition:transform 140ms ease-out}
.jl-ln-arrow:hover svg,.jl-ln-arrow.is-hover svg{transform:translateX(3px)}
.jl-ln-ext svg{transition:none}
.jl-ln-ext:hover svg,.jl-ln-ext.is-hover svg{transform:none}
.jl-ln-dark{color:#FFFFFF}
.jl-ln-dark:hover,.jl-ln-dark.is-hover{color:#FFFFFF;text-decoration-thickness:2px}
.jl-ln-dark:focus-visible,.jl-ln-dark.is-focus{outline:2px solid #FFFFFF;outline-offset:2px}
.jl-ln-dis{color:#BABAC4;text-decoration:none;cursor:not-allowed}
`;

const noop = (e: React.MouseEvent) => e.preventDefault();

type Row = { label: string; node: (cls: string) => React.ReactNode; dark?: boolean };

const rows: Row[] = [
  { label: "Inline in body text", node: (c) => (
    <p style={{ margin: 0, fontFamily: F, fontSize: 16, color: "#0A0A0F", lineHeight: 1.6, maxWidth: 380 }}>
      Read the full <a href="#links" onClick={noop} className={`jl-ln ${c}`}>identity audit findings</a> before the workshop.
    </p>) },
  { label: "Standalone with arrow", node: (c) => (
    <a href="#links" onClick={noop} className={`jl-ln jl-ln-arrow ${c}`} style={{ fontSize: 16 }}>View case study <ArrowRight size={16} /></a>) },
  { label: "External", node: (c) => (
    <a href="#links" onClick={noop} className={`jl-ln jl-ln-arrow jl-ln-ext ${c}`} style={{ fontSize: 16, fontWeight: 400, textDecoration: "underline" }}>Client brand guidelines <ArrowUpRight size={16} aria-label="opens in new tab" /></a>) },
  { label: "Visited", node: () => (
    <a href="#links" onClick={noop} className="jl-ln visited" style={{ fontSize: 16 }}>Q2 competitor benchmark</a>) },
  { label: "Disabled", node: () => (
    <span className="jl-ln jl-ln-dis" aria-disabled="true" style={{ fontSize: 16 }}>Final report (available after sign-off)</span>) },
];

const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 12px" }}>{children}</p>
);

export function LinkShowcase() {
  return (
    <section id="links" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Navigation</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Links</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Always underlined so they never rely on colour alone. Blue on light surfaces, white on dark. Focus ring is 2px #1B1BFF.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "160px repeat(4, minmax(0, 1fr))", gap: "16px 24px", alignItems: "center", minWidth: 760 }}>
            <span />
            {["Default (try hover and Tab)", "Hover", "Focus", "Active"].map((h) => (
              <span key={h} style={{ fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>{h}</span>
            ))}
            {rows.slice(0, 3).map((r) => (
              <React.Fragment key={r.label}>
                <span style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>{r.label}</span>
                <div>{r.node("")}</div>
                <div>{r.node("is-hover")}</div>
                <div>{r.node("is-focus")}</div>
                <div>{r.node("is-hover")}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: 32 }}>
          <div>
            <Label>Visited</Label>
            {rows[3].node("")}
          </div>
          <div>
            <Label>Disabled</Label>
            {rows[4].node("")}
          </div>
          <div>
            <Label>On dark surface</Label>
            <div style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: "#8A8A9A", lineHeight: 1.6 }}>
                Our work spans <a href="#links" onClick={noop} className="jl-ln jl-ln-dark">brand strategy</a> and identity design.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <a href="#links" onClick={noop} className="jl-ln jl-ln-dark is-hover" style={{ fontSize: 14 }}>Hover</a>
                <a href="#links" onClick={noop} className="jl-ln jl-ln-dark is-focus" style={{ fontSize: 14 }}>Focus</a>
                <a href="#links" onClick={noop} className="jl-ln jl-ln-dark jl-ln-arrow" style={{ fontSize: 14 }}>Contact us <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
