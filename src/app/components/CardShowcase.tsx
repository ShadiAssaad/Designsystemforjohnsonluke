import { useState } from "react";

export function CardShowcase() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="cards" className="mb-16">
      <h2
        className="mb-2"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Cards
      </h2>
      <p
        className="mb-8"
        style={{ fontSize: 14, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}
      >
        Three variants. Shadow communicates elevation — not decoration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standard Card */}
        <div
          onMouseEnter={() => setHoveredIdx(0)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            background: "#FFFFFF",
            border: `1px solid ${hoveredIdx === 0 ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)"}`,
            borderRadius: 10,
            padding: 24,
            boxShadow: hoveredIdx === 0
              ? "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)"
              : "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
            transition: "box-shadow 180ms ease-out, border 180ms ease-out",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}
          >
            Standard Card
          </p>
          <h3
            style={{ fontSize: 20, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.3, color: "#0A0A0F", marginBottom: 8 }}
          >
            Reframing brand perception at scale
          </h3>
          <p
            style={{ fontSize: 16, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, lineHeight: 1.6, color: "#5A5A6A" }}
          >
            How Johnson Luke helped a B2B firm shift from commodity to premium through deliberate strategic positioning.
          </p>
          <div
            style={{ marginTop: "auto", borderTop: "1px solid rgba(0,0,0,0.10)", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <span style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
              B2B · Strategy
            </span>
            <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#1B1BFF" }}>
              Read case study →
            </span>
          </div>
        </div>

        {/* Dark Card */}
        <div
          style={{
            background: "#0A0A0F",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            padding: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 8 }}
          >
            Dark Card
          </p>
          <h3
            style={{ fontSize: 20, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.3, color: "#FFFFFF", marginBottom: 8 }}
          >
            The Perception Engine
          </h3>
          <p
            style={{ fontSize: 16, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, lineHeight: 1.6, color: "#8A8A9A" }}
          >
            A proprietary diagnostic framework for mapping how audiences experience a brand versus how it intends to be received.
          </p>
          <div
            style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 16 }}
          >
            <button
              style={{ fontFamily: "'Rethink Sans', sans-serif", fontSize: 15, fontWeight: 700, padding: "10px 20px", borderRadius: 6, border: "none", background: "#1B1BFF", color: "#FFFFFF", cursor: "pointer" }}
            >
              Explore the framework
            </button>
          </div>
        </div>

        {/* Blue Card */}
        <div
          style={{
            background: "#1B1BFF",
            borderRadius: 10,
            padding: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}
          >
            Blue Card · CTA
          </p>
          <h3
            style={{ fontSize: 20, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.3, color: "#FFFFFF", marginBottom: 8 }}
          >
            Start a conversation
          </h3>
          <p
            style={{ fontSize: 16, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, lineHeight: 1.6, color: "rgba(255,255,255,0.80)" }}
          >
            We work with leadership teams navigating significant brand transitions and market repositioning.
          </p>
          <div
            style={{ marginTop: "auto", borderTop: "1px solid #ffffff33", paddingTop: 16 }}
          >
            <button
              style={{ fontFamily: "'Rethink Sans', sans-serif", fontSize: 15, fontWeight: 700, padding: "10px 20px", borderRadius: 6, border: "1.5px solid #ffffff80", background: "transparent", color: "#FFFFFF", cursor: "pointer" }}
            >
              Schedule a call
            </button>
          </div>
        </div>
      </div>

      {/* Rules callout */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: "Standard card", rule: "shadow-sm at rest → shadow-md + border-strong on hover. Both signals fire together." },
          { title: "Dark card", rule: "No shadows — invisible on dark. Border replaces shadow for separation. Body text: #8A8A9A. No accent borders." },
          { title: "Blue card", rule: "White text only. Never dark-on-blue, never blue-on-blue. rgba(255,255,255,0.80) for body." },
        ].map((r) => (
          <div
            key={r.title}
            className="px-5 py-4 rounded-[6px]"
            style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
          >
            <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>{r.title}</p>
            <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>{r.rule}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
