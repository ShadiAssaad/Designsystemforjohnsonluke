import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

function UnderlineTabs() {
  const [active, setActive] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "deliverables", label: "Deliverables" },
    { id: "team", label: "Team" },
    { id: "timeline", label: "Timeline" },
  ];

  const content: Record<string, React.ReactNode> = {
    overview: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.6 }}>
          A full-system brand refresh for Johnson Luke Ltd., covering identity, digital presence, and environmental applications across all touchpoints.
        </p>
        {[
          ["Client", "Johnson Luke Ltd."],
          ["Phase", "Discovery & Audit"],
          ["Confidence", "High"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 12 }}>
            <span style={{ fontSize: 13, fontFamily: F, color: "#BABAC4", minWidth: 90 }}>{k}</span>
            <span style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F" }}>{v}</span>
          </div>
        ))}
      </div>
    ),
    deliverables: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { label: "Brand audit report", done: true },
          { label: "Competitor landscape map", done: true },
          { label: "Identity system v1", done: false },
          { label: "Brand guidelines PDF", done: false },
          { label: "Digital asset library", done: false },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.done ? "#1B1BFF" : "transparent",
              border: `1.5px solid ${item.done ? "#1B1BFF" : "rgba(0,0,0,0.20)"}`,
            }}>
              {item.done && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span style={{ fontSize: 13, fontFamily: F, color: item.done ? "#5A5A6A" : "#0A0A0F", textDecoration: item.done ? "line-through" : "none" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    ),
    team: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { name: "Anya Belk", role: "Brand Strategist", initials: "AB" },
          { name: "Marcus Reid", role: "Creative Director", initials: "MR" },
          { name: "Sian Torres", role: "Design Lead", initials: "ST" },
          { name: "Oliver Ng", role: "Client Lead", initials: "ON" },
        ].map((p) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#1B1BFF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: 11, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>{p.initials}</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{p.name}</p>
              <p style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A" }}>{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    timeline: (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {[
          { week: "Wk 1–2", label: "Discovery & audit", done: true },
          { week: "Wk 3–4", label: "Competitor benchmarking", done: true },
          { week: "Wk 5–6", label: "Identity exploration", done: false },
          { week: "Wk 7", label: "Refinement & sign-off", done: false },
          { week: "Wk 8", label: "Delivery & handoff", done: false },
        ].map((item, i, arr) => (
          <div key={item.week} style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 4,
                background: item.done ? "#1B1BFF" : "rgba(0,0,0,0.12)",
              }} />
              {i < arr.length - 1 && (
                <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.08)", marginTop: 4, marginBottom: 4, minHeight: 20 }} />
              )}
            </div>
            <div style={{ paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
              <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", display: "block" }}>{item.week}</span>
              <span style={{ fontSize: 13, fontFamily: F, color: item.done ? "#5A5A6A" : "#0A0A0F" }}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "10px 16px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active === tab.id ? "#1B1BFF" : "transparent"}`,
              marginBottom: -1,
              fontFamily: F,
              fontSize: 13,
              fontWeight: active === tab.id ? 700 : 400,
              color: active === tab.id ? "#1B1BFF" : "#5A5A6A",
              cursor: "pointer",
              outline: "none",
              transition: "color 150ms ease-out, border-color 150ms ease-out",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ paddingTop: 20 }}>
        {content[active]}
      </div>
    </div>
  );
}

function PillTabs() {
  const [active, setActive] = useState("month");
  const tabs = [
    { id: "week", label: "This week" },
    { id: "month", label: "This month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  const data: Record<string, { label: string; value: string; delta: string; up: boolean }[]> = {
    week: [
      { label: "Active projects", value: "8", delta: "+1 vs last week", up: true },
      { label: "Deliverables due", value: "3", delta: "−2 completed", up: false },
      { label: "Revenue logged", value: "£12.4k", delta: "+18% vs last week", up: true },
    ],
    month: [
      { label: "Active projects", value: "14", delta: "+3 vs last month", up: true },
      { label: "Deliverables due", value: "11", delta: "−5 completed", up: false },
      { label: "Revenue logged", value: "£48.2k", delta: "+6% vs last month", up: true },
    ],
    quarter: [
      { label: "Active projects", value: "22", delta: "+7 vs last quarter", up: true },
      { label: "Deliverables due", value: "34", delta: "−12 completed", up: false },
      { label: "Revenue logged", value: "£142k", delta: "+22% vs last quarter", up: true },
    ],
    year: [
      { label: "Active projects", value: "61", delta: "+14 vs last year", up: true },
      { label: "Deliverables due", value: "98", delta: "−37 completed", up: false },
      { label: "Revenue logged", value: "£540k", delta: "+31% vs last year", up: true },
    ],
  };

  return (
    <div>
      <div style={{
        display: "inline-flex",
        background: "#F4F4F6",
        borderRadius: 8,
        padding: 4,
        gap: 2,
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 5,
              border: "none",
              fontFamily: F,
              fontSize: 13,
              fontWeight: active === tab.id ? 700 : 400,
              color: active === tab.id ? "#0A0A0F" : "#5A5A6A",
              background: active === tab.id ? "#FFFFFF" : "transparent",
              boxShadow: active === tab.id ? "0 1px 3px rgba(0,0,0,0.10)" : "none",
              cursor: "pointer",
              outline: "none",
              transition: "background 150ms ease-out, box-shadow 150ms ease-out",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {data[active].map((row) => (
          <div key={row.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 16px", borderRadius: 8, background: "#F4F4F6",
          }}>
            <span style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A" }}>{row.label}</span>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 18, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{row.value}</p>
              <p style={{ fontSize: 11, fontFamily: F, color: row.up ? "#059669" : "#E8334A" }}>{row.delta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <section id="tabs" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Tabs
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Two variants: underline tabs for primary navigation within a view, pill tabs for compact scope switching.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Underline tabs
          </p>
          <UnderlineTabs />
        </div>

        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Pill tabs
          </p>
          <PillTabs />
        </div>
      </div>

      <div className="px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Underline tabs are for primary content navigation — never nested inside cards. Pill tabs switch scope or filter context within an already-defined view. Never use both on the same screen level.
        </p>
      </div>
    </section>
  );
}
