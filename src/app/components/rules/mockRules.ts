import { Wallet, CalendarClock, Building2, FolderKanban, Receipt, MessageSquare, type LucideIcon } from "lucide-react";
import type { Action, Condition, Rule, TriggerCategory } from "./types";
import { defaultTrigger } from "./data";

export type RuleStatus = "active" | "paused" | "error";

export interface ManagedRule {
  id: string;
  name: string;
  status: RuleStatus;
  owner: string;
  /** Minutes before "now" the rule last ran; null when it has never run. */
  lastRunMins: number | null;
  runs7d: number;
  rule: Rule;
  errorMessage?: string;
}

const cond = (id: string, fieldId: string, operatorId: string, value: Condition["value"]): Condition => ({ kind: "condition", id, fieldId, operatorId, value });
const act = (id: string, type: Action["type"], config: Record<string, string>): Action => ({ id, type, config, delay: null });

function mk(
  id: string, name: string, trig: string, params: Record<string, string>, conds: Condition[], actions: Action[],
  meta: { status: RuleStatus; owner: string; lastRunMins: number | null; runs7d: number; errorMessage?: string },
): ManagedRule {
  const t = defaultTrigger(trig);
  const rule: Rule = {
    id, name, enabled: meta.status === "active",
    trigger: { id: trig, params: { ...t.params, ...params } },
    conditions: { kind: "group", id: `${id}_g`, match: "all", children: conds },
    actions,
  };
  return { id, name, rule, ...meta };
}

export const MOCK_RULES: ManagedRule[] = [
  mk("r1", "Escalate budget risk on Tier 1 projects", "budget_threshold", { percent: "80" },
    [cond("r1c1", "client.tier", "any_of", ["tier1"])],
    [act("r1a1", "notify", { person: "role:account_lead", channel: "slack" }), act("r1a2", "status", { status: "at_risk" })],
    { status: "active", owner: "Priya Nair", lastRunMins: 12, runs7d: 34 }),
  mk("r2", "Weekly status nudge for open projects", "weekly", { day: "monday", time: "09:00" },
    [cond("r2c1", "project.status", "any_of", ["in_progress", "review"])],
    [act("r2a1", "notify", { person: "role:project_owner", channel: "app" })],
    { status: "active", owner: "Daniel Reyes", lastRunMins: 60 * 52, runs7d: 21 }),
  mk("r3", "Chase overdue invoices with finance", "invoice_overdue", {},
    [],
    [act("r3a1", "email", { to: "role:finance", subject: "Overdue invoice on {project.name}" }), act("r3a2", "tag", { tag: "Overdue" })],
    { status: "error", owner: "Sofia Marchetti", lastRunMins: 95, runs7d: 9, errorMessage: "Email step failed: the finance partner role has no email address on 3 projects." }),
  mk("r4", "Welcome note when a project is created", "project_created", {},
    [],
    [act("r4a1", "task", { title: "Book kick-off with client", due: "3d" }), act("r4a2", "notify", { person: "role:project_owner", channel: "app" })],
    { status: "active", owner: "Maya Lindqvist", lastRunMins: 60 * 5, runs7d: 6 }),
  mk("r5", "Flag projects due within 7 days", "due_in", { days: "7" },
    [cond("r5c1", "project.status", "none_of", ["delivered"])],
    [act("r5a1", "tag", { tag: "Rush" })],
    { status: "paused", owner: "Tom Okafor", lastRunMins: 60 * 24 * 9, runs7d: 0 }),
  mk("r6", "Ask for a client update after Review", "status_changes", { status: "review" },
    [cond("r6c1", "client.retainer", "is_true", null)],
    [act("r6a1", "email", { to: "role:client_contact", subject: "Your review pack for {project.name}" })],
    { status: "active", owner: "Priya Nair", lastRunMins: 60 * 27, runs7d: 11 }),
  mk("r7", "Alert design director on client feedback", "client_feedback", {},
    [],
    [act("r7a1", "notify", { person: "tom", channel: "slack" })],
    { status: "active", owner: "Tom Okafor", lastRunMins: 60 * 3, runs7d: 48 }),
  mk("r8", "Re-brief team when client tier changes", "tier_changes", {},
    [],
    [act("r8a1", "task", { title: "Review service level for new tier", due: "1w" }), act("r8a2", "notify", { person: "role:account_lead", channel: "app" })],
    { status: "paused", owner: "Maya Lindqvist", lastRunMins: 60 * 24 * 21, runs7d: 0 }),
  mk("r9", "Post phase handover checklist", "phase_starts", { phase: "handover" },
    [],
    [act("r9a1", "task", { title: "Complete handover checklist", due: "3d" })],
    { status: "active", owner: "Daniel Reyes", lastRunMins: 60 * 30, runs7d: 4 }),
  mk("r10", "Sync delivered projects to reporting", "status_changes", { status: "delivered" },
    [],
    [act("r10a1", "webhook", { method: "POST", url: "https://reports.johnsonluke.co/hooks/delivered" })],
    { status: "error", owner: "Sofia Marchetti", lastRunMins: 60 * 6, runs7d: 14, errorMessage: "Webhook returned 502 Bad Gateway on the last 4 attempts." }),
  mk("r11", "Warn at 100% of budget", "budget_threshold", { percent: "100" },
    [cond("r11c1", "budget.over", "is_true", null)],
    [act("r11a1", "notify", { person: "role:finance", channel: "slack" }), act("r11a2", "notify", { person: "role:account_lead", channel: "slack" })],
    { status: "active", owner: "Sofia Marchetti", lastRunMins: 60 * 24 * 2, runs7d: 3 }),
  mk("r12", "Draft pitch follow-up tasks", "project_created", {},
    [cond("r12c1", "project.tags", "any_of", ["pitch"])],
    [act("r12a1", "task", { title: "Send pitch follow-up", due: "1w" })],
    { status: "paused", owner: "Priya Nair", lastRunMins: null, runs7d: 0 }),
];

