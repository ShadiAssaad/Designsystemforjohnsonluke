import {
  Type, Hash, CircleDollarSign, Percent, Calendar, List, ListChecks, User, ToggleLeft,
  FolderKanban, ArrowRightCircle, PlusCircle, Wallet, Receipt, Building2, MessageSquare,
  CalendarClock, Clock, Bell, Mail, RefreshCw, UserPlus, Tag, ListTodo, Webhook,
  type LucideIcon,
} from "lucide-react";
import type {
  Action, ActionType, Condition, ConditionGroup, ConditionNode, ConditionValue, Field, FieldType,
  Option, Operator, RangeValue, RelativeValue, Rule, Segment, Trigger, TriggerCategory, TriggerDef,
  ValidationError, Entity,
} from "./types";

/* ───────── Options ───────── */

export const STATUS_OPTIONS: Option[] = [
  { value: "briefing", label: "Briefing" },
  { value: "in_progress", label: "In progress" },
  { value: "review", label: "Review" },
  { value: "delivered", label: "Delivered" },
  { value: "on_hold", label: "On hold" },
];
export const HEALTH_OPTIONS: Option[] = [
  { value: "on_track", label: "On track" },
  { value: "at_risk", label: "At risk" },
  { value: "off_track", label: "Off track" },
];
const PHASE_OPTIONS: Option[] = [
  { value: "discovery", label: "Discovery" },
  { value: "strategy", label: "Strategy" },
  { value: "design", label: "Design" },
  { value: "handover", label: "Handover" },
];
const TYPE_OPTIONS: Option[] = [
  { value: "brand", label: "Brand strategy" },
  { value: "digital", label: "Digital product" },
  { value: "service", label: "Service design" },
  { value: "research", label: "Research" },
];
const TIER_OPTIONS: Option[] = [
  { value: "tier1", label: "Tier 1" },
  { value: "tier2", label: "Tier 2" },
  { value: "tier3", label: "Tier 3" },
];
const INDUSTRY_OPTIONS: Option[] = [
  { value: "finance", label: "Financial services" },
  { value: "health", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "public", label: "Public sector" },
];
const TAG_OPTIONS: Option[] = [
  { value: "rush", label: "Rush" },
  { value: "retainer", label: "Retainer" },
  { value: "pitch", label: "Pitch" },
  { value: "workshop", label: "Workshop" },
];

export const PEOPLE: Option[] = [
  { value: "priya", label: "Priya Nair", description: "Account lead" },
  { value: "tom", label: "Tom Okafor", description: "Design director" },
  { value: "maya", label: "Maya Lindqvist", description: "Strategy lead" },
  { value: "daniel", label: "Daniel Reyes", description: "Producer" },
  { value: "sofia", label: "Sofia Marchetti", description: "Finance partner" },
];

/** Roles resolve at run-time, people are fixed. */
export const NOTIFY_TARGETS: Option[] = [
  { value: "role:account_lead", label: "the account lead", description: "Role on the project" },
  { value: "role:project_owner", label: "the project owner", description: "Role on the project" },
  { value: "role:finance", label: "the finance partner", description: "Role on the project" },
  ...PEOPLE.map((p) => ({ value: p.value, label: p.label, description: p.description })),
];

/* ───────── Fields ───────── */

export const FIELDS: Field[] = [
  { id: "project.name", label: "Project name", entity: "Project", type: "text" },
  { id: "project.status", label: "Status", entity: "Project", type: "select", options: STATUS_OPTIONS },
  { id: "project.health", label: "Health", entity: "Project", type: "select", options: HEALTH_OPTIONS },
  { id: "project.phase", label: "Phase", entity: "Project", type: "select", options: PHASE_OPTIONS },
  { id: "project.type", label: "Project type", entity: "Project", type: "select", options: TYPE_OPTIONS },
  { id: "project.tags", label: "Tags", entity: "Project", type: "multiselect", options: TAG_OPTIONS },
  { id: "project.due", label: "Due date", entity: "Project", type: "date" },
  { id: "project.lastUpdate", label: "Last client update", entity: "Project", type: "date" },
  { id: "budget.used", label: "Budget used", entity: "Budget", type: "percent" },
  { id: "budget.total", label: "Budget total", entity: "Budget", type: "currency" },
  { id: "budget.remaining", label: "Budget remaining", entity: "Budget", type: "currency" },
  { id: "budget.over", label: "Over budget", entity: "Budget", type: "boolean" },
  { id: "client.name", label: "Client name", entity: "Client", type: "text" },
  { id: "client.tier", label: "Client tier", entity: "Client", type: "select", options: TIER_OPTIONS },
  { id: "client.industry", label: "Client industry", entity: "Client", type: "select", options: INDUSTRY_OPTIONS },
  { id: "client.retainer", label: "On retainer", entity: "Client", type: "boolean" },
  { id: "people.owner", label: "Project owner", entity: "People", type: "person" },
  { id: "people.lead", label: "Account lead", entity: "People", type: "person" },
  { id: "people.size", label: "Team size", entity: "People", type: "number", unit: "people" },
];

