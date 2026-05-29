import { useState, useRef, useEffect } from "react";
import logoLight from "../../imports/Artboard_1_300x.png";

const F = "'Rethink Sans', sans-serif";

const sidebarSections = [
  {
    label: "Projects",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "grid" },
      { id: "active", label: "Active projects", icon: "folder", badge: 6 },
      { id: "archive", label: "Archive", icon: "archive" },
    ],
  },
  {
    label: "Work",
    items: [
      { id: "briefs", label: "Briefs", icon: "file" },
      { id: "deliverables", label: "Deliverables", icon: "check-square" },
      { id: "assets", label: "Asset library", icon: "image" },
    ],
  },
  {
    label: "Studio",
    items: [
      { id: "team", label: "Team", icon: "users" },
      { id: "settings", label: "Settings", icon: "settings" },
    ],
  },
];

function NavIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    folder: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h3l1.5 2H13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2.5A1.5 1.5 0 0 1 1 11.5v-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    archive: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="2" width="13" height="3" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 5v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.5 8.5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    file: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0H9l4 4v9.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-12z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M9 0v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    "check-square": (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 7.5l2.5 2.5L11 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="2" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1 10l3.5-3 3 3 2-2 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    users: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="5.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="11" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M13 12c0-1.8-1-3-2.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    settings: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.9 2.9l1.06 1.06M11.04 11.04l1.06 1.06M2.9 12.1l1.06-1.06M11.04 3.96l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    chevron: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    collapse: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M3 7.5h9M7.5 3L3 7.5l4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    expand: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M12 7.5H3M7.5 3l4.5 4.5L7.5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    menu: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    close: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return <>{icons[id] ?? null}</>;
}

// ── Top nav with dropdown ────────────────────────────────────────────────────

const capabilityItems = [
  { label: "Brand Strategy", desc: "Positioning, narrative, and identity direction" },
  { label: "Identity Design", desc: "Logos, systems, and visual language" },
  { label: "Environmental", desc: "Signage, wayfinding, and spatial expression" },
  { label: "Digital Products", desc: "Interfaces, design systems, and UX" },
];

function TopNavWithDropdown() {
  const [active, setActive] = useState("Work");
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links = ["Work", "Capabilities", "About", "Insights"];
  const capIsActive = active === "Capabilities" || selectedCapability !== null;

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "visible" }}>
      <nav style={{
        background: "#FFFFFF",
        borderBottom: "1px solid rgba(0,0,0,0.10)",
        borderRadius: dropOpen ? "10px 10px 0 0" : 10,
        height: 60, display: "flex", alignItems: "center",
        padding: "0 24px", gap: 32, position: "relative", zIndex: 10,
      }}>
        <img src={logoLight} alt="Johnson Luke" style={{ height: 22, width: "auto" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginLeft: 24 }}>
          {links.map((link) => {
            const isCapabilities = link === "Capabilities";
            const isActive = isCapabilities ? (dropOpen || capIsActive) : active === link;
            return (
              <div key={link} ref={isCapabilities ? dropRef : undefined} style={{ position: "relative" }}>
                <button
                  onClick={() => {
                    if (isCapabilities) {
                      setDropOpen(o => !o);
                    } else {
                      setActive(link);
                      setDropOpen(false);
                    }
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: F, fontSize: 14, fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#1B1BFF" : "#5A5A6A",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "4px 0", transition: "color 180ms ease-out, font-weight 180ms ease-out",
                  }}
                >
                  {link}
                  {isCapabilities && (
                    <span style={{
                      color: dropOpen ? "#1B1BFF" : "#BABAC4",
                      transition: "transform 180ms ease-out, color 180ms ease-out",
                      transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                      display: "flex",
                    }}>
                      <NavIcon id="chevron" />
                    </span>
                  )}
                </button>

                {/* Dropdown */}
                {isCapabilities && dropOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 18px)", left: "50%",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF", borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.10)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                    padding: 8, minWidth: 280, zIndex: 50,
                  }}>
                    {capabilityItems.map((item) => {
                      const isSelected = selectedCapability === item.label;
                      const isHovered = hoveredCapability === item.label;
                      return (
                        <button
                          key={item.label}
                          onClick={() => { setSelectedCapability(item.label); setActive("Capabilities"); setDropOpen(false); }}
                          onMouseEnter={() => setHoveredCapability(item.label)}
                          onMouseLeave={() => setHoveredCapability(null)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            width: "100%", textAlign: "left",
                            padding: "10px 14px", borderRadius: 7,
                            background: isSelected ? "#EEEEFF" : isHovered ? "#F4F4F6" : "transparent",
                            border: "none", cursor: "pointer",
                            transition: "background 120ms ease-out",
                          }}
                        >
                          <div>
                            <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: isSelected ? "#1B1BFF" : "#0A0A0F", marginBottom: 2 }}>{item.label}</p>
                            <p style={{ fontSize: 12, fontFamily: F, color: isSelected ? "#1B1BFF" : "#5A5A6A", opacity: isSelected ? 0.8 : 1 }}>{item.desc}</p>
                          </div>
                          {isSelected && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginLeft: 12 }}>
                              <path d="M2.5 7l3.5 3.5 5.5-7" stroke="#1B1BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button style={{
            fontFamily: F, fontSize: 14, fontWeight: 700,
            padding: "9px 18px", borderRadius: 6, border: "none",
            background: "#1B1BFF", color: "#FFFFFF", cursor: "pointer",
          }}>
            Schedule a call
          </button>
        </div>
      </nav>
      <div style={{ background: "#FAFAFA", padding: "16px 24px", borderRadius: "0 0 10px 10px" }}>
        <p style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>
          Click <strong style={{ color: "#0A0A0F" }}>Capabilities</strong> to open the dropdown menu.
        </p>
      </div>
    </div>
  );
}

