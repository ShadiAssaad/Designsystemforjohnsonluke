import { useState } from "react";
import { Copy, Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";

const details: { k: string; v: string; copy?: boolean }[] = [
  { k: "Client", v: "Meridian Bank" },
  { k: "Engagement lead", v: "Priya Nair" },
  { k: "Project reference", v: "JL-2026-0142", copy: true },
  { k: "Phase", v: "Brand platform (2 of 4)" },
  { k: "Start date", v: "14 January 2026" },
  { k: "Billing contact", v: "" },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  const [f, setF] = useState(false);
  const go = async () => {
    try { await navigator.clipboard.writeText(value); } catch { /* clipboard unavailable: still show feedback */ }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" onClick={go} aria-label={`Copy ${label}`} onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: F, fontSize: 12, padding: "2px 8px", borderRadius: 6, cursor: "pointer",
        border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", color: done ? "#00A864" : "#0A0A0F", outline: f ? "2px solid #1B1BFF" : "none", outlineOffset: 2 }}>
      {done ? <Check size={12} /> : <Copy size={12} />}
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

function Value({ d }: { d: (typeof details)[0] }) {
  if (!d.v) return <span style={{ color: "#5A5A6A" }} aria-label="No value">—</span>;
  return (
    <span className="inline-flex items-center gap-2" style={{ color: "#0A0A0F" }}>
      {d.v}{d.copy && <CopyButton value={d.v} label={d.k} />}
    </span>
  );
}

const panel = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24 } as const;
const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>{children}</p>
);
const dtStyle = { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", fontWeight: 400 } as const;

export function DescriptionListShowcase() {
  return (
    <section id="descriptionlist" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Content</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Description list</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Key and value pairs for project details, in horizontal and stacked layouts.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ fontFamily: F }}>
        <div style={panel}>
          <Label>Horizontal</Label>
          <dl style={{ margin: 0 }}>
            {details.map((d, i) => (
              <div key={d.k} className="flex items-center gap-4" style={{ padding: "12px 0", borderTop: i ? "1px solid rgba(0,0,0,0.10)" : "none" }}>
                <dt style={{ ...dtStyle, width: 140, flexShrink: 0 }}>{d.k}</dt>
                <dd style={{ margin: 0, fontSize: 14 }}><Value d={d} /></dd>
              </div>
            ))}
          </dl>
        </div>

        <div style={panel}>
          <Label>Stacked</Label>
          <dl className="grid grid-cols-2 gap-6" style={{ margin: 0 }}>
            {details.map((d) => (
              <div key={d.k}>
                <dt style={{ ...dtStyle, marginBottom: 4 }}>{d.k}</dt>
                <dd style={{ margin: 0, fontSize: 16 }}><Value d={d} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
