import { useState } from "react";
import { FileText, Briefcase, Users, Calendar, ChevronRight, GripVertical, MoreHorizontal, Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const CARD = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" } as const;
const DIV = "1px solid rgba(0,0,0,0.10)";

function Header({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>{eyebrow}</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>{title}</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{desc}</p>
    </>
  );
}
const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>{children}</p>
);

type Item = { id: string; title: string; meta: string; badge: string; kind: "doc" | "project" | "team" | "meeting" };
const items: Item[] = [
  { id: "a", title: "Meridian Bank rebrand", meta: "Brand strategy · Phase 2 of 4", badge: "In progress", kind: "project" },
  { id: "b", title: "Northwind discovery brief", meta: "Updated 2 days ago by Priya Nair", badge: "Review", kind: "doc" },
  { id: "c", title: "Atlas Health service blueprint", meta: "Service design · 6 stakeholders", badge: "Draft", kind: "team" },
  { id: "d", title: "Kestrel steering committee", meta: "Thursday, 14:00 · Room 3", badge: "Upcoming", kind: "meeting" },
  { id: "e", title: "Orchard Foods packaging audit", meta: "Research · Delivered 12 Mar", badge: "Complete", kind: "doc" },
];
const iconFor = (k: Item["kind"]) => ({ doc: FileText, project: Briefcase, team: Users, meeting: Calendar }[k]);
const badgeStyle = (b: string) =>
  b === "Complete" ? { bg: "#EEFAF4", c: "#00A864" } : b === "Review" ? { bg: "#FEF3CD", c: "#D97706" } : b === "In progress" ? { bg: "#EEEEFF", c: "#1B1BFF" } : { bg: "#F4F4F6", c: "#5A5A6A" };