// ── Mobile nav ───────────────────────────────────────────────────────────────

function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Work");
  const links = ["Work", "Capabilities", "About", "Insights"];

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden", position: "relative" }}>
      {/* Header bar */}
      <nav style={{
        background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.10)",
        height: 56, display: "flex", alignItems: "center", padding: "0 18px",
      }}>
        <img src={logoLight} alt="Johnson Luke" style={{ height: 20, width: "auto" }} />
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            marginLeft: "auto", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer", color: "#0A0A0F", borderRadius: 6,
          }}
        >
          <NavIcon id={open ? "close" : "menu"} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        background: "#FFFFFF",
        maxHeight: open ? 320 : 0,
        overflow: "hidden",
        transition: "max-height 280ms ease-out",
      }}>
        <div style={{ padding: "8px 12px 16px" }}>
          {links.map((link) => (
            <button
              key={link}
              onClick={() => { setActive(link); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "13px 12px", borderRadius: 8, border: "none",
                fontFamily: F, fontSize: 16,
                fontWeight: active === link ? 700 : 400,
                color: active === link ? "#1B1BFF" : "#0A0A0F",
                background: active === link ? "#EEEEFF" : "transparent",
                cursor: "pointer", marginBottom: 2,
              }}
            >
              {link}
            </button>
          ))}
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "10px 0" }} />
          <button style={{
            display: "block", width: "100%", textAlign: "center",
            padding: "13px", borderRadius: 8, border: "none",
            fontFamily: F, fontSize: 15, fontWeight: 700,
            background: "#1B1BFF", color: "#FFFFFF", cursor: "pointer",
          }}>
            Schedule a call
          </button>
        </div>
      </div>

      <div style={{ background: "#FAFAFA", padding: "14px 18px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>
          Click the <strong style={{ color: "#0A0A0F" }}>menu icon</strong> to open mobile navigation.
        </p>
      </div>
    </div>
  );
}

// ── Collapsible sidebar ──────────────────────────────────────────────────────

