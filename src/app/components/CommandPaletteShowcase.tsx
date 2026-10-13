import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, FolderKanban, User, Plus, FileText, Clock, CornerDownLeft } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const LG = "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)";

type Item = { id: string; group: "Projects" | "People" | "Actions"; label: string; hint: string; icon: React.ReactNode; shortcut?: string };

const ALL: Item[] = [
  { id: "p1", group: "Projects", label: "Q3 Brand Refresh", hint: "Johnson Luke Ltd.", icon: <FolderKanban size={16} /> },
  { id: "p2", group: "Projects", label: "Northvale Positioning", hint: "Northvale Capital", icon: <FolderKanban size={16} /> },
  { id: "p3", group: "Projects", label: "Harbour Wayfinding", hint: "Harbour Trust", icon: <FolderKanban size={16} /> },
  { id: "u1", group: "People", label: "Anya Belk", hint: "Associate Director", icon: <User size={16} /> },
  { id: "u2", group: "People", label: "Marcus Oyelaran", hint: "Senior Strategist", icon: <User size={16} /> },
  { id: "u3", group: "People", label: "Priya Raman", hint: "Design Lead", icon: <User size={16} /> },
  { id: "a1", group: "Actions", label: "Create new project", hint: "Start a brief", icon: <Plus size={16} />, shortcut: "N" },
  { id: "a2", group: "Actions", label: "Export audit report", hint: "PDF", icon: <FileText size={16} />, shortcut: "⌘E" },
];
const RECENT = [ALL[0], ALL[3], ALL[6]];

const css = `
.jl-cp-scrim{animation:jlCpS 220ms ease-out both}
.jl-cp-panel{animation:jlCpP 220ms ease-out both}
@keyframes jlCpS{from{opacity:0}to{opacity:1}}
@keyframes jlCpP{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
.jl-cp-btn:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

function Palette({ onClose, contained }: { onClose?: () => void; contained?: boolean }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? ALL.filter((i) => (i.label + " " + i.hint).toLowerCase().includes(s)) : RECENT;
  }, [q]);
  useEffect(() => setIdx(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${idx}"]`)?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const choose = (it: Item) => {
    setPicked(it.label);
    onClose?.();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[idx]) { e.preventDefault(); choose(results[idx]); }
  };

  const groups: { name: string; items: { it: Item; i: number }[] }[] = [];
  results.forEach((it, i) => {
    const name = q.trim() ? it.group : "Recent";
    let g = groups.find((x) => x.name === name);
    if (!g) groups.push((g = { name, items: [] }));
    g.items.push({ it, i });
  });

  return (
    <div
      role="dialog"
      aria-label="Command palette"
      className="jl-cp-panel"
      onKeyDown={onKey}
      style={{ width: "100%", maxWidth: 560, background: "#FFFFFF", borderRadius: 16, boxShadow: LG, border: "1px solid rgba(0,0,0,0.10)", overflow: "hidden" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
        <Search size={18} color="#5A5A6A" />
        <input
          autoFocus={!contained}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, people and actions"
          aria-label="Search"
          style={{ flex: 1, height: 52, border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 16, color: "#0A0A0F" }}
        />
        <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, padding: "2px 6px" }}>Esc</span>
      </div>
      <div ref={listRef} style={{ maxHeight: 320, overflowY: "auto", padding: 8 }}>
        {results.length === 0 ? (
          <div style={{ padding: "32px 16px", textAlign: "center" }}>
            <p style={{ margin: "0 0 4px", fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F" }}>No results for "{q}"</p>
            <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>Check the spelling or try a client or project name.</p>
          </div>
        ) : (
          groups.map((g) => (
            <div key={g.name} style={{ marginBottom: 4 }}>
              <p style={{ margin: 0, padding: "8px 8px 4px", fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", display: "flex", alignItems: "center", gap: 6 }}>
                {g.name === "Recent" && <Clock size={12} />}{g.name}
              </p>
              {g.items.map(({ it, i }) => {
                const active = i === idx;
                return (
                  <div
                    key={it.id}
                    data-idx={i}
                    role="option"
                    aria-selected={active}
                    onMouseMove={() => setIdx(i)}
                    onClick={() => choose(it)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 6, cursor: "pointer", background: active ? "#EEEEFF" : "transparent", boxShadow: active ? "inset 2px 0 0 #1B1BFF" : "none" }}
                  >
                    <span style={{ color: active ? "#1B1BFF" : "#5A5A6A", display: "flex" }}>{it.icon}</span>
                    <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#0A0A0F" }}>{it.label}</span>
                    <span style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>{it.hint}</span>
                    <span style={{ marginLeft: "auto", fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>
                      {active ? <CornerDownLeft size={14} /> : it.shortcut}
                    </span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
      <div style={{ display: "flex", gap: 16, padding: "8px 16px", borderTop: "1px solid rgba(0,0,0,0.10)", background: "#F4F4F6", fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>
        <span>↑↓ Navigate</span><span>⏎ Select</span><span>Esc Close</span>
        {picked && <span style={{ marginLeft: "auto", color: "#00A864" }}>Selected: {picked}</span>}
      </div>
    </div>
  );
}

export function CommandPaletteShowcase() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <section id="commandpalette" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Overlays</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Command palette</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Global search and actions via ⌘K or Ctrl+K. 16px radius, shadow-lg, grouped results, full keyboard navigation.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 16px" }}>Trigger</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <button
            className="jl-cp-btn"
            onClick={() => setOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", minWidth: 280, borderRadius: 6, border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", fontFamily: F, fontSize: 14, color: "#5A5A6A", cursor: "pointer" }}
          >
            <Search size={16} /> Search or jump to...
            <span style={{ marginLeft: "auto", fontSize: 12, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, padding: "2px 6px" }}>⌘K</span>
          </button>
          <span style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>Press ⌘K / Ctrl+K anywhere on this page.</span>
        </div>
        {last && <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: "12px 0 0" }}>Last palette session closed.</p>}

        <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "32px 0 16px" }}>Inline reference: recent items, type to filter, try "zzz" for empty state</p>
        <div style={{ background: "#F4F4F6", borderRadius: 10, padding: 24 }}>
          <Palette contained />
        </div>
      </div>

      {open && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "12vh 16px 0" }}>
          <div className="jl-cp-scrim" onClick={() => setOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,15,0.52)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
            <Palette onClose={() => { setOpen(false); setLast("x"); }} />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