function Badge({ text }: { text: string }) {
  const s = badgeStyle(text);
  return <span style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 6, background: s.bg, color: s.c }}>{text}</span>;
}
function Lead({ kind }: { kind: Item["kind"] }) {
  const I = iconFor(kind);
  return <span style={{ width: 36, height: 36, borderRadius: 6, background: "#EEEEFF", color: "#1B1BFF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I size={18} /></span>;
}

function Row({ children, selected, onClick, hover, disabled, dividerBottom = true, draggable, ...rest }: any) {
  const [h, setH] = useState(false);
  const [f, setF] = useState(false);
  const interactive = !!onClick && !disabled;
  return (
    <div
      role={onClick ? "option" : "listitem"}
      aria-selected={onClick ? !!selected : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      draggable={draggable}
      {...rest}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", fontFamily: F,
        borderBottom: dividerBottom ? DIV : "none",
        background: selected ? "#EEEEFF" : (hover || h) && interactive ? "#F4F4F6" : "#FFFFFF",
        cursor: disabled ? "not-allowed" : interactive ? "pointer" : "default",
        opacity: disabled ? 0.5 : 1,
        outline: f ? "2px solid #1B1BFF" : "none", outlineOffset: -2,
        transition: "background 140ms ease-out",
        ...(rest.style || {}),
      }}
    >
      {children}
    </div>
  );
}
const Title = ({ t, m, two }: { t: string; m: string; two?: boolean }) => (
  <div style={{ flex: 1, minWidth: 0 }}>
    <p style={{ fontSize: 16, color: "#0A0A0F", fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</p>
    {two && <p style={{ fontSize: 14, color: "#5A5A6A", lineHeight: 1.4 }}>{m}</p>}
  </div>
);

export function ListShowcase() {
  const [sel, setSel] = useState<string[]>(["a"]);
  const [order, setOrder] = useState(items.map((i) => i.id));
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const byId = (id: string) => items.find((i) => i.id === id)!;

  const drop = (target: string) => {
    if (!dragId || dragId === target) return;
    const next = order.filter((i) => i !== dragId);
    next.splice(next.indexOf(target), 0, dragId);
    setOrder(next); setDragId(null); setOverId(null);
  };

  return (
    <section id="lists" className="mb-16">
      <Header eyebrow="Content" title="Lists" desc="Single-line, two-line, selectable and draggable list rows for projects, briefs and meetings." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Single-line, trailing chevron</Label>
          <div style={CARD} role="list">
            {items.slice(0, 4).map((it, i, a) => (
              <Row key={it.id} onClick={() => {}} dividerBottom={i < a.length - 1}>
                <Lead kind={it.kind} /><Title t={it.title} m={it.meta} />
                <ChevronRight size={18} color="#8A8A9A" aria-hidden />
              </Row>
            ))}
          </div>
        </div>

        <div>
          <Label>Two-line, trailing badge</Label>
          <div style={CARD} role="list">
            {items.slice(0, 4).map((it, i, a) => (
              <Row key={it.id} dividerBottom={i < a.length - 1}>
                <Lead kind={it.kind} /><Title two t={it.title} m={it.meta} /><Badge text={it.badge} />
              </Row>
            ))}
          </div>
        </div>

        <div>
          <Label>Two-line, avatar and trailing action</Label>
          <div style={CARD} role="list">
            {[["Priya Nair", "Lead strategist", "PN"], ["Tomás Reyes", "Senior designer", "TR"], ["Hannah Okafor", "Research lead", "HO"]].map(([n, r, ini], i, a) => (
              <Row key={n} dividerBottom={i < a.length - 1}>
                <span style={{ width: 36, height: 36, borderRadius: 9999, background: "#0A0A0F", color: "#FFFFFF", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ini}</span>
                <Title two t={n} m={r} />
                <button aria-label={`More actions for ${n}`} style={{ border: "none", background: "transparent", padding: 6, borderRadius: 6, cursor: "pointer", color: "#5A5A6A" }}><MoreHorizontal size={18} /></button>
              </Row>
            ))}
          </div>
        </div>

        <div>
          <Label>States: hover, focus, selected, disabled</Label>
          <div style={CARD} role="listbox" aria-label="State examples">
            <Row hover onClick={() => {}}><Lead kind="doc" /><Title t="Hover (forced)" m="" /></Row>
            <Row onClick={() => {}} style={{ outline: "2px solid #1B1BFF", outlineOffset: -2 }}><Lead kind="doc" /><Title t="Focus (keyboard ring)" m="" /></Row>
            <Row selected onClick={() => {}}><Lead kind="doc" /><Title t="Selected" m="" /><Check size={18} color="#1B1BFF" /></Row>
            <Row disabled onClick={() => {}} dividerBottom={false}><Lead kind="doc" /><Title t="Disabled" m="" /></Row>
          </div>
        </div>

        <div>
          <Label>Selectable (multi) — {sel.length} selected</Label>
          <div style={CARD} role="listbox" aria-multiselectable="true">
            {items.map((it, i) => {
              const on = sel.includes(it.id);
              return (
                <Row key={it.id} selected={on} dividerBottom={i < items.length - 1}
                  onClick={() => setSel(on ? sel.filter((s) => s !== it.id) : [...sel, it.id])}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, border: on ? "1px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)", background: on ? "#1B1BFF" : "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {on && <Check size={14} color="#FFFFFF" />}
                  </span>
                  <Title two t={it.title} m={it.meta} />
                </Row>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Draggable — drag rows to reorder</Label>
          <div style={CARD} role="list">
            {order.map((id, i) => {
              const it = byId(id);
              return (
                <Row key={id} draggable dividerBottom={i < order.length - 1}
                  onDragStart={() => setDragId(id)}
                  onDragOver={(e: React.DragEvent) => { e.preventDefault(); setOverId(id); }}
                  onDrop={() => drop(id)}
                  onDragEnd={() => { setDragId(null); setOverId(null); }}
                  style={{ opacity: dragId === id ? 0.5 : 1, boxShadow: overId === id && dragId !== id ? "inset 0 2px 0 #1B1BFF" : "none", cursor: "grab" }}>
                  <GripVertical size={18} color="#8A8A9A" aria-hidden />
                  <span style={{ fontSize: 14, color: "#5A5A6A", width: 16 }}>{i + 1}</span>
                  <Title two t={it.title} m={it.meta} />
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
