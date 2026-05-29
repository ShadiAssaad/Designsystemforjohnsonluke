import { useState } from "react";

const btnBase: React.CSSProperties = {
  fontFamily: "'Rethink Sans', sans-serif",
  fontSize: 15,
  fontWeight: 700,
  height: 40,
  padding: "0 20px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  transition: "background 180ms ease-out, transform 100ms ease-out",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  outline: "none",
  lineHeight: 1,
};

function PrimaryBtn({ children, stateOverride }: { children: React.ReactNode; stateOverride?: "hover" | "focus" | "active" | "disabled" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const isHover = stateOverride === "hover" || (!stateOverride && hovered);
  const isActive = stateOverride === "active" || (!stateOverride && active);
  const isFocus = stateOverride === "focus" || (!stateOverride && focused);
  const isDisabled = stateOverride === "disabled";

  return (
    <button
      style={{
        ...btnBase,
        background: isDisabled ? "#BABAC4" : isActive ? "#0F0FA0" : isHover ? "#1414CC" : "#1B1BFF",
        color: "#FFFFFF",
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #1B1BFF" : "none",
      }}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, stateOverride }: { children: React.ReactNode; stateOverride?: "hover" | "focus" | "active" | "disabled" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const isHover = stateOverride === "hover" || (!stateOverride && hovered);
  const isActive = stateOverride === "active" || (!stateOverride && active);
  const isFocus = stateOverride === "focus" || (!stateOverride && focused);
  const isDisabled = stateOverride === "disabled";

  return (
    <button
      style={{
        ...btnBase,
        background: isActive ? "#DDDDF5" : isHover || isFocus ? "#EEEEFF" : "transparent",
        color: isDisabled ? "#BABAC4" : "#1B1BFF",
        border: `1.5px solid ${isDisabled ? "#BABAC4" : "#1B1BFF"}`,
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #1B1BFF" : "none",
      }}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, stateOverride }: { children: React.ReactNode; stateOverride?: "hover" | "focus" | "active" | "disabled" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const isHover = stateOverride === "hover" || (!stateOverride && hovered);
  const isActive = stateOverride === "active" || (!stateOverride && active);
  const isFocus = stateOverride === "focus" || (!stateOverride && focused);
  const isDisabled = stateOverride === "disabled";

  return (
    <button
      style={{
        ...btnBase,
        background: isActive ? "#EBEBEB" : isHover || isFocus ? "#F4F4F6" : "transparent",
        color: isDisabled ? "#BABAC4" : isHover || isActive ? "#0A0A0F" : "#5A5A6A",
        border: "none",
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #1B1BFF" : "none",
      }}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
}

function DestructiveBtn({ children, stateOverride }: { children: React.ReactNode; stateOverride?: "hover" | "focus" | "active" | "disabled" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);

  const isHover = stateOverride === "hover" || (!stateOverride && hovered);
  const isActive = stateOverride === "active" || (!stateOverride && active);
  const isFocus = stateOverride === "focus" || (!stateOverride && focused);
  const isDisabled = stateOverride === "disabled";

  return (
    <button
      style={{
        ...btnBase,
        background: isDisabled ? "#BABAC4" : isActive ? "#991B1B" : isHover ? "#B91C1C" : "#DC2626",
        color: "#FFFFFF",
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #DC2626" : "none",
      }}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </button>
  );
}

const stateLabel: React.CSSProperties = {
  fontSize: 11,
  fontFamily: "'Rethink Sans', sans-serif",
  fontWeight: 400,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#BABAC4",
  marginBottom: 8,
};

const colLabel: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "'Rethink Sans', sans-serif",
  fontWeight: 400,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#5A5A6A",
};

export function ButtonShowcase() {
  const variants = [
    {
      name: "Primary",
      states: [
        { state: undefined, label: "Default" },
        { state: "hover" as const, label: "Hover" },
        { state: "focus" as const, label: "Focus" },
        { state: "active" as const, label: "Active" },
        { state: "disabled" as const, label: "Disabled" },
      ],
      render: (s: any) => <PrimaryBtn stateOverride={s}>Get started</PrimaryBtn>,
    },
    {
      name: "Secondary",
      states: [
        { state: undefined, label: "Default" },
        { state: "hover" as const, label: "Hover" },
        { state: "focus" as const, label: "Focus" },
        { state: "active" as const, label: "Active" },
        { state: "disabled" as const, label: "Disabled" },
      ],
      render: (s: any) => <SecondaryBtn stateOverride={s}>Learn more</SecondaryBtn>,
    },
    {
      name: "Ghost",
      states: [
        { state: undefined, label: "Default" },
        { state: "hover" as const, label: "Hover" },
        { state: "focus" as const, label: "Focus" },
        { state: "active" as const, label: "Active" },
        { state: "disabled" as const, label: "Disabled" },
      ],
      render: (s: any) => <GhostBtn stateOverride={s}>Cancel</GhostBtn>,
    },
    {
      name: "Destructive",
      states: [
        { state: undefined, label: "Default" },
        { state: "hover" as const, label: "Hover" },
        { state: "focus" as const, label: "Focus" },
        { state: "active" as const, label: "Active" },
        { state: "disabled" as const, label: "Disabled" },
      ],
      render: (s: any) => <DestructiveBtn stateOverride={s}>Delete</DestructiveBtn>,
    },
  ];

  return (
    <section id="buttons" className="mb-16">
      <p
        className="mb-3"
        style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B1BFF" }}
      >
        Components
      </p>
      <h2
        className="mb-10"
        style={{ fontSize: 40, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.1, color: "#0A0A0F" }}
      >
        Buttons
      </h2>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {/* Column headers */}
        <div
          className="grid px-6 py-3"
          style={{
            gridTemplateColumns: "110px repeat(5, 1fr)",
            background: "#F4F4F6",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <span style={colLabel}>Variant</span>
          {["Default", "Hover", "Focus", "Active", "Disabled"].map((h) => (
            <span key={h} style={colLabel}>{h}</span>
          ))}
        </div>

        {variants.map((v, i) => (
          <div
            key={v.name}
            className="grid px-6 py-5 items-center"
            style={{
              gridTemplateColumns: "110px repeat(5, 1fr)",
              background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ ...colLabel, color: "#0A0A0F", fontWeight: 700, fontSize: 13 }}>{v.name}</span>
            {v.states.map(({ state, label }) => (
              <div key={label}>{v.render(state)}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className="px-5 py-4 rounded-[6px]"
          style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
        >
          <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
            <strong style={{ color: "#0A0A0F", fontWeight: 700 }}>Disabled:</strong> Uses <code style={{ fontFamily: "monospace", background: "#E8E8E8", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>#BABAC4</code> background — not opacity. Opacity-based disabled states fail contrast checks.
          </p>
        </div>
        <div
          className="px-5 py-4 rounded-[6px]"
          style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
        >
          <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
            <strong style={{ color: "#0A0A0F", fontWeight: 700 }}>Never create:</strong> pill buttons, icon-only buttons without tooltip, buttons with gradient fills, animated CTA buttons.
          </p>
        </div>
      </div>
    </section>
  );
}
