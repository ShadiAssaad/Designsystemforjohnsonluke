import { useState } from "react";

function InsideLabelInput({
  label,
  placeholder,
  type = "text",
  error,
  success,
  disabled,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  value: string;
  onChange?: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  let borderColor = "rgba(0,0,0,0.10)";
  let borderWidth = "1px";
  if (focused && !disabled) { borderColor = "#1B1BFF"; borderWidth = "1.5px"; }
  if (error) { borderColor = "#DC2626"; borderWidth = "1.5px"; }
  if (success) { borderColor = "#00A864"; borderWidth = "1.5px"; }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <div
        style={{
          height: 56,
          background: disabled ? "#F4F4F6" : "#FFFFFF",
          border: `${borderWidth} solid ${borderColor}`,
          borderRadius: 6,
          padding: "10px 14px 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border 180ms ease-out",
          position: "relative",
        }}
        onClick={() => {
          if (!disabled) {
            const input = document.querySelector(`[data-label="${label}"]`) as HTMLInputElement;
            input?.focus();
          }
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: disabled ? "#BABAC4" : "#5A5A6A",
            lineHeight: 1.2,
          }}
        >
          {label}
        </span>
        <input
          data-label={label}
          type={type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            fontSize: 15,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            color: disabled ? "#BABAC4" : "#0A0A0F",
            background: "transparent",
            border: "none",
            outline: "none",
            padding: 0,
            width: "100%",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
      </div>
      {error && (
        <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#DC2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function InsideLabelTextarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  return (
    <div
      style={{
        minHeight: 100,
        background: "#FFFFFF",
        border: `${focused ? "1.5px" : "1px"} solid ${focused ? "#1B1BFF" : "rgba(0,0,0,0.10)"}`,
        borderRadius: 6,
        padding: "10px 14px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        transition: "border 180ms ease-out",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#5A5A6A",
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontSize: 15,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          color: "#0A0A0F",
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
          resize: "vertical",
          minHeight: 60,
        }}
      />
    </div>
  );
}

function InsideLabelSelect({ label }: { label: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        height: 56,
        background: "#FFFFFF",
        border: `${focused ? "1.5px" : "1px"} solid ${focused ? "#1B1BFF" : "rgba(0,0,0,0.10)"}`,
        borderRadius: 6,
        padding: "10px 14px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative",
        transition: "border 180ms ease-out",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: "#5A5A6A",
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
      <select
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontSize: 15,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 400,
          color: "#0A0A0F",
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
          appearance: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <option value="">Select an option</option>
        <option>Brand Strategy</option>
        <option>Positioning</option>
        <option>Identity Design</option>
        <option>Communications</option>
      </select>
      {/* Chevron */}
      <svg
        style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="16" height="16" viewBox="0 0 16 16" fill="none"
      >
        <path d="M4 6l4 4 4-4" stroke="#5A5A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function InputShowcase() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("jane@johnsonluke.com");
  const [v3, setV3] = useState("Johnson Luke Ltd.");
  const [v4, setV4] = useState("invalid-email");

  return (
    <section id="inputs" className="mb-16">
      <h2
        className="mb-2"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Input Fields
      </h2>
      <p
        className="mb-8"
        style={{ fontSize: 14, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}
      >
        Inside-label pattern: label and value share the same box. Height 56px. Label stays — it never floats or animates.
      </p>

      <div
        className="p-8 rounded-[10px]"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}
      >
        {/* State showcase */}
        <p
          className="mb-5"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          States
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Default (empty)</p>
            <InsideLabelInput label="First name" placeholder="Jane" value={v1} onChange={setV1} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Filled</p>
            <InsideLabelInput label="Email address" placeholder="hello@domain.com" value={v2} onChange={setV2} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Focus (click to try)</p>
            <InsideLabelInput label="Company" placeholder="Johnson Luke Ltd." value={v3} onChange={setV3} />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Error</p>
            <InsideLabelInput label="Contact email" placeholder="hello@domain.com" value={v4} onChange={setV4} error="Please enter a valid email address." />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Success</p>
            <InsideLabelInput label="Username" placeholder="@handle" value="@johnsonluke" success />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Disabled</p>
            <InsideLabelInput label="Account type" placeholder="" value="Enterprise" disabled />
          </div>
        </div>

        {/* Textarea + Select */}
        <p
          className="mb-5"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          Variants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Textarea</p>
            <InsideLabelTextarea label="Project brief" placeholder="Describe your brand challenge..." />
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", color: "#BABAC4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Select / Dropdown</p>
            <InsideLabelSelect label="Service area" />
          </div>
        </div>
      </div>

      {/* Anatomy annotation */}
      <div
        className="mt-4 px-5 py-4 rounded-[6px]"
        style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}
      >
        <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Inside-label — similar to Stripe and premium banking apps. The label is always visible at the top of the field. Focus: border becomes 1.5px Electric Blue. No outer glow — the border change is the signal.
        </p>
      </div>
    </section>
  );
}