function CollapsibleSidebar() {
  const [active, setSideActive] = useState("active");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: 380, borderRadius: 10, border: "1px solid rgba(0,0,0,0.10)", overflow: "hidden" }}>
      <aside style={{
        width: collapsed ? 52 : 220,
        flexShrink: 0,
        background: "#F4F4F6",
        borderRight: "1px solid rgba(0,0,0,0.10)",
        display: "flex", flexDirection: "column",
        transition: "width 220ms ease-out",
        overflow: "hidden",
      }}>
        {/* Toggle button */}
        <div style={{
          height: 52, display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: collapsed ? 0 : "0 10px",
          borderBottom: "1px solid rgba(0,0,0,0.10)",
          flexShrink: 0,
        }}>
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              width: 30, height: 30, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,0.06)", border: "none", cursor: "pointer", color: "#5A5A6A",
              flexShrink: 0,
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <NavIcon id={collapsed ? "expand" : "collapse"} />
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "10px 6px" }}>
          {sidebarSections.map((section, si) => (
            <div key={section.label}>
              {si > 0 && <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "6px 4px" }} />}
              {!collapsed && (
                <p style={{ fontSize: 10, fontFamily: F, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#BABAC4", padding: "4px 8px 6px", whiteSpace: "nowrap" }}>
                  {section.label}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSideActive(item.id)}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: "flex", alignItems: "center",
                      gap: collapsed ? 0 : 9,
                      justifyContent: collapsed ? "center" : "flex-start",
                      width: "100%",
                      padding: collapsed ? "9px 0" : "7px 10px",
                      borderRadius: 6, border: "none", cursor: "pointer",
                      fontFamily: F, fontSize: 13,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "#1B1BFF" : "#5A5A6A",
                      background: isActive ? "#E8E8FF" : "transparent",
                      transition: "background 150ms ease-out, color 150ms ease-out",
                      whiteSpace: "nowrap", overflow: "hidden",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "#EBEBEB"; e.currentTarget.style.color = "#0A0A0F"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5A5A6A"; } }}
                  >
                    <span style={{ color: isActive ? "#1B1BFF" : "#BABAC4", flexShrink: 0 }}>
                      <NavIcon id={item.icon} />
                    </span>
                    {!collapsed && (
                      <>
                        <span style={{ flex: 1, overflow: "hidden" }}>{item.label}</span>
                        {item.badge != null && (
                          <span style={{
                            fontSize: 10, fontFamily: F, fontWeight: 700,
                            background: isActive ? "#1B1BFF" : "rgba(0,0,0,0.10)",
                            color: isActive ? "#FFFFFF" : "#5A5A6A",
                            borderRadius: 10, padding: "1px 6px",
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Avatar */}
        <div style={{
          padding: collapsed ? "12px 0" : "12px 14px",
          borderTop: "1px solid rgba(0,0,0,0.10)",
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 8, flexShrink: 0,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1B1BFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>AB</span>
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: "#0A0A0F", whiteSpace: "nowrap" }}>Anya Belk</p>
              <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>Brand Strategist</p>
            </div>
          )}
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, background: "#FAFAFA", padding: "24px", display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.10em", textTransform: "uppercase", color: "#BABAC4" }}>Active view</p>
        <p style={{ fontSize: 18, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>
          {sidebarSections.flatMap(s => s.items).find(i => i.id === active)?.label ?? "—"}
        </p>
        <p style={{ fontSize: 13, fontFamily: F, color: "#BABAC4", lineHeight: 1.6, marginTop: 4 }}>
          Sidebar collapses to icon-only at 52px. Hover icons for label tooltip.
        </p>
      </div>
    </div>
  );
}

// ── Standard sidebar ─────────────────────────────────────────────────────────

function SidebarNav() {
  const [active, setSideActive] = useState("active");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", height: 380, borderRadius: 10, border: "1px solid rgba(0,0,0,0.10)", overflow: "hidden" }}>
      <aside style={{
        width: 220, flexShrink: 0,
        background: "#F4F4F6",
        borderRight: "1px solid rgba(0,0,0,0.10)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
          <p style={{ fontSize: 11, fontFamily: F, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 2 }}>Johnson Luke</p>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>Studio</p>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          {sidebarSections.map((section, si) => (
            <div key={section.label} style={{ marginBottom: 4 }}>
              {si > 0 && <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "8px 6px" }} />}
              <p style={{ fontSize: 10, fontFamily: F, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#BABAC4", padding: "4px 8px 6px" }}>
                {section.label}
              </p>
              {section.items.map((item) => {
                const isActive = active === item.id;
                const isHovered = hovered === item.id && !isActive;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSideActive(item.id)}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: "flex", alignItems: "center", gap: 9,
                      width: "100%", textAlign: "left",
                      padding: "7px 10px", borderRadius: 6,
                      border: "none", cursor: "pointer",
                      fontFamily: F, fontSize: 13,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "#1B1BFF" : isHovered ? "#0A0A0F" : "#5A5A6A",
                      background: isActive ? "#E8E8FF" : isHovered ? "#E2E2E6" : "transparent",
                      transition: "background 120ms ease-out, color 120ms ease-out",
                      position: "relative",
                    }}
                  >
                    {/* Selected indicator bar */}
                    {isActive && (
                      <span style={{
                        position: "absolute", left: 0, top: "20%", bottom: "20%",
                        width: 3, borderRadius: 9999,
                        background: "#1B1BFF",
                      }} />
                    )}
                    <span style={{ color: isActive ? "#1B1BFF" : isHovered ? "#5A5A6A" : "#BABAC4", flexShrink: 0 }}>
                      <NavIcon id={item.icon} />
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge != null && (
                      <span style={{
                        fontSize: 10, fontFamily: F, fontWeight: 700,
                        background: isActive ? "#1B1BFF" : isHovered ? "rgba(0,0,0,0.14)" : "rgba(0,0,0,0.10)",
                        color: isActive ? "#FFFFFF" : "#5A5A6A",
                        borderRadius: 10, padding: "1px 6px", minWidth: 18, textAlign: "center",
                        transition: "background 120ms ease-out",
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,0,0,0.10)", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1B1BFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>AB</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: "#0A0A0F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Anya Belk</p>
            <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>Brand Strategist</p>
          </div>
        </div>
      </aside>
      <div style={{ flex: 1, background: "#FAFAFA", padding: "24px", display: "flex", flexDirection: "column", gap: 6 }}>
        <p style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.10em", textTransform: "uppercase", color: "#BABAC4" }}>Active view</p>
        <p style={{ fontSize: 18, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>
          {sidebarSections.flatMap(s => s.items).find(i => i.id === active)?.label ?? "—"}
        </p>
        <p style={{ fontSize: 14, fontFamily: F, color: "#BABAC4", lineHeight: 1.6, marginTop: 4 }}>
          Content area. Click any sidebar item to switch active state.
        </p>
      </div>
    </div>
  );
}

// ── Step navigation ──────────────────────────────────────────────────────────

const steps = [
  { id: 1, label: "Brief", desc: "Project context and goals" },
  { id: 2, label: "Scope", desc: "Deliverables and timeline" },
  { id: 3, label: "Team", desc: "Roles and responsibilities" },
  { id: 4, label: "Review", desc: "Confirm and submit" },
];

function StepNav() {
  const [current, setCurrent] = useState(2);

  return (
    <div style={{ padding: "28px 32px", background: "#FFFFFF", borderRadius: 10, border: "1px solid rgba(0,0,0,0.10)" }}>
      {/* Step indicators */}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 32 }}>
        {steps.map((step, i) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} style={{ display: "flex", flex: i < steps.length - 1 ? 1 : 0, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setCurrent(step.id)}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? "#1B1BFF" : active ? "#1B1BFF" : "#F4F4F6",
                    border: done ? "none" : active ? "none" : "1.5px solid rgba(0,0,0,0.12)",
                    cursor: "pointer", flexShrink: 0,
                    transition: "background 180ms ease-out",
                  }}
                >
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: active ? "#FFFFFF" : "#BABAC4" }}>
                      {step.id}
                    </span>
                  )}
                </button>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 12, fontFamily: F, fontWeight: active ? 700 : 400, color: active ? "#0A0A0F" : done ? "#5A5A6A" : "#BABAC4", whiteSpace: "nowrap" }}>
                    {step.label}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: 2, marginTop: 15, marginLeft: 8, marginRight: 8,
                  background: done ? "#1B1BFF" : "rgba(0,0,0,0.08)",
                  borderRadius: 9999,
                  transition: "background 300ms ease-out",
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current step info */}
      <div style={{ padding: "20px 24px", background: "#F4F4F6", borderRadius: 8, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 4 }}>
          Step {current} of {steps.length}
        </p>
        <p style={{ fontSize: 16, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 2 }}>
          {steps[current - 1].label}
        </p>
        <p style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A" }}>
          {steps[current - 1].desc}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => setCurrent(c => Math.max(1, c - 1))}
          disabled={current === 1}
          style={{
            padding: "9px 18px", borderRadius: 6,
            background: "#F4F4F6", color: current === 1 ? "#BABAC4" : "#0A0A0F",
            fontFamily: F, fontSize: 13, fontWeight: 400,
            border: "1px solid rgba(0,0,0,0.10)", cursor: current === 1 ? "not-allowed" : "pointer",
          }}
        >
          Back
        </button>
        <button
          onClick={() => setCurrent(c => Math.min(steps.length, c + 1))}
          disabled={current === steps.length}
          style={{
            padding: "9px 18px", borderRadius: 6,
            background: current === steps.length ? "#F4F4F6" : "#1B1BFF",
            color: current === steps.length ? "#BABAC4" : "#FFFFFF",
            fontFamily: F, fontSize: 13, fontWeight: 700,
            border: "none", cursor: current === steps.length ? "not-allowed" : "pointer",
          }}
        >
          {current === steps.length ? "Submit" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export function NavigationShowcase() {
  return (
    <section id="navigation" className="mb-16">
      <h2
        className="mb-2"
        style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Navigation
      </h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Five navigation patterns covering the full surface area of the system: top bar, dropdown menu, mobile, sidebar, collapsible sidebar, and step navigation.
      </p>

      {/* Top bar */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Top bar</p>
      <div className="mb-8">
        <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
          <nav style={{
            background: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.10)",
            height: 60, display: "flex", alignItems: "center", padding: "0 24px", gap: 32,
          }}>
            <img src={logoLight} alt="Johnson Luke" style={{ height: 22, width: "auto" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginLeft: 24 }}>
              {["Work", "Capabilities", "About", "Insights"].map((link) => (
                <button key={link} style={{ fontFamily: F, fontSize: 14, fontWeight: 400, color: link === "Work" ? "#1B1BFF" : "#5A5A6A", background: "none", border: "none", cursor: "pointer" }}>
                  {link}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button style={{ fontFamily: F, fontSize: 14, fontWeight: 700, padding: "9px 18px", borderRadius: 6, border: "none", background: "#1B1BFF", color: "#FFFFFF", cursor: "pointer" }}>
                Schedule a call
              </button>
            </div>
          </nav>
          <div style={{ background: "#FAFAFA", padding: "16px 24px" }}>
            <p style={{ fontSize: 13, fontFamily: F, color: "#BABAC4" }}>60px height. Logo left-anchored. Primary CTA right-anchored. Active link: Electric Blue, no underline.</p>
          </div>
        </div>
      </div>

      {/* Top bar with dropdown */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Top bar — with dropdown</p>
      <div className="mb-8" style={{ position: "relative", zIndex: 10 }}>
        <TopNavWithDropdown />
      </div>

      {/* Mobile nav */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Mobile navigation</p>
      <div className="mb-8">
        <MobileNav />
      </div>

      {/* Sidebar */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Sidebar navigation</p>
      <div className="mb-8">
        <SidebarNav />
      </div>

      {/* Collapsible sidebar */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Collapsible sidebar</p>
      <div className="mb-8">
        <CollapsibleSidebar />
      </div>

      {/* Step nav */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Step navigation</p>
      <div className="mb-8">
        <StepNav />
      </div>

      <div className="px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Top bar for public pages (60px, logo left, CTA right). Dropdown menus open on click — never hover. Mobile nav uses max-height animation, never slide-in (reserved for slideout panels). Sidebar collapses to 52px icon-only; always retain hover tooltips when collapsed. Step nav shows completed steps in solid blue with a checkmark — never allow skipping ahead.
        </p>
      </div>
    </section>
  );
}
