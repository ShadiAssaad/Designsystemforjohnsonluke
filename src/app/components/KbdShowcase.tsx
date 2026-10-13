const F = "'Rethink Sans', sans-serif";

function Kbd({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <kbd style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 24, height: 24, padding: "0 6px", borderRadius: 6,
      fontFamily: F, fontSize: 12, fontWeight: 400, lineHeight: 1, verticalAlign: "middle",
      background: dark ? "rgba(255,255,255,0.08)" : "#F4F4F6", color: dark ? "#FFFFFF" : "#0A0A0F",
      border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.20)",
      boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
    }}>{children}</kbd>
  );
}
function Combo({ keys, dark }: { keys: string[]; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={keys.join(" then ")}>
      {keys.map((k, i) => <Kbd key={i} dark={dark}>{k}</Kbd>)}
    </span>
  );
}

const shortcuts = [
  { a: "Open command palette", k: ["⌘", "K"] },
  { a: "Search projects", k: ["/"] },
  { a: "New client brief", k: ["⌘", "Shift", "N"] },
  { a: "Submit comment", k: ["Shift", "↵"] },
  { a: "Close panel", k: ["Esc"] },
  { a: "Next milestone", k: ["J"] },
];

const panel = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, fontFamily: F } as const;
const Label = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>{children}</p>
);

export function KbdShowcase() {
  return (
    <section id="kbd" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Content</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Keyboard keys</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Single keys, combinations, inline hints and shortcut lists.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <Label>Single keys</Label>
          <div className="flex flex-wrap gap-2">{["⌘", "Ctrl", "Shift", "Alt", "Esc", "Tab", "↵", "/", "K"].map((k) => <Kbd key={k}>{k}</Kbd>)}</div>
          <div style={{ height: 24 }} />
          <Label>Combinations</Label>
          <div className="flex flex-wrap gap-6"><Combo keys={["⌘", "K"]} /><Combo keys={["Shift", "↵"]} /><Combo keys={["Ctrl", "Alt", "P"]} /></div>
        </div>

        <div style={panel}>
          <Label>Inline in text</Label>
          <p style={{ fontSize: 14, color: "#5A5A6A", lineHeight: 2 }}>
            Press <Combo keys={["⌘", "K"]} /> to jump to any client or project. Use <Kbd>Esc</Kbd> to dismiss, or <Combo keys={["Shift", "↵"]} /> to send your note to the whole engagement team.
          </p>
        </div>

        <div style={panel}>
          <Label>Shortcuts list</Label>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {shortcuts.map((s, i) => (
              <li key={s.a} className="flex items-center justify-between" style={{ padding: "10px 0", borderTop: i ? "1px solid rgba(0,0,0,0.10)" : "none" }}>
                <span style={{ fontSize: 14, color: "#0A0A0F" }}>{s.a}</span>
                <Combo keys={s.k} />
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 24, fontFamily: F }}>
          <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8A9A", marginBottom: 12 }}>On dark surface</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {shortcuts.slice(0, 4).map((s, i) => (
              <li key={s.a} className="flex items-center justify-between" style={{ padding: "10px 0", borderTop: i ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                <span style={{ fontSize: 14, color: "#FFFFFF" }}>{s.a}</span>
                <Combo keys={s.k} dark />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
