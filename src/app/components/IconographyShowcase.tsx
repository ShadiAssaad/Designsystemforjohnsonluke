import {
  Search, Plus, X, Check, ChevronDown, ArrowRight, Calendar, FileText, Users, Settings,
  Bell, Download, Folder, Mail, Info, AlertTriangle, Target, Layers,
} from "lucide-react";

const F = "'Rethink Sans', sans-serif";

const icons = [
  { name: "Search", C: Search }, { name: "Plus", C: Plus }, { name: "X", C: X }, { name: "Check", C: Check },
  { name: "ChevronDown", C: ChevronDown }, { name: "ArrowRight", C: ArrowRight }, { name: "Calendar", C: Calendar },
  { name: "FileText", C: FileText }, { name: "Users", C: Users }, { name: "Settings", C: Settings },
  { name: "Bell", C: Bell }, { name: "Download", C: Download }, { name: "Folder", C: Folder }, { name: "Mail", C: Mail },
  { name: "Info", C: Info }, { name: "AlertTriangle", C: AlertTriangle }, { name: "Target", C: Target }, { name: "Layers", C: Layers },
];

const sizes = [
  { px: 16, use: "Inline with Body S, buttons, table cells" },
  { px: 20, use: "Navigation, inputs, Body" },
  { px: 24, use: "Standalone, empty states, headers" },
];

const colours = [
  { name: "Near black", hex: "#0A0A0F", bg: "#FFFFFF", use: "Default icon colour on light surfaces" },
  { name: "Text secondary", hex: "#5A5A6A", bg: "#FFFFFF", use: "Supporting, inactive and decorative icons" },
  { name: "Electric blue", hex: "#1B1BFF", bg: "#FFFFFF", use: "Active, selected and interactive icons" },
  { name: "White", hex: "#FFFFFF", bg: "#0A0A0F", use: "All icons on dark or blue surfaces" },
];

const label: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function Badge({ kind }: { kind: "do" | "dont" }) {
  const dont = kind === "dont";
  return (
    <span
      className="inline-flex items-center gap-1"
      style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: dont ? "#DC2626" : "#00A864" }}
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center"
        style={{ width: 18, height: 18, borderRadius: 9999, background: dont ? "#DC2626" : "#00A864", color: "#fff", fontSize: 11 }}
      >
        {dont ? "✕" : "✓"}
      </span>
      {dont ? "Don't" : "Do"}
    </span>
  );
}

function Example({ kind, caption, bg = "#FFFFFF", children }: { kind: "do" | "dont"; caption: string; bg?: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="flex items-center justify-center gap-4 mb-3"
        style={{ height: 96, background: bg, borderRadius: 10, border: `1px solid ${kind === "dont" ? "#DC2626" : "rgba(0,0,0,0.10)"}` }}
      >
        {children}
      </div>
      <Badge kind={kind} />
      <p className="mt-1" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{caption}</p>
    </div>
  );
}

export function IconographyShowcase() {
  return (
    <section id="iconography" className="mb-16">
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B1BFF" }}>Foundations</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Iconography</h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A" }}>
        Lucide outline icons at 16, 20 and 24px with a 1.5 stroke, coloured by role.
      </p>

      <p className="mb-4" style={label}>Icons in use</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3 mb-10">
        {icons.map(({ name, C }) => (
          <div key={name} className="flex flex-col items-center gap-2" style={{ padding: 12, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, background: "#FFFFFF" }}>
            <C size={24} strokeWidth={1.5} color="#0A0A0F" aria-hidden />
            <span style={{ fontSize: 11, fontFamily: F, color: "#5A5A6A" }}>{name}</span>
          </div>
        ))}
      </div>

      <p className="mb-4" style={label}>Sizes, stroke 1.5</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {sizes.map(({ px, use }) => (
          <div key={px} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, background: "#FFFFFF" }}>
            <div className="flex items-center gap-3 mb-4">
              <Search size={px} strokeWidth={1.5} color="#0A0A0F" aria-hidden />
              <FileText size={px} strokeWidth={1.5} color="#0A0A0F" aria-hidden />
              <Users size={px} strokeWidth={1.5} color="#0A0A0F" aria-hidden />
            </div>
            <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{px}px</p>
            <p className="mt-1" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{use}</p>
          </div>
        ))}
      </div>

      <p className="mb-4" style={label}>Colour rules</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {colours.map((c) => (
          <div key={c.name}>
            <div className="flex items-center justify-center gap-4 mb-3" style={{ height: 80, background: c.bg, borderRadius: 10, border: "1px solid rgba(0,0,0,0.10)" }}>
              <Calendar size={24} strokeWidth={1.5} color={c.hex} aria-hidden />
              <Bell size={24} strokeWidth={1.5} color={c.hex} aria-hidden />
              <Folder size={24} strokeWidth={1.5} color={c.hex} aria-hidden />
            </div>
            <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{c.name} <span style={{ fontWeight: 400, color: "#5A5A6A" }}>{c.hex}</span></p>
            <p className="mt-1" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{c.use}</p>
          </div>
        ))}
      </div>

      <p className="mb-4" style={label}>Do and don't</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Example kind="do" caption="Pair a 20px icon with a Body label, aligned on the centre line.">
          <div className="flex items-center gap-2" style={{ fontFamily: F, fontSize: 16, color: "#0A0A0F" }}>
            <Calendar size={20} strokeWidth={1.5} aria-hidden /> Kick-off workshop
          </div>
        </Example>
        <Example kind="dont" caption="Heavy 3px stroke and a filled shape break the outline style.">
          <FileText size={24} strokeWidth={3} color="#0A0A0F" aria-hidden />
          <Bell size={24} strokeWidth={1.5} fill="#0A0A0F" color="#0A0A0F" aria-hidden />
        </Example>
        <Example kind="dont" caption="Off-scale 40px size and neon green, which is decoration only." >
          <Users size={40} strokeWidth={1.5} color="#01FF97" aria-hidden />
        </Example>
        <Example kind="dont" bg="#0A0A0F" caption="Blue icons on near black fail contrast. Use white.">
          <Settings size={24} strokeWidth={1.5} color="#1B1BFF" aria-hidden />
        </Example>
      </div>
    </section>
  );
}