export const ENTITIES: Entity[] = ["Project", "Budget", "Client", "People"];
export const fieldsByEntity = (fields: Field[] = FIELDS) =>
  ENTITIES.map((entity) => ({ entity, fields: fields.filter((f) => f.entity === entity) })).filter((g) => g.fields.length);
export const getField = (id?: string) => FIELDS.find((f) => f.id === id);

export const FIELD_TYPE_ICON: Record<FieldType, LucideIcon> = {
  text: Type, number: Hash, currency: CircleDollarSign, percent: Percent, date: Calendar,
  select: List, multiselect: ListChecks, person: User, boolean: ToggleLeft,
};
export const FIELD_TYPE_LABEL: Record<FieldType, string> = {
  text: "Text", number: "Number", currency: "Currency", percent: "Percent", date: "Date",
  select: "Select", multiselect: "Multi-select", person: "Person", boolean: "Yes / no",
};

/* ───────── Operators ───────── */

const NUMERIC_OPS: Operator[] = [
  { id: "eq", label: "=", phrase: "is", kind: "single" },
  { id: "neq", label: "≠", phrase: "is not", kind: "single" },
  { id: "gt", label: ">", phrase: ">", kind: "single" },
  { id: "gte", label: "≥", phrase: "≥", kind: "single" },
  { id: "lt", label: "<", phrase: "<", kind: "single" },
  { id: "lte", label: "≤", phrase: "≤", kind: "single" },
  { id: "between", label: "between", kind: "range" },
];
const SELECT_OPS: Operator[] = [
  { id: "any_of", label: "is any of", kind: "multi" },
  { id: "none_of", label: "is none of", kind: "multi" },
];

export const OPERATORS: Record<FieldType, Operator[]> = {
  text: [
    { id: "is", label: "is", kind: "single" },
    { id: "is_not", label: "is not", kind: "single" },
    { id: "contains", label: "contains", kind: "single" },
    { id: "starts_with", label: "starts with", kind: "single" },
    { id: "is_empty", label: "is empty", kind: "none" },
  ],
  number: NUMERIC_OPS,
  currency: NUMERIC_OPS,
  percent: NUMERIC_OPS,
  date: [
    { id: "is", label: "is", kind: "single" },
    { id: "before", label: "before", kind: "single" },
    { id: "after", label: "after", kind: "single" },
    { id: "in_last", label: "in the last N days", phrase: "in the last", kind: "relative" },
    { id: "between", label: "between", kind: "range" },
  ],
  select: SELECT_OPS,
  multiselect: SELECT_OPS,
  boolean: [
    { id: "is_true", label: "is true", kind: "none" },
    { id: "is_false", label: "is false", kind: "none" },
  ],
  person: [
    { id: "is", label: "is", kind: "single" },
    { id: "is_me", label: "is me", kind: "none" },
    { id: "any_of", label: "is any of", kind: "multi" },
  ],
};
export const getOperators = (t: FieldType) => OPERATORS[t];
export const getOperator = (t: FieldType | undefined, id?: string) =>
  t ? OPERATORS[t].find((o) => o.id === id) : undefined;

/* ───────── Triggers ───────── */

const WEEKDAYS: Option[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => ({ value: d.toLowerCase(), label: d }));
const TIMES: Option[] = ["08:00", "09:00", "12:00", "14:00", "17:00"].map((t) => ({ value: t, label: t }));

