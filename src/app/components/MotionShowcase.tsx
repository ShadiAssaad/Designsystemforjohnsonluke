const motionTable = [
  { event: "Button press", duration: "100ms", easing: "ease-out", behavior: "Scale 0.98" },
  { event: "Panel open/close", duration: "280ms", easing: "ease-in-out", behavior: "Slide + fade from edge" },
  { event: "Modal appear", duration: "220ms", easing: "ease-out", behavior: "Scale 0.97 → 1.0, fade in" },
  { event: "Page transition", duration: "300ms", easing: "ease-in-out", behavior: "Fade or directional slide" },
  { event: "Tooltip appear", duration: "140ms", easing: "ease-out", behavior: "Fade in, no movement" },
  { event: "Tab / section change", duration: "180ms", easing: "ease-out", behavior: "Fade content, underline slides" },
];

const rules = [
  "No spring physics.",
  "No bounce.",
  "No loop animations.",
  "No parallax on scroll.",
  "No entrance animations on content already in viewport on load.",
];

export function MotionShowcase() {
  return (
    <section id="motion" className="mb-16">
      <p
        className="mb-3"
        style={{
          fontSize: 12,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#1B1BFF",
        }}
      >
        Motion
      </p>
      <h2
        className="mb-3"
        style={{
          fontSize: 40,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#0A0A0F",
        }}
      >
        Interactions that guide.
      </h2>
      <p
        className="mb-10"
        style={{
          fontSize: 16,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#5A5A6A",
        }}
      >
        Motion exists to orient users — not to entertain them. Transitions communicate
        direction: something arriving, something leaving, an action completing.
      </p>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 100px 120px 1fr",
            background: "#F4F4F6",
            padding: "10px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          {["Event", "Duration", "Easing", "Behavior"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#5A5A6A",
              }}
            >
              {h}
            </span>
          ))}
        </div>
        {motionTable.map((row, i) => (
          <div
            key={row.event}
            className="grid"
            style={{
              gridTemplateColumns: "1fr 100px 120px 1fr",
              padding: "14px 20px",
              background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 700,
                color: "#0A0A0F",
              }}
            >
              {row.event}
            </span>
            <span
              style={{
                fontSize: 14,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#1B1BFF",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {row.duration}
            </span>
            <span
              style={{
                fontSize: 13,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              {row.easing}
            </span>
            <span
              style={{
                fontSize: 13,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              {row.behavior}
            </span>
          </div>
        ))}
      </div>

      {/* Prohibitions */}
      <div
        className="p-5 rounded-[10px]"
        style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <p
          className="mb-4"
          style={{
            fontSize: 12,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#E8334A",
          }}
        >
          Prohibitions
        </p>
        <div className="flex flex-col gap-2">
          {rules.map((r) => (
            <p
              key={r}
              style={{
                fontSize: 14,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.64)",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "#E8334A", marginRight: 8, fontWeight: 700 }}>×</span>
              {r}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
