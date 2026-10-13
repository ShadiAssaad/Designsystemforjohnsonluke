import React, { useState } from "react";
import * as CM from "@radix-ui/react-context-menu";
import { Copy, ExternalLink, Pencil, FolderInput, Trash2, ChevronRight, Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const MD = "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)";
const DANGER = "#DC2626";

const css = `
.jl-cm{animation:jlCmIn 140ms ease-out both;z-index:1000;outline:none}
@keyframes jlCmIn{from{opacity:0}to{opacity:1}}
.jl-cm-item{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;font-family:${F};font-size:14px;color:#0A0A0F;cursor:pointer;outline:none;user-select:none}
.jl-cm-item[data-highlighted],.jl-cm-item[data-state="open"]{background:#F4F4F6}
.jl-cm-item[data-disabled]{color:#BABAC4;cursor:not-allowed}
.jl-cm-item.danger{color:${DANGER}}
.jl-cm-item.danger[data-highlighted]{background:#FEE8E8}
.jl-cm-item:focus-visible{outline:2px solid #1B1BFF;outline-offset:-2px}
.jl-cm-row:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

const menuStyle: React.CSSProperties = {
  minWidth: 220, background: "#FFFFFF", borderRadius: 10, padding: 6,
  border: "1px solid rgba(0,0,0,0.10)", boxShadow: MD,
};

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <span style={{ marginLeft: "auto", fontFamily: F, fontSize: 12, color: "#5A5A6A", paddingLeft: 24 }}>{children}</span>
);

function Items({ onAction }: { onAction: (s: string) => void }) {
  return (
    <>
      <CM.Item className="jl-cm-item" onSelect={() => onAction("Opened project")}><ExternalLink size={16} />Open<Kbd>⏎</Kbd></CM.Item>
      <CM.Item className="jl-cm-item" onSelect={() => onAction("Rename")}><Pencil size={16} />Rename<Kbd>F2</Kbd></CM.Item>
      <CM.Item className="jl-cm-item" onSelect={() => onAction("Duplicated")}><Copy size={16} />Duplicate<Kbd>⌘D</Kbd></CM.Item>
      <CM.Sub>
        <CM.SubTrigger className="jl-cm-item"><FolderInput size={16} />Move to<ChevronRight size={14} style={{ marginLeft: "auto" }} /></CM.SubTrigger>
        <CM.Portal>
          <CM.SubContent className="jl-cm" style={menuStyle} sideOffset={4} alignOffset={-6}>
            {["Discovery & Audit", "Positioning", "Identity Design", "Delivery"].map((p) => (
              <CM.Item key={p} className="jl-cm-item" onSelect={() => onAction(`Moved to ${p}`)}>{p}</CM.Item>
            ))}
          </CM.SubContent>
        </CM.Portal>
      </CM.Sub>
      <CM.Item className="jl-cm-item" disabled><Copy size={16} />Export brief<Kbd>⌘E</Kbd></CM.Item>
      <CM.Separator style={{ height: 1, background: "rgba(0,0,0,0.10)", margin: "6px 4px" }} />
      <CM.Item className="jl-cm-item danger" onSelect={() => onAction("Deleted")}><Trash2 size={16} />Delete<Kbd>⌫</Kbd></CM.Item>
    </>
  );
}

const projects = [
  { n: "Q3 Brand Refresh", c: "Johnson Luke Ltd.", p: "Discovery & Audit" },
  { n: "Northvale Positioning", c: "Northvale Capital", p: "Positioning" },
  { n: "Harbour Wayfinding", c: "Harbour Trust", p: "Identity Design" },
];

function StaticRow({ label, bg, children }: { label: string; bg?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{label}</span>
      <div style={{ ...menuStyle, minWidth: 0, width: 220, background: bg || "#FFFFFF" }}>{children}</div>
    </div>
  );
}

const sItem = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6,
  fontFamily: F, fontSize: 14, color: "#0A0A0F", ...extra,
});

export function ContextMenuShowcase() {
  const [msg, setMsg] = useState("Right-click a row (or press Shift+F10 when focused).");
  return (
    <section id="contextmenu" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Overlays</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Context menu</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Right-click menu with icons, shortcuts, a submenu and a destructive action. 10px radius, shadow-md, 140ms ease-out.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p className="mb-4" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 16px" }}>Interactive: right-click a project</p>
        <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
          {projects.map((p, i) => (
            <CM.Root key={p.n}>
              <CM.Trigger asChild>
                <div
                  className="jl-cm-row"
                  tabIndex={0}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 16px", borderTop: i ? "1px solid rgba(0,0,0,0.10)" : "none", background: "#FFFFFF", cursor: "context-menu" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F4F6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
                >
                  <div>
                    <p style={{ margin: 0, fontFamily: F, fontSize: 14, fontWeight: 700, color: "#0A0A0F" }}>{p.n}</p>
                    <p style={{ margin: 0, fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{p.c}</p>
                  </div>
                  <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{p.p}</span>
                </div>
              </CM.Trigger>
              <CM.Portal>
                <CM.Content className="jl-cm" style={menuStyle} collisionPadding={16}>
                  <Items onAction={(s) => setMsg(`${s}: ${p.n}`)} />
                </CM.Content>
              </CM.Portal>
            </CM.Root>
          ))}
        </div>
        <p role="status" style={{ margin: "12px 0 0", fontFamily: F, fontSize: 14, color: "#5A5A6A", display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={14} color="#00A864" />{msg}
        </p>

        <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "32px 0 16px" }}>Static reference: item states</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          <StaticRow label="Open menu">
            <div style={sItem()}><ExternalLink size={16} />Open<Kbd>⏎</Kbd></div>
            <div style={sItem({ background: "#F4F4F6" })}><Pencil size={16} />Rename (hover)<Kbd>F2</Kbd></div>
            <div style={sItem({ outline: "2px solid #1B1BFF", outlineOffset: -2 })}><Copy size={16} />Duplicate (focus)<Kbd>⌘D</Kbd></div>
            <div style={sItem({ background: "#F4F4F6" })}><FolderInput size={16} />Move to<ChevronRight size={14} style={{ marginLeft: "auto" }} /></div>
            <div style={sItem({ color: "#BABAC4" })}><Copy size={16} />Export (disabled)<Kbd>⌘E</Kbd></div>
            <div style={{ height: 1, background: "rgba(0,0,0,0.10)", margin: "6px 4px" }} />
            <div style={sItem({ color: DANGER })}><Trash2 size={16} />Delete<Kbd>⌫</Kbd></div>
          </StaticRow>
          <StaticRow label="Destructive: hover">
            <div style={sItem({ color: DANGER, background: "#FEE8E8" })}><Trash2 size={16} />Delete<Kbd>⌫</Kbd></div>
          </StaticRow>
          <StaticRow label="Submenu: Move to">
            {["Discovery & Audit", "Positioning", "Identity Design", "Delivery"].map((x, i) => (
              <div key={x} style={sItem(i === 1 ? { background: "#F4F4F6" } : {})}>{x}</div>
            ))}
          </StaticRow>
        </div>
      </div>
    </section>
  );
}