export const TRIGGERS: TriggerDef[] = [
  { id: "status_changes", category: "Project", name: "Status changes to {status}", summary: "a project moves to {status}",
    description: "Runs when a project enters a new status.", icon: ArrowRightCircle,
    params: [{ key: "status", label: "Status", options: STATUS_OPTIONS }] },
  { id: "project_created", category: "Project", name: "Project is created", summary: "a project is created",
    description: "Runs once when a new project is set up.", icon: PlusCircle },
  { id: "phase_starts", category: "Project", name: "Phase starts: {phase}", summary: "the {phase} phase starts",
    description: "Runs when a project enters a delivery phase.", icon: FolderKanban,
    params: [{ key: "phase", label: "Phase", options: PHASE_OPTIONS }] },
  { id: "budget_threshold", category: "Budget", name: "Budget used passes {percent}", summary: "budget used passes {percent}",
    description: "Runs when spend crosses a share of the budget.", icon: Wallet,
    params: [{ key: "percent", label: "Threshold", default: "80", options: ["50", "80", "100"].map((p) => ({ value: p, label: `${p}%` })) }] },
  { id: "invoice_overdue", category: "Budget", name: "Invoice becomes overdue", summary: "an invoice becomes overdue",
    description: "Runs when an invoice passes its payment terms.", icon: Receipt },
  { id: "tier_changes", category: "Client", name: "Client tier changes", summary: "a client's tier changes",
    description: "Runs when account management re-tiers a client.", icon: Building2 },
  { id: "client_feedback", category: "Client", name: "Client leaves feedback", summary: "a client leaves feedback",
    description: "Runs when feedback arrives on a shared deliverable.", icon: MessageSquare },
  { id: "weekly", category: "Schedule", name: "Every {day} at {time}", summary: "it is {day} at {time}",
    description: "Runs on a weekly schedule for matching projects.", icon: CalendarClock,
    params: [
      { key: "day", label: "Weekday", default: "monday", options: WEEKDAYS },
      { key: "time", label: "Time", default: "09:00", options: TIMES },
    ] },
  { id: "due_in", category: "Schedule", name: "Due date is in {days}", summary: "a project is due in {days}",
    description: "Runs ahead of a delivery deadline.", icon: Clock,
    params: [{ key: "days", label: "Lead time", options: ["3", "7", "14"].map((d) => ({ value: d, label: `${d} days` })) }] },
];
export const TRIGGER_CATEGORIES: TriggerCategory[] = ["Project", "Budget", "Client", "Schedule"];
export const getTriggerDef = (id?: string) => TRIGGERS.find((t) => t.id === id);

export function defaultTrigger(id: string): Trigger {
  const def = getTriggerDef(id);
  const params: Record<string, string> = {};
  def?.params?.forEach((p) => { params[p.key] = p.default ?? ""; });
  return { id, params };
}

/** Fill a trigger template. Missing params become placeholder segments. */
export function fillTemplate(def: TriggerDef, tpl: string, params: Record<string, string>): Segment[] {
  return tpl.split(/(\{[a-z]+\})/).filter(Boolean).map((part) => {
    const m = part.match(/^\{([a-z]+)\}$/);
    if (!m) return { text: part };
    const p = def.params?.find((x) => x.key === m[1]);
    const label = p?.options.find((o) => o.value === params[m[1]])?.label;
    return label ? { text: label } : { text: `[${p?.label.toLowerCase() ?? m[1]}]`, placeholder: true };
  });
}

/* ───────── Actions ───────── */

export interface ActionDef { type: ActionType; label: string; icon: LucideIcon; description: string }
export const ACTIONS: ActionDef[] = [
  { type: "notify", label: "Notify person", icon: Bell, description: "In-app or Slack message" },
  { type: "email", label: "Send email", icon: Mail, description: "Email with merge fields" },
  { type: "status", label: "Change status", icon: RefreshCw, description: "Move the project to a status" },
  { type: "assign", label: "Assign owner", icon: UserPlus, description: "Set the project owner" },
  { type: "tag", label: "Add tag", icon: Tag, description: "Label the project" },
  { type: "task", label: "Create task", icon: ListTodo, description: "Add a task to the project" },
  { type: "webhook", label: "Call webhook", icon: Webhook, description: "POST to an external URL" },
];
export const getActionDef = (t: ActionType) => ACTIONS.find((a) => a.type === t)!;

