import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const F = "'Rethink Sans', sans-serif";

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color = "#0000FF",
}: {
  value: number[];
  onChange: (v: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        touchAction: "none",
        width: "100%",
        height: 20,
      }}
    >
      <SliderPrimitive.Track
        style={{
          position: "relative",
          flexGrow: 1,
          height: 4,
          background: "rgba(0,0,0,0.10)",
          borderRadius: 9999,
        }}
      >
        <SliderPrimitive.Range
          style={{
            position: "absolute",
            height: "100%",
            background: disabled ? "#BABAC4" : color,
            borderRadius: "inherit",
          }}
        />
      </SliderPrimitive.Track>
      {value.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          style={{
            display: "block",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: `1.5px solid ${disabled ? "#BABAC4" : color}`,
            cursor: disabled ? "not-allowed" : "pointer",
            outline: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            opacity: disabled ? 0.55 : 1,
          }}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
  disabled,
  formatValue,
}: {
  label: string;
  value: number[];
  onChange: (v: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (v: number[]) => string;
}) {
  const display = formatValue ? formatValue(value) : `${value[0]}%`;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontFamily: F, color: disabled ? "#BABAC4" : "#0A0A0F" }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: disabled ? "#BABAC4" : "#0000FF" }}>{display}</span>
      </div>
      <Slider value={value} onChange={onChange} min={min} max={max} step={step} disabled={disabled} />
    </div>
  );
}

export function SliderShowcase() {
  const [budget, setBudget] = useState([60]);
  const [opacity, setOpacity] = useState([35]);
  const [range, setRange] = useState([8, 24]);

  return (
    <section id="sliders" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Sliders
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        4px track, 18px thumb. Keyboard navigable. Supports single value and two-thumb range selection.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
              Single value
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <SliderRow label="Budget allocation" value={budget} onChange={setBudget} />
              <SliderRow label="Pattern opacity" value={opacity} onChange={setOpacity} />
              <SliderRow label="Locked (disabled)" value={[40]} onChange={() => {}} disabled />
            </div>
          </div>

          <div>
            <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
              Range
            </p>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F" }}>Project timeline</span>
                <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0000FF" }}>
                  Wk {range[0]}–{range[1]}
                </span>
              </div>
              <Slider value={range} onChange={setRange} min={1} max={52} step={1} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>Wk 1</span>
                <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>Wk 52</span>
              </div>

              <div style={{ marginTop: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F" }}>Budget band (£k)</span>
                  <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0000FF" }}>
                    £{[20, 80][0]}k–£{[20, 80][1]}k
                  </span>
                </div>
                <Slider value={[20, 80]} onChange={() => {}} min={0} max={200} step={5} disabled />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>£0</span>
                  <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>£200k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Always show the current value adjacent to the label. Range sliders define a bounded selection — never use them for single min or max alone.
        </p>
      </div>
    </section>
  );
}
