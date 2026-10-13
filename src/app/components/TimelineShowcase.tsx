import { Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";

const milestones = [
  { date: "14 Jan 2026", title: "Kick-off and stakeholder interviews", desc: "Twelve interviews across Meridian leadership and front-line teams.", state: "complete" },
  { date: "28 Feb 2026", title: "Discovery readout", desc: "Findings, opportunity map and brand audit presented to the steering group.", state: "complete" },
  { date: "18 Apr 2026", title: "Brand platform workshop", desc: "Positioning, purpose and tone of voice agreed with the executive team.", state: "current" },
  { date: "30 May 2026", title: "Identity system delivery", desc: "Logo suite, typography and colour guidelines handed to Meridian.", state: "upcoming" },
  { date: "26 Jun 2026", title: "Launch and handover", desc: "Rollout plan, training sessions and final project review.", state: "upcoming" },
] as const;

const feed = [
  { who: "Priya Nair", ini: "PN", action: "approved", target: "Discovery readout deck", time: "12 minutes ago" },
  { who: "Tomás Reyes", ini: "TR", action: "uploaded 3 files to", target: "Identity exploration", time: "2 hours ago" },
  { who: "Hannah Okafor", ini: "HO", action: "commented on", target: "Interview synthesis", time: "Yesterday" },
  { who: "Sam Whitfield", ini: "SW", action: "moved to Review", target: "Tone of voice guide", time: "3 days ago" },
  { who: "Priya Nair", ini: "PN", action: "created", target: "Brand platform workshop", time: "Last week" },
];

function Header() {
  return (
    <>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Progress</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Timeline</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>A vertical project timeline with milestone states and an activity feed with relative times.</p>
    </>
  );
}
const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>{children}</p>
);
const panel = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24 } as const;

export function TimelineShowcase() {
  return (
    <section id="timeline" className="mb-16">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <Label>Project milestones</Label>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {milestones.map((m, i) => {
              const last = i === milestones.length - 1;
              const done = m.state === "complete";
              const cur = m.state === "current";
              return (
                <li key={m.title} style={{ display: "flex", gap: 16, fontFamily: F }} aria-current={cur ? "step" : undefined}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 9999, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
                      background: done ? "#1B1BFF" : cur ? "#FFFFFF" : "#F4F4F6",
                      border: done ? "2px solid #1B1BFF" : cur ? "2px solid #1B1BFF" : "2px solid rgba(0,0,0,0.20)",
                    }}>
                      {done && <Check size={14} color="#FFFFFF" />}
                      {cur && <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#1B1BFF" }} />}
                    </span>
                    {!last && <span style={{ width: 2, flex: 1, minHeight: 24, background: done ? "#1B1BFF" : "rgba(0,0,0,0.10)" }} />}
                  </div>
                  <div style={{ paddingBottom: last ? 0 : 24 }}>
                    <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>
                      {m.date} · {m.state}
                    </p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: m.state === "upcoming" ? "#5A5A6A" : "#0A0A0F", marginTop: 2 }}>{m.title}</p>
                    <p style={{ fontSize: 14, color: "#5A5A6A", lineHeight: 1.5, marginTop: 2 }}>{m.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div style={panel}>
          <Label>Activity feed</Label>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {feed.map((a, i) => (
              <li key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < feed.length - 1 ? "1px solid rgba(0,0,0,0.10)" : "none", fontFamily: F }}>
                <span style={{ width: 32, height: 32, borderRadius: 9999, background: "#0A0A0F", color: "#FFFFFF", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{a.ini}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: "#5A5A6A", lineHeight: 1.5 }}>
                    <strong style={{ color: "#0A0A0F", fontWeight: 700 }}>{a.who}</strong> {a.action}{" "}
                    <strong style={{ color: "#0A0A0F", fontWeight: 700 }}>{a.target}</strong>
                  </p>
                  <p style={{ fontSize: 12, color: "#5A5A6A", marginTop: 2 }}>{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
