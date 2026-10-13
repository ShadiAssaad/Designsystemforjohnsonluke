import { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";

const F = "'Rethink Sans', sans-serif";
const SEQ = ["#1B1BFF", "#0A0A0F", "#00A864", "#8A8A9A", "#BABAC4"];
const GRID = "rgba(0,0,0,0.10)";
const AX = { fontSize: 12, fontFamily: F, fill: "#5A5A6A" };

const trend = [
  { m: "Jan", discovery: 14, strategy: 9, delivery: 5 },
  { m: "Feb", discovery: 18, strategy: 12, delivery: 8 },
  { m: "Mar", discovery: 16, strategy: 17, delivery: 11 },
  { m: "Apr", discovery: 22, strategy: 19, delivery: 15 },
  { m: "May", discovery: 21, strategy: 24, delivery: 19 },
  { m: "Jun", discovery: 26, strategy: 27, delivery: 24 },
];
const revenue = [
  { name: "Brand Strategy", v: 420 },
  { name: "Product Design", v: 610 },
  { name: "Research", v: 280 },
  { name: "Workshops", v: 190 },
  { name: "Retainers", v: 350 },
];
const mix = [
  { name: "Brand", value: 38 },
  { name: "Digital", value: 27 },
  { name: "Research", value: 18 },
  { name: "Advisory", value: 11 },
  { name: "Other", value: 6 },
];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, padding: "8px 12px", boxShadow: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)", fontFamily: F }}>
      {label !== undefined && <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 4 }}>{label}</p>}
      {payload.map((p: any) => (
        <p key={p.name} style={{ fontSize: 14, color: "#0A0A0F", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color || p.payload?.fill, display: "inline-block" }} />
          {p.name}: <strong style={{ fontWeight: 700 }}>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

const legendFmt = (v: string) => <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{v}</span>;

function Panel({ title, note, children, state }: { title: string; note: string; children: React.ReactNode; state?: string }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 4 }}>{state || "Default"}</p>
      <h3 style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", marginBottom: 16 }}>{note}</p>
      <div style={{ height: 260 }}>{children}</div>
    </div>
  );
}

export function ChartShowcase() {
  const [hi, setHi] = useState<number | null>(null);
  const [mode, setMode] = useState<"data" | "loading" | "empty">("data");

  return (
    <section id="charts" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Data visualisation</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Charts</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Line, bar, stacked bar and donut charts for engagement and revenue reporting, with a fixed five-colour sequence.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Panel title="Active projects by phase" note="Line, 6 months. Hover for tooltip.">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="m" tick={AX} axisLine={{ stroke: GRID }} tickLine={false} />
              <YAxis tick={AX} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: GRID }} />
              <Legend formatter={legendFmt} iconType="square" iconSize={8} />
              <Line type="monotone" dataKey="discovery" name="Discovery" stroke={SEQ[0]} strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="strategy" name="Strategy" stroke={SEQ[1]} strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="delivery" name="Delivery" stroke={SEQ[2]} strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Revenue by service (£k)" note="Vertical bar. Click a bar to highlight with Neon Green fill.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenue} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="name" tick={AX} axisLine={{ stroke: GRID }} tickLine={false} interval={0} />
              <YAxis tick={AX} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="v" name="Revenue" fill={SEQ[0]} radius={[6, 6, 0, 0]} isAnimationActive={false} onClick={(_: any, i: number) => setHi(hi === i ? null : i)} style={{ cursor: "pointer" }}>
                {revenue.map((_, i) => <Cell key={i} fill={hi === i ? "#01FF97" : SEQ[0]} stroke={hi === i ? "#0A0A0F" : "none"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Hours by team" note="Horizontal bar.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenue} layout="vertical" margin={{ top: 8, right: 16, left: 24, bottom: 0 }}>
              <CartesianGrid stroke={GRID} horizontal={false} />
              <XAxis type="number" tick={AX} axisLine={{ stroke: GRID }} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={AX} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="v" name="Hours" fill={SEQ[1]} radius={[0, 6, 6, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Delivery by phase and quarter" note="Stacked bar with legend.">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis dataKey="m" tick={AX} axisLine={{ stroke: GRID }} tickLine={false} />
              <YAxis tick={AX} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Legend formatter={legendFmt} iconType="square" iconSize={8} />
              <Bar dataKey="discovery" name="Discovery" stackId="a" fill={SEQ[0]} isAnimationActive={false} />
              <Bar dataKey="strategy" name="Strategy" stackId="a" fill={SEQ[1]} isAnimationActive={false} />
              <Bar dataKey="delivery" name="Delivery" stackId="a" fill={SEQ[2]} radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Engagement mix (%)" note="Donut with legend; centre label is the total.">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, height: "100%", fontFamily: F }}>
            <div style={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}>
              <PieChart width={200} height={200}>
                <Tooltip content={<ChartTooltip />} />
                <Pie data={mix} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={62} outerRadius={95} paddingAngle={2} stroke="#FFFFFF" strokeWidth={2} isAnimationActive={false}>
                  {mix.map((_, i) => <Cell key={i} fill={SEQ[i]} />)}
                </Pie>
              </PieChart>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none" }}>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#0A0A0F", lineHeight: 1 }}>38</p>
                <p style={{ fontSize: 12, color: "#5A5A6A", marginTop: 2 }}>engagements</p>
              </div>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {mix.map((m, i) => (
                <li key={m.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#5A5A6A" }}>
                  <span style={{ width: 8, height: 8, background: SEQ[i], flexShrink: 0 }} />
                  {m.name}
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="Colour sequence" note="Order of use. Neon Green is a highlight fill only.">
          <div className="flex flex-col gap-3" style={{ fontFamily: F }}>
            {[...SEQ, "#01FF97"].map((c, i) => (
              <div key={c} className="flex items-center gap-3">
                <span style={{ width: 40, height: 24, borderRadius: 6, background: c, border: "1px solid rgba(0,0,0,0.10)" }} />
                <span style={{ fontSize: 14, color: "#0A0A0F" }}>{i < 5 ? `Series ${i + 1}` : "Highlight fill"} <span style={{ color: "#5A5A6A" }}>{c}</span></span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24 }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>Loading and empty states</p>
          <div className="flex gap-2">
            {(["data", "loading", "empty"] as const).map((k) => (
              <button key={k} onClick={() => setMode(k)} aria-pressed={mode === k}
                style={{ fontFamily: F, fontSize: 14, padding: "6px 12px", borderRadius: 6, cursor: "pointer", textTransform: "capitalize", border: mode === k ? "1px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)", background: mode === k ? "#EEEEFF" : "#FFFFFF", color: "#0A0A0F" }}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: 220 }}>
          {mode === "data" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="name" tick={AX} axisLine={{ stroke: GRID }} tickLine={false} interval={0} />
                <YAxis tick={AX} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="v" name="Revenue" fill={SEQ[0]} radius={[6, 6, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {mode === "loading" && (
            <div role="status" aria-label="Loading chart" className="flex items-end gap-4 h-full px-6" style={{ borderBottom: `1px solid ${GRID}` }}>
              {[60, 120, 90, 160, 110].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h, background: "#F4F4F6", borderRadius: "6px 6px 0 0" }} />
              ))}
            </div>
          )}
          {mode === "empty" && (
            <div className="flex flex-col items-center justify-center h-full text-center" style={{ border: "1px dashed rgba(0,0,0,0.20)", borderRadius: 10, fontFamily: F }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#0A0A0F" }}>No engagement data yet</p>
              <p style={{ fontSize: 14, color: "#5A5A6A", marginTop: 4 }}>Data appears here once the first project phase is logged.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
