import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

type BP = "Desktop" | "Tablet" | "Mobile";

const specs: Record<BP, { cols: number; gutter: number; margin: number; width: number; range: string }> = {
  Desktop: { cols: 12, gutter: 24, margin: 40, width: 1200, range: "1024px and up" },
  Tablet: { cols: 8, gutter: 20, margin: 24, width: 768, range: "640 to 1023px" },
  Mobile: { cols: 4, gutter: 16, margin: 16, width: 375, range: "below 640px" },
};

// Column spans per breakpoint for the example layouts
const layoutA: Record<BP, [number, number]> = { Desktop: [8, 4], Tablet: [5, 3], Mobile: [4, 4] };
const layoutB: Record<BP, number> = { Desktop: 4, Tablet: 4, Mobile: 4 };

const label: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function Overlay({ bp }: { bp: BP }) {
  const s = specs[bp];
  return (
    <div
      aria-hidden
      style={{
        position: "absolute", inset: 0, padding: `0 ${s.margin}px`, display: "grid",
        gridTemplateColumns: `repeat(${s.cols}, 1fr)`, columnGap: s.gutter, pointerEvents: "none",
      }}
    >
      {Array.from({ length: s.cols }).map((_, i) => (
        <div key={i} style={{ background: "rgba(27,27,255,0.08)", borderLeft: "1px solid rgba(27,27,255,0.25)", borderRight: "1px solid rgba(27,27,255,0.25)" }} />
      ))}
    </div>
  );
}

function Block({ span, children, h = 72 }: { span: number; children: React.ReactNode; h?: number }) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`, minHeight: h, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.20)",
        borderRadius: 10, padding: 12, fontFamily: F, fontSize: 14, color: "#0A0A0F",
      }}
    >
      {children}
    </div>
  );
}

function Frame({ bp, children, overlay = false, pad = 0 }: { bp: BP; children?: React.ReactNode; overlay?: boolean; pad?: number }) {
  const s = specs[bp];
  return (
    <div style={{ width: "100%", maxWidth: s.width, margin: "0 auto", position: "relative", background: "#F4F4F6", borderRadius: 10, overflow: "hidden" }}>
      {overlay && <Overlay bp={bp} />}
      <div
        style={{
          position: "relative", display: "grid", gridTemplateColumns: `repeat(${s.cols}, 1fr)`, columnGap: s.gutter,
          rowGap: s.gutter, padding: `${pad}px ${s.margin}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function GridShowcase() {
  const [bp, setBp] = useState<BP>("Desktop");
  const s = specs[bp];
  const [a1, a2] = layoutA[bp];
  const bCount = bp === "Mobile" ? 3 : 3;

  return (
    <section id="grid" className="mb-16">
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B1BFF" }}>Foundations</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Layout Grid</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A" }}>
        A 12, 8 or 4 column grid with fixed gutters and margins, capped at 1200px wide.
      </p>

      <div role="group" aria-label="Breakpoint" className="inline-flex mb-6" style={{ border: "1px solid rgba(0,0,0,0.20)", borderRadius: 6, overflow: "hidden" }}>
        {(Object.keys(specs) as BP[]).map((k) => {
          const active = bp === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => setBp(k)}
              className="outline-none focus-visible:[box-shadow:inset_0_0_0_2px_#1B1BFF]"
              style={{
                padding: "8px 16px", fontSize: 14, fontFamily: F, fontWeight: active ? 700 : 400, cursor: "pointer", border: "none",
                background: active ? "#1B1BFF" : "#FFFFFF", color: active ? "#FFFFFF" : "#0A0A0F",
                transition: "background 180ms ease-out",
              }}
            >
              {k}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          ["Columns", String(s.cols)],
          ["Gutter", `${s.gutter}px`],
          ["Margin", `${s.margin}px`],
          ["Max width", bp === "Desktop" ? "1200px" : `${s.width}px`],
          ["Range", s.range],
        ].map(([k, v]) => (
          <div key={k} style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 16 }}>
            <p style={label}>{k}</p>
            <p className="mt-1" style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{v}</p>
          </div>
        ))}
      </div>

      <p className="mb-3" style={label}>Grid overlay: {s.cols} columns</p>
      <div className="mb-10">
        <Frame bp={bp} overlay>
          <div style={{ gridColumn: `span ${s.cols}`, height: 160 }} />
        </Frame>
        <p className="mt-2" style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A", textAlign: "center" }}>
          Tinted bars are columns; the space between them is the {s.gutter}px gutter; the outer space is the {s.margin}px margin.
        </p>
      </div>

      <p className="mb-3" style={label}>Layout 1: project brief with sidebar</p>
      <div className="mb-10">
        <Frame bp={bp} overlay pad={24}>
          <Block span={a1} h={140}>
            <strong>Brief: Northwind retail strategy</strong>
            <div style={{ color: "#5A5A6A", marginTop: 4 }}>Spans {a1} of {s.cols} columns</div>
          </Block>
          <Block span={a2} h={140}>
            <strong>Phases</strong>
            <div style={{ color: "#5A5A6A", marginTop: 4 }}>Spans {a2} of {s.cols} columns</div>
          </Block>
        </Frame>
      </div>

      <p className="mb-3" style={label}>Layout 2: three client cards</p>
      <Frame bp={bp} overlay pad={24}>
        {["Northwind", "Halden & Co", "Meridian"].slice(0, bCount).map((c) => {
          const span = bp === "Desktop" ? 4 : bp === "Tablet" ? (c === "Meridian" ? 8 : 4) : layoutB[bp];
          return (
            <Block key={c} span={span} h={100}>
              <strong>{c}</strong>
              <div style={{ color: "#5A5A6A", marginTop: 4 }}>Spans {span} of {s.cols} columns</div>
            </Block>
          );
        })}
      </Frame>
    </section>
  );
}
