const swatches = [
  {
    group: "Brand Palette",
    tokens: [
      { name: "Electric Blue", hex: "#0000FF", role: "Primary. Structure, authority, interaction states.", textOnSwatch: "#FFFFFF" },
      { name: "Neon Green", hex: "#01FF97", role: "Decoration only — never as text. Use #00A864 for green text.", textOnSwatch: "#0A0A0F" },
      { name: "Near Black", hex: "#0A0A0F", role: "Dark mode only. Dark surfaces, overlays, and text on dark backgrounds. Never use as text on light surfaces — use Text Primary instead.", textOnSwatch: "#FFFFFF" },
      { name: "Off White", hex: "#F4F4F6", role: "Subtle surface, secondary fills, sidebar.", textOnSwatch: "#0A0A0F" },
      { name: "White", hex: "#FFFFFF", role: "Primary content surface.", textOnSwatch: "#0A0A0F", bordered: true },
    ],
  },
  {
    group: "Surfaces & Tints",
    tokens: [
      { name: "Surface Blue", hex: "#0000FF", role: "Blue card backgrounds.", textOnSwatch: "#FFFFFF" },
      { name: "Surface Blue Tint", hex: "#EEEEFF", role: "Selection bg, avatar bg, hover fill.", textOnSwatch: "#0000FF" },
      { name: "Surface Ground", hex: "#0A0A0F", role: "Dark cards, hero backgrounds.", textOnSwatch: "#FFFFFF" },
    ],
  },
  {
    group: "Text",
    tokens: [
      { name: "Text Primary", hex: "#0A0A0F", role: "Body and heading text on light surfaces.", textOnSwatch: "#FFFFFF" },
      { name: "Text Secondary", hex: "#5A5A6A", role: "Support, labels, metadata on light.", textOnSwatch: "#FFFFFF" },
      { name: "Text Secondary Dark", hex: "#8A8A9A", role: "Secondary text on dark surfaces only.", textOnSwatch: "#0A0A0F" },
      { name: "Text Disabled", hex: "#BABAC4", role: "Placeholder, inactive states.", textOnSwatch: "#FFFFFF" },
      { name: "Green Text", hex: "#00A864", role: "Green text on light backgrounds only — not Neon Green.", textOnSwatch: "#FFFFFF" },
    ],
  },
  {
    group: "Status",
    tokens: [
      { name: "Success", hex: "#00A864", role: "Positive delta, confirm states, success badges.", textOnSwatch: "#FFFFFF" },
      { name: "Warning", hex: "#D97706", role: "Caution, pending states.", textOnSwatch: "#FFFFFF" },
      { name: "Danger", hex: "#DC2626", role: "Error, destructive action, danger badges.", textOnSwatch: "#FFFFFF" },
      { name: "Info", hex: "#0000FF", role: "Informational. Same as accent-blue.", textOnSwatch: "#FFFFFF" },
    ],
  },
  {
    group: "Data Visualisation",
    tokens: [
      { name: "Chart Blue", hex: "#0000FF", role: "Primary. Default colour for all charts and metrics. Use alone before introducing additional series.", textOnSwatch: "#FFFFFF", primary: true },
      { name: "Chart Pink", hex: "#DC0073", role: "Series 2. Introduced only when a second data series is needed.", textOnSwatch: "#FFFFFF" },
      { name: "Chart Yellow", hex: "#F5B700", role: "Series 3. Introduced only when a third data series is needed.", textOnSwatch: "#0A0A0F" },
      { name: "Chart Purple", hex: "#7340FF", role: "Series 4. Introduced only when a fourth data series is needed.", textOnSwatch: "#FFFFFF" },
    ],
  },
];

const contrastRules = [
  { wrong: "Blue text on black/dark bg", why: "Fails WCAG AA — insufficient contrast" },
  { wrong: "Dark text on Electric Blue", why: "Fails WCAG AA — use white on blue" },
  { wrong: "Neon Green as text", why: "#01FF97 is decoration only — too light for text" },
];

