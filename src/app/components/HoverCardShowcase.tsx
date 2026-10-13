import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { CalendarDays } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const MD = "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)";

const css = `
.jl-hc{animation-duration:140ms;animation-timing-function:ease-out;animation-fill-mode:both;z-index:1000;outline:none}
.jl-hc[data-state="open"]{animation-name:jlHcIn}
.jl-hc[data-state="closed"]{animation-name:jlHcOut}
@keyframes jlHcIn{from{opacity:0}to{opacity:1}}
@keyframes jlHcOut{from{opacity:1}to{opacity:0}}
.jl-hc-link{color:#0A0A0F;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer;background:none;border:none;padding:0;font-family:${F};font-size:inherit}
.jl-hc-link:hover{text-decoration-thickness:2px}
.jl-hc-link:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px;border-radius:2px}
`;

const card: React.CSSProperties = {
  width: 300, background: "#FFFFFF", borderRadius: 10, padding: 16,
  border: "1px solid rgba(0,0,0,0.10)", boxShadow: MD,
};

const Stat = ({ v, l }: { v: string; l: string }) => (
  <div style={{ flex: 1, background: "#F4F4F6", borderRadius: 6, padding: "8px 12px" }}>
    <div style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F", lineHeight: 1.2 }}>{v}</div>
    <div style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{l}</div>
  </div>
);

function PersonContent() {
  return (
    <div style={card}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 9999, background: "#1B1BFF", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 700, fontSize: 16 }}>AB</div>
        <div>
          <p style={{ margin: 0, fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F" }}>Anya Belk</p>
          <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>Associate Director, Brand Strategy</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Stat v="7" l="Active projects" />
        <Stat v="12 yrs" l="Experience" />
      </div>
    </div>
  );
}

function ProjectContent() {
  return (
    <div style={{ ...card, width: 320, padding: 0, overflow: "hidden" }}>
      <div style={{ height: 96, background: "#0A0A0F", display: "flex", alignItems: "flex-end", padding: 12 }}>
        <span style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>Q3 Brand Refresh</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: "#EEEEFF", color: "#1B1BFF" }}>Phase 2: Positioning</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>
            <CalendarDays size={14} /> Due 28 Nov
          </span>
        </div>
        <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: "#5A5A6A", lineHeight: 1.5 }}>
          Identity audit complete. Competitor benchmarking in review with the client.
        </p>
      </div>
    </div>
  );
}

function Tip({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="jl-hc" side="bottom" align="start" sideOffset={8} collisionPadding={16}>
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 16px" }}>{children}</p>
);

export function HoverCardShowcase() {
  return (
    <section id="hovercards" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Overlays</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Hover cards</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Read-only previews on hover or keyboard focus. 200ms open delay, 140ms ease-out fade, no actions inside.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Label>Person preview: hover or focus the name</Label>
            <p style={{ fontFamily: F, fontSize: 16, color: "#0A0A0F", lineHeight: 1.6, margin: 0 }}>
              The positioning workshop is led by{" "}
              <Tip trigger={<button className="jl-hc-link">Anya Belk</button>}><PersonContent /></Tip>
              , with input from the client marketing team.
            </p>
          </div>
          <div>
            <Label>Project preview: hover or focus the title</Label>
            <p style={{ fontFamily: F, fontSize: 16, color: "#0A0A0F", lineHeight: 1.6, margin: 0 }}>
              Benchmarks from{" "}
              <Tip trigger={<button className="jl-hc-link">Q3 Brand Refresh</button>}><ProjectContent /></Tip>
              {" "}will be reused in the pitch.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Label>Static reference</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
            <PersonContent />
            <ProjectContent />
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6, margin: 0 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Hover cards preview only. Anything interactive belongs in a popover, since touch users cannot hover.
        </p>
      </div>
    </section>
  );
}
