const spacing = [
  { name: "space-1", px: 4 },
  { name: "space-2", px: 8 },
  { name: "space-3", px: 12 },
  { name: "space-4", px: 16 },
  { name: "space-5", px: 24 },
  { name: "space-6", px: 32 },
  { name: "space-7", px: 48 },
  { name: "space-8", px: 64 },
  { name: "space-9", px: 96 },
];

const radii = [
  { name: "radius-sm", px: 6, use: "Inputs, tags, badges, buttons" },
  { name: "radius-md", px: 10, use: "Cards, panels, containers" },
  { name: "radius-lg", px: 16, use: "Modals, sheet overlays" },
  { name: "radius-pill", px: 9999, use: "Pills — use very sparingly" },
];

const shadows = [
  {
    name: "shadow-xs",
    value: "0 1px 2px rgba(0,0,0,0.05)",
    use: "Subtle lift, hover on flat elements",
  },
  {
    name: "shadow-sm",
    value: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
    use: "Cards at rest — default",
  },
  {
    name: "shadow-md",
    value: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)",
    use: "Cards on hover, dropdowns, popovers",
  },
  {
    name: "shadow-lg",
    value: "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
    use: "Modals, elevated panels",
  },
];

const label: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "'Rethink Sans', sans-serif",
  fontWeight: 400,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#5A5A6A",
};

export function SpacingTokens() {
  return (
    <section id="spacing" className="mb-16">
      <p
        className="mb-3"
        style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B1BFF" }}
      >
        Tokens
      </p>
      <h2
        className="mb-10"
        style={{ fontSize: 40, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.1, color: "#0A0A0F" }}
      >
        Spacing, Radius & Shadow
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Spacing */}
        <div>
          <p className="mb-6" style={label}>Spacing — Base 4px</p>
          <div className="flex flex-col gap-3">
            {spacing.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <div
                  style={{
                    background: "#1B1BFF",
                    height: 18,
                    width: Math.min(s.px * 1.8, 180),
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />
                <div className="flex gap-2 items-baseline">
                  <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A" }}>{s.px}px</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radius */}
        <div>
          <p className="mb-6" style={label}>Border Radius</p>
          <div className="flex flex-col gap-5">
            {radii.map((r) => (
              <div key={r.name} className="flex items-center gap-4">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#EEEEFF",
                    border: "1.5px solid #1B1BFF",
                    borderRadius: Math.min(r.px, 26),
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>{r.name}</p>
                  <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#1B1BFF", marginTop: 1 }}>
                    {r.px >= 9999 ? "9999px" : `${r.px}px`}
                  </p>
                  <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", marginTop: 2 }}>{r.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shadow */}
        <div>
          <p className="mb-6" style={label}>Shadow Scale</p>
          <div className="flex flex-col gap-5">
            {shadows.map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#FFFFFF",
                    borderRadius: 10,
                    boxShadow: s.value,
                    border: "1px solid rgba(0,0,0,0.06)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>{s.name}</p>
                  <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", marginTop: 2, lineHeight: 1.4 }}>{s.use}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-5 px-4 py-3 rounded-[6px]"
            style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
          >
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
              On dark surfaces: replace shadows with <code style={{ fontFamily: "monospace", fontSize: 11 }}>border: 1px solid rgba(255,255,255,0.10)</code> — shadows are invisible on dark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
