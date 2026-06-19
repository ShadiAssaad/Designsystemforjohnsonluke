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
        background: isDisabled ? "#BABAC4" : isActive ? "#0F0FA0" : isHover ? "#1414CC" : "#0000FF",
        color: "#FFFFFF",
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #0000FF" : "none",
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
        color: isDisabled ? "#BABAC4" : "#0000FF",
        border: `1.5px solid ${isDisabled ? "#BABAC4" : "#0000FF"}`,
        transform: isActive ? "scale(0.98)" : "scale(1)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #0000FF" : "none",
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
        boxShadow: isFocus ? "0 0 0 2px #FFFFFF, 0 0 0 4px #0000FF" : "none",
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

// ── Button group components ───────────────────────────────────────────────────

function SegmentedGroup({ options }: { options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ display: "inline-flex", border: "1.5px solid #0000FF", borderRadius: 7, overflow: "hidden" }}>
      {options.map((opt, i) => {
        const isSelected = selected === opt;
        const isHovered = hovered === opt && !isSelected;
        return (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            onMouseEnter={() => setHovered(opt)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "0 18px",
              height: 38,
              fontFamily: "'Rethink Sans', sans-serif",
              fontSize: 13,
              fontWeight: isSelected ? 700 : 400,
              color: isSelected ? "#FFFFFF" : isHovered ? "#0000FF" : "#0000FF",
              background: isSelected ? "#0000FF" : isHovered ? "#EEEEFF" : "#FFFFFF",
              border: "none",
              borderLeft: i > 0 ? "1px solid #0000FF" : "none",
              cursor: "pointer",
              transition: "background 120ms ease-out, color 120ms ease-out",
              whiteSpace: "nowrap",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function MultiSegmentedGroup({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Brand", "Digital"]));
  const [hovered, setHovered] = useState<string | null>(null);

  function toggle(opt: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      return next;
    });
  }

  return (
    <div style={{ display: "inline-flex", border: "1.5px solid rgba(0,0,0,0.15)", borderRadius: 7, overflow: "hidden" }}>
      {options.map((opt, i) => {
        const isSelected = selected.has(opt);
        const isHovered = hovered === opt && !isSelected;
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            onMouseEnter={() => setHovered(opt)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "0 16px",
              height: 38,
              fontFamily: "'Rethink Sans', sans-serif",
              fontSize: 13,
              fontWeight: isSelected ? 700 : 400,
              color: isSelected ? "#0000FF" : isHovered ? "#0A0A0F" : "#5A5A6A",
              background: isSelected ? "#EEEEFF" : isHovered ? "#F4F4F6" : "#FFFFFF",
              border: "none",
              borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.10)" : "none",
              cursor: "pointer",
              transition: "background 120ms ease-out, color 120ms ease-out",
              whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {isSelected && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l2.5 2.5L10 3.5" stroke="#0000FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function JoinedGroup() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);

  const actions = [
    { id: "edit", label: "Edit" },
    { id: "duplicate", label: "Duplicate" },
    { id: "archive", label: "Archive" },
  ];

  return (
    <div style={{ display: "inline-flex", borderRadius: 7, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      {actions.map((action, i) => {
        const isHovered = hovered === action.id;
        const isActive = active === action.id;
        return (
          <button
            key={action.id}
            onMouseEnter={() => setHovered(action.id)}
            onMouseLeave={() => { setHovered(null); setActive(null); }}
            onMouseDown={() => setActive(action.id)}
            onMouseUp={() => setActive(null)}
            style={{
              padding: "0 20px",
              height: 38,
              fontFamily: "'Rethink Sans', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              color: isActive ? "#0A0A0F" : isHovered ? "#0A0A0F" : "#5A5A6A",
              background: isActive ? "#E2E2E6" : isHovered ? "#EBEBEB" : "#F4F4F6",
              border: "none",
              borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.10)" : "none",
              cursor: "pointer",
              transition: "background 120ms ease-out, color 120ms ease-out",
              transform: isActive ? "scale(0.98)" : "scale(1)",
              whiteSpace: "nowrap",
            }}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

function SplitButton() {
  const [dropOpen, setDropOpen] = useState(false);
  const [hoverMain, setHoverMain] = useState(false);
  const [hoverArrow, setHoverArrow] = useState(false);
  const [selectedAction, setSelectedAction] = useState("Publish");
  const options = ["Publish", "Save as draft", "Schedule…"];

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Main action */}
      <button
        onMouseEnter={() => setHoverMain(true)}
        onMouseLeave={() => setHoverMain(false)}
        style={{
          padding: "0 20px",
          height: 38,
          fontFamily: "'Rethink Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#FFFFFF",
          background: hoverMain ? "#1414CC" : "#0000FF",
          border: "none",
          borderRadius: "7px 0 0 7px",
          cursor: "pointer",
          transition: "background 120ms ease-out",
          whiteSpace: "nowrap",
        }}
      >
        {selectedAction}
      </button>
      {/* Divider */}
      <div style={{ width: 1, background: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
      {/* Arrow */}
      <button
        onClick={() => setDropOpen(o => !o)}
        onMouseEnter={() => setHoverArrow(true)}
        onMouseLeave={() => setHoverArrow(false)}
        style={{
          width: 34,
          height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#FFFFFF",
          background: hoverArrow ? "#1414CC" : "#0000FF",
          border: "none",
          borderRadius: "0 7px 7px 0",
          cursor: "pointer",
          transition: "background 120ms ease-out",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: dropOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 150ms ease-out" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {dropOpen && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 8, boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
          padding: 6, minWidth: 160, zIndex: 50,
        }}>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { setSelectedAction(opt); setDropOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "8px 12px", borderRadius: 6,
                fontFamily: "'Rethink Sans', sans-serif", fontSize: 13,
                fontWeight: selectedAction === opt ? 700 : 400,
                color: selectedAction === opt ? "#0000FF" : "#0A0A0F",
                background: "transparent", border: "none", cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F4F4F6"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function IconToolbar() {
  const [active, setActive] = useState<string | null>("grid");
  const [hovered, setHovered] = useState<string | null>(null);

  const tools = [
    {
      id: "grid", label: "Grid view",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg>,
    },
    {
      id: "list", label: "List view",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    },
    {
      id: "table", label: "Table view",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5h13M5 5v9" stroke="currentColor" strokeWidth="1.3"/></svg>,
    },
  ];

  const actions = [
    {
      id: "filter", label: "Filter",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 3h13M3 7h9M5 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    },
    {
      id: "sort", label: "Sort",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h8M2 7h5M2 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 3v9M9 10l2 2 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      id: "export", label: "Export",
      icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 10V2M5 4.5L7.5 2 10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11v1.5A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    },
  ];

  function Btn({ item, isToggle }: { item: typeof tools[0]; isToggle: boolean }) {
    const isActive = isToggle && active === item.id;
    const isHov = hovered === item.id;
    return (
      <button
        onClick={() => isToggle && setActive(item.id)}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => setHovered(null)}
        title={item.label}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "0 12px", height: 36,
          fontFamily: "'Rethink Sans', sans-serif", fontSize: 12,
          fontWeight: isActive ? 700 : 400,
          color: isActive ? "#0000FF" : isHov ? "#0A0A0F" : "#5A5A6A",
          background: isActive ? "#EEEEFF" : isHov ? "#EBEBEB" : "transparent",
          border: "none", cursor: "pointer",
          transition: "background 120ms ease-out, color 120ms ease-out",
          whiteSpace: "nowrap",
        }}
      >
        {item.icon}
        {item.label}
      </button>
    );
  }

  return (
    <div style={{
      display: "inline-flex", alignItems: "center",
      background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: 8, padding: 3, gap: 0,
    }}>
      {/* View toggles */}
      <div style={{ display: "inline-flex", background: "#FFFFFF", borderRadius: 6, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
        {tools.map((t, i) => (
          <div key={t.id} style={{ display: "flex" }}>
            {i > 0 && <div style={{ width: 1, background: "rgba(0,0,0,0.08)", alignSelf: "stretch" }} />}
            <Btn item={t} isToggle />
          </div>
        ))}
      </div>
      {/* Divider */}
      <div style={{ width: 1, height: 22, background: "rgba(0,0,0,0.10)", margin: "0 4px" }} />
      {/* Action buttons */}
      <div style={{ display: "inline-flex" }}>
        {actions.map((a, i) => (
          <div key={a.id} style={{ display: "flex" }}>
            {i > 0 && <div style={{ width: 1, background: "rgba(0,0,0,0.08)", alignSelf: "stretch" }} />}
            <Btn item={a} isToggle={false} />
          </div>
        ))}
      </div>
    </div>
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
        style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0000FF" }}
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

      {/* Button Groups */}
      <div className="mt-10 mb-2">
        <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 24 }}>
          Button Groups
        </p>

        <div
          style={{
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 32, background: "#FFFFFF" }}>

            {/* Segmented — single select */}
            <div>
              <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 14 }}>Segmented — single select</p>
              <SegmentedGroup
                options={["All", "Active", "Review", "Archive"]}
              />
            </div>

            {/* Segmented — multi select */}
            <div>
              <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 14 }}>Segmented — multi select</p>
              <MultiSegmentedGroup
                options={["Brand", "Identity", "Digital", "Print", "Environmental"]}
              />
            </div>

            {/* Joined action group */}
            <div>
              <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 14 }}>Joined action group</p>
              <JoinedGroup />
            </div>

            {/* Split button */}
            <div>
              <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 14 }}>Split button</p>
              <SplitButton />
            </div>

            {/* Icon + label group */}
            <div>
              <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 14 }}>Icon + label toolbar</p>
              <IconToolbar />
            </div>

          </div>
        </div>
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
          style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}
        >
          <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#0A0A0F", lineHeight: 1.5 }}>
            <strong style={{ fontWeight: 700 }}>Pattern:</strong> Segmented groups share a single border radius — never individual pill buttons in a row. Joined groups use a 1px divider between items, not a gap. Split buttons keep the primary action and the disclosure arrow as separate hit targets.
          </p>
        </div>
      </div>
    </section>
  );
}
