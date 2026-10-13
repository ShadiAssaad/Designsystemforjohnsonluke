import { useLayoutEffect, useRef, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { LayoutGrid, List, Calendar, Columns3 } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

type Opt = { value: string; label: string; icon?: React.ReactNode; disabled?: boolean };

function Segmented({ options, defaultValue, label, forceFocus, forceHover, disabled }: {
  options: Opt[]; defaultValue: string; label: string; forceFocus?: string; forceHover?: string; disabled?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [value, options.length]);

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(v) => v && setValue(v)}
      aria-label={label}
      disabled={disabled}
      style={{ position: "relative", display: "inline-flex", padding: 3, borderRadius: 6, background: "#F4F4F6", opacity: disabled ? 0.5 : 1 }}
    >
      <span aria-hidden style={{
        position: "absolute", top: 3, bottom: 3, left: 0, transform: `translateX(${thumb.left}px)`, width: thumb.width,
        background: "#FFFFFF", borderRadius: 4, boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        transition: ready ? "transform 180ms ease-out, width 180ms ease-out" : "none",
      }} />
      {options.map((o) => {
        const sel = value === o.value;
        const h = (hover === o.value || forceHover === o.value) && !sel && !disabled;
        const f = focus === o.value || forceFocus === o.value;
        return (
          <ToggleGroup.Item
            key={o.value}
            value={o.value}
            disabled={o.disabled}
            ref={(el) => { refs.current[o.value] = el; }}
            onMouseEnter={() => setHover(o.value)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setFocus(o.value)}
            onBlur={() => setFocus(null)}
            style={{
              position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
              height: 32, padding: "0 14px", border: "none", borderRadius: 4, background: "transparent", whiteSpace: "nowrap",
              fontFamily: F, fontSize: 14, fontWeight: sel ? 700 : 400,
              color: o.disabled ? "#BABAC4" : sel ? "#0A0A0F" : h ? "#0A0A0F" : "#5A5A6A",
              cursor: o.disabled || disabled ? "not-allowed" : "pointer", outline: "none",
              boxShadow: f ? `inset 0 0 0 2px ${BLUE}` : "none", transition: "color 140ms ease-out",
            }}
          >
            {o.icon}{o.label}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}

const two: Opt[] = [{ value: "m", label: "Monthly" }, { value: "q", label: "Quarterly" }];
const three: Opt[] = [{ value: "d", label: "Discover" }, { value: "p", label: "Define" }, { value: "x", label: "Deliver" }];
const four: Opt[] = [{ value: "all", label: "All" }, { value: "act", label: "Active" }, { value: "rev", label: "In review" }, { value: "done", label: "Complete" }];
const icons: Opt[] = [
  { value: "grid", label: "Grid", icon: <LayoutGrid size={16} /> },
  { value: "list", label: "List", icon: <List size={16} /> },
  { value: "board", label: "Board", icon: <Columns3 size={16} /> },
  { value: "cal", label: "Timeline", icon: <Calendar size={16} /> },
];

export function SegmentedControlShowcase() {
  const cell = (t: string, c: React.ReactNode) => <div><p className="mb-3" style={eyebrow}>{t}</p>{c}</div>;
  return (
    <section id="segmented" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Segmented Control</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Switch between mutually exclusive views. The white thumb slides in 180ms on an Off White track.
      </p>
      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {cell("Two options", <Segmented label="Billing cycle" options={two} defaultValue="m" />)}
          {cell("Three options", <Segmented label="Phase" options={three} defaultValue="p" />)}
          {cell("Four options", <Segmented label="Status filter" options={four} defaultValue="act" />)}
          {cell("Icon + label", <Segmented label="View" options={icons} defaultValue="grid" />)}
        </div>
        <p className="mt-10 mb-5" style={eyebrow}>States</p>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {cell("Hover (Define)", <Segmented label="Hover" options={three} defaultValue="d" forceHover="p" />)}
          {cell("Focus (Deliver)", <Segmented label="Focus" options={three} defaultValue="d" forceFocus="x" />)}
          {cell("Disabled option", <Segmented label="Disabled option" options={[three[0], three[1], { ...three[2], disabled: true }]} defaultValue="d" />)}
          {cell("Disabled", <Segmented label="Disabled" options={three} defaultValue="d" disabled />)}
        </div>
      </div>
    </section>
  );
}
