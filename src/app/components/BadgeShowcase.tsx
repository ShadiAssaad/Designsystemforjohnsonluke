const badgeVariants: {
  name: string;
  bg: string;
  text: string;
  label: string;
}[] = [
  { name: "Default", bg: "#F4F4F6", text: "#5A5A6A", label: "Category" },
  { name: "Blue", bg: "#EEEEFF", text: "#1B1BFF", label: "In progress" },
  { name: "Green", bg: "#EEFAF4", text: "#00A864", label: "Confirmed" },
  { name: "Warning", bg: "#FEF3CD", text: "#D97706", label: "Review needed" },
  { name: "Danger", bg: "#FEE8E8", text: "#DC2626", label: "Critical" },
];

function Badge({ bg, text, children }: { bg: string; text: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        background: bg,
        color: text,
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 12,
        fontFamily: "'Rethink Sans', sans-serif",
        fontWeight: 400,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        display: "inline-flex",
        alignItems: "center",
        height: 24,
      }}
    >
      {children}
    </span>
  );
}

export function BadgeShowcase() {
  return (
    <section id="badges" className="mb-16">
      <h2
        className="mb-10"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Badges & Tags
      </h2>

      <div
        className="p-8 rounded-[10px]"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}
      >
        {/* Variant grid */}
        <div className="mb-8">
          <p
            className="mb-5"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            All variants — 24px height, Label style
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* Headers */}
            {badgeVariants.map((v) => (
              <div
                key={v.name}
                className="flex flex-col items-center gap-3 py-5"
                style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}
              >
                <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {v.name}
                </p>
                <Badge bg={v.bg} text={v.text}>{v.label}</Badge>
                <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#BABAC4", fontFamily: "monospace" }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* In context */}
        <div className="mb-8">
          <p
            className="mb-4"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            In context — content tags
          </p>
          <div className="flex flex-wrap gap-2">
            {["Strategy", "Brand", "B2B", "Research", "Positioning", "Identity", "Communications", "Digital"].map((tag) => (
              <Badge key={tag} bg="#F4F4F6" text="#5A5A6A">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Status row */}
        <div>
          <p
            className="mb-4"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Semantic status usage
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Badge bg="#EEFAF4" text="#00A864">Active</Badge>
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>Project is live</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge bg="#FEF3CD" text="#D97706">Pending</Badge>
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>Awaiting approval</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge bg="#FEE8E8" text="#DC2626">Blocked</Badge>
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>Requires action</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge bg="#EEEEFF" text="#1B1BFF">In review</Badge>
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>Under assessment</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-4 px-5 py-4 rounded-[6px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
          Green text uses <code style={{ fontFamily: "monospace", background: "#EEFAF4", color: "#00A864", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>#00A864</code> — not the neon brand accent. Neon Green (<code style={{ fontFamily: "monospace", fontSize: 12, color: "#5A5A6A" }}>#01FF97</code>) is decorative only — never a text color.
        </p>
      </div>
    </section>
  );
}
