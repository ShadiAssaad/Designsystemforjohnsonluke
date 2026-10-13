import React, { useRef, useState } from "react";

const F = "'Rethink Sans', sans-serif";
const H = 560; // phone frame height
const SNAP = { half: 0.5, full: 0.92 };
type Snap = "closed" | "half" | "full";

const css = `
.jl-bs-btn:focus-visible,.jl-bs-handle:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

const tasks = [
  ["Stakeholder interviews", "Due Fri", true],
  ["Competitor benchmarking", "Due 24 Oct", true],
  ["Verbal identity audit", "Due 31 Oct", false],
  ["Visual identity audit", "Due 31 Oct", false],
  ["Audit readout deck", "Due 7 Nov", false],
  ["Positioning workshop prep", "Due 14 Nov", false],
] as const;

export function BottomSheetShowcase() {
  const [snap, setSnap] = useState<Snap>("closed");
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ y: number; h: number } | null>(null);

  const heightFor = (s: Snap) => (s === "closed" ? 0 : H * SNAP[s]);
  const currentH = drag !== null && start.current ? Math.max(0, Math.min(H * SNAP.full, start.current.h - drag)) : heightFor(snap);

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { y: e.clientY, h: heightFor(snap) };
    setDrag(0);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    setDrag(e.clientY - start.current.y);
  };
  const onUp = () => {
    if (!start.current) return;
    const h = currentH;
    start.current = null;
    setDrag(null);
    const opts: [Snap, number][] = [["closed", 0], ["half", H * SNAP.half], ["full", H * SNAP.full]];
    setSnap(opts.reduce((a, b) => (Math.abs(b[1] - h) < Math.abs(a[1] - h) ? b : a))[0]);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") { e.preventDefault(); setSnap((s) => (s === "half" ? "full" : s)); }
    if (e.key === "ArrowDown") { e.preventDefault(); setSnap((s) => (s === "full" ? "half" : "closed")); }
    if (e.key === "Escape") setSnap("closed");
  };

  return (
    <section id="bottomsheet" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Overlays</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Bottom sheet</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Mobile drawer with drag handle, 16px top radius, half and full snap points, scrim. 280ms ease-in-out.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10" style={{ alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 16px" }}>Controls</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {(["half", "full", "closed"] as Snap[]).map((s) => (
                <button
                  key={s}
                  className="jl-bs-btn"
                  onClick={() => setSnap(s)}
                  style={{ padding: "8px 16px", borderRadius: 6, fontFamily: F, fontSize: 14, fontWeight: snap === s ? 700 : 400, cursor: "pointer", border: `1px solid ${snap === s ? "#1B1BFF" : "rgba(0,0,0,0.20)"}`, background: snap === s ? "#EEEEFF" : "#FFFFFF", color: "#0A0A0F" }}
                >
                  {s === "closed" ? "Close sheet" : s === "half" ? "Open half" : "Open full"}
                </button>
              ))}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontFamily: F, fontSize: 14, color: "#5A5A6A", lineHeight: 1.7 }}>
              <li>Drag the handle up or down. It snaps to the nearest point.</li>
              <li>Drag below half to dismiss. Tap the scrim to close.</li>
              <li>Keyboard: focus the handle, then Arrow Up, Arrow Down or Esc.</li>
            </ul>
            <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: "16px 0 0" }}>
              State: <strong style={{ color: "#0A0A0F" }}>{drag !== null ? "dragging" : snap}</strong>
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onKeyDown={onKey}
              style={{ position: "relative", width: 300, height: H, borderRadius: 16, border: "6px solid #0A0A0F", background: "#F4F4F6", overflow: "hidden", boxSizing: "content-box" }}
            >
              <div style={{ padding: 16 }}>
                <p style={{ margin: "0 0 4px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>Active project</p>
                <p style={{ margin: "0 0 16px", fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F" }}>Q3 Brand Refresh</p>
                <button
                  className="jl-bs-btn"
                  onClick={() => setSnap("half")}
                  style={{ width: "100%", padding: "10px 16px", borderRadius: 6, border: "none", background: "#1B1BFF", color: "#FFFFFF", fontFamily: F, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                >
                  View audit tasks
                </button>
              </div>

              <div
                onClick={() => setSnap("closed")}
                style={{ position: "absolute", inset: 0, background: "rgba(10,10,15,0.52)", opacity: Math.min(1, currentH / (H * SNAP.half)), pointerEvents: currentH > 0 ? "auto" : "none", transition: drag === null ? "opacity 280ms ease-in-out" : "none" }}
              />

              <div
                role="dialog"
                aria-label="Audit tasks"
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: currentH, background: "#FFFFFF", borderRadius: "16px 16px 0 0", boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", overflow: "hidden", transition: drag === null ? "height 280ms ease-in-out" : "none" }}
              >
                <div
                  className="jl-bs-handle"
                  tabIndex={snap === "closed" ? -1 : 0}
                  role="slider"
                  aria-label="Resize sheet"
                  aria-valuemin={0}
                  aria-valuemax={2}
                  aria-valuenow={snap === "closed" ? 0 : snap === "half" ? 1 : 2}
                  onPointerDown={onDown}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  style={{ padding: "12px 0 8px", display: "flex", justifyContent: "center", cursor: "grab", touchAction: "none", flexShrink: 0 }}
                >
                  <div style={{ width: 36, height: 4, borderRadius: 9999, background: "#BABAC4" }} />
                </div>
                <p style={{ margin: 0, padding: "0 16px 12px", fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F", flexShrink: 0 }}>Audit tasks</p>
                <div style={{ overflowY: "auto", padding: "0 16px 16px", flex: 1 }}>
                  {tasks.map(([t, d, done]) => (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid rgba(0,0,0,0.10)" }}>
                      <span style={{ fontFamily: F, fontSize: 14, color: done ? "#5A5A6A" : "#0A0A0F", textDecoration: done ? "line-through" : "none" }}>{t}</span>
                      <span style={{ fontFamily: F, fontSize: 12, color: done ? "#00A864" : "#5A5A6A" }}>{done ? "Done" : d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
