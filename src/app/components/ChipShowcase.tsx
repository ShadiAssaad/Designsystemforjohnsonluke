import { useState } from "react";
import { X, Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>{children}</p>;
}
const panel = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24 } as const;

/* Chips are sentence-case, bordered, 32px high: distinct from uppercase tinted status Badges. */
function Chip({ label, selected, onClick, onRemove, count, disabled, forceHover, forceFocus }: {
  label: string; selected?: boolean; onClick?: () => void; onRemove?: () => void; count?: number; disabled?: boolean; forceHover?: boolean; forceFocus?: boolean;
}) {
  const [h, setH] = useState(false);
  const [f, setF] = useState(false);
  const hover = (h || forceHover) && !disabled && !selected;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 32, borderRadius: 6, fontFamily: F, fontSize: 14, opacity: disabled ? 0.5 : 1,
      border: selected ? "1px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)",
      background: selected ? "#EEEEFF" : hover ? "#F4F4F6" : "#FFFFFF", color: "#0A0A0F", transition: "background 140ms ease-out",
      outline: f || forceFocus ? "2px solid #1B1BFF" : "none", outlineOffset: 2 }}>
      <button
        type="button" disabled={disabled} onClick={onClick}
        aria-pressed={onClick ? !!selected : undefined}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ all: "unset", boxSizing: "border-box", display: "inline-flex", alignItems: "center", gap: 6, height: "100%", padding: onRemove ? "0 4px 0 12px" : "0 12px", cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default", fontFamily: F, fontSize: 14 }}
      >
        {selected && onClick && <Check size={14} color="#1B1BFF" aria-hidden />}
        {label}
        {count !== undefined && (
          <span style={{ fontSize: 12, color: selected ? "#1B1BFF" : "#5A5A6A", fontVariantNumeric: "tabular-nums", borderLeft: "1px solid rgba(0,0,0,0.10)", paddingLeft: 6 }}>{count}</span>
        )}
      </button>
      {onRemove && (
        <button type="button" aria-label={`Remove ${label}`} onClick={onRemove} disabled={disabled}
          style={{ all: "unset", boxSizing: "border-box", width: 24, height: 24, margin: "0 4px 0 0", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 4, cursor: disabled ? "not-allowed" : "pointer", color: "#5A5A6A" }}>
          <X size={14} />
        </button>
      )}
    </span>
  );
}

const sectors = ["Financial services", "Healthcare", "Retail", "Public sector", "Energy"];
const services = [
  { l: "Brand strategy", c: 14 }, { l: "Service design", c: 9 }, { l: "Research", c: 21 }, { l: "Workshops", c: 6 },
];

export function ChipShowcase() {
  const [single, setSingle] = useState("Healthcare");
  const [multi, setMulti] = useState<string[]>(["Brand strategy", "Research"]);
  const [removable, setRemovable] = useState(["Meridian Bank", "Atlas Health", "Kestrel Energy", "Orchard Foods"]);
  const [counted, setCounted] = useState("All");

  return (
    <section id="chips" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Selection</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Chips</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Filter chips for narrowing projects by sector and service, kept distinct from status badges.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <Label>Single select — {single || "none"}</Label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sector">
            {sectors.map((s) => <Chip key={s} label={s} selected={single === s} onClick={() => setSingle(single === s ? "" : s)} />)}
          </div>
        </div>

        <div style={panel}>
          <Label>Multi select — {multi.length} active</Label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service">
            {services.map((s) => (
              <Chip key={s.l} label={s.l} selected={multi.includes(s.l)} onClick={() => setMulti(multi.includes(s.l) ? multi.filter((m) => m !== s.l) : [...multi, s.l])} />
            ))}
          </div>
        </div>

        <div style={panel}>
          <Label>Removable</Label>
          <div className="flex flex-wrap gap-2 items-center">
            {removable.map((r) => <Chip key={r} label={r} onRemove={() => setRemovable(removable.filter((x) => x !== r))} />)}
            {removable.length === 0 && <span style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>No clients selected.</span>}
            {removable.length < 4 && (
              <button onClick={() => setRemovable(["Meridian Bank", "Atlas Health", "Kestrel Energy", "Orchard Foods"])}
                style={{ fontFamily: F, fontSize: 14, color: "#1B1BFF", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Reset</button>
            )}
          </div>
        </div>

        <div style={panel}>
          <Label>With count — {counted}</Label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Project count">
            {[{ l: "All", c: 50 }, ...services].map((s) => (
              <Chip key={s.l} label={s.l} count={s.c} selected={counted === s.l} onClick={() => setCounted(s.l)} />
            ))}
          </div>
        </div>

        <div style={panel}>
          <Label>States</Label>
          <div className="flex flex-wrap gap-4 items-end">
            {[
              <Chip key="d" label="Default" onClick={() => {}} />,
              <Chip key="h" label="Hover" forceHover onClick={() => {}} />,
              <Chip key="f" label="Focus" forceFocus onClick={() => {}} />,
              <Chip key="s" label="Selected" selected onClick={() => {}} />,
              <Chip key="x" label="Disabled" disabled onClick={() => {}} />,
            ]}
          </div>
        </div>

        <div style={panel}>
          <Label>Chip vs status badge</Label>
          <div className="flex flex-wrap gap-4 items-center" style={{ fontFamily: F }}>
            <Chip label="Healthcare" selected onClick={() => {}} />
            <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 6, background: "#EEFAF4", color: "#00A864" }}>Complete</span>
          </div>
          <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", marginTop: 12, lineHeight: 1.5 }}>Chips are interactive, bordered and sentence-case. Badges are static, tinted and uppercase.</p>
        </div>
      </div>
    </section>
  );
}