export function ColorTokens() {
  return (
    <section id="color" className="mb-16">
      <p
        className="mb-3"
        style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0000FF" }}
      >
        Color System
      </p>
      <h2
        className="mb-3"
        style={{ fontSize: 40, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.1, color: "#0A0A0F" }}
      >
        Five colors. Use them with intention.
      </h2>
      <p
        className="mb-10"
        style={{ fontSize: 16, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, lineHeight: 1.6, color: "#5A5A6A" }}
      >
        Three primary brand colors plus two neutrals. Every text element must pass WCAG AA.
      </p>

      {swatches.map((group) => (
        <div key={group.group} className="mb-10">
          <p
            className="mb-4"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            {group.group}
          </p>
          <div className="flex flex-wrap gap-4">
            {group.tokens.map((t) => (
              <div
                key={t.name + t.hex}
                style={{
                  width: (t as any).primary ? 280 : 188,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: (t as any).primary ? "2px solid #0000FF" : t.bordered ? "1px solid rgba(0,0,0,0.10)" : "none",
                  boxShadow: (t as any).primary ? "0 4px 12px rgba(27,27,255,0.20)" : "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ background: t.hex, height: (t as any).primary ? 96 : 72, width: "100%", position: "relative" }}>
                  {(t as any).primary && (
                    <span style={{
                      position: "absolute", top: 10, left: 10,
                      fontSize: 10, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      background: "rgba(255,255,255,0.22)", color: "#FFFFFF",
                      padding: "3px 8px", borderRadius: 4,
                    }}>
                      Primary
                    </span>
                  )}
                </div>
                <div className="p-3" style={{ background: "#FFFFFF" }}>
                  <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F", lineHeight: 1.3, marginBottom: 2 }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 400, color: "#0000FF", marginBottom: 4 }}>
                    {t.hex}
                  </p>
                  <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Data vis preview */}
      <div className="mb-10 p-6 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p className="mb-5" style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
          Data visualisation — colour order
        </p>
        <div className="flex flex-col gap-4">
          {[
            { name: "Chart Blue", hex: "#0000FF", value: 84, label: "Revenue target", primary: true },
            { name: "Chart Pink", hex: "#DC0073", value: 78, label: "New clients" },
            { name: "Chart Yellow", hex: "#F5B700", value: 54, label: "Proposals sent" },
            { name: "Chart Purple", hex: "#7340FF", value: 91, label: "Projects active" },
          ].map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: item.primary ? 12 : 10, height: item.primary ? 12 : 10, borderRadius: "50%", background: item.hex, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: item.primary ? 700 : 400, color: item.primary ? "#0A0A0F" : "#5A5A6A", width: 130, flexShrink: 0 }}>
                {item.label}{item.primary ? " — primary" : ""}
              </span>
              <div style={{ flex: 1, height: item.primary ? 12 : 8, background: "#F4F4F6", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ width: `${item.value}%`, height: "100%", background: item.hex, borderRadius: "inherit", transition: "width 600ms ease-out" }} />
              </div>
              <span style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F", width: 32, textAlign: "right", flexShrink: 0 }}>{item.value}%</span>
            </div>
          ))}
        </div>
        <p className="mt-5" style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", lineHeight: 1.5 }}>
          Always use in order: Blue → Pink → Yellow → Purple. Never mix data-vis colours with status colours in the same chart.
        </p>
      </div>

      {/* Contrast rules */}
      <div
        className="p-6 rounded-[10px]"
        style={{ background: "#FEE8E8", border: "1px solid rgba(220,38,38,0.20)" }}
      >
        <p
          className="mb-4"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#DC2626" }}
        >
          Contrast Rules — Non-Negotiable
        </p>
        <div className="flex flex-col gap-3">
          {contrastRules.map((r) => (
            <div key={r.wrong} className="flex items-start gap-3">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", lineHeight: 1.3, flexShrink: 0 }}>×</span>
              <div>
                <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>
                  {r.wrong}
                </span>
                <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A" }}>
                  {" "}— {r.why}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient rule */}
      <div
        className="mt-4 p-5 rounded-[10px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p
          className="mb-3"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          Gradient — Blue to Green only
        </p>
        <div style={{ height: 40, borderRadius: 6, background: "linear-gradient(to right, #0000FF, #01FF97)" }} />
        <p
          className="mt-3"
          style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}
        >
          Permitted only in brand illustrations and hero backgrounds. Never on UI components, buttons, or text.
        </p>
      </div>

      {/* Gradient — Blue depth */}
      <div
        className="mt-4 p-5 rounded-[10px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p
          className="mb-3"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          Gradient — Blue depth
        </p>
        <div style={{ height: 40, borderRadius: 6, background: "linear-gradient(-90deg, #0000FF 0%, #1616A8 33%, #050554 100%)" }} />
        <p
          className="mt-3"
          style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}
        >
          Electric Blue to deep navy. Use for hero backgrounds and large-format brand surfaces. Never on UI components, buttons, or text.
        </p>
      </div>
    </section>
  );
}
