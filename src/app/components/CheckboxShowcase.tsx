import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";

const F = "'Rethink Sans', sans-serif";

function CheckMark() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DashMark() {
  return (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
      <rect width="10" height="2" rx="1" fill="#fff" />
    </svg>
  );
}

function CheckItem({
  label,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
}: {
  label: string;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    indeterminate ? "indeterminate" : defaultChecked
  );
  const active = checked === true || checked === "indeterminate";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={disabled ? undefined : (v) => setChecked(v === "indeterminate" ? "indeterminate" : !!v)}
        disabled={disabled}
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: `1.5px solid ${active ? "#1B1BFF" : "rgba(0,0,0,0.22)"}`,
          background: active ? "#1B1BFF" : "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          flexShrink: 0,
          outline: "none",
          opacity: disabled ? 0.45 : 1,
          transition: "border 150ms ease-out, background 150ms ease-out",
        }}
      >
        <Checkbox.Indicator style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {checked === "indeterminate" ? <DashMark /> : <CheckMark />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        style={{ fontSize: 13, fontFamily: F, color: disabled ? "#BABAC4" : "#0A0A0F", userSelect: "none", cursor: disabled ? "not-allowed" : "pointer" }}
        onClick={() => { if (!disabled) setChecked(prev => prev === true ? false : true); }}
      >
        {label}
      </span>
    </div>
  );
}

function CheckboxGroup() {
  const options = ["Brand Strategy", "Positioning & Messaging", "Identity Design", "Brand Communications"];
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "Brand Strategy": true, "Positioning & Messaging": false, "Identity Design": true, "Brand Communications": false,
  });

  const allChecked = options.every(o => checked[o]);
  const someChecked = options.some(o => checked[o]) && !allChecked;
  const parentState: boolean | "indeterminate" = allChecked ? true : someChecked ? "indeterminate" : false;

  const toggle = (o: string) => setChecked(prev => ({ ...prev, [o]: !prev[o] }));
  const toggleAll = () => {
    const v = !allChecked;
    setChecked(Object.fromEntries(options.map(o => [o, v])));
  };

  const rootStyle = (active: boolean): React.CSSProperties => ({
    width: 18, height: 18, borderRadius: 4,
    border: `1.5px solid ${active ? "#1B1BFF" : "rgba(0,0,0,0.22)"}`,
    background: active ? "#1B1BFF" : "#FFFFFF",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0, outline: "none",
    transition: "border 150ms ease-out, background 150ms ease-out",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <Checkbox.Root checked={parentState} onCheckedChange={toggleAll} style={rootStyle(allChecked || someChecked)}>
          <Checkbox.Indicator style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {parentState === "indeterminate" ? <DashMark /> : <CheckMark />}
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F", userSelect: "none", cursor: "pointer" }} onClick={toggleAll}>
          Select all services
        </span>
      </div>
      {options.map(opt => (
        <div key={opt} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Checkbox.Root checked={checked[opt]} onCheckedChange={() => toggle(opt)} style={rootStyle(checked[opt])}>
            <Checkbox.Indicator style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckMark />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", userSelect: "none", cursor: "pointer" }} onClick={() => toggle(opt)}>
            {opt}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CheckboxShowcase() {
  return (
    <section id="checkboxes" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Checkboxes
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        18×18px. Electric Blue fill on select. Supports indeterminate for partial group selection.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>States</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <CheckItem label="Unchecked" />
              <CheckItem label="Checked" defaultChecked />
              <CheckItem label="Indeterminate" indeterminate />
              <CheckItem label="Disabled (unchecked)" disabled />
              <CheckItem label="Disabled (checked)" defaultChecked disabled />
            </div>
          </div>
          <div>
            <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Group — select all</p>
            <CheckboxGroup />
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Indeterminate is reserved for group parent checkboxes — never used on standalone items. Clicking the parent cycles through: none → all → none.
        </p>
      </div>
    </section>
  );
}
