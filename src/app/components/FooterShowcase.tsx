import React from "react";
import logoDark from "../../imports/Artboard_5_300x.png";

const F = "'Rethink Sans', sans-serif";

const css = `
.jl-ft a{font-family:${F};font-size:14px;text-decoration:none;border-radius:2px}
.jl-ft-dark a{color:#FFFFFF}
.jl-ft-dark a:hover{text-decoration:underline;text-underline-offset:3px}
.jl-ft-dark a:focus-visible{outline:2px solid #FFFFFF;outline-offset:2px}
.jl-ft-dark .legal a{color:#8A8A9A}
.jl-ft-dark .legal a:hover{color:#FFFFFF}
.jl-ft-light a{color:#5A5A6A}
.jl-ft-light a:hover{color:#0A0A0F;text-decoration:underline;text-underline-offset:3px}
.jl-ft-light a:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

const cols = [
  { h: "Services", l: ["Brand strategy", "Identity design", "Positioning and messaging", "Environmental design"] },
  { h: "Company", l: ["About Johnson Luke", "Case studies", "Careers", "Contact"] },
  { h: "Resources", l: ["Brand audit guide", "Insights", "Press", "Client portal"] },
];

export function FooterShowcase() {
  return (
    <section id="footers" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Navigation</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Footers</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        A full Near Black footer for marketing pages and a minimal one-line footer for app screens.
      </p>

      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 12px" }}>Full footer, dark</p>
      <footer className="jl-ft jl-ft-dark mb-8" style={{ background: "#0A0A0F", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", padding: "48px 32px 24px" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ marginBottom: 48 }}>
          <div className="col-span-2 md:col-span-1">
            <img src={logoDark} alt="Johnson Luke" style={{ height: 32, width: "auto", display: "block", marginBottom: 16 }} />
            <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: "#8A8A9A", lineHeight: 1.5, maxWidth: 220 }}>
              Strategy and design for brands that mean to be remembered.
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <p style={{ margin: "0 0 16px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8A9A" }}>{c.h}</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {c.l.map((x) => (<li key={x}><a href="#footers" onClick={(e) => e.preventDefault()}>{x}</a></li>))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="legal" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", fontFamily: F, fontSize: 12, color: "#8A8A9A" }}>
          <span>© 2026 Johnson Luke Ltd. All rights reserved.</span>
          <span style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((x) => (
              <a key={x} href="#footers" onClick={(e) => e.preventDefault()} style={{ fontSize: 12 }}>{x}</a>
            ))}
          </span>
        </div>
      </footer>

      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 12px" }}>Minimal footer, app screens</p>
      <footer className="jl-ft jl-ft-light" style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "16px 24px", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>© 2026 Johnson Luke Ltd.</span>
        <span style={{ display: "flex", gap: 24 }}>
          {["Help", "Privacy", "Terms", "Status"].map((x) => (
            <a key={x} href="#footers" onClick={(e) => e.preventDefault()} style={{ fontSize: 12 }}>{x}</a>
          ))}
        </span>
      </footer>
    </section>
  );
}
