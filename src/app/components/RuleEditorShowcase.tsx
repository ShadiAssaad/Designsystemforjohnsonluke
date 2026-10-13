import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  AlertCircle, AlertTriangle, Check, ChevronDown, Copy, FlaskConical, PanelRightClose, PanelRightOpen, Trash2, X, Settings2,
} from "lucide-react";
import {
  ActionList, Avatar, Badge, Btn, Chip, ConditionGroup, FieldError, IconBtn, Label, PEOPLE, RuleSummary, SelectField, TextInput, Tip,
  Toggle, TriggerSelector, errorMap, fillTemplate, focusRuleNode, formatValue, getField, getOperator, getTriggerDef, sampleRule,
  segmentsToString, tokens, validateRule,
} from "./rules";
import type { BadgeVariant, Condition, ConditionGroupData, ConditionNode, Rule, ValidationError } from "./rules";

const F = "'Rethink Sans', sans-serif";
const C = tokens.colors;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

/* ───────── scoped CSS (overlay motion, small controls) ───────── */

const CSS = `
.re-overlay{position:absolute;inset:0;background:rgba(10,10,15,0.45);z-index:40}
.re-overlay[data-state="open"]{animation:re-fade 220ms ease-out}
.re-overlay[data-state="closed"]{animation:re-fade-out 220ms ease-out forwards}
.re-modal{position:absolute;inset:0;margin:auto;height:fit-content;max-height:calc(100% - 32px);overflow:auto;width:min(460px,calc(100% - 32px));background:#fff;border-radius:16px;box-shadow:${tokens.shadows.lg};padding:24px;z-index:41;outline:none;font-family:${F}}
.re-modal[data-state="open"]{animation:re-modal-in 220ms ease-out}
.re-modal[data-state="closed"]{animation:re-modal-out 220ms ease-out forwards}
.re-slide{position:absolute;top:0;right:0;bottom:0;width:min(440px,100%);background:#fff;border-radius:16px 0 0 16px;box-shadow:${tokens.shadows.lg};z-index:41;outline:none;display:flex;flex-direction:column;font-family:${F}}
.re-slide[data-state="open"]{animation:re-slide-in 280ms ease-in-out}
.re-slide[data-state="closed"]{animation:re-slide-out 280ms ease-in-out forwards}
.re-fadein{animation:re-fade 180ms ease-out}
.re-toast{animation:re-toast-in 180ms ease-out}
.re-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;text-underline-offset:2px;cursor:pointer;text-align:left;border-radius:2px}
.re-link:hover{text-decoration-thickness:2px}
.re-name{box-sizing:border-box;width:100%;height:40px;padding:0 10px;margin-left:-10px;font-family:${F};font-weight:700;font-size:20px;color:${C.ink};background:transparent;border:1px solid transparent;border-radius:6px;transition:border-color 140ms ease-out}
.re-name:hover{border-color:${C.border}}
.re-name:focus{border-color:${C.focus};background:#fff}
.re-name[data-invalid="true"]{border-color:${C.danger}}
.re-seg{height:30px;padding:0 12px;border:0;border-radius:4px;background:transparent;font-family:${F};font-size:13px;color:${C.textSecondary};cursor:pointer;transition:background 180ms ease-out,color 180ms ease-out}
.re-seg:hover{color:${C.ink}}
.re-seg[data-state="on"]{background:#fff;color:${C.ink};font-weight:700;box-shadow:${tokens.shadows.xs}}
.re-tr{cursor:pointer;transition:background 140ms ease-out}
.re-tr:hover{background:${C.offWhite}}
@keyframes re-fade{from{opacity:0}to{opacity:1}}
@keyframes re-fade-out{from{opacity:1}to{opacity:0}}
@keyframes re-modal-in{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:none}}
@keyframes re-modal-out{from{opacity:1;transform:none}to{opacity:0;transform:scale(0.97)}}
@keyframes re-slide-in{from{transform:translateX(100%)}to{transform:none}}
@keyframes re-slide-out{from{transform:none}to{transform:translateX(100%)}}
@keyframes re-toast-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.re-overlay,.re-modal,.re-slide,.re-fadein,.re-toast{animation-duration:1ms !important}}
`;
if (typeof document !== "undefined" && !document.getElementById("re-styles")) {
  const el = document.createElement("style");
  el.id = "re-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ───────── sample data ───────── */

type RecVal = string | number | boolean | string[];
interface Rec { id: string; vals: Record<string, RecVal> }
const REF = new Date("2026-10-13T00:00:00Z").getTime();

const mk = (id: string, name: string, client: string, status: string, used: number, tier: string, owner: string, due: string, lead = "priya", health = "on_track"): Rec => ({
  id,
  vals: {
    "project.name": name, "project.status": status, "project.health": health, "project.phase": "design", "project.type": "brand",
    "project.tags": ["retainer"], "project.due": due, "project.lastUpdate": "2026-10-06",
    "budget.used": used, "budget.total": 120000, "budget.remaining": Math.round(120000 * (100 - used) / 100), "budget.over": used > 100,
    "client.name": client, "client.tier": tier, "client.industry": "finance", "client.retainer": true,
    "people.owner": owner, "people.lead": lead, "people.size": 6,
  },
});
const RECORDS: Rec[] = [
  mk("r1", "Brand platform refresh", "Northwind Bank", "review", 86, "tier1", "priya", "2026-11-14"),
  mk("r2", "Patient journey mapping", "Harbour Health", "review", 92, "tier1", "tom", "2027-01-20"),
  mk("r3", "Store experience audit", "Atlas Retail", "in_progress", 81, "tier1", "maya", "2026-11-30"),
  mk("r4", "Service blueprint", "Civic Works Council", "in_progress", 64, "tier2", "daniel", "2026-12-18"),
  mk("r5", "Pricing strategy sprint", "Meridian Capital", "review", 88, "tier1", "daniel", "2027-02-10"),
  mk("r6", "Packaging research", "Fernhill Foods", "in_progress", 91, "tier3", "priya", "2026-11-05"),
  mk("r7", "Digital onboarding design", "Northwind Bank", "review", 83, "tier1", "tom", "2027-03-02"),
  mk("r8", "Design system rollout", "Lumen Energy", "in_progress", 79, "tier1", "priya", "2026-10-30"),
];
const recName = (r: Rec) => String(r.vals["project.name"]);
const recClient = (r: Rec) => String(r.vals["client.name"]);

const CLIENTS = [
  { value: "northwind", label: "Northwind Bank" }, { value: "harbour", label: "Harbour Health" },
  { value: "atlas", label: "Atlas Retail" }, { value: "civic", label: "Civic Works Council" },
  { value: "meridian", label: "Meridian Capital" }, { value: "lumen", label: "Lumen Energy" },
];
const FREQ = [
  { value: "always", label: "Every time it triggers" },
  { value: "record", label: "Once per record" },
  { value: "day", label: "Once per day" },
];

/* ───────── rule evaluation (for the test panel) ───────── */

const toStr = (v: unknown) => (typeof v === "string" ? v : "");
function evalCondition(c: Condition, rec: Rec): boolean {
  const f = getField(c.fieldId);
  const op = getOperator(f?.type, c.operatorId);
  if (!f || !op) return false;
  const rv = rec.vals[f.id];
  const v = c.value;
  const num = (x: unknown) => Number(x);
  switch (f.type) {
    case "number": case "currency": case "percent": {
      const n = num(rv);
      if (op.id === "between") { const r = v as { from: string; to: string }; return n >= num(r.from) && n <= num(r.to); }
      const t = num(v);
      return ({ eq: n === t, neq: n !== t, gt: n > t, gte: n >= t, lt: n < t, lte: n <= t } as Record<string, boolean>)[op.id] ?? false;
    }
    case "text": {
      const s = String(rv).toLowerCase(), t = toStr(v).toLowerCase();
      return ({ is: s === t, is_not: s !== t, contains: s.includes(t), starts_with: s.startsWith(t), is_empty: s === "" } as Record<string, boolean>)[op.id] ?? false;
    }
    case "date": {
      const d = String(rv);
      if (op.id === "in_last") {
        const r = v as { n: string; unit: "days" | "weeks" | "months" };
        const mult = r.unit === "days" ? 1 : r.unit === "weeks" ? 7 : 30;
        const t = new Date(d + "T00:00:00Z").getTime();
        return t <= REF && t >= REF - num(r.n) * mult * 86400000;
      }
      if (op.id === "between") { const r = v as { from: string; to: string }; return d >= r.from && d <= r.to; }
      const t = toStr(v);
      return ({ is: d === t, before: d < t, after: d > t } as Record<string, boolean>)[op.id] ?? false;
    }
    case "select": {
      const arr = Array.isArray(v) ? v : [];
      return op.id === "none_of" ? !arr.includes(String(rv)) : arr.includes(String(rv));
    }
    case "multiselect": {
      const have = Array.isArray(rv) ? rv : [];
      const arr = Array.isArray(v) ? v : [];
      return op.id === "none_of" ? !have.some((x) => arr.includes(x)) : have.some((x) => arr.includes(x));
    }
    case "boolean": return op.id === "is_true" ? rv === true : rv === false;
    case "person": {
      if (op.id === "is_me") return rv === "priya";
      if (op.id === "any_of") return Array.isArray(v) && v.includes(String(rv));
      return rv === v;
    }
  }
}

interface EvalRow { id: string; depth: number; text: string; actual?: string; pass: boolean | null; group?: boolean }
function fmtActual(fid: string | undefined, rec: Rec): string {
  const f = getField(fid);
  if (!f) return "";
  const v = rec.vals[f.id];
  const lab = (x: string) => f.options?.find((o) => o.value === x)?.label ?? PEOPLE.find((p) => p.value === x)?.label ?? x;
  if (Array.isArray(v)) return v.map(lab).join(", ");
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (f.type === "percent") return `${v}%`;
  if (f.type === "currency") return `$${Number(v).toLocaleString("en-US")}`;
  return lab(String(v));
}
function evalNode(node: ConditionNode, rec: Rec, depth: number, rows: EvalRow[]): boolean | null {
  if (node.kind === "condition") {
    const f = getField(node.fieldId);
    const op = getOperator(f?.type, node.operatorId);
    const val = f && op ? formatValue(f, op, node.value) : null;
    const text = f && op ? `${f.label} ${op.phrase ?? op.label}${val ? ` ${val}` : ""}` : "Incomplete condition";
    if (node.disabled) { rows.push({ id: node.id, depth, text, pass: null }); return null; }
    const pass = evalCondition(node, rec);
    rows.push({ id: node.id, depth, text, actual: fmtActual(node.fieldId, rec), pass });
    return pass;
  }
  const idx = rows.length;
  rows.push({ id: node.id, depth, text: node.match === "all" ? "All of these" : "Any of these", pass: null, group: true });
  const res = node.children.map((c) => evalNode(c, rec, depth + 1, rows)).filter((x): x is boolean => x !== null);
  const pass = res.length === 0 ? true : node.match === "all" ? res.every(Boolean) : res.some(Boolean);
  rows[idx]!.pass = pass;
  return pass;
}
const evaluate = (rule: Rule, rec: Rec) => {
  const rows: EvalRow[] = [];
  const kids = rule.conditions.children;
  const pass = kids.length === 0 ? true : evalNode({ ...rule.conditions }, rec, 0, rows) ?? true;
  return { pass, rows: rows.slice(1) };
};

/* ───────── doc model ───────── */

interface Settings { priority: string; freq: string; from: string; to: string; scope: "all" | "selected"; clients: string[]; owner: string }
interface Doc { rule: Rule; desc: string; settings: Settings }

const initialDoc = (): Doc => {
  const rule: Rule = JSON.parse(JSON.stringify(sampleRule));
  const budget = rule.conditions.children[0] as Condition;
  budget.value = "";
  return {
    rule, desc: "Flags Tier 1 projects that are close to exhausting budget so the account lead can act before scope is renegotiated.",
    settings: { priority: "3", freq: "record", from: "2026-10-01", to: "", scope: "selected", clients: ["northwind", "harbour"], owner: "priya" },
  };
};
const breakRule = (rule: Rule): Rule => {
  const r: Rule = JSON.parse(JSON.stringify(rule));
  const b = r.conditions.children.find((c) => c.kind === "condition") as Condition | undefined;
  if (b) b.value = "";
  const a = r.actions.find((x) => x.type === "status");
  if (a) a.config = {};
  if (r.trigger) r.trigger = { ...r.trigger, params: {} };
  return r;
};
const fixRule = (rule: Rule): Rule => ({ ...JSON.parse(JSON.stringify(sampleRule)), name: rule.name.trim() ? rule.name : sampleRule.name, enabled: rule.enabled });

const stripIds = (_k: string, v: unknown) => {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    const { id: _i, kind: _kd, ...rest } = v as Record<string, unknown>;
    return rest;
  }
  return v;
};
function toJson(doc: Doc): string {
  const { rule, settings: s } = doc;
  const out = {
    name: rule.name, description: doc.desc, enabled: rule.enabled, priority: Number(s.priority) || null, runFrequency: s.freq,
    activeFrom: s.from || null, activeTo: s.to || null, scope: s.scope === "all" ? "all_projects" : { clients: s.clients }, owner: s.owner,
    trigger: rule.trigger ? { type: rule.trigger.id, params: rule.trigger.params } : null,
    conditions: rule.conditions, actions: rule.actions,
  };
  return JSON.stringify(out, stripIds, 2);
}