export const OWNERS = Array.from(new Set(MOCK_RULES.map((r) => r.owner)));

export function relTime(mins: number | null): string {
  if (mins === null) return "Never";
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

/* ───────── Templates ───────── */

export interface RuleTemplate {
  id: string;
  category: "Budget" | "Delivery" | "Clients" | "Admin";
  name: string;
  description: string;
  icon: LucideIcon;
  rule: Rule;
}
export const TEMPLATE_CATEGORIES = ["All", "Budget", "Delivery", "Clients", "Admin"] as const;
export type { TriggerCategory };

const tmpl = (m: ManagedRule, category: RuleTemplate["category"], name: string, description: string, icon: LucideIcon): RuleTemplate =>
  ({ id: `t_${m.id}`, category, name, description, icon, rule: { ...m.rule, id: `t_${m.id}`, name, enabled: false } });
const byId = (id: string) => MOCK_RULES.find((r) => r.id === id)!;

export const TEMPLATES: RuleTemplate[] = [
  tmpl(byId("r1"), "Budget", "Budget early warning", "Tell the account lead and mark the project at risk when spend passes 80% on your top-tier clients.", Wallet),
  tmpl(byId("r3"), "Budget", "Overdue invoice chaser", "Email your finance partner and tag the project whenever an invoice slips past its payment terms.", Receipt),
  tmpl(byId("r2"), "Delivery", "Monday status nudge", "Prompt project owners every Monday morning to update anything still in progress or in review.", CalendarClock),
  tmpl(byId("r9"), "Delivery", "Handover checklist", "Create a handover task the moment a project enters its final phase so nothing is missed.", FolderKanban),
  tmpl(byId("r6"), "Clients", "Review pack to retainer clients", "Send retainer clients a note as soon as work reaches review, with the pack attached.", MessageSquare),
  tmpl(byId("r8"), "Clients", "Re-tier follow-up", "Create a task to revisit service levels whenever account management changes a client's tier.", Building2),
  tmpl(byId("r4"), "Admin", "New project kick-off", "Add a kick-off booking task and alert the owner every time a project is created.", FolderKanban),
  tmpl(byId("r10"), "Admin", "Delivered-to-reporting sync", "Post delivered projects to your reporting endpoint so dashboards stay current.", Receipt),
];

/* ───────── Run history ───────── */

export interface RunStep { label: string; ok: boolean }
export interface RunRecord {
  id: string;
  minsAgo: number;
  record: string;
  result: "success" | "skipped" | "failed";
  durationMs: number;
  conditions: RunStep[];
  actions: RunStep[];
  error?: string;
}

export const RUNS: RunRecord[] = [
  { id: "x1", minsAgo: 12, record: "Beacon Systems · Identity Refresh", result: "success", durationMs: 420,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: true }],
    actions: [{ label: "Notified the account lead on Slack", ok: true }, { label: "Set status to At risk", ok: true }] },
  { id: "x2", minsAgo: 140, record: "Luminal Health · Brand System", result: "skipped", durationMs: 95,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: false }],
    actions: [] },
  { id: "x3", minsAgo: 60 * 6, record: "Fortis Realty · Positioning & Messaging", result: "failed", durationMs: 3010,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: true }],
    actions: [{ label: "Notified the account lead on Slack", ok: true }, { label: "Set status to At risk", ok: false }],
    error: "Could not set status: the project is locked by an open approval. Unlock or resolve the approval, then re-run." },
  { id: "x4", minsAgo: 60 * 26, record: "Varda Finance · Campaign Identity", result: "success", durationMs: 388,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: true }],
    actions: [{ label: "Notified the account lead on Slack", ok: true }, { label: "Set status to At risk", ok: true }] },
  { id: "x5", minsAgo: 60 * 30, record: "Noor Studio · Rebranding", result: "skipped", durationMs: 82,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: false }],
    actions: [] },
  { id: "x6", minsAgo: 60 * 55, record: "Crane & Co. · Environmental Design", result: "success", durationMs: 451,
    conditions: [{ label: "Budget used is above 80%", ok: true }, { label: "Client tier is Tier 1", ok: true }],
    actions: [{ label: "Notified the account lead on Slack", ok: true }, { label: "Set status to At risk", ok: true }] },
];

/* ───────── Version history ───────── */

export interface RuleVersion {
  id: string;
  label: string;
  author: string;
  minsAgo: number;
  change: string;
  lines: string[];
}
export const VERSIONS: RuleVersion[] = [
  { id: "v4", label: "v4 (current)", author: "Priya Nair", minsAgo: 60 * 3, change: "Raised threshold to 80% and added Slack alert",
    lines: ["When budget used passes 80%", "If client tier is Tier 1", "Then notify the account lead on Slack", "Then set status to At risk"] },
  { id: "v3", label: "v3", author: "Tom Okafor", minsAgo: 60 * 24 * 4, change: "Added the Tier 1 condition",
    lines: ["When budget used passes 50%", "If client tier is Tier 1", "Then notify the account lead in-app", "Then set status to At risk"] },
  { id: "v2", label: "v2", author: "Maya Lindqvist", minsAgo: 60 * 24 * 12, change: "Switched notification to the account lead",
    lines: ["When budget used passes 50%", "Then notify the account lead in-app", "Then set status to At risk"] },
  { id: "v1", label: "v1", author: "Priya Nair", minsAgo: 60 * 24 * 30, change: "Initial version",
    lines: ["When budget used passes 50%", "Then notify the project owner in-app"] },
];
