import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Info } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const MD = "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)";

const css = `
.jl-pop{animation-duration:140ms;animation-timing-function:ease-out;animation-fill-mode:both;z-index:1000;outline:none}
.jl-pop[data-state="open"]{animation-name:jlPopIn}
.jl-pop[data-state="closed"]{animation-name:jlPopOut}
@keyframes jlPopIn{from{opacity:0}to{opacity:1}}
@keyframes jlPopOut{from{opacity:1}to{opacity:0}}
.jl-pop-btn:focus-visible,.jl-pop-act:focus-visible{outline:2px solid #1B1BFF;outline-offset:2px}
`;

const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: 0 }}>{children}</p>
);

function PanelBody({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div>
      <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F", margin: "0 0 4px" }}>{title}</p>
      <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", lineHeight: 1.5, margin: "0 0 16px" }}>
        Stakeholder interviews finish Friday. Findings feed directly into the positioning workshop in week 3.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Popover.Close asChild>
          <button className="jl-pop-act" onClick={onClose} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.10)", background: "#F4F4F6", fontFamily: F, fontSize: 14, color: "#0A0A0F", cursor: "pointer" }}>Dismiss</button>
        </Popover.Close>
        <Popover.Close asChild>
          <button className="jl-pop-act" style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#1B1BFF", fontFamily: F, fontSize: 14, fontWeight: 700, color: "#FFFFFF", cursor: "pointer" }}>View plan</button>
        </Popover.Close>
      </div>
    </div>
  );
}

function Pop({ side, title, trigger }: { side: "top" | "right" | "bottom" | "left"; title: string; trigger: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="jl-pop-btn"
          style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${open ? "#1B1BFF" : "rgba(0,0,0,0.20)"}`, background: open ? "#EEEEFF" : "#FFFFFF", fontFamily: F, fontSize: 14, color: "#0A0A0F", cursor: "pointer" }}
        >
          {trigger}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="jl-pop"
          side={side}
          sideOffset={10}
          collisionPadding={16}
          style={{ width: 280, background: "#FFFFFF", borderRadius: 10, padding: 16, boxShadow: MD, border: "1px solid rgba(0,0,0,0.10)" }}
        >
          <PanelBody title={title} onClose={() => setOpen(false)} />
          <Popover.Arrow width={14} height={7} style={{ fill: "#FFFFFF", filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.10))" }} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function PopoverShowcase() {
  return (
    <section id="popovers" className="mb-16">
      <style>{css}</style>
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", margin: "0 0 8px" }}>Overlays</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Popovers</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Anchored panel with title, body and actions. 10px radius, shadow-md, 140ms ease-out. Closes on outside click or Esc.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="mb-5"><Label>Placement: click to open</Label></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "8px 0 8px" }}>
          <Pop side="top" trigger="Top" title="Interview schedule" />
          <Pop side="right" trigger="Right" title="Workshop prep" />
          <Pop side="bottom" trigger="Bottom" title="Audit status" />
          <Pop side="left" trigger="Left" title="Client sign-off" />
        </div>

        <div className="mt-8 mb-5"><Label>Trigger states</Label></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          {[
            ["Default", { border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF" }],
            ["Hover", { border: "1px solid rgba(0,0,0,0.20)", background: "#F4F4F6" }],
            ["Focus", { border: "1px solid rgba(0,0,0,0.20)", background: "#FFFFFF", outline: "2px solid #1B1BFF", outlineOffset: 2 }],
            ["Open", { border: "1px solid #1B1BFF", background: "#EEEEFF" }],
          ].map(([name, st]) => (
            <div key={name as string} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{name as string}</span>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 6, fontFamily: F, fontSize: 14, color: "#0A0A0F", cursor: "default", ...(st as React.CSSProperties) }}>
                <Info size={14} /> Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6, margin: 0 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Use a popover for optional, actionable context. Use a modal when the user must decide before continuing.
        </p>
      </div>
    </section>
  );
}
