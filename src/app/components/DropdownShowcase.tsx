import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const F = "'Rethink Sans', sans-serif";

const contentStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 8,
  padding: 4,
  boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
  zIndex: 9999,
  minWidth: 200,
};

const itemBase: React.CSSProperties = {
  fontSize: 13,
  fontFamily: F,
  fontWeight: 400,
  padding: "8px 12px",
  borderRadius: 4,
  cursor: "pointer",
  outline: "none",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const sep: React.CSSProperties = {
  height: 1,
  background: "rgba(0,0,0,0.08)",
  margin: "4px 0",
};

function MenuDot({ color = "#5A5A6A" }: { color?: string }) {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" fill={color} /></svg>;
}

export function DropdownShowcase() {
  return (
    <section id="dropdowns" className="mb-16">
      <style>{`
        [data-radix-dropdown-menu-item][data-highlighted] { background: #F4F4F6 !important; outline: none; }
        [data-radix-dropdown-menu-item].destructive[data-highlighted] { background: #FFF0F0 !important; }
      `}</style>

      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Dropdowns
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Action menus anchored to a trigger. Renders in a portal. Supports icons, separators, and destructive items.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Text trigger */}
          <div>
            <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Action menu</p>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button style={{ padding: "10px 18px", background: "#0A0A0F", color: "#FFFFFF", border: "none", borderRadius: 6, fontFamily: F, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, outline: "none" }}>
                  Project actions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content style={contentStyle} sideOffset={8} align="start">
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>
                    <MenuDot /> View brief
                  </DropdownMenu.Item>
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>
                    <MenuDot /> Duplicate project
                  </DropdownMenu.Item>
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>
                    <MenuDot /> Export assets
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator style={sep} />
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>
                    <MenuDot /> Share with client
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator style={sep} />
                  <DropdownMenu.Item className="destructive" style={{ ...itemBase, color: "#E8334A" }}>
                    <MenuDot color="#E8334A" /> Archive project
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Icon trigger */}
          <div>
            <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Icon trigger (⋮)</p>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 6, cursor: "pointer", outline: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="3.5" r="1.5" fill="#0A0A0F" />
                    <circle cx="8" cy="8" r="1.5" fill="#0A0A0F" />
                    <circle cx="8" cy="12.5" r="1.5" fill="#0A0A0F" />
                  </svg>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content style={contentStyle} sideOffset={8} align="start">
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>Rename</DropdownMenu.Item>
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>Move to folder</DropdownMenu.Item>
                  <DropdownMenu.Item style={{ ...itemBase, color: "#0A0A0F" }}>Copy link</DropdownMenu.Item>
                  <DropdownMenu.Separator style={sep} />
                  <DropdownMenu.Item className="destructive" style={{ ...itemBase, color: "#E8334A" }}>Delete</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Destructive items (archive, delete) always appear below a separator — never adjacent to neutral actions. Red text signals consequence, not urgency.
        </p>
      </div>
    </section>
  );
}
