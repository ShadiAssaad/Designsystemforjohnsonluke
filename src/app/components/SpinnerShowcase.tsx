import { useEffect, useRef, useState } from "react";

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

function Spinner({
  size = 24,
  color = "#1B1BFF",
  track = "rgba(0,0,0,0.10)",
  title = "Loading",
}: {
  size?: number;
  color?: string;
  track?: string;
  title?: string;
}) {
  const stroke = size <= 16 ? 2 : size <= 24 ? 2.5 : 3;
  const r = (size - stroke) / 2;
  return (
    <svg
      role="status"
      aria-label={title}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="jl-spin"
      style={{ display: "block", flexShrink: 0 }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${r * 2 * Math.PI * 0.25} ${r * 2 * Math.PI}`}
      />
    </svg>
  );
}

function Stage({
  bg,
  fg,
  track,
  spin,
  caption,
  border = "1px solid rgba(0,0,0,0.10)",
  captionColor = "#5A5A6A",
}: {
  bg: string;
  fg: string;
  track: string;
  spin: string;
  caption: string;
  border?: string;
  captionColor?: string;
}) {
  return (
    <div style={{ background: bg, border, borderRadius: 10, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32, minHeight: 56 }}>
        {[16, 24, 40].map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Spinner size={s} color={spin} track={track} />
            <span style={{ fontFamily: F, fontSize: 12, color: captionColor }}>{s}px</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: F, fontSize: 14, color: fg, margin: "16px 0 0", lineHeight: 1.5 }}>{caption}</p>
    </div>
  );
}

export function SpinnerShowcase() {
  const [saving, setSaving] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const t1 = useRef<number | undefined>(undefined);
  const t2 = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(t1.current);
      window.clearTimeout(t2.current);
    },
    []
  );

  function save() {
    if (saving) return;
    setSaving(true);
    t1.current = window.setTimeout(() => setSaving(false), 2400);
  }

  function loadPanel() {
    setOverlay(true);
    t2.current = window.setTimeout(() => setOverlay(false), 2800);
  }

  const btnBase: React.CSSProperties = {
    fontFamily: F,
    fontSize: 14,
    fontWeight: 700,
    padding: "10px 20px",
    borderRadius: 6,
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 40,
  };

  return (
    <section id="spinners" className="mb-16">
      <style>{`
        @keyframes jl-spinner-rotate { to { transform: rotate(360deg); } }
        .jl-spin { animation: jl-spinner-rotate 800ms linear infinite; }
        .jl-spin-btn:focus-visible { outline: 2px solid #1B1BFF; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .jl-spin { animation-duration: 2400ms; } }
      `}</style>

      <p className="mb-2" style={label}>Feedback</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Spinners
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        A rotating arc for short waits. Three sizes, tuned for light, blue and dark surfaces. Rotation is the only looping motion.
      </p>

      <div style={panel} className="mb-6">
        <p className="mb-6" style={label}>Sizes and surfaces</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stage
            bg="#FFFFFF"
            fg="#0A0A0F"
            track="rgba(0,0,0,0.10)"
            spin="#1B1BFF"
            caption="On light. Blue arc on a neutral track."
          />
          <Stage
            bg="#1B1BFF"
            fg="#FFFFFF"
            track="rgba(255,255,255,0.30)"
            spin="#FFFFFF"
            border="1px solid #1B1BFF"
            captionColor="#FFFFFF"
            caption="On blue. White arc, never near-black."
          />
          <Stage
            bg="#0A0A0F"
            fg="#FFFFFF"
            track="rgba(255,255,255,0.12)"
            spin="#FFFFFF"
            border="1px solid rgba(255,255,255,0.12)"
            captionColor="#8A8A9A"
            caption="On dark. White arc, never blue."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <p className="mb-6" style={label}>Button, loading state</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              aria-busy={saving}
              className="jl-spin-btn"
              style={{
                ...btnBase,
                background: saving ? "#1B1BFF" : "#1B1BFF",
                color: "#FFFFFF",
                cursor: saving ? "progress" : "pointer",
                opacity: saving ? 0.85 : 1,
              }}
            >
              {saving && <Spinner size={16} color="#FFFFFF" track="rgba(255,255,255,0.30)" title="Saving" />}
              {saving ? "Saving brief" : "Save brief"}
            </button>
            <button
              type="button"
              disabled
              className="jl-spin-btn"
              style={{ ...btnBase, background: "#F4F4F6", color: "#5A5A6A", border: "1px solid rgba(0,0,0,0.10)", cursor: "not-allowed" }}
            >
              <Spinner size={16} color="#5A5A6A" track="rgba(0,0,0,0.10)" title="Publishing" />
              Publishing
            </button>
          </div>
          <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: "16px 0 0", lineHeight: 1.5 }}>
            Click to simulate a 2.4s save. The button keeps its width of content, disables input and announces the busy state.
          </p>
        </div>

        <div style={panel}>
          <div className="flex items-center justify-between mb-6" style={{ gap: 12 }}>
            <p style={label}>Full-panel overlay</p>
            <button
              type="button"
              onClick={loadPanel}
              disabled={overlay}
              className="jl-spin-btn"
              style={{
                ...btnBase,
                minHeight: 32,
                padding: "6px 12px",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.20)",
                color: overlay ? "#BABAC4" : "#0A0A0F",
                cursor: overlay ? "not-allowed" : "pointer",
              }}
            >
              Refresh data
            </button>
          </div>
          <div style={{ position: "relative", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden", background: "#FFFFFF" }}>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }} aria-hidden={overlay}>
              {[
                ["Meridian Health", "Discovery", "On track"],
                ["Northwind Logistics", "Strategy", "In review"],
                ["Alder & Finch", "Design", "On track"],
              ].map(([c, p, s]) => (
                <div key={c} style={{ display: "flex", justifyContent: "space-between", fontFamily: F, fontSize: 14, color: "#0A0A0F" }}>
                  <span style={{ fontWeight: 700 }}>{c}</span>
                  <span style={{ color: "#5A5A6A" }}>{p}</span>
                  <span style={{ color: "#5A5A6A" }}>{s}</span>
                </div>
              ))}
            </div>
            {overlay && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.88)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}
              >
                <Spinner size={40} title="Loading projects" />
                <span style={{ fontFamily: F, fontSize: 14, color: "#0A0A0F" }}>Loading projects</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
