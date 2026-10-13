import { useRef, useState } from "react";
import { AlertCircle } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const BLUE = "#1B1BFF";
const eyebrow: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

type Values = { name: string; client: string; type: string; start: string; duration: string; budget: string; lead: string; brief: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", client: "", type: "", start: "", duration: "", budget: "", lead: "", brief: "" };

const FIELD_LABELS: Record<keyof Values, string> = {
  name: "Engagement name", client: "Client", type: "Engagement type", start: "Start date",
  duration: "Duration", budget: "Budget", lead: "Lead partner", brief: "Brief summary",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter a name for the engagement.";
  if (!v.client) e.client = "Select the client this engagement belongs to.";
  if (!v.type) e.type = "Choose an engagement type.";
  if (!v.start) e.start = "Choose a start date.";
  if (v.duration && (Number(v.duration) < 1 || Number(v.duration) > 365)) e.duration = "Duration must be between 1 and 365 days.";
  if (v.budget && Number(v.budget) < 0) e.budget = "Budget cannot be negative.";
  if (!v.lead.trim()) e.lead = "Name the partner accountable for delivery.";
  return e;
}

function Field({
  id, label, required, helper, error, children,
}: {
  id: string; label: string; required?: boolean; helper?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
      <label htmlFor={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: F, fontSize: 14, fontWeight: 700, color: "#0A0A0F" }}>
        <span>{label}{required && <span aria-hidden style={{ color: "#DC2626", marginLeft: 4 }}>*</span>}</span>
        {!required && <span style={{ fontWeight: 400, fontSize: 12, color: "#5A5A6A" }}>Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" style={{ margin: 0, fontFamily: F, fontSize: 12, color: "#DC2626" }}>{error}</p>
      ) : helper ? (
        <p id={`${id}-msg`} style={{ margin: 0, fontFamily: F, fontSize: 12, color: "#5A5A6A" }}>{helper}</p>
      ) : null}
    </div>
  );
}

function controlStyle(error?: string, focused?: boolean): React.CSSProperties {
  return {
    width: "100%", boxSizing: "border-box", height: 44, padding: focused || error ? "0 11px" : "0 12px", borderRadius: 6, background: "#FFFFFF",
    border: `${focused || error ? 2 : 1}px solid ${error ? "#DC2626" : focused ? BLUE : "rgba(0,0,0,0.10)"}`,
    fontFamily: F, fontSize: 14, color: "#0A0A0F", outline: "none", transition: "border-color 140ms ease-out",
  };
}

