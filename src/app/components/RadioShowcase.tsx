import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const RING = `0 0 0 2px #FFFFFF, 0 0 0 4px ${BLUE}`;

const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };
const stateLabel: React.CSSProperties = { fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 };

function Radio({
  value, label, disabled, error, forceFocus, forceHover, checkedOverride,
}: {
  value: string; label: string; disabled?: boolean; error?: boolean; forceFocus?: boolean; forceHover?: boolean; checkedOverride?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const hovered = (hover || forceHover) && !disabled;
  const focused = focus || forceFocus;
  return (
    <label
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", fontFamily: F, fontSize: 14, color: disabled ? "#BABAC4" : "#0A0A0F" }}
    >
      <RadioGroup.Item
        value={value}
        disabled={disabled}
        data-checked-override={checkedOverride}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: 18, height: 18, borderRadius: 9999, padding: 0, flexShrink: 0,
          border: `1.5px solid ${error ? "#DC2626" : disabled ? "rgba(0,0,0,0.10)" : hovered ? BLUE : "rgba(0,0,0,0.20)"}`,
          background: disabled ? "#F4F4F6" : "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center",
          outline: "none", cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: focused ? RING : "none",
          transition: "border-color 140ms ease-out, box-shadow 140ms ease-out",
        }}
      >
        <RadioGroup.Indicator style={{ width: 8, height: 8, borderRadius: 9999, background: disabled ? "#BABAC4" : error ? "#DC2626" : BLUE, display: "block" }} />
      </RadioGroup.Item>
      {label}
    </label>
  );
}

function Group({
  options, orientation = "vertical", defaultValue, disabled, error, forceFocusOn, forceHoverOn, legend, errorText,
}: {
  options: { value: string; label: string; disabled?: boolean }[];
  orientation?: "vertical" | "horizontal";
  defaultValue?: string; disabled?: boolean; error?: boolean; forceFocusOn?: string; forceHoverOn?: string; legend: string; errorText?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <div>
      <p style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 12 }}>{legend}</p>
      <RadioGroup.Root
        value={value}
        onValueChange={setValue}
        orientation={orientation}
        disabled={disabled}
        aria-label={legend}
        aria-invalid={error || undefined}
        style={{ display: "flex", flexDirection: orientation === "vertical" ? "column" : "row", flexWrap: "wrap", gap: orientation === "vertical" ? 12 : 24 }}
      >
        {options.map((o) => (
          <Radio key={o.value} value={o.value} label={o.label} disabled={disabled || o.disabled} error={error}
            forceFocus={forceFocusOn === o.value} forceHover={forceHoverOn === o.value} />
        ))}
      </RadioGroup.Root>
      {error && errorText && <p role="alert" style={{ fontSize: 12, fontFamily: F, color: "#DC2626", marginTop: 8 }}>{errorText}</p>}
    </div>
  );
}

const engagement = [
  { value: "strategy", label: "Brand strategy" },
  { value: "identity", label: "Identity design" },
  { value: "comms", label: "Communications" },
];

function RadioCards() {
  const [value, setValue] = useState("workshop");
  const cards = [
    { value: "discovery", title: "Discovery sprint", body: "Two weeks. Stakeholder interviews and a research readout." },
    { value: "workshop", title: "Strategy workshop", body: "Three days. Positioning, audience and a clear brief." },
    { value: "retainer", title: "Design retainer", body: "Ongoing. A dedicated team across phases and channels." },
    { value: "audit", title: "Brand audit", body: "Currently unavailable for new clients.", disabled: true },
  ];
  return (
    <RadioGroup.Root value={value} onValueChange={setValue} aria-label="Engagement model"
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
      {cards.map((c) => <RadioCard key={c.value} {...c} selected={value === c.value} />)}
    </RadioGroup.Root>
  );
}

