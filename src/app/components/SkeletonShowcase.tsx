import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

const label: React.CSSProperties = {
  fontSize: 12,
  fontFamily: F,
  fontWeight: 400,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5A5A6A",
};

const panel: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#FFFFFF",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
  borderRadius: 10,
  padding: 24,
};

function Bar({ w = "100%", h = 12, r = 6, style }: { w?: number | string; h?: number; r?: number | string; style?: React.CSSProperties }) {
  return <div className="jl-skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

function TextLines() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Bar w="55%" h={20} />
      <Bar />
      <Bar />
      <Bar w="80%" />
    </div>
  );
}

function AvatarRow() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Bar w={40} h={40} r={9999} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <Bar w="45%" h={14} />
        <Bar w="70%" h={12} />
      </div>
    </div>
  );
}

function CardSkel() {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden", background: "#FFFFFF" }}>
      <Bar h={120} r={0} style={{ borderRadius: 0 }} />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <Bar w="60%" h={20} />
        <Bar />
        <Bar w="85%" />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Bar w={72} h={32} />
          <Bar w={72} h={32} />
        </div>
      </div>
    </div>
  );
}

function TableSkel() {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 24px",
            gap: 16,
            alignItems: "center",
            padding: "14px 16px",
            borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <Bar w={i % 2 ? "70%" : "85%"} h={14} />
          <Bar w="60%" h={12} />
          <Bar w={64} h={20} />
          <Bar w={16} h={16} />
        </div>
      ))}
    </div>
  );
}

function MetricSkel() {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, background: "#FFFFFF", display: "flex", flexDirection: "column", gap: 12 }}>
      <Bar w={96} h={12} />
      <Bar w={120} h={40} />
      <Bar w="50%" h={12} />
    </div>
  );
}

export function SkeletonShowcase() {
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <section id="skeletons" className="mb-16">
      <style>{`
        @keyframes jl-skeleton-shimmer { 0% { opacity: 1; } 50% { opacity: 0.55; } 100% { opacity: 1; } }
        .jl-skel { background: #F4F4F6; animation: jl-skeleton-shimmer 1.6s ease-in-out infinite; }
        .jl-skel-off .jl-skel { animation: none; }
        .jl-skel-btn:focus-visible { outline: 2px solid #1B1BFF; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .jl-skel { animation: none !important; } }
      `}</style>

      <p className="mb-2" style={label}>Feedback</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Skeletons
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Off White placeholders that mirror the final layout while content loads. A soft fade replaces any shimmer when motion is reduced.
      </p>

      <div className="flex items-center gap-3 mb-6" style={{ flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setLoaded((v) => !v)}
          className="jl-skel-btn"
          style={{ fontFamily: F, fontSize: 14, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "none", background: "#1B1BFF", color: "#FFFFFF", cursor: "pointer" }}
        >
          {loaded ? "Show skeletons" : "Simulate loaded content"}
        </button>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="jl-skel-btn"
          style={{ fontFamily: F, fontSize: 14, fontWeight: 700, padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.20)", background: paused ? "#EEEEFF" : "#FFFFFF", color: "#0A0A0F", cursor: "pointer" }}
        >
          {paused ? "Resume shimmer" : "Pause shimmer"}
        </button>
      </div>

      <div className={paused ? "jl-skel-off" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div style={panel}>
            <p className="mb-6" style={label}>Text lines</p>
            {loaded ? (
              <div>
                <p style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F", margin: "0 0 12px" }}>Strategy summary</p>
                <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", lineHeight: 1.5, margin: 0 }}>
                  Meridian Health needs a unified patient journey. This brief outlines three priority opportunities and the phased approach to validate them with clinicians.
                </p>
              </div>
            ) : (
              <TextLines />
            )}
          </div>

          <div style={panel}>
            <p className="mb-6" style={label}>Avatar and text row</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {loaded ? (
                [
                  ["AO", "Amara Okafor", "Lead strategist, Northwind Logistics"],
                  ["DK", "Daniel Kessler", "Design director, Alder & Finch"],
                ].map(([i, n, r]) => (
                  <div key={n} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9999, background: "#EEEEFF", color: "#1B1BFF", fontFamily: F, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{i}</div>
                    <div>
                      <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#0A0A0F", margin: 0 }}>{n}</p>
                      <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: 0 }}>{r}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <AvatarRow />
                  <AvatarRow />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div style={panel}>
            <p className="mb-6" style={label}>Card</p>
            {loaded ? (
              <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 120, background: "#EEEEFF" }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F", margin: "0 0 8px" }}>Brand architecture</p>
                  <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", lineHeight: 1.5, margin: 0 }}>
                    Phase 2 deliverables for Alder & Finch, due 14 November.
                  </p>
                </div>
              </div>
            ) : (
              <CardSkel />
            )}
          </div>

          <div style={panel}>
            <p className="mb-6" style={label}>Metric card</p>
            {loaded ? (
              <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24 }}>
                <p style={{ ...label, margin: 0 }}>Active engagements</p>
                <p style={{ fontFamily: F, fontSize: 40, fontWeight: 700, color: "#0A0A0F", margin: "8px 0 4px", lineHeight: 1.1 }}>24</p>
                <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: 0 }}>3 new this quarter</p>
              </div>
            ) : (
              <MetricSkel />
            )}
          </div>
        </div>

        <div style={panel}>
          <p className="mb-6" style={label}>Table rows</p>
          {loaded ? (
            <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
              {[
                ["Meridian Health", "Discovery", "On track"],
                ["Northwind Logistics", "Strategy", "In review"],
                ["Alder & Finch", "Design", "On track"],
                ["Harbour Capital", "Delivery", "Complete"],
                ["Oakridge Council", "Discovery", "On track"],
              ].map(([c, p, s], i) => (
                <div key={c} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 24px", gap: 16, padding: "14px 16px", borderTop: i ? "1px solid rgba(0,0,0,0.10)" : "none", fontFamily: F, fontSize: 14 }}>
                  <span style={{ fontWeight: 700, color: "#0A0A0F" }}>{c}</span>
                  <span style={{ color: "#5A5A6A" }}>{p}</span>
                  <span style={{ color: "#5A5A6A" }}>{s}</span>
                  <span />
                </div>
              ))}
            </div>
          ) : (
            <TableSkel />
          )}
        </div>
      </div>
    </section>
  );
}
