import patternScatter   from "../../imports/pattern.jpg";
import patternAngular   from "../../imports/pattern_0.jpg";
import patternInterlock from "../../imports/pattern_1.jpg";
import patternOutline   from "../../imports/pattern_2.jpg";
import patternAccent    from "../../imports/pattern_3.jpg";
import patternFine      from "../../imports/JL_pattern_4.jpg";

const F = "'Rethink Sans', sans-serif";

const patterns = [
  {
    name: "Motif — Scatter",
    file: "pattern",
    url: patternScatter,
    surface: "light" as const,
    opacity: 0.22,
    position: "center",
    use: "Airy scatter of filled blue and green chevrons. Texture overlay on light hero sections and editorial panels. Opacity 18–25%.",
    tag: "Scatter",
  },
  {
    name: "Motif — Angular Tile",
    file: "pattern_0",
    url: patternAngular,
    surface: "light" as const,
    opacity: 0.18,
    position: "center",
    use: "Dense angular repeating motif. Use as a section background tile or full-bleed texture. Opacity 14–20%.",
    tag: "Tile",
  },
  {
    name: "Motif — Interlock",
    file: "pattern_1",
    url: patternInterlock,
    surface: "light" as const,
    opacity: 0.15,
    position: "center",
    use: "Tight interlocking S-curve grid. High-density background fill for headers and aside panels. Opacity 10–16%.",
    tag: "Interlock",
  },
  {
    name: "Motif — Outline Hero",
    file: "pattern_2",
    url: patternOutline,
    surface: "light" as const,
    opacity: 0.55,
    position: "center",
    use: "Large-scale outline-only mark. Hero sections, covers, and full-page statement layouts. Opacity 40–60%.",
    tag: "Hero",
  },
  {
    name: "Motif — Section Accent",
    file: "pattern_3",
    url: patternAccent,
    surface: "light" as const,
    opacity: 1,
    position: "top right",
    use: "Large solid green chevron anchored top-right with ghost outline bottom-left. Section dividers and editorial breaks.",
    tag: "Accent",
  },
  {
    name: "Motif — Fine Grid",
    file: "JL_pattern_4",
    url: patternFine,
    surface: "light" as const,
    opacity: 0.20,
    position: "center",
    use: "Fine isometric chevron grid, green-dominant with outline offset. Dense all-over texture for card and sidebar surfaces. Opacity 14–22%.",
    tag: "Grid",
  },
];

const tagColor: Record<string, { bg: string; text: string }> = {
  Scatter:   { bg: "#EEEEFF", text: "#1B1BFF" },
  Tile:      { bg: "#EEFAF4", text: "#00A864" },
  Interlock: { bg: "#EEEEFF", text: "#1B1BFF" },
  Hero:      { bg: "#0A0A0F", text: "#01FF97" },
  Accent:    { bg: "#D1FAE5", text: "#065F46" },
  Grid:      { bg: "#EEFAF4", text: "#00A864" },
};

export function PatternShowcase() {
  return (
    <section id="patterns" className="mb-16">
      <p
        className="mb-3"
        style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B1BFF" }}
      >
        Brand Assets
      </p>
      <h2
        className="mb-3"
        style={{ fontSize: 40, fontFamily: F, fontWeight: 700, lineHeight: 1.1, color: "#0A0A0F" }}
      >
        Pattern Variations
      </h2>
      <p
        className="mb-10"
        style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A", lineHeight: 1.6, maxWidth: 560 }}
      >
        Six motif layers built from the brand chevron mark. Each is designed for a
        specific surface and opacity range — never interchangeable. The motif
        is structural, not decorative.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patterns.map((p) => {
          const tc = tagColor[p.tag];
          const showOpacityAsPercent = p.opacity < 1;

          return (
            <div
              key={p.file}
              style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(0,0,0,0.10)" }}
            >
              {/* Preview swatch */}
              <div
                style={{
                  height: 200,
                  position: "relative",
                  background: "#F4F4F6",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.url}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: p.position,
                    opacity: p.opacity,
                  }}
                />
                {/* Tag */}
                <div
                  style={{
                    position: "absolute", top: 14, left: 16,
                    background: tc.bg, color: tc.text,
                    fontSize: 11, fontFamily: F, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: 4,
                  }}
                >
                  {p.tag}
                </div>
                {/* Opacity badge */}
                <div
                  style={{
                    position: "absolute", top: 14, right: 16,
                    background: "rgba(0,0,0,0.06)", color: "#5A5A6A",
                    fontSize: 11, fontFamily: F, fontWeight: 400,
                    padding: "4px 10px", borderRadius: 4,
                  }}
                >
                  {showOpacityAsPercent ? `${Math.round(p.opacity * 100)}% opacity` : "Full opacity"}
                </div>
              </div>

              {/* Meta */}
              <div style={{ padding: "18px 20px", background: "#FFFFFF" }}>
                <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 4, lineHeight: 1.3 }}>
                  {p.name}
                </p>
                <p style={{ fontSize: 13, fontFamily: F, fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
                  {p.use}
                </p>
                <div
                  style={{
                    marginTop: 12, paddingTop: 12,
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#F4F4F6", border: "1.5px solid rgba(0,0,0,0.20)",
                      display: "inline-block", flexShrink: 0,
                    }}
                  />
                  <code style={{ fontSize: 11, fontFamily: "monospace", color: "#8A8A9A" }}>
                    {p.file}.jpg · light surface
                  </code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage rules */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            title: "Opacity contract",
            body: "Never exceed 60% on light surfaces. The motif supports content — it must not compete with it.",
          },
          {
            title: "Surface pairing",
            body: "All six patterns are designed for light surfaces. On dark backgrounds, reduce opacity further or invert selectively.",
          },
          {
            title: "No tinting",
            body: "Never recolor the motifs. The blue, green, and outline palette is fixed. CSS filters and blend modes are prohibited.",
          },
        ].map((r) => (
          <div
            key={r.title}
            className="px-5 py-4 rounded-[6px]"
            style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
          >
            <p style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>
              {r.title}
            </p>
            <p style={{ fontSize: 12, fontFamily: F, fontWeight: 400, color: "#5A5A6A", lineHeight: 1.6 }}>
              {r.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
