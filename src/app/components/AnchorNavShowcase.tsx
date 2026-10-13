import React, { useCallback, useEffect, useRef, useState } from "react";

const F = "'Rethink Sans', sans-serif";

const sections = [
  { id: "an-summary", t: "Executive summary", b: "Johnson Luke's brand is trusted by existing clients but under-recognised by prospects. This report sets out the evidence from 24 interviews, a competitor review of nine firms, and a touchpoint audit across web, print and events." },
  { id: "an-method", t: "Method", b: "We combined stakeholder interviews, a verbal and visual identity audit, and a benchmark against peers in strategy and design consulting. Each finding is rated by confidence and by commercial impact." },
  { id: "an-findings", t: "Key findings", b: "Three themes recur. The proposition is described differently by every team. Visual assets are strong but inconsistently applied. Proof points such as case studies are hard to find on the website." },
  { id: "an-recs", t: "Recommendations", b: "Agree a single positioning statement in the week 3 workshop. Consolidate the identity into one guidelines system. Rebuild the case study library around client outcomes, not deliverables." },
  { id: "an-roadmap", t: "Roadmap", b: "Phase 1 runs eight weeks and covers positioning, naming of the service lines and a refreshed identity system. Phase 2 extends the work to environments and digital product." },
  { id: "an-next", t: "Next steps", b: "Confirm scope and the stakeholder list this week. We will circulate the workshop pre-read five working days before the session." },
];

const css = `
.jl-an-link{display:block;width:100%;text-align:left;background:none;border:none;border-left:2px solid transparent;padding:8px 16px;font-family:${F};font-size:14px;color:#5A5A6A;cursor:pointer;transition:background 180ms ease-out,color 180ms ease-out}
.jl-an-link:hover{background:#F4F4F6;color:#0A0A0F}
.jl-an-link[aria-current="true"]{border-left-color:#1B1BFF;background:#EEEEFF;color:#0A0A0F;font-weight:700}
.jl-an-link:focus-visible{outline:2px solid #1B1BFF;outline-offset:-2px}
`;

export function AnchorNavShowcase() {
  const [active, setActive] = useState(sections[0].id);
  const box = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const el = box.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    let cur = sections[0].id;
    for (const s of sections) {
      const n = el.querySelector<HTMLElement>(`#${s.id}`);
      if (n && n.getBoundingClientRect().top - top <= 32) cur = s.id;
    }
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) cur = sections[sections.length - 1].id;
    setActive(cur);
  }, []);

  useEffect(() => { update(); }, [update]);

  const go = (id: string) => {
    const el = box.current;
    const n = el?.querySelector<HTMLElement>(`#${id}`);
    if (!el || !n) return;
    el.scrollTo({ top: n.offsetTop - 16, behavior: "smooth" });
  };

  return (
    <section id="anchornav" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Navigation</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Anchor navigation</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Sticky in-page table of contents. The active section gets a blue left bar and a tint, updated as you scroll.
      </p>

      <div className="rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", height: 420, overflow: "hidden" }}>
        <nav aria-label="On this page" style={{ width: 220, flexShrink: 0, borderRight: "1px solid rgba(0,0,0,0.10)", padding: "24px 0", background: "#FFFFFF" }}>
          <p style={{ margin: "0 0 8px", padding: "0 16px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>On this page</p>
          {sections.map((s) => (
            <button key={s.id} className="jl-an-link" aria-current={active === s.id ? "true" : undefined} onClick={() => go(s.id)}>{s.t}</button>
          ))}
        </nav>
        <div ref={box} onScroll={update} tabIndex={0} aria-label="Report content" style={{ flex: 1, overflowY: "auto", padding: "24px 32px", position: "relative" }}>
          <p style={{ margin: "0 0 4px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>Brand audit report</p>
          <h3 style={{ margin: "0 0 32px", fontFamily: F, fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Johnson Luke: Q3 Brand Refresh</h3>
          {sections.map((s) => (
            <div key={s.id} id={s.id} style={{ minHeight: 260, marginBottom: 32 }}>
              <h4 style={{ margin: "0 0 8px", fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F" }}>{s.t}</h4>
              <p style={{ margin: 0, fontFamily: F, fontSize: 16, color: "#5A5A6A", lineHeight: 1.6 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
