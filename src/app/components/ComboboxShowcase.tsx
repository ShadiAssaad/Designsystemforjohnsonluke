import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, X, Check } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

const CLIENTS = [
  "Meridian Bank", "Northwind Logistics", "Harbour & Co", "Atlas Health", "Kestrel Energy",
  "Fieldstone Capital", "Lumen Retail", "Orchard Foods", "Pennant Aviation", "Quarry Studios",
];

function Combobox({
  multi, value, onChange, label, maxVisible = 2, options = CLIENTS,
}: {
  multi?: boolean; value: string[]; onChange: (v: string[]) => void; label: string; maxVisible?: number; options?: string[];
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  const isSel = (o: string) => value.includes(o);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) { setOpen(false); setQuery(""); }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const select = (o: string) => {
    if (multi) { onChange(isSel(o) ? value.filter((v) => v !== o) : [...value, o]); setQuery(""); input.current?.focus(); }
    else { onChange([o]); setQuery(""); setOpen(false); }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (open && filtered[active]) select(filtered[active]); else setOpen(true); }
    else if (e.key === "Escape") { setOpen(false); setQuery(""); }
    else if (e.key === "Backspace" && multi && !query && value.length) onChange(value.slice(0, -1));
  };

  const shown = multi && !focus && !open ? value.slice(0, maxVisible) : value;
  const overflow = multi && !focus && !open ? value.length - maxVisible : 0;
  const single = !multi ? value[0] : undefined;

  return (
    <div ref={wrap} style={{ position: "relative" }}>
      <label htmlFor={id} style={{ display: "block", fontFamily: F, fontSize: 14, fontWeight: 700, color: "#0A0A0F", marginBottom: 6 }}>{label}</label>
      <div
        onClick={() => { input.current?.focus(); setOpen(true); }}
        style={{
          minHeight: 44, boxSizing: "border-box", display: "flex", alignItems: "center", flexWrap: multi ? "wrap" : "nowrap", gap: 6, padding: "6px 12px",
          background: "#FFFFFF", borderRadius: 6, cursor: "text",
          border: focus ? `2px solid ${BLUE}` : "1px solid rgba(0,0,0,0.10)", transition: "border-color 140ms ease-out",
        }}
      >
        {multi && shown.map((v) => (
          <span key={v} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 28, padding: "0 4px 0 10px", borderRadius: 6, background: "#EEEEFF", fontFamily: F, fontSize: 14, color: "#0A0A0F" }}>
            {v}
            <button type="button" aria-label={`Remove ${v}`} onClick={(e) => { e.stopPropagation(); onChange(value.filter((x) => x !== v)); }}
              style={{ border: "none", background: "transparent", display: "flex", padding: 4, borderRadius: 4, cursor: "pointer", color: "#5A5A6A" }}>
              <X size={14} />
            </button>
          </span>
        ))}
        {overflow > 0 && (
          <span style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 10px", borderRadius: 6, background: "#F4F4F6", fontFamily: F, fontSize: 14, fontWeight: 700, color: "#5A5A6A" }}>+{overflow}</span>
        )}
        <input
          id={id}
          ref={input}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          value={open || multi ? query : (single ?? "")}
          placeholder={multi ? (value.length ? "" : "Select clients") : single ? undefined : "Select a client"}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => { setFocus(true); if (!multi) setOpen(true); }}
          onBlur={() => setFocus(false)}
          onKeyDown={onKey}
          style={{ flex: 1, minWidth: 80, border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 14, color: "#0A0A0F", padding: "4px 0" }}
        />
        <ChevronDown size={16} color="#5A5A6A" aria-hidden style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 140ms ease-out", flexShrink: 0 }} />
      </div>
      {open && (
        <ul id={`${id}-list`} role="listbox" aria-multiselectable={multi} style={{ position: "absolute", zIndex: 10, top: "100%", marginTop: 6, left: 0, right: 0, maxHeight: 220, overflowY: "auto", margin: "6px 0 0", padding: 4, listStyle: "none", background: "#FFFFFF", borderRadius: 6, border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)" }}>
          {filtered.length === 0 && <li style={{ padding: "10px 12px", fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>No clients match “{query}”</li>}
          {filtered.map((o, i) => (
            <li key={o} role="option" aria-selected={isSel(o)}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); select(o); }}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 4, fontFamily: F, fontSize: 14, cursor: "pointer", color: "#0A0A0F", background: i === active ? "#EEEEFF" : "transparent", fontWeight: isSel(o) ? 700 : 400 }}>
              {o}
              {isSel(o) && <Check size={16} color={BLUE} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ComboboxShowcase() {
  const [single, setSingle] = useState<string[]>(["Atlas Health"]);
  const [multi, setMulti] = useState<string[]>(["Meridian Bank", "Harbour & Co", "Kestrel Energy", "Lumen Retail", "Orchard Foods"]);

  return (
    <section id="combobox" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Combobox</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Type to filter a long list. Single and multi-select, fully keyboard operable.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10" style={{ minHeight: 340 }}>
          <div>
            <p className="mb-5" style={eyebrow}>Single select</p>
            <Combobox label="Client" value={single} onChange={setSingle} />
          </div>
          <div>
            <p className="mb-5" style={eyebrow}>Multi select with chips</p>
            <Combobox multi label="Stakeholder clients" value={multi} onChange={setMulti} />
            <p style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A", marginTop: 8 }}>
              Chips collapse to “+N” when the field is not focused. Backspace removes the last chip.
            </p>
          </div>
        </div>
        <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#F4F4F6" }}>
          <p style={{ fontFamily: F, fontSize: 14, color: "#0A0A0F", lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 700 }}>Keyboard:</strong> ↑ ↓ move the highlight, Enter selects, Esc closes and clears the query.
          </p>
        </div>
      </div>
    </section>
  );
}
