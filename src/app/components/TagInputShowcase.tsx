import { useId, useRef, useState } from "react";
import { X } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function TagInput({
  label, helper, initial, max, placeholder = "Add a tag", forceDuplicate, disabled,
}: {
  label: string; helper?: string; initial: string[]; max?: number; placeholder?: string; forceDuplicate?: string; disabled?: boolean;
}) {
  const id = useId();
  const [tags, setTags] = useState(initial);
  const [text, setText] = useState(forceDuplicate ?? "");
  const [error, setError] = useState(forceDuplicate ? `“${forceDuplicate}” has already been added.` : "");
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const atMax = max !== undefined && tags.length >= max;

  const commit = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) { setError(`“${t}” has already been added.`); return; }
    if (atMax) return;
    setTags([...tags, t]); setText(""); setError("");
  };

  const borderColor = error ? "#DC2626" : focus ? BLUE : "rgba(0,0,0,0.10)";

  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontFamily: F, fontSize: 14, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", marginBottom: 6 }}>{label}</label>
      <div
        onClick={() => ref.current?.focus()}
        style={{ minHeight: 44, boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 6,
          background: disabled ? "#F4F4F6" : "#FFFFFF", cursor: disabled ? "not-allowed" : "text",
          border: `${focus || error ? 2 : 1}px solid ${borderColor}`, transition: "border-color 140ms ease-out" }}
      >
        {tags.map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 28, padding: "0 4px 0 10px", borderRadius: 6, background: "#EEEEFF", fontFamily: F, fontSize: 14, color: "#0A0A0F" }}>
            {t}
            <button type="button" aria-label={`Remove ${t}`} disabled={disabled}
              onClick={(e) => { e.stopPropagation(); setTags(tags.filter((x) => x !== t)); setError(""); }}
              style={{ border: "none", background: "transparent", display: "flex", padding: 4, borderRadius: 4, cursor: "pointer", color: "#5A5A6A" }}>
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          id={id}
          ref={ref}
          value={text}
          disabled={disabled || atMax}
          placeholder={atMax ? "" : tags.length ? "" : placeholder}
          aria-invalid={!!error}
          aria-describedby={`${id}-help`}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => {
            const v = e.target.value;
            if (v.includes(",")) { const parts = v.split(","); parts.slice(0, -1).forEach(commit); setText(parts[parts.length - 1]); }
            else { setText(v); if (error) setError(""); }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); commit(text); }
            else if (e.key === "Backspace" && !text && tags.length) setTags(tags.slice(0, -1));
          }}
          style={{ flex: 1, minWidth: 90, border: "none", outline: "none", background: "transparent", fontFamily: F, fontSize: 14, color: "#0A0A0F", padding: "4px 0", cursor: disabled ? "not-allowed" : "text" }}
        />
      </div>
      <div id={`${id}-help`} style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: F, fontSize: 12 }}>
        <span role={error ? "alert" : undefined} style={{ color: error ? "#DC2626" : "#5A5A6A" }}>
          {error || (atMax ? `Maximum of ${max} tags reached. Remove one to add another.` : helper)}
        </span>
        {max !== undefined && <span style={{ color: atMax ? "#D97706" : "#5A5A6A", fontWeight: atMax ? 700 : 400 }}>{tags.length}/{max}</span>}
      </div>
    </div>
  );
}

export function TagInputShowcase() {
  return (
    <section id="taginput" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Tag Input</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Free-text tags. Enter or comma adds, Backspace removes the last, and each chip has its own remove button.
      </p>
      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-5" style={eyebrow}>Default</p>
            <TagInput label="Project themes" helper="Press Enter or comma to add." initial={["Brand strategy", "Rebrand"]} />
          </div>
          <div>
            <p className="mb-5" style={eyebrow}>Max tags reached</p>
            <TagInput label="Workstreams" max={3} initial={["Research", "Positioning", "Identity"]} />
          </div>
          <div>
            <p className="mb-5" style={eyebrow}>Duplicate error</p>
            <TagInput label="Deliverables" initial={["Brand guidelines", "Workshop deck"]} forceDuplicate="Brand guidelines" />
          </div>
          <div>
            <p className="mb-5" style={eyebrow}>Disabled</p>
            <TagInput label="Project themes" disabled initial={["Archived", "Phase 3"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