export const ACTION_STATUS_OPTIONS: Option[] = [
  ...STATUS_OPTIONS.filter((s) => s.value !== "briefing"),
  { value: "at_risk", label: "At risk" },
];
export const CHANNEL_OPTIONS: Option[] = [
  { value: "app", label: "In-app" }, { value: "slack", label: "Slack" },
];
export const EMAIL_TO_OPTIONS: Option[] = [
  { value: "role:client_contact", label: "Client contact" },
  ...NOTIFY_TARGETS.map((o) => ({ ...o, label: o.label.replace(/^the /, "").replace(/^./, (c) => c.toUpperCase()) })),
];
export const DUE_OPTIONS: Option[] = [
  { value: "1d", label: "tomorrow" }, { value: "3d", label: "in 3 days" }, { value: "1w", label: "in 1 week" },
];
export const METHOD_OPTIONS: Option[] = [{ value: "POST", label: "POST" }, { value: "GET", label: "GET" }];

export interface TokenDef { token: string; label: string; group: string }
export const TOKENS: TokenDef[] = [
  { token: "{project.name}", label: "Project name", group: "Project" },
  { token: "{project.status}", label: "Status", group: "Project" },
  { token: "{project.due_date}", label: "Due date", group: "Project" },
  { token: "{client.name}", label: "Client name", group: "Client" },
  { token: "{client.owner}", label: "Client owner", group: "Client" },
  { token: "{client.tier}", label: "Client tier", group: "Client" },
  { token: "{budget.used_percent}", label: "Budget used", group: "Budget" },
  { token: "{budget.remaining}", label: "Budget remaining", group: "Budget" },
];

/* ───────── Summaries ───────── */

const labelOf = (opts: Option[] | undefined, v: string) => opts?.find((o) => o.value === v)?.label ?? PEOPLE.find((p) => p.value === v)?.label ?? v;
const isRange = (v: ConditionValue): v is RangeValue => !!v && typeof v === "object" && !Array.isArray(v) && "from" in v;
const isRel = (v: ConditionValue): v is RelativeValue => !!v && typeof v === "object" && !Array.isArray(v) && "unit" in v;

const fmtScalar = (f: Field, s: string): string => {
  if (f.type === "currency") return `£${Number(s).toLocaleString("en-GB")}`;
  if (f.type === "percent") return `${s}%`;
  if (f.type === "number" && f.unit) return `${s} ${f.unit}`;
  if (f.type === "text") return `“${s}”`;
  if (f.type === "select" || f.type === "multiselect" || f.type === "person") return labelOf(f.options, s);
  return s;
};

/** Returns null when the value is incomplete. */
export function formatValue(f: Field, op: Operator, v: ConditionValue): string | null {
  switch (op.kind) {
    case "none": return "";
    case "single":
      return typeof v === "string" && v.trim() ? fmtScalar(f, v) : null;
    case "range":
      return isRange(v) && v.from && v.to ? `${fmtScalar(f, v.from)} and ${fmtScalar(f, v.to)}` : null;
    case "relative":
      return isRel(v) && v.n ? `${v.n} ${v.unit}` : null;
    case "multi": {
      if (!Array.isArray(v) || !v.length) return null;
      const labels = v.map((x) => fmtScalar(f, x));
      return op.id === "none_of" ? labels.join(", ") : labels.join(" or ");
    }
  }
}

function summarizeCondition(c: Condition): Segment[] {
  const f = getField(c.fieldId);
  if (!f) return [{ text: "[field]", placeholder: true }];
  const op = getOperator(f.type, c.operatorId);
  const head: Segment = { text: f.label.toLowerCase() };
  if (!op) return [head, { text: " " }, { text: "[operator]", placeholder: true }];
  let phrase = op.phrase ?? op.label;
  if (op.id === "any_of" && Array.isArray(c.value) && c.value.length) phrase = "is";
  const out: Segment[] = [head, { text: ` ${phrase}` }];
  const val = formatValue(f, op, c.value);
  if (op.kind === "none") return out;
  out.push({ text: " " }, val === null ? { text: "[value]", placeholder: true } : { text: val });
  return out;
}