function Fieldset({ legend, hint, children }: { legend: string; hint: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0, minWidth: 0 }}>
      <legend style={{ padding: 0, fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>{legend}</legend>
      <p style={{ margin: "0 0 16px", fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>{hint}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>{children}</div>
    </fieldset>
  );
}

function Button({ variant, children, type = "button", onClick }: { variant: "ghost" | "primary"; children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void }) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const primary = variant === "primary";
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        height: 44, padding: "0 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 700,
        background: primary ? (hover ? "#0000E0" : BLUE) : hover ? "#F4F4F6" : "transparent",
        color: primary ? "#FFFFFF" : "#0A0A0F", outline: "none",
        boxShadow: focus ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${BLUE}` : "none", transition: "background 140ms ease-out",
      }}
    >
      {children}
    </button>
  );
}

export function FormPatternShowcase() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [created, setCreated] = useState(false);
  const [focused, setFocused] = useState<keyof Values | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof Values, val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (submitted) setErrors(validate(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs); setSubmitted(true);
    if (Object.keys(errs).length) { setCreated(false); requestAnimationFrame(() => summaryRef.current?.focus()); }
    else setCreated(true);
  };

  const reset = () => { setV(EMPTY); setErrors({}); setSubmitted(false); setCreated(false); };
  const errorKeys = Object.keys(errors) as (keyof Values)[];

  const props = (k: keyof Values) => ({
    id: `ep-${k}`,
    value: v[k],
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] || k === "budget" || k === "duration" || k === "name" ? `ep-${k}-msg` : undefined,
    onFocus: () => setFocused(k),
    onBlur: () => setFocused(null),
    style: controlStyle(errors[k], focused === k),
  });

  return (
    <section id="formpattern" className="mb-16">
      <p className="mb-2" style={eyebrow}>Patterns</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Form Pattern</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        A complete form with grouped fieldsets, required markers, helper text and a linked error summary. Submit it empty to see validation.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}>
        <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 820 }}>
          <div>
            <h3 style={{ margin: 0, fontFamily: F, fontSize: 28, fontWeight: 700, color: "#0A0A0F", lineHeight: 1.2 }}>New engagement</h3>
            <p style={{ margin: "4px 0 0", fontFamily: F, fontSize: 14, color: "#5A5A6A" }}>
              Fields marked <span style={{ color: "#DC2626" }}>*</span> are required.
            </p>
          </div>

          {errorKeys.length > 0 && (
            <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="ep-summary-title"
              style={{ background: "#FEE8E8", borderRadius: 10, padding: 16, outline: "none", border: "1px solid rgba(220,38,38,0.3)" }}>
              <p id="ep-summary-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: 16, fontWeight: 700, color: "#0A0A0F" }}>
                <AlertCircle size={18} color="#DC2626" aria-hidden />
                {errorKeys.length === 1 ? "There is 1 problem with this form" : `There are ${errorKeys.length} problems with this form`}
              </p>
              <ul style={{ margin: "8px 0 0", paddingLeft: 26, fontFamily: F, fontSize: 14, lineHeight: 1.7 }}>
                {errorKeys.map((k) => (
                  <li key={k}>
                    <a href={`#ep-${k}`} onClick={(e) => { e.preventDefault(); document.getElementById(`ep-${k}`)?.focus(); }}
                      style={{ color: "#DC2626", textDecoration: "underline", fontWeight: 700 }}>
                      {FIELD_LABELS[k]}
                    </a>
                    <span style={{ color: "#0A0A0F" }}>: {errors[k]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {created && (
            <div role="status" style={{ background: "#EEFAF4", borderRadius: 10, padding: 16, fontFamily: F, fontSize: 14, color: "#0A0A0F", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span><strong style={{ fontWeight: 700 }}>Engagement created.</strong> “{v.name}” is ready for kickoff.</span>
              <Button variant="ghost" onClick={reset}>Start another</Button>
            </div>
          )}

          <Fieldset legend="Engagement details" hint="Who the work is for and what it covers.">
            <Field id="ep-name" label="Engagement name" required helper="Shown on invoices and in the client portal." error={errors.name}>
              <input {...props("name")} onChange={(e) => set("name", e.target.value)} placeholder="Meridian Bank brand refresh" />
            </Field>
            <Field id="ep-client" label="Client" required error={errors.client}>
              <select {...props("client")} onChange={(e) => set("client", e.target.value)}>
                <option value="">Select a client</option>
                <option>Meridian Bank</option><option>Northwind Logistics</option><option>Harbour &amp; Co</option><option>Atlas Health</option>
              </select>
            </Field>
            <Field id="ep-type" label="Engagement type" required error={errors.type}>
              <select {...props("type")} onChange={(e) => set("type", e.target.value)}>
                <option value="">Select a type</option>
                <option>Discovery sprint</option><option>Strategy workshop</option><option>Design retainer</option><option>Brand audit</option>
              </select>
            </Field>
            <Field id="ep-brief" label="Brief summary" helper="One or two sentences on the challenge.">
              <input {...props("brief")} onChange={(e) => set("brief", e.target.value)} placeholder="Reposition for a younger audience" />
            </Field>
          </Fieldset>

          <Fieldset legend="Timeline and budget" hint="Used to plan phases and resourcing.">
            <Field id="ep-start" label="Start date" required error={errors.start}>
              <input type="date" {...props("start")} onChange={(e) => set("start", e.target.value)} />
            </Field>
            <Field id="ep-duration" label="Duration (days)" helper="Leave blank if still to be scoped." error={errors.duration}>
              <input type="number" {...props("duration")} onChange={(e) => set("duration", e.target.value)} placeholder="60" />
            </Field>
            <Field id="ep-budget" label="Budget (GBP)" helper="Ex. VAT." error={errors.budget}>
              <input type="number" {...props("budget")} onChange={(e) => set("budget", e.target.value)} placeholder="85000" />
            </Field>
          </Fieldset>

          <Fieldset legend="Team" hint="Who is accountable.">
            <Field id="ep-lead" label="Lead partner" required error={errors.lead}>
              <input {...props("lead")} onChange={(e) => set("lead", e.target.value)} placeholder="Jane Okafor" />
            </Field>
          </Fieldset>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.10)" }}>
            <Button variant="ghost" onClick={reset}>Cancel</Button>
            <Button variant="primary" type="submit">Create engagement</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
