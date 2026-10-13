const F = "'Rethink Sans', sans-serif";

const levels = [
  { token: "shadow-xs", value: "0 1px 2px rgba(0,0,0,0.05)", rule: "Subtle lift. Hover on flat elements such as list rows and tags.", example: "Brief row" },
  { token: "shadow-sm", value: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)", rule: "Cards at rest. The default elevation for project and client cards.", example: "Project card" },
  { token: "shadow-md", value: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)", rule: "Cards on hover, dropdowns, popovers and tooltips.", example: "Phase menu" },
  { token: "shadow-lg", value: "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)", rule: "Modals and elevated panels. One per screen at most.", example: "Client modal" },
];

export function ElevationShowcase() {
  return (
    <section id="elevation" className="mb-16">
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B1BFF" }}>Foundations</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Elevation</h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A" }}>
        Four shadow levels signal how far a surface sits above the page; dark surfaces use a border instead.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {levels.map((l) => (
          <div key={l.token}>
            <div
              className="flex items-center justify-center mb-4"
              style={{ background: "#F4F4F6", borderRadius: 10, height: 160, padding: 24 }}
            >
              <div
                className="flex items-center justify-center"
                style={{ width: "100%", height: "100%", background: "#FFFFFF", borderRadius: 10, boxShadow: l.value, fontSize: 14, fontFamily: F, color: "#5A5A6A" }}
              >
                {l.example}
              </div>
            </div>
            <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{l.token}</p>
            <p className="mt-1" style={{ fontSize: 12, fontFamily: "monospace", color: "#1B1BFF", lineHeight: 1.5, wordBreak: "break-word" }}>{l.value}</p>
            <p className="mt-2" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>{l.rule}</p>
          </div>
        ))}
      </div>

      <p className="mb-4" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>Dark surfaces</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={{ background: "#0A0A0F", borderRadius: 10, padding: 32 }}>
          <div
            style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: 24 }}
          >
            <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>Phase 2 review</p>
            <p className="mt-1" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#8A8A9A" }}>Strategy workshop outputs, ready for sign-off.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>border-inverse-elevation</p>
          <p style={{ fontSize: 12, fontFamily: "monospace", color: "#1B1BFF" }}>border: 1px solid rgba(255,255,255,0.10)</p>
          <p style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
            Shadows are invisible on near black. Replace every shadow level with this 1px border on dark surfaces.
          </p>
        </div>
      </div>
    </section>
  );
}