function summarizeGroup(g: ConditionGroup, nested: boolean): Segment[] {
  const parts = g.children.map((c) => (c.kind === "condition" ? summarizeCondition(c) : summarizeGroup(c, true)));
  const joiner = g.match === "all" ? " and " : " or ";
  const out: Segment[] = [];
  parts.forEach((p, i) => { if (i) out.push({ text: joiner }); out.push(...p); });
  if (nested && parts.length > 1) return [{ text: "(" }, ...out, { text: ")" }];
  return out;
}

export function summarizeAction(a: Action): Segment[] {
  const c = a.config;
  const ph = (t: string): Segment => ({ text: `[${t}]`, placeholder: true });
  let s: Segment[];
  switch (a.type) {
    case "notify": s = [{ text: "notify " }, c.person ? { text: labelOf(NOTIFY_TARGETS, c.person) } : ph("person")]; break;
    case "email": s = [{ text: "email " }, c.to ? { text: labelOf(EMAIL_TO_OPTIONS, c.to) } : ph("recipient"), ...(c.subject ? [{ text: ` “${c.subject}”` }] : [])]; break;
    case "status": s = [{ text: "set status to " }, c.status ? { text: labelOf(ACTION_STATUS_OPTIONS, c.status) } : ph("status")]; break;
    case "assign": s = [{ text: "assign " }, c.owner ? { text: labelOf(PEOPLE, c.owner) } : ph("owner"), { text: " as owner" }]; break;
    case "tag": s = [{ text: "add the tag " }, c.tag ? { text: `“${c.tag}”` } : ph("tag")]; break;
    case "task": s = [{ text: "create the task " }, c.title ? { text: `“${c.title}”` } : ph("title")]; break;
    case "webhook": s = [{ text: "call " }, c.url ? { text: c.url } : ph("URL")]; break;
  }
  if (a.delay) s.push({ text: ` after ${a.delay.n || "?"} ${a.delay.unit}` });
  return s;
}

/** Natural-language sentence as segments. Placeholder segments render grey. */
export function summarizeRule(rule: Rule): Segment[] {
  const out: Segment[] = [{ text: "When " }];
  const def = getTriggerDef(rule.trigger?.id);
  if (rule.trigger && def) out.push(...fillTemplate(def, def.summary, rule.trigger.params));
  else out.push({ text: "[choose a trigger]", placeholder: true });
  if (rule.conditions.children.length) {
    out.push({ text: ", if " }, ...summarizeGroup(rule.conditions, false));
  }
  out.push({ text: ", then " });
  if (!rule.actions.length) out.push({ text: "[add an action]", placeholder: true });
  rule.actions.forEach((a, i) => {
    if (i) out.push({ text: i === rule.actions.length - 1 ? " and " : ", " });
    out.push(...summarizeAction(a));
  });
  return out;
}
export const segmentsToString = (s: Segment[]) => s.map((x) => x.text).join("");

/* ───────── Validation ───────── */

function validateCondition(c: Condition, errs: ValidationError[]) {
  const push = (message: string, field: string) => errs.push({ id: c.id, message, field });
  const f = getField(c.fieldId);
  if (!f) return push("Choose a field to compare.", "field");
  const op = getOperator(f.type, c.operatorId);
  if (!op) return push(`Choose how ${f.label.toLowerCase()} should be compared.`, "operator");
  const numeric = f.type === "number" || f.type === "currency" || f.type === "percent";
  const bad = (s: string) => numeric && (s.trim() === "" || Number.isNaN(Number(s)));
  const v = c.value;
  if (op.kind === "single") {
    if (typeof v !== "string" || !v.trim()) return push("Enter a value.", "value");
    if (bad(v)) return push("Enter a number.", "value");
    if (f.type === "percent" && (Number(v) < 0 || Number(v) > 100)) return push("Percent must be between 0 and 100.", "value");
  } else if (op.kind === "range") {
    if (!isRange(v) || !v.from || !v.to) return push("Enter both ends of the range.", "value");
    if (bad(v.from) || bad(v.to)) return push("Enter numbers for both ends.", "value");
    const lo = numeric ? Number(v.from) : v.from;
    const hi = numeric ? Number(v.to) : v.to;
    if (lo > hi) return push("The start must not be after the end.", "value");
  } else if (op.kind === "relative") {
    if (!isRel(v) || !v.n || Number(v.n) <= 0) return push("Enter a number of days greater than 0.", "value");
  } else if (op.kind === "multi") {
    if (!Array.isArray(v) || !v.length) return push("Select at least one option.", "value");
  }
}