/* ───────── small shared pieces ───────── */

const Heading = ({ children, size = 20 }: { children: React.ReactNode; size?: number }) => (
  <h3 style={{ margin: 0, fontFamily: F, fontWeight: 700, fontSize: size, lineHeight: 1.3, color: C.ink }}>{children}</h3>
);

function Segmented({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; label: string }) {
  return (
    <ToggleGroup.Root type="single" value={value} onValueChange={(v) => v && onChange(v)} aria-label={label} style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 6, background: C.offWhite }}>
      {options.map((o) => <ToggleGroup.Item key={o.value} value={o.value} className="re-seg rb-f">{o.label}</ToggleGroup.Item>)}
    </ToggleGroup.Root>
  );
}

function Modal({ open, onOpenChange, container, title, description, children, variant = "modal" }: {
  open: boolean; onOpenChange: (o: boolean) => void; container: HTMLElement | null; title: string; description: string; children: React.ReactNode; variant?: "modal" | "slide";
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={container ?? undefined}>
        <Dialog.Overlay className="re-overlay" />
        <Dialog.Content className={variant === "modal" ? "re-modal" : "re-slide"} aria-describedby={undefined}>
          {variant === "modal" ? (
            <>
              <Dialog.Title style={{ margin: 0, fontFamily: F, fontWeight: 700, fontSize: 20, color: C.ink }}>{title}</Dialog.Title>
              <Dialog.Description style={{ margin: "8px 0 0", fontFamily: F, fontSize: 14, lineHeight: 1.5, color: C.textSecondary }}>{description}</Dialog.Description>
              {children}
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Dialog.Title style={{ margin: 0, fontFamily: F, fontWeight: 700, fontSize: 20, color: C.ink }}>{title}</Dialog.Title>
                  <Dialog.Description style={{ margin: "4px 0 0", fontFamily: F, fontSize: 14, lineHeight: 1.5, color: C.textSecondary }}>{description}</Dialog.Description>
                </div>
                <Dialog.Close asChild><IconBtn label="Close test panel"><X size={16} aria-hidden /></IconBtn></Dialog.Close>
              </div>
              {children}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ───────── test slideout body ───────── */

function PassMark({ pass }: { pass: boolean | null }) {
  if (pass === null) return <span style={{ fontFamily: F, fontSize: 12, color: C.textSecondary, width: 56 }}>Skipped</span>;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, width: 56, flexShrink: 0, fontFamily: F, fontSize: 12, fontWeight: 700, color: pass ? "#007A4B" : "#B91C1C" }}>
      {pass ? <Check size={14} color="#00A864" strokeWidth={3} aria-hidden /> : <X size={14} color="#DC2626" strokeWidth={3} aria-hidden />}
      {pass ? "Pass" : "Fail"}
    </span>
  );
}

function TestPanel({ rule, errors }: { rule: Rule; errors: ValidationError[] }) {
  const [mode, setMode] = React.useState("30d");
  const [recId, setRecId] = React.useState("r1");
  const [running, setRunning] = React.useState(false);
  const [ran, setRan] = React.useState<{ mode: string; recId: string } | null>(null);
  const [selected, setSelected] = React.useState<string>("r1");
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = () => {
    setRunning(true);
    timer.current = window.setTimeout(() => {
      setRunning(false);
      setRan({ mode, recId });
      setSelected(mode === "30d" ? (RECORDS.find((r) => evaluate(rule, r).pass)?.id ?? RECORDS[0]!.id) : recId);
    }, 800);
  };

  const matches = RECORDS.filter((r) => evaluate(rule, r).pass);
  const selRec = RECORDS.find((r) => r.id === selected) ?? RECORDS[0]!;
  const detail = evaluate(rule, selRec);
  const single = ran?.mode === "single" ? RECORDS.find((r) => r.id === ran.recId) : undefined;
  const singlePass = single ? evaluate(rule, single).pass : false;

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      {errors.length > 0 && (
        <div role="alert" style={{ display: "flex", gap: 8, background: C.dangerBg, borderRadius: 10, padding: 12, fontFamily: F, fontSize: 14, color: C.ink }}>
          <AlertCircle size={18} color={C.danger} aria-hidden style={{ flexShrink: 0, marginTop: 1 }} />
          Fix {errors.length} {errors.length === 1 ? "problem" : "problems"} in the rule before running a test.
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Label>Test against</Label>
        <Segmented label="Test source" value={mode} onChange={(v) => { setMode(v); setRan(null); }} options={[{ value: "30d", label: "Last 30 days" }, { value: "single", label: "Sample record" }]} />
        {mode === "single" && (
          <SelectField ariaLabel="Sample record" value={recId} onChange={(v) => { setRecId(v); setRan(null); }} width="100%" options={RECORDS.map((r) => ({ value: r.id, label: `${recName(r)} · ${recClient(r)}` }))} />
        )}
        <div><Btn size="sm" loading={running} softDisabled={errors.length > 0} onClick={run} leftIcon={<FlaskConical size={14} aria-hidden />}>{running ? "Running" : ran ? "Run again" : "Run test"}</Btn></div>
      </div>

      {ran && !running && (
        <div className="re-fadein" style={{ display: "flex", flexDirection: "column", gap: 20 }} aria-live="polite">
          {ran.mode === "30d" ? (
            <div style={{ background: C.offWhite, borderRadius: 10, padding: 16 }}>
              <p style={{ margin: 0, fontFamily: F, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: C.ink }}>12 of 240</p>
              <p style={{ margin: "4px 0 0", fontFamily: F, fontSize: 14, color: C.textSecondary }}>Would have matched 12 of 240 projects in the last 30 days.</p>
            </div>
          ) : (
            <div style={{ background: singlePass ? C.successBg : C.dangerBg, borderRadius: 10, padding: 16, display: "flex", gap: 8, alignItems: "center", fontFamily: F, fontSize: 14, color: C.ink }}>
              {singlePass ? <Check size={18} color={C.success} aria-hidden /> : <X size={18} color={C.danger} aria-hidden />}
              <span><b>{single && recName(single)}</b> {singlePass ? "would match this rule." : "would not match this rule."}</span>
            </div>
          )}

          {ran.mode === "30d" && (
            <div>
              <div style={{ marginBottom: 8 }}><Label>Sample of matching records</Label></div>
              {matches.length === 0 ? (
                <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: C.textSecondary }}>None of the sampled projects match. Loosen a condition and run again.</p>
              ) : (
                <div style={{ overflowX: "auto", border: `1px solid ${C.border}`, borderRadius: 10 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F, fontSize: 13 }}>
                    <thead>
                      <tr style={{ textAlign: "left", color: C.textSecondary }}>
                        {["Project", "Owner", "Budget"].map((h) => <th key={h} scope="col" style={{ padding: "8px 12px", fontWeight: 400, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((r) => {
                        const on = r.id === selected;
                        return (
                          <tr key={r.id} className="re-tr" onClick={() => setSelected(r.id)} aria-selected={on} style={{ background: on ? C.blueTint : undefined }}>
                            <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}` }}>
                              <button type="button" className="rb-f" aria-pressed={on} onClick={() => setSelected(r.id)} style={{ all: "unset", cursor: "pointer", display: "block", borderRadius: 4 }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: on ? 700 : 400, color: C.ink }}>{on && <Check size={12} color={C.blue} aria-hidden />}{recName(r)}</span>
                                <span style={{ color: C.textSecondary, fontSize: 12 }}>{recClient(r)}</span>
                              </button>
                            </td>
                            <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, color: C.ink, whiteSpace: "nowrap" }}>{fmtActual("people.owner", r)}</td>
                            <td style={{ padding: "8px 12px", borderBottom: `1px solid ${C.border}`, color: C.ink }}>{fmtActual("budget.used", r)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div>
            <div style={{ marginBottom: 8 }}><Label>Conditions for {recName(selRec)}</Label></div>
            {detail.rows.length === 0 ? (
              <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: C.textSecondary }}>This rule has no conditions, so every record passes.</p>
            ) : (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                {detail.rows.map((r) => (
                  <li key={r.id} style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: (r.depth - 1) * 16, fontFamily: F, fontSize: 13, color: C.ink }}>
                    <PassMark pass={r.pass} />
                    <span style={{ flex: 1, minWidth: 0, fontWeight: r.group ? 700 : 400 }}>
                      {r.text}
                      {r.actual && <span style={{ color: C.textSecondary }}> (actual: {r.actual})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── settings panel ───────── */

function SettingsPanel({ s, set, onDelete, invalidPriority, invalidDates, invalidScope }: {
  s: Settings; set: (p: Partial<Settings>) => void; onDelete: () => void; invalidPriority?: string; invalidDates?: string; invalidScope?: string;
}) {
  const uid = React.useId();
  const group = (title: string, id: string | undefined, children: React.ReactNode, err?: string) => (
    <div {...(id ? { "data-rule-node-id": id } : {})} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Label>{title}</Label>
      {children}
      {err && <FieldError id={`${uid}-${id}`}>{err}</FieldError>}
    </div>
  );
  const available = CLIENTS.filter((c) => !s.clients.includes(c.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: F }}>
      {group("Priority", "priority", <TextInput aria-label="Priority" type="number" min={1} max={99} value={s.priority} onChange={(priority) => set({ priority })} invalid={!!invalidPriority} suffix="1 runs first" width="100%" />, invalidPriority)}
      {group("Run frequency", undefined, <SelectField ariaLabel="Run frequency" value={s.freq} onChange={(freq) => set({ freq })} options={FREQ} width="100%" />)}
      {group("Active date range", "dates", (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <TextInput aria-label="Active from" type="date" value={s.from} onChange={(from) => set({ from })} invalid={!!invalidDates} prefix="From" width="100%" />
          <TextInput aria-label="Active until (optional)" type="date" value={s.to} onChange={(to) => set({ to })} invalid={!!invalidDates} prefix="To" width="100%" />
        </div>
      ), invalidDates)}
      {group("Scope", "scope", (
        <>
          <div role="radiogroup" aria-label="Scope" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {([["all", "All projects"], ["selected", "Selected clients"]] as const).map(([v, l]) => (
              <label key={v} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: C.ink, cursor: "pointer" }}>
                <input type="radio" name={`${uid}-scope`} className="rb-f" checked={s.scope === v} onChange={() => set({ scope: v })} style={{ accentColor: C.blue, width: 16, height: 16, margin: 0 }} />
                {l}
              </label>
            ))}
          </div>
          {s.scope === "selected" && (
            <div className="re-fadein" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {s.clients.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.clients.map((c) => <Chip key={c} label={CLIENTS.find((x) => x.value === c)?.label ?? c} onRemove={() => set({ clients: s.clients.filter((x) => x !== c) })} />)}
                </div>
              )}
              <SelectField ariaLabel="Add client" placeholder="Add a client" invalid={!!invalidScope} value="" onChange={(c) => set({ clients: [...s.clients, c] })} options={available} width="100%" disabled={!available.length} />
            </div>
          )}
        </>
      ), invalidScope)}
      {group("Owner", undefined, <SelectField ariaLabel="Owner" value={s.owner} onChange={(owner) => set({ owner })} width="100%" options={PEOPLE.map((p) => ({ value: p.value, label: p.label, description: p.description, icon: <Avatar name={p.label} size={20} /> }))} />)}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <Btn variant="ghost" size="sm" className="rb-danger" onClick={onDelete} leftIcon={<Trash2 size={14} aria-hidden />}>Delete rule</Btn>
      </div>
    </div>
  );
}

/* ───────── canvas step ───────── */

function Step({ n, keyword, label, open, onToggle, errorCount, summary, last, children }: {
  n: number; keyword: string; label: string; open: boolean; onToggle: () => void; errorCount: number; summary: string; last?: boolean; children: React.ReactNode;
}) {
  const bodyId = React.useId();
  return (
    <div style={{ display: "flex", gap: 12, paddingBottom: last ? 0 : 16 }}>
      <div style={{ width: 28, display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }} aria-hidden>
        <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", border: `1px solid ${C.borderStrong}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 700, fontSize: 13, color: C.ink }}>{n}</span>
        {!last && <span style={{ flex: 1, width: 1, background: "rgba(0,0,0,0.20)", marginTop: 4 }} />}
      </div>
      <section style={{ flex: 1, minWidth: 0, background: "#fff", border: `1px solid ${errorCount ? C.danger : C.border}`, borderRadius: 10, boxShadow: tokens.shadows.sm, padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 12 : 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
            <Label>{label}</Label>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: C.blue }}>{keyword}</span>
          </div>
          {errorCount > 0 && <Badge variant="danger">{errorCount} {errorCount === 1 ? "error" : "errors"}</Badge>}
          <span style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 14, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: 4 }}>{open ? "" : summary}</span>
          <IconBtn label={open ? `Collapse ${keyword}` : `Expand ${keyword}`} aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
            <ChevronDown size={16} aria-hidden style={{ transition: "transform 180ms ease-out", transform: open ? "rotate(180deg)" : "none" }} />
          </IconBtn>
        </div>
        <div id={bodyId} hidden={!open} className={open ? "re-fadein" : undefined}>{children}</div>
      </section>
    </div>
  );
}

/* ───────── the editor ───────── */

const STATUS_VARIANT: Record<string, BadgeVariant> = { Draft: "neutral", Active: "success", Paused: "warning", Error: "danger" };
const CONFLICT_NAME = "Clear risk flag after client sign-off";

function RuleEditor({ mobile }: { mobile?: boolean }) {
  const [doc, setDoc] = React.useState<Doc>(initialDoc);
  const [saved, setSaved] = React.useState<Doc>(initialDoc);
  const [everSaved, setEverSaved] = React.useState(false);
  const [view, setView] = React.useState("visual");
  const [open, setOpen] = React.useState({ when: true, if: true, then: true });
  const [panelOpen, setPanelOpen] = React.useState(!mobile);
  const [testOpen, setTestOpen] = React.useState(false);
  const [leaveOpen, setLeaveOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [confirmName, setConfirmName] = React.useState("");
  const [deleted, setDeleted] = React.useState(false);
  const [conflictHidden, setConflictHidden] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [toast, setToast] = React.useState<{ id: number; msg: string } | null>(null);
  const [frame, setFrame] = React.useState<HTMLDivElement | null>(null);
  const toastTimer = React.useRef<number | undefined>(undefined);
  const copyTimer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => { window.clearTimeout(toastTimer.current); window.clearTimeout(copyTimer.current); }, []);

  const { rule, settings } = doc;
  const setRule = (r: Rule) => setDoc((d) => ({ ...d, rule: r }));
  const setSettings = (p: Partial<Settings>) => setDoc((d) => ({ ...d, settings: { ...d.settings, ...p } }));
  const showToast = (msg: string) => {
    setToast({ id: Date.now(), msg });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4000);
  };

  /* validation */
  const base = React.useMemo(() => validateRule(rule), [rule]);
  const extra: ValidationError[] = [];
  const prio = Number(settings.priority);
  if (!rule.name.trim()) extra.push({ id: "name", message: "Give the rule a name." });
  if (!(settings.priority.trim() && Number.isInteger(prio) && prio >= 1 && prio <= 99)) extra.push({ id: "priority", message: "Priority must be a whole number from 1 to 99." });
  if (settings.from && settings.to && settings.from > settings.to) extra.push({ id: "dates", message: "The end date must not be before the start date." });
  if (settings.scope === "selected" && settings.clients.length === 0) extra.push({ id: "scope", message: "Choose at least one client, or switch scope to all projects." });
  const errors = [...extra, ...base];
  const em = React.useMemo(() => errorMap(base), [base]);
  const em2 = errorMap(extra);
  const actionIds = new Set(rule.actions.map((a) => a.id));
  const nWhen = base.filter((e) => e.id === "trigger").length;
  const nThen = base.filter((e) => e.id === "actions" || actionIds.has(e.id)).length;
  const nIf = base.length - nWhen - nThen;

  const dirty = JSON.stringify(doc) !== JSON.stringify(saved);
  const status = errors.length ? "Error" : !everSaved ? "Draft" : rule.enabled ? "Active" : "Paused";
  const json = React.useMemo(() => toJson(doc), [doc]);
  const conflict = rule.enabled && !conflictHidden && rule.actions.some((a) => a.type === "status" && a.config.status === "at_risk");

  const focusError = (id: string) => {
    if (id === "trigger") setOpen((o) => ({ ...o, when: true }));
    else if (id === "actions" || actionIds.has(id)) setOpen((o) => ({ ...o, then: true }));
    else if (["priority", "dates", "scope"].includes(id)) setPanelOpen(true);
    else if (id !== "name") setOpen((o) => ({ ...o, if: true }));
    setView("visual");
    window.setTimeout(() => {
      const root: ParentNode = frame ?? document;
      focusRuleNode(id, root);
      const el = root.querySelector<HTMLElement>(`[data-rule-node-id="${id}"]`);
      if (el && !el.contains(document.activeElement)) {
        el.querySelector<HTMLElement>('input[data-invalid="true"], button[data-invalid="true"], input, button')?.focus({ preventScroll: true });
      }
    }, 80);
  };

  const save = () => {
    if (errors.length) { focusError(errors[0]!.id); return; }
    setSaved(doc); setEverSaved(true);
    showToast(`Saved. “${rule.name}” is ${rule.enabled ? "live" : "saved but paused"}.`);
  };
  const cancel = () => (dirty ? setLeaveOpen(true) : showToast("No unsaved changes to discard."));
  const copy = async () => {
    try { await navigator.clipboard?.writeText(json); } catch { /* clipboard may be blocked in preview */ }
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const whenSummary = (() => { const d = getTriggerDef(rule.trigger?.id); return d && rule.trigger ? segmentsToString(fillTemplate(d, d.summary, rule.trigger.params)) : "No trigger chosen"; })();
  const n = rule.conditions.children.length;
  const ifSummary = n ? `${n} condition${n > 1 ? "s" : ""}, ${rule.conditions.match === "all" ? "all must match" : "any can match"}` : "No conditions";
  const thenSummary = rule.actions.length ? `${rule.actions.length} action${rule.actions.length > 1 ? "s" : ""}` : "No actions";

  const saveBtn = (
    <Btn variant="primary" softDisabled={errors.length > 0} onClick={save} style={mobile ? { flex: 1 } : undefined}>
      {dirty && <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "#01FF97" }} />}
      Save
      {dirty && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>, unsaved changes</span>}
    </Btn>
  );

  const header = (
    <header style={{ padding: mobile ? 16 : "16px 24px", borderBottom: `1px solid ${C.border}`, background: "#fff", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div data-rule-node-id="name" style={{ flex: "1 1 240px", minWidth: 0, paddingLeft: 10 }}>
          <input className="re-name rb-f" aria-label="Rule name" value={rule.name} placeholder="Name this rule" data-invalid={!rule.name.trim() || undefined} aria-invalid={!rule.name.trim() || undefined} onChange={(e) => setRule({ ...rule, name: e.target.value })} style={{ fontSize: mobile ? 18 : 20 }} />
        </div>
        <Badge variant={STATUS_VARIANT[status]!}>{status}</Badge>
        {dirty && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F, fontSize: 12, color: C.textSecondary }}>
            <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue }} />Unsaved changes
          </span>
        )}
      </div>
      <TextInput aria-label="Rule description" value={doc.desc} onChange={(desc) => setDoc((d) => ({ ...d, desc }))} placeholder="Describe what this rule is for" width="100%" />
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Toggle label="Enabled" checked={rule.enabled} onChange={(enabled) => setRule({ ...rule, enabled })} />
        <span style={{ flex: 1 }} />
        {!mobile && (
          <Btn variant="ghost" size="sm" onClick={() => setPanelOpen(!panelOpen)} aria-expanded={panelOpen} leftIcon={panelOpen ? <PanelRightClose size={14} aria-hidden /> : <PanelRightOpen size={14} aria-hidden />}>Settings</Btn>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: mobile ? "stretch" : "flex-end" }}>
        <Btn variant="ghost" onClick={cancel} style={mobile ? { flex: 1 } : undefined}>Cancel</Btn>
        <Btn variant="secondary" onClick={() => setTestOpen(true)} leftIcon={<FlaskConical size={16} aria-hidden />} style={mobile ? { flex: 1 } : undefined}>Test rule</Btn>
        {errors.length ? <Tip label={`Fix ${errors.length} ${errors.length === 1 ? "problem" : "problems"} to save`}>{saveBtn}</Tip> : saveBtn}
      </div>
    </header>
  );

  const canvas = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
      {errors.length > 0 && (
        <div role="region" aria-label="Validation summary" aria-live="polite" style={{ background: C.dangerBg, borderRadius: 10, padding: 16, display: "flex", gap: 12 }}>
          <AlertCircle size={20} color={C.danger} aria-hidden style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontFamily: F, fontWeight: 700, fontSize: 14, color: C.ink }}>{errors.length} {errors.length === 1 ? "problem" : "problems"} to fix before this rule can be saved</p>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4, fontFamily: F, fontSize: 14, color: "#B91C1C" }}>
              {errors.map((e, i) => (
                <li key={`${e.id}-${i}`}><button type="button" className="re-link rb-f" onClick={() => focusError(e.id)}>{e.message}</button></li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {conflict && (
        <div style={{ background: C.warningBg, borderRadius: 10, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <AlertTriangle size={20} color="#9A5200" aria-hidden style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 14, lineHeight: 1.5, color: C.ink }}>
            <b>This rule overlaps with another active rule.</b> “{CONFLICT_NAME}” sets health back to On track for the same projects, so the two can keep overwriting each other.{" "}
            <button type="button" className="re-link rb-f" style={{ fontWeight: 700 }} onClick={() => showToast(`Opening “${CONFLICT_NAME}” (demo).`)}>View conflicting rule</button>
          </div>
          <IconBtn label="Dismiss warning" onClick={() => setConflictHidden(true)}><X size={16} aria-hidden /></IconBtn>
        </div>
      )}

      <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: tokens.shadows.sm, padding: "12px 16px" }}>
        <div style={{ marginBottom: 4 }}><Label>Live summary</Label></div>
        <RuleSummary rule={rule} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Segmented label="Editor view" value={view} onChange={setView} options={[{ value: "visual", label: "Visual" }, { value: "json", label: "JSON" }]} />
        <span style={{ flex: 1 }} />
        <Btn variant="ghost" size="sm" onClick={() => setRule(base.length ? fixRule(rule) : breakRule(rule))}>
          {base.length ? "Fix rule problems" : "Show invalid state"}
        </Btn>
      </div>

      {view === "visual" ? (
        <div className="re-fadein">
          <Step n={1} label="Step 1 · Trigger" keyword="When" open={open.when} onToggle={() => setOpen({ ...open, when: !open.when })} errorCount={nWhen} summary={whenSummary}>
            <TriggerSelector value={rule.trigger} onChange={(trigger) => setRule({ ...rule, trigger })} error={em.trigger?.message} errorField={em.trigger?.field} />
          </Step>
          <Step n={2} label="Step 2 · Conditions" keyword="If" open={open.if} onToggle={() => setOpen({ ...open, if: !open.if })} errorCount={nIf} summary={ifSummary}>
            <ConditionGroup group={rule.conditions} onChange={(conditions: ConditionGroupData) => setRule({ ...rule, conditions })} errors={em} />
          </Step>
          <Step n={3} label="Step 3 · Actions" keyword="Then" last open={open.then} onToggle={() => setOpen({ ...open, then: !open.then })} errorCount={nThen} summary={thenSummary}>
            <div data-rule-node-id="actions" tabIndex={-1} style={{ outline: "none" }}>
              <ActionList actions={rule.actions} onChange={(actions) => setRule({ ...rule, actions })} errors={em} />
              {em.actions && <div style={{ marginTop: 8 }}><FieldError>{em.actions.message}</FieldError></div>}
            </div>
          </Step>
        </div>
      ) : (
        <div className="re-fadein" style={{ position: "relative", background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 10 }}>
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span role="status" style={{ fontFamily: F, fontSize: 13, color: "#007A4B", fontWeight: 700 }}>{copied ? "Copied" : ""}</span>
            <Btn variant="secondary" size="sm" onClick={copy} leftIcon={copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}>Copy JSON</Btn>
          </div>
          <pre tabIndex={0} aria-label="Rule as JSON, read only" className="rb-f" style={{ margin: 0, padding: "48px 16px 16px", maxHeight: mobile ? 360 : 480, overflow: "auto", fontFamily: MONO, fontSize: 12, lineHeight: 1.6, color: C.ink, borderRadius: 10 }}>{json}</pre>
        </div>
      )}
    </div>
  );

  const settingsPanel = (
    <SettingsPanel s={settings} set={setSettings} onDelete={() => { setConfirmName(""); setDeleteOpen(true); }} invalidPriority={em2.priority?.message} invalidDates={em2.dates?.message} invalidScope={em2.scope?.message} />
  );

  return (
    <div ref={setFrame} style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", height: mobile ? 760 : 780, background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: tokens.shadows.md, fontFamily: F }}>
      {header}
      {deleted ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: 24, textAlign: "center" }}>
          <Heading>This rule was deleted</Heading>
          <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: C.textSecondary, maxWidth: 360 }}>It will no longer run on any project. You can restore it to continue editing.</p>
          <Btn variant="secondary" onClick={() => { setDeleted(false); showToast("Rule restored."); }}>Restore rule</Btn>
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
          <div style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: mobile ? 16 : 24 }}>
            {canvas}
            {mobile && (
              <div style={{ marginTop: 16, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: tokens.shadows.sm, padding: 16 }}>
                <button type="button" className="rb-f" aria-expanded={panelOpen} onClick={() => setPanelOpen(!panelOpen)} style={{ all: "unset", boxSizing: "border-box", width: "100%", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: F, fontWeight: 700, fontSize: 16, color: C.ink, borderRadius: 4 }}>
                  <Settings2 size={16} aria-hidden /><span style={{ flex: 1 }}>Rule settings</span>
                  <ChevronDown size={16} aria-hidden style={{ transition: "transform 180ms ease-out", transform: panelOpen ? "rotate(180deg)" : "none" }} />
                </button>
                <div hidden={!panelOpen} style={{ marginTop: 16 }}>{settingsPanel}</div>
              </div>
            )}
          </div>
          {!mobile && (
            <aside aria-label="Rule settings" style={{ width: panelOpen ? 300 : 0, flexShrink: 0, overflow: "hidden", background: "#fff", borderLeft: panelOpen ? `1px solid ${C.border}` : "none", visibility: panelOpen ? "visible" : "hidden", transition: `width ${tokens.motion.panel}, visibility 0s linear ${panelOpen ? "0s" : "280ms"}` }}>
              <div style={{ width: 300, height: "100%", overflowY: "auto", padding: 24, boxSizing: "border-box" }}>
                <div style={{ marginBottom: 16 }}><Heading size={16}>Settings</Heading></div>
                {settingsPanel}
              </div>
            </aside>
          )}
        </div>
      )}

      {toast && (
        <div key={toast.id} role="status" aria-live="polite" className="re-toast" style={{ position: "absolute", right: 16, bottom: 16, zIndex: 60, maxWidth: "calc(100% - 32px)", display: "flex", alignItems: "center", gap: 12, background: C.ink, color: "#fff", borderRadius: 10, padding: "12px 12px 12px 16px", fontFamily: F, fontSize: 14, border: "1px solid rgba(255,255,255,0.10)" }}>
          <Check size={16} color="#fff" aria-hidden style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{toast.msg}</span>
          <button type="button" aria-label="Dismiss notification" className="rb-f" onClick={() => setToast(null)} style={{ all: "unset", display: "inline-flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 4, color: "#fff" }}><X size={14} aria-hidden /></button>
        </div>
      )}

      <Modal variant="slide" open={testOpen} onOpenChange={setTestOpen} container={frame} title="Test rule" description="See which projects this rule would act on, without running any actions.">
        <TestPanel rule={rule} errors={errors} />
      </Modal>

      <Modal open={leaveOpen} onOpenChange={setLeaveOpen} container={frame} title="Leave without saving?" description="You have unsaved changes to this rule. If you discard them, the rule returns to its last saved version.">
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
          <Btn variant="secondary" onClick={() => setLeaveOpen(false)}>Keep editing</Btn>
          <Btn variant="destructive" onClick={() => { setDoc(saved); setLeaveOpen(false); showToast("Changes discarded."); }}>Discard changes</Btn>
        </div>
      </Modal>

      <Modal open={deleteOpen} onOpenChange={setDeleteOpen} container={frame} title="Delete this rule?" description="Deleting stops the rule from running on every project it covers. Run history is kept for 90 days.">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          <label htmlFor={`confirm-${mobile ? "m" : "d"}`} style={{ fontFamily: F, fontSize: 14, color: C.ink }}>Type <b>{rule.name}</b> to confirm</label>
          <TextInput id={`confirm-${mobile ? "m" : "d"}`} value={confirmName} onChange={setConfirmName} placeholder={rule.name} width="100%" autoComplete="off" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
          <Btn variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Btn>
          <Btn variant="destructive" disabled={confirmName !== rule.name || !rule.name} leftIcon={<Trash2 size={14} aria-hidden />} onClick={() => { setDeleteOpen(false); setDeleted(true); showToast("Rule deleted."); }}>Delete rule</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ───────── showcase ───────── */

export function RuleEditorShowcase() {
  return (
    <section id="ruleeditor" className="mb-16">
      <p style={{ fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary, margin: 0 }}>Pattern</p>
      <h2 style={{ fontFamily: F, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: C.ink, margin: "8px 0 0" }}>Rule editor</h2>
      <p style={{ fontFamily: F, fontSize: 14, lineHeight: 1.5, color: C.textSecondary, margin: "8px 0 0" }}>A full automation editor assembled from the rule blocks, with live summary, validation, testing, JSON view and confirmations.</p>

      <div className="mt-8" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Heading>Desktop</Heading>
        <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: C.textSecondary }}>1100px frame. Start state has one empty condition value: use the problem links, fix it, or try “Show invalid state”.</p>
      </div>
      <div className="mt-4" style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ width: 1100 }}><RuleEditor /></div>
      </div>

      <div className="mt-12" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Heading>Mobile</Heading>
        <p style={{ margin: 0, fontFamily: F, fontSize: 14, color: C.textSecondary }}>375px frame. Settings move below the builder and the test panel fills the width.</p>
      </div>
      <div className="mt-4" style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ width: 375 }}><RuleEditor mobile /></div>
      </div>
    </section>
  );
}
