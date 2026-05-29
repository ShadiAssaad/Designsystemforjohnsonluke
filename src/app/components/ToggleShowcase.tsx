import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";

const F = "'Rethink Sans', sans-serif";

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={disabled ? undefined : onChange}
      disabled={disabled}
      style={{
        width: 40,
        height: 24,
        borderRadius: 9999,
        background: checked ? "#1B1BFF" : "rgba(0,0,0,0.10)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        position: "relative",
        flexShrink: 0,
        opacity: disabled ? 0.45 : 1,
        transition: "background 180ms ease-out",
      }}
    >
      <Switch.Thumb
        style={{
          display: "block",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#FFFFFF",
          position: "absolute",
          top: 3,
          left: 3,
          transition: "transform 180ms ease-out",
          transform: checked ? "translateX(16px)" : "translateX(0)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        }}
      />
    </Switch.Root>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked = false,
  disabled = false,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div>
        <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: disabled ? "#BABAC4" : "#0A0A0F", marginBottom: description ? 2 : 0 }}>
          {label}
        </p>
        {description && (
          <p style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A", lineHeight: 1.4 }}>{description}</p>
        )}
      </div>
      <Toggle checked={on} onChange={setOn} disabled={disabled} />
    </div>
  );
}

export function ToggleShowcase() {
  const [off, setOff] = useState(false);
  const [on, setOn] = useState(true);

  return (
    <section id="toggles" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Toggles
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        40×24px pill. Thumb slides 16px on activation. Electric Blue fill when on. Binary — no intermediate state.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>States</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { label: "Off", checked: off, onChange: setOff },
                { label: "On", checked: on, onChange: setOn },
                { label: "Disabled (off)", checked: false, onChange: () => {}, disabled: true },
                { label: "Disabled (on)", checked: true, onChange: () => {}, disabled: true },
              ].map(({ label, checked, onChange, disabled }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Toggle checked={checked} onChange={onChange} disabled={disabled} />
                  <span style={{ fontSize: 13, fontFamily: F, color: disabled ? "#BABAC4" : "#0A0A0F" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Preference rows</p>
            <ToggleRow label="Email notifications" description="Receive project updates by email" defaultChecked />
            <ToggleRow label="Weekly digest" description="A summary of activity every Monday" />
            <ToggleRow label="Client portal access" description="Allow clients to view live deliverables" defaultChecked />
            <ToggleRow label="Legacy exports" description="Unavailable on this plan" disabled />
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Toggle labels describe the thing being controlled, not the action — "Email notifications" not "Enable email notifications." The switch alone communicates the action.
        </p>
      </div>
    </section>
  );
}