function validateGroup(g: ConditionGroup, root: boolean, errs: ValidationError[]) {
  if (!root && !g.children.length) errs.push({ id: g.id, message: "This group is empty. Add a condition or remove it." });
  g.children.forEach((c) => (c.kind === "condition" ? validateCondition(c, errs) : validateGroup(c, false, errs)));
}

function validateAction(a: Action, errs: ValidationError[]) {
  const c = a.config;
  const push = (message: string, field: string) => errs.push({ id: a.id, message, field });
  switch (a.type) {
    case "notify": if (!c.person) push("Choose who to notify.", "person"); break;
    case "email":
      if (!c.to) push("Choose a recipient.", "to");
      else if (!c.subject?.trim()) push("Add an email subject.", "subject");
      break;
    case "status": if (!c.status) push("Choose a status.", "status"); break;
    case "assign": if (!c.owner) push("Choose a new owner.", "owner"); break;
    case "tag": if (!c.tag?.trim()) push("Enter a tag name.", "tag"); break;
    case "task": if (!c.title?.trim()) push("Give the task a title.", "title"); break;
    case "webhook":
      if (!c.url?.trim()) push("Enter a URL.", "url");
      else if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(c.url)) push("Enter a secure URL starting with https://", "url");
      break;
  }
  if (a.delay && (!a.delay.n || Number(a.delay.n) <= 0)) push("Enter a delay greater than 0.", "delay");
}

export function validateRule(rule: Rule): ValidationError[] {
  const errs: ValidationError[] = [];
  const def = getTriggerDef(rule.trigger?.id);
  if (!rule.trigger || !def) errs.push({ id: "trigger", message: "Choose a trigger so the rule knows when to run." });
  else def.params?.forEach((p) => {
    if (!rule.trigger!.params[p.key]) errs.push({ id: "trigger", message: `Choose a ${p.label.toLowerCase()} for this trigger.`, field: p.key });
  });
  validateGroup(rule.conditions, true, errs);
  if (!rule.actions.length) errs.push({ id: "actions", message: "Add at least one action." });
  rule.actions.forEach((a) => validateAction(a, errs));
  return errs;
}

/* ───────── Fixtures ───────── */

export const sampleRule: Rule = {
  id: "rule_sample",
  name: "Escalate budget risk on Tier 1 projects",
  enabled: true,
  trigger: { id: "status_changes", params: { status: "review" } },
  conditions: {
    kind: "group", id: "g_root", match: "all",
    children: [
      { kind: "condition", id: "c_budget", fieldId: "budget.used", operatorId: "gt", value: "80" },
      { kind: "condition", id: "c_tier", fieldId: "client.tier", operatorId: "any_of", value: ["tier1"] },
      {
        kind: "group", id: "g_or", match: "any",
        children: [
          { kind: "condition", id: "c_owner", fieldId: "people.owner", operatorId: "any_of", value: ["priya", "tom"] },
          { kind: "condition", id: "c_due", fieldId: "project.due", operatorId: "before", value: "2026-12-01" },
        ],
      },
    ],
  },
  actions: [
    { id: "a_notify", type: "notify", config: { person: "role:account_lead", channel: "slack" }, delay: null },
    { id: "a_status", type: "status", config: { status: "at_risk" }, delay: null },
  ],
};

export const emptyRule = (): Rule => ({
  id: "rule_new", name: "Untitled rule", enabled: true, trigger: null,
  conditions: { kind: "group", id: "g_root_new", match: "all", children: [] }, actions: [],
});

export type { Action, Condition, ConditionNode };