function RadioCard({ value, title, body, selected, disabled, forceHover, forceFocus }: {
  value: string; title: string; body: string; selected?: boolean; disabled?: boolean; forceHover?: boolean; forceFocus?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const hovered = (hover || forceHover) && !disabled && !selected;
  return (
    <RadioGroup.Item
      value={value}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        textAlign: "left", fontFamily: F, borderRadius: 10, padding: selected ? 15 : 16,
        border: selected ? `2px solid ${BLUE}` : `1px solid ${hovered ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)"}`,
        background: selected ? "#EEEEFF" : disabled ? "#F4F4F6" : "#FFFFFF",
        cursor: disabled ? "not-allowed" : "pointer", outline: "none",
        boxShadow: focus || forceFocus ? RING : "none",
        display: "flex", flexDirection: "column", gap: 4,
        transition: "border-color 140ms ease-out, background 140ms ease-out, box-shadow 140ms ease-out",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 16, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F" }}>
        {title}
        <span style={{ width: 18, height: 18, borderRadius: 9999, border: `1.5px solid ${selected ? BLUE : disabled ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.20)"}`, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {selected && <span style={{ width: 8, height: 8, borderRadius: 9999, background: BLUE }} />}
        </span>
      </span>
      <span style={{ fontSize: 14, color: disabled ? "#BABAC4" : "#5A5A6A", lineHeight: 1.5 }}>{body}</span>
    </RadioGroup.Item>
  );
}

function CardStateGallery() {
  return (
    <RadioGroup.Root defaultValue="sel" aria-label="Radio card states" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
      {[
        { l: "Default", v: "d", t: "Brand audit", props: {} },
        { l: "Hover", v: "h", t: "Discovery sprint", props: { forceHover: true } },
        { l: "Focus", v: "f", t: "Design retainer", props: { forceFocus: true } },
        { l: "Selected", v: "sel", t: "Strategy workshop", props: { selected: true } },
        { l: "Disabled", v: "x", t: "Phase review", props: { disabled: true } },
      ].map((s) => (
        <div key={s.v}>
          <p style={stateLabel}>{s.l}</p>
          <RadioCard value={s.v} title={s.t} body="Scope and timeline." {...s.props} />
        </div>
      ))}
    </RadioGroup.Root>
  );
}

export function RadioShowcase() {
  return (
    <section id="radios" className="mb-16">
      <p className="mb-2" style={eyebrow}>Forms</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Radio Buttons</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Single choice from a short list. 18px control with an Electric Blue dot, plus a card variant for richer options.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <p className="mb-5" style={eyebrow}>Groups</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <Group legend="Service line" options={engagement} defaultValue="strategy" />
          <Group legend="Project phase" orientation="horizontal" defaultValue="design"
            options={[{ value: "discover", label: "Discover" }, { value: "define", label: "Define" }, { value: "design", label: "Design" }, { value: "deliver", label: "Deliver" }]} />
        </div>

        <p className="mb-5" style={eyebrow}>States</p>
        <div className="grid gap-8 mb-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
          <div><p style={stateLabel}>Unchecked</p><Group legend="Kickoff format" options={[{ value: "a", label: "On site" }]} /></div>
          <div><p style={stateLabel}>Checked</p><Group legend="Kickoff format" defaultValue="a" options={[{ value: "a", label: "Remote" }]} /></div>
          <div><p style={stateLabel}>Hover</p><Group legend="Kickoff format" forceHoverOn="a" options={[{ value: "a", label: "Hybrid" }]} /></div>
          <div><p style={stateLabel}>Focus</p><Group legend="Kickoff format" forceFocusOn="a" defaultValue="a" options={[{ value: "a", label: "Remote" }]} /></div>
          <div><p style={stateLabel}>Disabled</p><Group legend="Kickoff format" disabled defaultValue="b" options={[{ value: "a", label: "Unselected" }, { value: "b", label: "Selected" }]} /></div>
          <div><p style={stateLabel}>Error</p><Group legend="Billing model" error errorText="Choose a billing model." options={[{ value: "a", label: "Fixed fee" }, { value: "b", label: "Time and materials" }]} /></div>
        </div>

        <p className="mb-5" style={eyebrow}>Radio card</p>
        <RadioCards />
        <div className="mt-8"><CardStateGallery /></div>
      </div>
    </section>
  );
}
