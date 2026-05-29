const typeScaleItems = [
  {
    name: "Display",
    spec: "72px / Bold / leading 1.0",
    sample: "Strategy meets precision.",
    style: {
      fontSize: 72,
      fontWeight: 700,
      lineHeight: 1.0,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Heading LG",
    spec: "40px / Bold / leading 1.1",
    sample: "Brand Relationship Design",
    style: {
      fontSize: 40,
      fontWeight: 700,
      lineHeight: 1.1,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Heading MD",
    spec: "28px / Bold / leading 1.2",
    sample: "Perception Engine Framework",
    style: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Heading SM",
    spec: "20px / Bold / leading 1.3",
    sample: "Receptor Visualisation",
    style: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.3,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Body LG",
    spec: "18px / Regular / leading 1.6",
    sample: "Operating at the intersection of strategy and design intelligence, producing outcomes that are intelligent, precise, and original.",
    style: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Body",
    spec: "16px / Regular / leading 1.6",
    sample: "The tone is never casual, never corporate-soft. Think: a senior strategist who happens to have taste.",
    style: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Body SM",
    spec: "14px / Regular / leading 1.5",
    sample: "Hierarchy must be readable in 2 seconds. Users should never need to hunt for the action.",
    style: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#5A5A6A",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Label",
    spec: "12px / Regular / tracking +10 / UPPERCASE",
    sample: "SECTION MARKER · CATEGORY TAG · EYEBROW LABEL",
    style: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      color: "#5A5A6A",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
  {
    name: "Metric",
    spec: "40px / Bold / tabular-nums",
    sample: "94,210",
    style: {
      fontSize: 40,
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums" as const,
      color: "#0A0A0F",
      fontFamily: "'Rethink Sans', sans-serif",
    },
  },
];

export function TypographyScale() {
  return (
    <section id="typography" className="mb-16">
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
        Typography
      </p>
      <h2
        className="mb-2"
        style={{
          fontSize: 40,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#0A0A0F",
        }}
      >
        Rethink Sans. One typeface.
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
        No serifs. No system font fallbacks. Load from Google Fonts.
      </p>

      <div
        className="divide-y"
        style={{ borderColor: "rgba(0,0,0,0.10)", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}
      >
        {typeScaleItems.map((item, i) => (
          <div
            key={item.name}
            className="flex items-start gap-8 px-6 py-6"
            style={{ background: i % 2 === 0 ? "#FFFFFF" : "#F4F4F6" }}
          >
            <div style={{ minWidth: 140 }}>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 700,
                  color: "#0A0A0F",
                  marginBottom: 2,
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 400,
                  color: "#5A5A6A",
                  lineHeight: 1.4,
                }}
              >
                {item.spec}
              </p>
            </div>
            <p style={item.style} className="flex-1 min-w-0 overflow-hidden">
              {item.sample}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
