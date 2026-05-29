import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const F = "'Rethink Sans', sans-serif";

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(10,10,15,0.52)",
  zIndex: 100,
};

const panel: React.CSSProperties = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  background: "#FFFFFF",
  borderRadius: 12,
  padding: "32px",
  zIndex: 101,
  maxWidth: 480,
  width: "calc(100% - 40px)",
  boxShadow: "0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.08)",
  outline: "none",
};

const Btn = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; variant?: "primary" | "secondary" | "danger"; onClick?: () => void }
>(function Btn({ children, variant = "primary", onClick }, ref) {
  const map: Record<string, React.CSSProperties> = {
    primary: { background: "#0A0A0F", color: "#FFFFFF" },
    secondary: { background: "#F4F4F6", color: "#0A0A0F", border: "1px solid rgba(0,0,0,0.10)" },
    danger: { background: "#E8334A", color: "#FFFFFF" },
  };
  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        padding: "10px 18px",
        borderRadius: 6,
        fontFamily: F,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        border: "none",
        outline: "none",
        ...map[variant],
      }}
    >
      {children}
    </button>
  );
});

function InfoModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Btn>View project brief</Btn>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={overlay} />
        <Dialog.Content style={panel}>
          <Dialog.Title style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 6 }}>
            Johnson Luke — Q3 Brand Refresh
          </Dialog.Title>
          <Dialog.Description style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.6, marginBottom: 24 }}>
            A full-system review of brand expression across digital, print, and environmental touchpoints. Phase one covers identity audit and competitor benchmarking.
          </Dialog.Description>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#F4F4F6", borderRadius: 8, padding: "16px 18px", marginBottom: 28 }}>
            {[
              ["Client", "Johnson Luke Ltd."],
              ["Timeline", "8 weeks"],
              ["Budget band", "£45k–£60k"],
              ["Lead", "Brand Strategy team"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A" }}>{k}</span>
                <span style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Dialog.Close asChild><Btn variant="secondary">Close</Btn></Dialog.Close>
            <Btn>Download brief</Btn>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function FormModal() {
  const [name, setName] = useState("");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Btn variant="secondary">New project</Btn>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={overlay} />
        <Dialog.Content style={panel}>
          <Dialog.Title style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>
            Create project
          </Dialog.Title>
          <Dialog.Description style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.6, marginBottom: 24 }}>
            Start a new brand project. Add team members and deliverables after creation.
          </Dialog.Description>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, padding: "10px 14px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5A5A6A" }}>Project name</span>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Brand refresh 2026"
                style={{ fontSize: 15, fontFamily: F, color: "#0A0A0F", background: "transparent", border: "none", outline: "none", padding: 0 }}
              />
            </div>
            <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, padding: "10px 14px 8px", position: "relative" }}>
              <span style={{ display: "block", fontSize: 11, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#5A5A6A", marginBottom: 3 }}>Service area</span>
              <select style={{ fontSize: 15, fontFamily: F, color: "#0A0A0F", background: "transparent", border: "none", outline: "none", width: "100%", appearance: "none" as const, cursor: "pointer" }}>
                <option>Brand Strategy</option>
                <option>Identity Design</option>
                <option>Positioning & Messaging</option>
                <option>Environmental Design</option>
              </select>
              <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="#5A5A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Dialog.Close asChild><Btn variant="secondary">Cancel</Btn></Dialog.Close>
            <Dialog.Close asChild><Btn>Create project</Btn></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ConfirmModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Btn variant="danger">Archive project</Btn>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay style={overlay} />
        <Dialog.Content style={panel}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFF0F0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 7v4M10 13.5h.01M3 17h14a1 1 0 0 0 .88-1.47L10.88 3.47a1 1 0 0 0-1.76 0L2.12 15.53A1 1 0 0 0 3 17z" stroke="#E8334A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Dialog.Title style={{ fontSize: 18, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 8 }}>
            Archive this project?
          </Dialog.Title>
          <Dialog.Description style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.6, marginBottom: 28 }}>
            The project moves to the archive. All assets and briefs are preserved and can be restored within 30 days.
          </Dialog.Description>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Dialog.Close asChild><Btn variant="secondary">Cancel</Btn></Dialog.Close>
            <Dialog.Close asChild><Btn variant="danger">Archive project</Btn></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ModalShowcase() {
  return (
    <section id="modals" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Modals
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Centered overlay dialog. Dark scrim. 480px max width. Three variants: informational, form input, and destructive confirm.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
          Variants — click to open
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <InfoModal />
          <FormModal />
          <ConfirmModal />
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Destructive confirms must include a red icon, neutral Cancel on the left, and the destructive action on the right. Never auto-dismiss on overlay click for destructive actions.
        </p>
      </div>
    </section>
  );
}
