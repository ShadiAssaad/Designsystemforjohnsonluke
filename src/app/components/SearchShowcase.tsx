import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };
const stateLabel: React.CSSProperties = { ...eyebrow, marginBottom: 8 };

const DATA = [
  "Meridian Bank — brand refresh",
  "Meridian Bank — digital strategy",
  "Northwind Logistics — identity system",
  "Harbour & Co — positioning workshop",
  "Atlas Health — service design",
  "Atlas Health — phase 2 research",
  "Kestrel Energy — annual report",
];

function SearchField({
  value, onChange, loading, forceFocus, forceHover, disabled, placeholder = "Search projects and clients", showList, forceHighlight, ariaLabel = "Search projects",
}: {
  value: string; onChange?: (v: string) => void; loading?: boolean; forceFocus?: boolean; forceHover?: boolean; disabled?: boolean;
  placeholder?: string; showList?: boolean; forceHighlight?: number; ariaLabel?: string;
}) {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const results = value ? DATA.filter((d) => d.toLowerCase().includes(value.toLowerCase())) : [];
  const listOpen = showList ?? (open && value.length > 0 && !loading);
  const highlight = forceHighlight ?? active;
  const focused = focus || forceFocus;

  useEffect(() => {
    const h = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const pick = (v: string) => { onChange?.(v); setOpen(false); };

  return (
    <div ref={wrap} style={{ position: "relative", width: "100%" }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: 44, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", borderRadius: 6,
          background: disabled ? "#F4F4F6" : "#FFFFFF",
          border: focused ? `2px solid ${BLUE}` : `1px solid ${hover || forceHover ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)"}`,
          margin: focused ? 0 : 0, boxSizing: "border-box", transition: "border-color 140ms ease-out",
        }}
      >
        <Search size={16} color={disabled ? "#BABAC4" : "#5A5A6A"} aria-hidden />
        <input
          ref={ref}
          role="combobox"
          aria-expanded={listOpen}
          aria-label={ariaLabel}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => { onChange?.(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => { setFocus(true); setOpen(true); }}
          onBlur={() => setFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter" && results[active]) pick(results[active]);
            if (e.key === "Escape") setOpen(false);
          }}
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 14, color: disabled ? "#BABAC4" : "#0A0A0F", cursor: disabled ? "not-allowed" : "text" }}
        />
        {loading && <Loader2 size={16} color={BLUE} aria-label="Loading" style={{ animation: "jl-spin 800ms linear infinite" }} />}
        {!loading && value && !disabled && (
          <button type="button" aria-label="Clear search" onMouseDown={(e) => e.preventDefault()} onClick={() => { onChange?.(""); ref.current?.focus(); }}
            style={{ border: "none", background: "transparent", padding: 4, borderRadius: 6, display: "flex", cursor: "pointer", color: "#5A5A6A" }}>
            <X size={16} />
          </button>
        )}
      </div>
      {listOpen && (
        <ul role="listbox" style={{ position: "absolute", top: 50, left: 0, right: 0, zIndex: 10, margin: 0, padding: 4, listStyle: "none", background: "#FFFFFF", borderRadius: 6, border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)" }}>
          {results.length === 0 ? (
            <li style={{ padding: "10px 12px", fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>No results for “{value}”</li>
          ) : results.map((r, i) => (
            <li key={r} role="option" aria-selected={i === highlight}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => { e.preventDefault(); pick(r); }}
              style={{ padding: "10px 12px", borderRadius: 4, fontFamily: F, fontSize: 14, color: "#0A0A0F", cursor: "pointer", background: i === highlight ? "#EEEEFF" : "transparent" }}>
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Demo({ label, children, tall }: { label: string; children: React.ReactNode; tall?: boolean }) {
  return <div style={{ minHeight: tall ? 220 : undefined }}><p style={stateLabel}>{label}</p>{children}</div>;
}

export function SearchShowcase() {
  const [live, setLive] = useState("");
  const [filled, setFilled] = useState("Meridian");
  const [loadingVal, setLoadingVal] = useState("Atlas");
  const [forceList, setForceList] = useState("Meridian");
  const [none, setNone] = useState("Zephyr");

  return (
    <section id="search" className="mb-16">
      <style>{`@keyframes jl-spin { to { transform: rotate(360deg); } }`}</style>
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Search</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Search field with leading icon, clear action, loading indicator and a suggestions list with keyboard navigation.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <p className="mb-5" style={eyebrow}>Live example</p>
        <div style={{ maxWidth: 480, minHeight: 250 }} className="mb-8">
          <SearchField value={live} onChange={setLive} placeholder="Try “Meridian” or “Atlas”" />
        </div>

        <p className="mb-5" style={eyebrow}>States</p>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <Demo label="Default"><SearchField value="" onChange={() => {}} /></Demo>
          <Demo label="Hover"><SearchField value="" forceHover onChange={() => {}} /></Demo>
          <Demo label="Focus"><SearchField value="" forceFocus onChange={() => {}} /></Demo>
          <Demo label="Filled with clear"><SearchField value={filled} onChange={setFilled} /></Demo>
          <Demo label="Loading"><SearchField value={loadingVal} onChange={setLoadingVal} loading /></Demo>
          <Demo label="Disabled"><SearchField value="" disabled onChange={() => {}} placeholder="Search unavailable" /></Demo>
          <Demo label="Suggestions open" tall><SearchField value={forceList} onChange={setForceList} showList forceFocus forceHighlight={1} /></Demo>
          <Demo label="No results" tall><SearchField value={none} onChange={setNone} showList forceFocus /></Demo>
        </div>
      </div>
    </section>
  );
}
