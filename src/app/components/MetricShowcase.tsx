const metrics = [
  { label: "Brand Perception Score", value: "94.2", unit: "/100", delta: "+12.4%", positive: true, period: "vs. last quarter" },
  { label: "Active Client Engagements", value: "38", unit: "", delta: "+6", positive: true, period: "since Jan 2026" },
  { label: "Avg. Realignment Time", value: "74", unit: " days", delta: "−18 days", positive: true, period: "vs. industry avg" },
  { label: "Churn Rate", value: "2.1", unit: "%", delta: "+0.4%", positive: false, period: "vs. last quarter" },
];

function MetricCard({ m, dark }: { m: typeof metrics[0]; dark?: boolean }) {
  return (
    <div
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.10)",
        borderRadius: 10,
        padding: 24,
        boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: dark ? "#8A8A9A" : "#5A5A6A",
          marginBottom: 8,
          lineHeight: 1.4,
          minHeight: 34,
        }}
      >
        {m.label}
      </p>
      <p
        style={{
          fontSize: 40,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 700,
          color: dark ? "#FFFFFF" : "#0A0A0F",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.0,
          letterSpacing: "-1px",
        }}
      >
        {m.value}
        <span style={{ fontSize: 20, fontWeight: 400, color: dark ? "#8A8A9A" : "#5A5A6A" }}>
          {m.unit}
        </span>
      </p>
      <p
        className="mt-2"
        style={{
          fontSize: 14,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          color: m.positive ? "#00A864" : "#DC2626",
          lineHeight: 1.4,
        }}
      >
        {m.positive ? "↑" : "↓"} {m.delta}{" "}
        <span style={{ color: dark ? "#8A8A9A" : "#5A5A6A" }}>{m.period}</span>
      </p>
    </div>
  );
}

export function MetricShowcase() {
  return (
    <section id="metrics" className="mb-16">
      <h2
        className="mb-10"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Data & Metric Display
      </h2>

      {/* Light surface */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => <MetricCard key={m.label} m={m} />)}
      </div>

      {/* Dark surface */}
      <div
        className="rounded-[10px] p-6"
        style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <p
          className="mb-5"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#01FF97" }}
        >
          Dark surface dashboard
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => <MetricCard key={m.label} m={m} dark />)}
        </div>
      </div>

      <div
        className="mt-4 px-5 py-4 rounded-[6px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
          Delta uses ↑ ↓ unicode (plain text, no icon library). Positive: <strong style={{ color: "#00A864" }}>#00A864</strong>. Negative: <strong style={{ color: "#DC2626" }}>#DC2626</strong>. Both remain readable on dark surfaces. Never use donut or pie charts — use bar, line, or number-first layouts.
        </p>
      </div>
    </section>
  );
}
