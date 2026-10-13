import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const TYPES = {
  workshop: { label: "Workshop", bg: "#1B1BFF", fg: "#FFFFFF" },
  delivery: { label: "Delivery", bg: "#0A0A0F", fg: "#FFFFFF" },
  review: { label: "Review", bg: "#FEF3CD", fg: "#0A0A0F" },
  holiday: { label: "Out of office", bg: "#F4F4F6", fg: "#0A0A0F" },
} as const;
type T = keyof typeof TYPES;
type Ev = { id: number; title: string; start: string; end: string; type: T };

const events: Ev[] = [
  { id: 1, title: "Meridian brand workshop", start: "2026-10-05", end: "2026-10-07", type: "workshop" },
  { id: 2, title: "Atlas blueprint delivery", start: "2026-10-13", end: "2026-10-13", type: "delivery" },
  { id: 3, title: "Kestrel steering review", start: "2026-10-13", end: "2026-10-13", type: "review" },
  { id: 4, title: "Northwind interviews", start: "2026-10-13", end: "2026-10-15", type: "workshop" },
  { id: 5, title: "Orchard packaging review", start: "2026-10-13", end: "2026-10-13", type: "review" },
  { id: 6, title: "Studio closed", start: "2026-10-26", end: "2026-10-27", type: "holiday" },
  { id: 7, title: "Identity system delivery", start: "2026-10-20", end: "2026-10-22", type: "delivery" },
];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const on = (e: Ev, k: string) => e.start <= k && e.end >= k;

export function CalendarShowcase() {
  const today = iso(new Date());
  const [cursor, setCursor] = useState(new Date(2026, 9, 1));
  const [selected, setSelected] = useState("2026-10-13");
  const [view, setView] = useState<"month" | "week">("month");

  const y = cursor.getFullYear(), m = cursor.getMonth();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - offset + i));
  const shift = (n: number) => setCursor(new Date(y, m + n, 1));

  const selDate = new Date(selected + "T00:00:00");
  const weekStart = new Date(selDate); weekStart.setDate(selDate.getDate() - ((selDate.getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d; });

  const btn = { fontFamily: F, fontSize: 14, padding: "6px 12px", borderRadius: 6, cursor: "pointer", color: "#0A0A0F" } as const;

  return (
    <section id="calendar" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Scheduling</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Calendar</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Month grid and week list for workshops, deliveries and reviews, with working navigation.</p>

      <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, fontFamily: F }}>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button aria-label="Previous month" onClick={() => shift(-1)} style={{ ...btn, padding: 6, border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", display: "inline-flex" }}><ChevronLeft size={18} /></button>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0A0A0F", minWidth: 160, textAlign: "center" }} aria-live="polite">{MONTHS[m]} {y}</h3>
            <button aria-label="Next month" onClick={() => shift(1)} style={{ ...btn, padding: 6, border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", display: "inline-flex" }}><ChevronRight size={18} /></button>
            <button onClick={() => { setCursor(new Date()); setSelected(today); }} style={{ ...btn, border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF" }}>Today</button>
          </div>
          <div className="flex gap-2">
            {(["month", "week"] as const).map((v) => (
              <button key={v} aria-pressed={view === v} onClick={() => setView(v)}
                style={{ ...btn, textTransform: "capitalize", border: view === v ? "1px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)", background: view === v ? "#EEEEFF" : "#FFFFFF" }}>{v}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {(Object.keys(TYPES) as T[]).map((t) => (
            <span key={t} className="flex items-center gap-2" style={{ fontSize: 12, color: "#5A5A6A" }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: TYPES[t].bg, border: "1px solid rgba(0,0,0,0.20)" }} />{TYPES[t].label}
            </span>
          ))}
        </div>

        {view === "month" ? (
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
            <div className="grid grid-cols-7" style={{ background: "#F4F4F6" }}>
              {DAYS.map((d) => <div key={d} style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", padding: "8px 8px" }}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((d, i) => {
                const k = iso(d);
                const evs = events.filter((e) => on(e, k));
                const isToday = k === today, isSel = k === selected, other = d.getMonth() !== m;
                return (
                  <div key={k} role="button" tabIndex={0} aria-label={`${d.toDateString()}, ${evs.length} events`} aria-pressed={isSel}
                    onClick={() => setSelected(k)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(k); } }}
                    style={{ minHeight: 104, padding: 6, borderTop: "1px solid rgba(0,0,0,0.10)", borderLeft: i % 7 ? "1px solid rgba(0,0,0,0.10)" : "none", cursor: "pointer",
                      background: isSel ? "#EEEEFF" : other ? "#F4F4F6" : "#FFFFFF", outlineOffset: -2 }}
                    onFocus={(e) => (e.currentTarget.style.outline = "2px solid #1B1BFF")} onBlur={(e) => (e.currentTarget.style.outline = "none")}>
                    <span style={{ width: 24, height: 24, borderRadius: 9999, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: isToday || isSel ? 700 : 400,
                      background: isToday ? "#0A0A0F" : "transparent", color: isToday ? "#FFFFFF" : other ? "#5A5A6A" : "#0A0A0F",
                      border: isSel && !isToday ? "1px solid #1B1BFF" : "1px solid transparent" }}>{d.getDate()}</span>
                    <div className="flex flex-col gap-1 mt-1">
                      {evs.slice(0, 2).map((e) => {
                        const startsHere = e.start === k || i % 7 === 0;
                        return (
                          <div key={e.id} title={e.title} style={{ background: TYPES[e.type].bg, color: TYPES[e.type].fg, fontSize: 12, padding: "1px 6px", borderRadius: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height: 18,
                            marginLeft: e.start < k && i % 7 ? -7 : 0, marginRight: e.end > k && i % 7 !== 6 ? -7 : 0, border: e.type === "holiday" ? "1px solid rgba(0,0,0,0.10)" : "none" }}>
                            {startsHere ? e.title : " "}
                          </div>
                        );
                      })}
                      {evs.length > 2 && <span style={{ fontSize: 12, color: "#5A5A6A" }}>+{evs.length - 2} more</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
            {week.map((d, i) => {
              const k = iso(d);
              const evs = events.filter((e) => on(e, k));
              return (
                <li key={k} className="flex gap-4" style={{ padding: "12px 16px", borderTop: i ? "1px solid rgba(0,0,0,0.10)" : "none", background: k === selected ? "#EEEEFF" : "#FFFFFF" }}>
                  <div style={{ width: 56 }}>
                    <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>{DAYS[i]}</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: "#0A0A0F" }}>{d.getDate()}</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {evs.length === 0 && <p style={{ fontSize: 14, color: "#5A5A6A" }}>No events</p>}
                    {evs.map((e) => (
                      <div key={e.id} className="flex items-center gap-2" style={{ fontSize: 14, color: "#0A0A0F" }}>
                        <span style={{ width: 12, height: 12, borderRadius: 2, background: TYPES[e.type].bg, border: "1px solid rgba(0,0,0,0.20)" }} />
                        {e.title}<span style={{ color: "#5A5A6A" }}>· {TYPES[e.type].label}</span>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
