import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Menu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import {
  AlertTriangle, ArrowDown, ArrowUp, ArrowUpDown, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Copy,
  History, Info, Lock, MinusCircle, MoreHorizontal, Pause, Pencil, Play, Plus, RotateCcw, Search, SearchX, Sparkles,
  Trash2, X, XCircle, Zap, GitCompare,
} from "lucide-react";
import {
  Avatar, Badge, Btn, F, IconBtn, Label, RuleComposer, TextInput, Tip, Toggle, emptyRule, fillTemplate, getTriggerDef,
  segmentsToString, summarizeRule, tokens,
} from "./rules";
import type { Rule } from "./rules";
import { RuleCard, STATUS_META, summaryOf } from "./rules/RuleCard";
import {
  MOCK_RULES, OWNERS, RUNS, TEMPLATES, TEMPLATE_CATEGORIES, VERSIONS, relTime,
  type ManagedRule, type RuleStatus, type RuleTemplate, type RuleVersion, type RunRecord,
} from "./rules/mockRules";

const C = tokens.colors;
const PAGE_SIZE = 5;

/* ───────── Local styles ───────── */

const CSS = `
.rm-row{transition:background 140ms ease-out}
.rm-row:hover,.rm-row[data-selected="true"]{background:#F8F8FA}
.rm-row[data-selected="true"]{background:${C.blueTint}}
.rm-th{background:transparent;border:0;padding:4px 6px;margin:-4px -6px;border-radius:6px;font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
.rm-th:hover{background:rgba(0,0,0,0.05);color:${C.ink}}
.rm-chipbtn{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 10px;border-radius:6px;font-family:${F};font-size:13px;cursor:pointer;background:#fff;color:${C.ink};border:1px solid ${C.borderStrong};transition:background 140ms ease-out,border-color 140ms ease-out}
.rm-chipbtn:hover{background:${C.offWhite}}
.rm-chipbtn[data-active="true"]{background:${C.blueTint};border-color:${C.blue};color:${C.blue}}
.rm-chipbtn[data-active="true"]:hover{background:${C.blueTintStrong}}
.rm-tab{font-family:${F};font-size:14px;padding:8px 14px;border:0;border-radius:6px;background:transparent;color:${C.textSecondary};cursor:pointer;transition:background 180ms ease-out,color 180ms ease-out}
.rm-tab:hover{background:${C.offWhite};color:${C.ink}}
.rm-tab[data-state="active"]{background:${C.blueTint};color:${C.blue};font-weight:700}
.rm-tcard{transition:border-color 140ms ease-out,box-shadow 140ms ease-out}
.rm-tcard:hover{border-color:${C.borderStrong};box-shadow:${tokens.shadows.md}}
.rm-overlay{position:fixed;inset:0;background:rgba(10,10,15,0.40);z-index:200}
.rm-overlay[data-state="open"]{animation:rm-fade 220ms ease-out}
.rm-overlay[data-state="closed"]{animation:rm-fade-out 220ms ease-out forwards}
.rm-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:201;background:#fff;border-radius:16px;box-shadow:${tokens.shadows.lg};font-family:${F};max-height:88vh;display:flex;flex-direction:column;outline:none}
.rm-modal[data-state="open"]{animation:rm-modal-in 220ms ease-out}
.rm-modal[data-state="closed"]{animation:rm-modal-out 160ms ease-out forwards}
.rm-slide{position:fixed;top:0;right:0;bottom:0;z-index:201;background:#fff;box-shadow:${tokens.shadows.lg};font-family:${F};display:flex;flex-direction:column;outline:none;width:min(760px,100vw)}
.rm-slide[data-state="open"]{animation:rm-slide-in 280ms ease-in-out}
.rm-slide[data-state="closed"]{animation:rm-slide-out 280ms ease-in-out forwards}
.rm-skel{background:${C.offWhite};border-radius:6px;animation:rm-pulse 1.6s ease-in-out infinite}
.rm-live{animation:rm-fade 180ms ease-out}
@keyframes rm-fade{from{opacity:0}to{opacity:1}}
@keyframes rm-fade-out{from{opacity:1}to{opacity:0}}
@keyframes rm-modal-in{from{opacity:0;transform:translate(-50%,-50%) scale(0.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes rm-modal-out{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(0.97)}}
@keyframes rm-slide-in{from{transform:translateX(100%)}to{transform:none}}
@keyframes rm-slide-out{from{transform:none}to{transform:translateX(100%)}}
@keyframes rm-pulse{0%,100%{opacity:1}50%{opacity:0.55}}
@media (prefers-reduced-motion:reduce){
  .rm-skel{animation:none}
  .rm-overlay,.rm-modal,.rm-slide,.rm-live{animation-duration:1ms !important}
}
`;
if (typeof document !== "undefined" && !document.getElementById("rm-styles")) {
  const el = document.createElement("style");
  el.id = "rm-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const sr: React.CSSProperties = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" };

/* ───────── Layout helpers ───────── */

function Block({ label, title, note, children }: { label: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <Label>{label}</Label>
      <h3 style={{ fontSize: 20, fontFamily: F, fontWeight: 700, lineHeight: 1.3, color: C.ink, margin: "4px 0 0" }}>{title}</h3>
      <p style={{ fontSize: 14, fontFamily: F, color: C.textSecondary, lineHeight: 1.5, margin: "4px 0 16px" }}>{note}</p>
      {children}
    </div>
  );
}
const Panel = ({ children, pad = 24, style }: { children: React.ReactNode; pad?: number; style?: React.CSSProperties }) => (
  <div style={{ border: `1px solid ${C.border}`, background: "#fff", borderRadius: 10, boxShadow: tokens.shadows.sm, padding: pad, minWidth: 0, ...style }}>{children}</div>
);

function Banner({ icon, tone = "info", children }: { icon?: React.ReactNode; tone?: "info" | "success" | "danger"; children: React.ReactNode }) {
  const bg = tone === "info" ? C.blueTint : tone === "success" ? C.successBg : C.dangerBg;
  const fg = tone === "danger" ? "#B91C1C" : tone === "success" ? "#007A4B" : C.ink;
  return (
    <div role="status" className="rm-live" style={{ display: "flex", alignItems: "flex-start", gap: 10, background: bg, color: fg, borderRadius: 6, padding: "10px 14px", fontFamily: F, fontSize: 14, lineHeight: 1.5 }}>
      <span style={{ marginTop: 2, display: "inline-flex", color: tone === "info" ? C.blue : fg }}>{icon ?? <Info size={16} aria-hidden />}</span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

function Checkbox({ checked, indeterminate, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: (v: boolean) => void; label: string }) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <input ref={ref} type="checkbox" className="rb-f" aria-label={label} checked={checked} onChange={(e) => onChange(e.target.checked)}
      style={{ width: 16, height: 16, accentColor: C.blue, cursor: "pointer", margin: 0 }} />
  );
}

function ConfirmDialog({ open, onOpenChange, title, body, confirmLabel, onConfirm, destructive = true }: {
  open: boolean; onOpenChange: (o: boolean) => void; title: string; body: string; confirmLabel: string; onConfirm: () => void; destructive?: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="rm-overlay" />
        <Dialog.Content className="rm-modal" style={{ width: "min(440px, calc(100vw - 32px))", padding: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: destructive ? C.dangerBg : C.blueTint, color: destructive ? C.danger : C.blue, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {destructive ? <Trash2 size={18} aria-hidden /> : <RotateCcw size={18} aria-hidden />}
            </span>
            <div>
              <Dialog.Title style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.ink }}>{title}</Dialog.Title>
              <Dialog.Description style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: C.textSecondary }}>{body}</Dialog.Description>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
            <Btn variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Btn>
            <Btn variant={destructive ? "destructive" : "primary"} onClick={() => { onConfirm(); onOpenChange(false); }}>{confirmLabel}</Btn>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ───────── 1. Rules list ───────── */

type SortKey = "name" | "trigger" | "lastRun" | "runs" | "status";
const triggerLabel = (r: ManagedRule) => {
  const def = getTriggerDef(r.rule.trigger?.id);
  return def && r.rule.trigger ? segmentsToString(fillTemplate(def, def.name, r.rule.trigger.params)) : "No trigger";
};
const triggerCategory = (r: ManagedRule) => getTriggerDef(r.rule.trigger?.id)?.category ?? "";

function FilterChip({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const active = value !== "all";
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <button type="button" className="rm-chipbtn rb-f" data-active={active}>
          {label}{active ? `: ${value}` : ""}<ChevronDown size={14} aria-hidden />
        </button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content className="rb-menu" align="start" sideOffset={4} style={{ minWidth: 180 }}>
          <Menu.RadioGroup value={value} onValueChange={onChange}>
            {["all", ...options].map((o) => (
              <Menu.RadioItem key={o} value={o} className="rb-item">
                <span style={{ flex: 1 }}>{o === "all" ? `All ${label.toLowerCase()}s` : o}</span>
                <Menu.ItemIndicator><Check size={14} color={C.blue} aria-hidden /></Menu.ItemIndicator>
              </Menu.RadioItem>
            ))}
          </Menu.RadioGroup>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

function RowMenu({ item, onAction }: { item: ManagedRule; onAction: (a: "edit" | "duplicate" | "toggle" | "history" | "delete") => void }) {
  return (
    <Menu.Root>
      <Tip label="More actions">
        <Menu.Trigger asChild>
          <button type="button" className="rb-btn rb-f rb-ghost" aria-label={`Actions for ${item.name}`} style={{ width: 32, height: 32, padding: 0 }}>
            <MoreHorizontal size={16} aria-hidden />
          </button>
        </Menu.Trigger>
      </Tip>
      <Menu.Portal>
        <Menu.Content className="rb-menu" align="end" sideOffset={4} style={{ minWidth: 180 }}>
          <Menu.Item className="rb-item" onSelect={() => onAction("edit")}><Pencil size={14} aria-hidden />Edit</Menu.Item>
          <Menu.Item className="rb-item" onSelect={() => onAction("duplicate")}><Copy size={14} aria-hidden />Duplicate</Menu.Item>
          <Menu.Item className="rb-item" onSelect={() => onAction("toggle")}>
            {item.status === "paused" ? <><Play size={14} aria-hidden />Resume</> : <><Pause size={14} aria-hidden />Pause</>}
          </Menu.Item>
          <Menu.Item className="rb-item" onSelect={() => onAction("history")}><History size={14} aria-hidden />View history</Menu.Item>
          <div className="rb-sep" />
          <Menu.Item className="rb-item rb-danger" onSelect={() => onAction("delete")}><Trash2 size={14} aria-hidden />Delete</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

const thStyle: React.CSSProperties = { textAlign: "left", padding: "12px 12px", fontFamily: F, fontSize: 12, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary, background: C.offWhite, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" };
const tdStyle: React.CSSProperties = { padding: "12px", fontFamily: F, fontSize: 14, color: C.ink, borderBottom: `1px solid ${C.border}`, verticalAlign: "middle" };

function StatusBadge({ status }: { status: RuleStatus }) {
  const m = STATUS_META[status];
  const Icon = m.icon;
  return <Badge variant={m.variant}><Icon size={12} aria-hidden style={{ marginRight: 4 }} />{m.label}</Badge>;
}

function RulesListDemo() {
  const [rules, setRules] = React.useState<ManagedRule[]>(MOCK_RULES);
  const [q, setQ] = React.useState("");
  const [fStatus, setFStatus] = React.useState("all");
  const [fTrigger, setFTrigger] = React.useState("all");
  const [fOwner, setFOwner] = React.useState("all");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "lastRun", dir: "asc" });
  const [page, setPage] = React.useState(1);
  const [sel, setSel] = React.useState<Set<string>>(new Set());
  const [confirm, setConfirm] = React.useState<{ ids: string[] } | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);

  const filtered = rules.filter((r) =>
    (!q || `${r.name} ${summaryOf(r)}`.toLowerCase().includes(q.toLowerCase())) &&
    (fStatus === "all" || STATUS_META[r.status].label === fStatus) &&
    (fTrigger === "all" || triggerCategory(r) === fTrigger) &&
    (fOwner === "all" || r.owner === fOwner));

  const sorted = [...filtered].sort((a, b) => {
    const dir = sort.dir === "asc" ? 1 : -1;
    switch (sort.key) {
      case "name": return a.name.localeCompare(b.name) * dir;
      case "trigger": return triggerLabel(a).localeCompare(triggerLabel(b)) * dir;
      case "lastRun": return ((a.lastRunMins ?? 1e9) - (b.lastRunMins ?? 1e9)) * dir;
      case "runs": return (a.runs7d - b.runs7d) * dir;
      case "status": return a.status.localeCompare(b.status) * dir;
    }
  });
  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const cur = Math.min(page, pages);
  const rows = sorted.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const allOnPage = rows.length > 0 && rows.every((r) => sel.has(r.id));
  const someOnPage = rows.some((r) => sel.has(r.id));

  const flash = (m: string) => setMsg(m);
  const setStatus = (ids: string[], status: RuleStatus) => setRules((rs) => rs.map((r) => (ids.includes(r.id) ? { ...r, status, errorMessage: status === "error" ? r.errorMessage : undefined } : r)));
  const toggleRow = (id: string, on: boolean) => { setStatus([id], on ? "active" : "paused"); };
  const resetFilters = () => { setQ(""); setFStatus("all"); setFTrigger("all"); setFOwner("all"); setPage(1); };
  const hasFilters = q || fStatus !== "all" || fTrigger !== "all" || fOwner !== "all";

  const onSort = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  const sortHead = (key: SortKey, label: string) => (
    <th scope="col" style={thStyle} aria-sort={sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
      <button type="button" className="rm-th rb-f" onClick={() => onSort(key)}>
        {label}
        {sort.key === key ? (sort.dir === "asc" ? <ArrowUp size={12} aria-hidden color={C.blue} /> : <ArrowDown size={12} aria-hidden color={C.blue} />) : <ArrowUpDown size={12} aria-hidden color={C.textDisabled} />}
      </button>
    </th>
  );

  const doDelete = (ids: string[]) => {
    setRules((rs) => rs.filter((r) => !ids.includes(r.id)));
    setSel((s) => { const n = new Set(s); ids.forEach((i) => n.delete(i)); return n; });
    flash(`${ids.length} rule${ids.length > 1 ? "s" : ""} deleted.`);
  };
  const onAction = (r: ManagedRule, a: "edit" | "duplicate" | "toggle" | "history" | "delete") => {
    if (a === "edit") flash(`Opening "${r.name}" in the rule editor.`);
    if (a === "history") flash(`Showing run history for "${r.name}".`);
    if (a === "duplicate") {
      const copy: ManagedRule = { ...r, id: `${r.id}_copy_${Date.now()}`, name: `${r.name} (copy)`, status: "paused", runs7d: 0, lastRunMins: null, errorMessage: undefined };
      setRules((rs) => [copy, ...rs]);
      flash(`Duplicated as "${copy.name}". The copy is paused until you enable it.`);
    }
    if (a === "toggle") { const next = r.status === "paused" ? "active" : "paused"; setStatus([r.id], next); flash(`${next === "active" ? "Resumed" : "Paused"} "${r.name}".`); }
    if (a === "delete") setConfirm({ ids: [r.id] });
  };
  const selIds = [...sel].filter((id) => rules.some((r) => r.id === id));

  return (
    <Panel pad={0} style={{ overflow: "hidden" }}>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h4 style={{ margin: 0, fontFamily: F, fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: C.ink }}>Rules</h4>
            <p style={{ margin: "4px 0 0", fontFamily: F, fontSize: 14, color: C.textSecondary }}>Automate hand-offs, nudges and escalations across your projects.</p>
          </div>
          <Btn leftIcon={<Plus size={16} aria-hidden />} onClick={() => flash("Opening a blank rule in the editor.")}>New rule</Btn>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <TextInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search rules" aria-label="Search rules" width={260}
            prefix={<Search size={14} aria-hidden />}
            suffix={q ? <button type="button" className="rb-chip-x rb-f" aria-label="Clear search" onClick={() => setQ("")}><X size={12} aria-hidden /></button> : undefined} />
          <FilterChip label="Status" value={fStatus} options={["Active", "Paused", "Error"]} onChange={(v) => { setFStatus(v); setPage(1); }} />
          <FilterChip label="Trigger type" value={fTrigger} options={["Project", "Budget", "Client", "Schedule"]} onChange={(v) => { setFTrigger(v); setPage(1); }} />
          <FilterChip label="Owner" value={fOwner} options={OWNERS} onChange={(v) => { setFOwner(v); setPage(1); }} />
          {hasFilters && <Btn variant="ghost" size="sm" onClick={resetFilters}>Clear filters</Btn>}
        </div>

        <div aria-live="polite" style={{ minHeight: msg ? undefined : 0 }}>
          {msg && (
            <Banner tone="success" icon={<CheckCircle2 size={16} aria-hidden />}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ flex: 1 }}>{msg}</span>
                <IconBtn label="Dismiss message" size={24} onClick={() => setMsg(null)}><X size={14} aria-hidden /></IconBtn>
              </span>
            </Banner>
          )}
        </div>

        {selIds.length > 0 && (
          <div role="toolbar" aria-label="Bulk actions" className="rm-live" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: C.ink, color: "#fff", borderRadius: 10, padding: "8px 8px 8px 16px", fontFamily: F, fontSize: 14, border: "1px solid rgba(255,255,255,0.10)" }}>
            <span style={{ flex: 1, minWidth: 120 }}>{selIds.length} selected</span>
            <button type="button" className="rb-btn rb-f" style={{ height: 32, padding: "0 12px", background: "#fff", color: C.ink, fontSize: 13 }} onClick={() => { setStatus(selIds, "active"); flash(`${selIds.length} rule${selIds.length > 1 ? "s" : ""} enabled.`); }}><Play size={14} aria-hidden />Enable</button>
            <button type="button" className="rb-btn rb-f" style={{ height: 32, padding: "0 12px", background: "#fff", color: C.ink, fontSize: 13 }} onClick={() => { setStatus(selIds, "paused"); flash(`${selIds.length} rule${selIds.length > 1 ? "s" : ""} paused.`); }}><Pause size={14} aria-hidden />Pause</button>
            <button type="button" className="rb-btn rb-f" style={{ height: 32, padding: "0 12px", background: C.danger, color: "#fff", fontSize: 13 }} onClick={() => setConfirm({ ids: selIds })}><Trash2 size={14} aria-hidden />Delete</button>
            <button type="button" className="rb-btn rb-f" aria-label="Clear selection" style={{ width: 32, height: 32, padding: 0, background: "transparent", color: "#fff" }} onClick={() => setSel(new Set())}><X size={16} aria-hidden /></button>
          </div>
        )}
      </div>

      {rows.length === 0 ? (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: 48 }}>
          <EmptyBlock icon={<SearchX size={24} aria-hidden />} title="No rules match your filters" body="Try a different search term, or clear the filters to see all rules." actions={<Btn variant="secondary" onClick={resetFilters}>Clear filters</Btn>} />
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderTop: `1px solid ${C.border}` }}>
          <table style={{ width: "100%", minWidth: 1020, borderCollapse: "collapse" }}>
            <caption style={sr}>Automation rules</caption>
            <thead>
              <tr>
                <th scope="col" style={{ ...thStyle, width: 44 }}>
                  <Checkbox label="Select all rules on this page" checked={allOnPage} indeterminate={someOnPage && !allOnPage}
                    onChange={(v) => setSel((s) => { const n = new Set(s); rows.forEach((r) => (v ? n.add(r.id) : n.delete(r.id))); return n; })} />
                </th>
                <th scope="col" style={{ ...thStyle, width: 72 }}>Enabled</th>
                {sortHead("name", "Rule")}
                {sortHead("trigger", "Trigger")}
                {sortHead("lastRun", "Last run")}
                {sortHead("runs", "Runs (7 days)")}
                {sortHead("status", "Status")}
                <th scope="col" style={thStyle}>Owner</th>
                <th scope="col" style={{ ...thStyle, width: 52 }}><span style={sr}>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const selected = sel.has(r.id);
                return (
                  <tr key={r.id} className="rm-row" data-selected={selected}>
                    <td style={tdStyle}>
                      <Checkbox label={`Select ${r.name}`} checked={selected} onChange={(v) => setSel((s) => { const n = new Set(s); if (v) n.add(r.id); else n.delete(r.id); return n; })} />
                    </td>
                    <td style={tdStyle}><Toggle checked={r.status !== "paused"} onChange={(v) => toggleRow(r.id, v)} ariaLabel={`${r.name} enabled`} /></td>
                    <td style={{ ...tdStyle, maxWidth: 320 }}>
                      <div style={{ fontWeight: 700 }}>{r.name}</div>
                      <Tip label={summaryOf(r)}>
                        <div tabIndex={0} className="rb-f" style={{ fontSize: 13, color: C.textSecondary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", borderRadius: 4, maxWidth: 300 }}>{summaryOf(r)}</div>
                      </Tip>
                    </td>
                    <td style={{ ...tdStyle, color: C.textSecondary }}>{triggerLabel(r)}</td>
                    <td style={{ ...tdStyle, color: C.textSecondary, whiteSpace: "nowrap" }}>{relTime(r.lastRunMins)}</td>
                    <td style={{ ...tdStyle, fontVariantNumeric: "tabular-nums" }}>{r.runs7d}</td>
                    <td style={tdStyle}><StatusBadge status={r.status} /></td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Avatar name={r.owner} /><span style={sr}>{r.owner}</span></span>
                    </td>
                    <td style={tdStyle}><RowMenu item={r} onAction={(a) => onAction(r, a)} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <nav aria-label="Rules pagination" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderTop: `1px solid ${C.border}`, fontFamily: F, fontSize: 14, color: C.textSecondary, flexWrap: "wrap" }}>
          <span style={{ flex: 1 }}>Showing {(cur - 1) * PAGE_SIZE + 1}–{Math.min(cur * PAGE_SIZE, sorted.length)} of {sorted.length} rules</span>
          <Btn variant="ghost" size="sm" disabled={cur === 1} onClick={() => setPage(cur - 1)} leftIcon={<ChevronLeft size={14} aria-hidden />}>Previous</Btn>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button key={p} type="button" className="rb-btn rb-f" aria-label={`Page ${p}`} aria-current={p === cur ? "page" : undefined} onClick={() => setPage(p)}
              style={{ width: 32, height: 32, padding: 0, fontSize: 13, background: p === cur ? C.blue : "transparent", color: p === cur ? "#fff" : C.ink }}>{p}</button>
          ))}
          <Btn variant="ghost" size="sm" disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next<ChevronRight size={14} aria-hidden /></Btn>
        </nav>
      )}

      <ConfirmDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}
        title={confirm && confirm.ids.length > 1 ? `Delete ${confirm.ids.length} rules?` : "Delete this rule?"}
        body="Deleted rules stop running immediately. Their run history is kept for 30 days, but the rule cannot be restored."
        confirmLabel="Delete" onConfirm={() => confirm && doDelete(confirm.ids)} />
    </Panel>
  );
}

/* ───────── 2. Rule cards ───────── */

function RuleCardsDemo() {
  const [items, setItems] = React.useState<ManagedRule[]>(() => [
    MOCK_RULES[0],
    MOCK_RULES[4],
    MOCK_RULES[2],
  ]);
  const toggle = (id: string, on: boolean) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status: on ? "active" : "paused", errorMessage: on ? x.errorMessage : undefined } : x)));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
      {[["Active", items[0]], ["Paused", items[1]], ["Error", items[2]]].map(([label, it]) => (
        <div key={(it as ManagedRule).id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>{label as string}</Label>
          <RuleCard item={it as ManagedRule} onToggle={toggle} />
        </div>
      ))}
    </div>
  );
}

/* ───────── 3. Templates ───────── */

function EmptyBlock({ icon, title, body, actions }: { icon: React.ReactNode; title: string; body: string; actions?: React.ReactNode }) {
  return (
    <div style={{ textAlign: "center", fontFamily: F, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span style={{ width: 56, height: 56, borderRadius: 16, background: C.blueTint, color: C.blue, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{icon}</span>
      <h4 style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 700, color: C.ink }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: C.textSecondary, maxWidth: 400 }}>{body}</p>
      {actions && <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>{actions}</div>}
    </div>
  );
}

function TemplatesDemo() {
  const [open, setOpen] = React.useState(false);
  const [cat, setCat] = React.useState<string>("All");
  const [picked, setPicked] = React.useState<{ name: string; rule: Rule; scratch: boolean } | null>(null);

  const choose = (name: string, rule: Rule, scratch = false) => { setPicked({ name, rule, scratch }); setOpen(false); };
  const list = TEMPLATES.filter((t) => cat === "All" || t.category === cat);

  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <p style={{ margin: 0, flex: 1, minWidth: 220, fontFamily: F, fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>
          Open the gallery from the rules list or the empty state. Choosing a template hands you to the editor with every step pre-filled.
        </p>
        <Btn variant="secondary" leftIcon={<Sparkles size={16} aria-hidden />} onClick={() => setOpen(true)}>Browse templates</Btn>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="rm-overlay" />
          <Dialog.Content className="rm-modal" style={{ width: "min(880px, calc(100vw - 32px))" }}>
            <div style={{ padding: "24px 24px 0", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Dialog.Title style={{ margin: 0, fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: C.ink }}>Start from a template</Dialog.Title>
                <Dialog.Description style={{ margin: "4px 0 0", fontSize: 14, color: C.textSecondary }}>Pick a proven rule, then adjust it to suit your team.</Dialog.Description>
              </div>
              <Dialog.Close asChild><IconBtn label="Close"><X size={16} aria-hidden /></IconBtn></Dialog.Close>
            </div>
            <Tabs.Root value={cat} onValueChange={setCat} style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
              <Tabs.List aria-label="Template categories" style={{ display: "flex", gap: 4, padding: "16px 24px 0", flexWrap: "wrap" }}>
                {TEMPLATE_CATEGORIES.map((c) => <Tabs.Trigger key={c} value={c} className="rm-tab rb-f">{c}</Tabs.Trigger>)}
              </Tabs.List>
              <div style={{ padding: 24, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {list.map((t: RuleTemplate) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.id} className="rm-tcard" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", gap: 8, background: "#fff", boxShadow: tokens.shadows.sm }}>
                      <span style={{ width: 36, height: 36, borderRadius: 10, background: C.blueTint, color: C.blue, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} aria-hidden /></span>
                      <h5 style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 700, color: C.ink }}>{t.name}</h5>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: C.textSecondary, flex: 1 }}>{t.description}</p>
                      <Btn size="sm" variant="secondary" onClick={() => choose(t.name, t.rule)} style={{ alignSelf: "flex-start", marginTop: 8 }} aria-label={`Use template: ${t.name}`}>Use template</Btn>
                    </div>
                  );
                })}
              </div>
            </Tabs.Root>
            <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ flex: 1, fontSize: 14, color: C.textSecondary }}>Nothing close to what you need?</span>
              <Btn variant="ghost" onClick={() => choose("Untitled rule", emptyRule(), true)}>Start from scratch</Btn>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {picked && (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <Banner tone="success" icon={<CheckCircle2 size={16} aria-hidden />}>
            {picked.scratch
              ? <>The editor has opened with a blank rule. Choose a trigger to begin.</>
              : <>The editor has opened pre-filled with <strong>{picked.name}</strong>. Review each step, then save.</>}
          </Banner>
          <Label>Editor preview (contained)</Label>
          <div style={{ border: `1px dashed ${C.borderStrong}`, borderRadius: 10, padding: 16, background: C.offWhite }}>
            <RuleComposer key={picked.name} defaultRule={picked.rule} collapsible />
          </div>
        </div>
      )}
    </Panel>
  );
}

/* ───────── 4. Run history ───────── */

const RESULT = {
  success: { label: "Success", color: "#007A4B", Icon: CheckCircle2 },
  skipped: { label: "Skipped", color: C.textSecondary, Icon: MinusCircle },
  failed: { label: "Failed", color: "#B91C1C", Icon: XCircle },
} as const;

function StepList({ title, steps, emptyText }: { title: string; steps: RunRecord["conditions"]; emptyText: string }) {
  return (
    <div>
      <Label>{title}</Label>
      <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {steps.length === 0 && <li style={{ fontSize: 14, color: C.textSecondary }}>{emptyText}</li>}
        {steps.map((s, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: C.ink, lineHeight: 1.4 }}>
            {s.ok ? <Check size={16} aria-hidden color={C.success} style={{ flexShrink: 0 }} /> : <X size={16} aria-hidden color={C.danger} style={{ flexShrink: 0 }} />}
            <span>{s.label}<span style={sr}>{s.ok ? " (passed)" : " (failed)"}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RunHistoryDemo() {
  const [open, setOpen] = React.useState<string | null>("x3");
  return (
    <Panel pad={0} style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
          <caption style={sr}>Run history for Escalate budget risk on Tier 1 projects</caption>
          <thead>
            <tr>
              <th scope="col" style={{ ...thStyle, width: 44 }}><span style={sr}>Expand</span></th>
              <th scope="col" style={thStyle}>Time</th>
              <th scope="col" style={thStyle}>Record</th>
              <th scope="col" style={thStyle}>Result</th>
              <th scope="col" style={thStyle}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {RUNS.map((r) => {
              const isOpen = open === r.id;
              const res = RESULT[r.result];
              const Icon = res.Icon;
              return (
                <React.Fragment key={r.id}>
                  <tr className="rm-row">
                    <td style={tdStyle}>
                      <IconBtn label={isOpen ? "Hide run details" : "Show run details"} size={28} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : r.id)}>
                        <ChevronRight size={16} aria-hidden style={{ transition: "transform 180ms ease-out", transform: isOpen ? "rotate(90deg)" : "none" }} />
                      </IconBtn>
                    </td>
                    <td style={{ ...tdStyle, color: C.textSecondary, whiteSpace: "nowrap" }}>{relTime(r.minsAgo)}</td>
                    <td style={tdStyle}>{r.record}</td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: res.color, fontWeight: 700 }}><Icon size={16} aria-hidden />{res.label}</span>
                    </td>
                    <td style={{ ...tdStyle, color: C.textSecondary, fontVariantNumeric: "tabular-nums" }}>{r.durationMs >= 1000 ? `${(r.durationMs / 1000).toFixed(1)} s` : `${r.durationMs} ms`}</td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={5} style={{ padding: 0, borderBottom: `1px solid ${C.border}`, background: C.offWhite }}>
                        <div className="rm-live" style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
                          <StepList title="Conditions" steps={r.conditions} emptyText="No conditions on this rule." />
                          <StepList title="Actions" steps={r.actions} emptyText="No actions ran because the conditions were not met." />
                          {r.error && (
                            <div style={{ gridColumn: "1 / -1" }}>
                              <div role="alert" style={{ display: "flex", gap: 10, background: C.dangerBg, color: "#B91C1C", borderRadius: 6, padding: "10px 14px", fontSize: 14, lineHeight: 1.5 }}>
                                <AlertTriangle size={16} aria-hidden style={{ marginTop: 2, flexShrink: 0 }} />
                                <div><strong>Why it failed.</strong> {r.error}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* ───────── 5. Version history ───────── */

type DiffRow = { left?: string; right?: string; kind: "same" | "changed" | "removed" | "added" };
function diffLines(a: string[], b: string[]): DiffRow[] {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const rows: DiffRow[] = [];
  let rem: string[] = [], add: string[] = [];
  const flush = () => {
    for (let k = 0; k < Math.max(rem.length, add.length); k++) {
      const l = rem[k], r = add[k];
      rows.push({ left: l, right: r, kind: l !== undefined && r !== undefined ? "changed" : l !== undefined ? "removed" : "added" });
    }
    rem = []; add = [];
  };
  let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { flush(); rows.push({ left: a[i], right: b[j], kind: "same" }); i++; j++; }
    else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) add.push(b[j++]);
    else rem.push(a[i++]);
  }
  flush();
  return rows;
}

function DiffCell({ text, side, kind }: { text?: string; side: "left" | "right"; kind: DiffRow["kind"] }) {
  const removed = side === "left" && (kind === "removed" || kind === "changed");
  const added = side === "right" && (kind === "added" || kind === "changed");
  const bg = removed ? C.dangerBg : added ? C.successBg : "transparent";
  return (
    <div style={{ display: "flex", gap: 8, padding: "8px 12px", background: text === undefined ? C.offWhite : bg, fontSize: 14, lineHeight: 1.45, color: C.ink, minHeight: 38, minWidth: 0 }}>
      <span aria-hidden style={{ width: 14, flexShrink: 0, fontWeight: 700, color: removed ? "#B91C1C" : added ? "#007A4B" : C.textSecondary }}>{removed ? "−" : added ? "+" : ""}</span>
      {(removed || added) && <span style={sr}>{removed ? "Removed: " : "Added: "}</span>}
      <span style={{ minWidth: 0 }}>{text ?? ""}</span>
    </div>
  );
}

function VersionPanel({ versions, onRestore, onClose }: { versions: RuleVersion[]; onRestore: (v: RuleVersion) => void; onClose: () => void }) {
  const [compare, setCompare] = React.useState<RuleVersion | null>(null);
  const [restoring, setRestoring] = React.useState<RuleVersion | null>(null);
  const current = versions[0];
  const rows = compare ? diffLines(compare.lines, current.lines) : [];
  return (
    <>
      <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Label>Escalate budget risk on Tier 1 projects</Label>
          <Dialog.Title style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, color: C.ink }}>{compare ? `Compare ${compare.label} with current` : "Version history"}</Dialog.Title>
          <Dialog.Description style={{ margin: "4px 0 0", fontSize: 14, color: C.textSecondary }}>
            {compare ? "Lines that changed are marked with + and − as well as colour." : "Every save creates a version you can compare or restore."}
          </Dialog.Description>
        </div>
        <IconBtn label="Close version history" onClick={onClose}><X size={16} aria-hidden /></IconBtn>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {compare ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Btn variant="ghost" size="sm" onClick={() => setCompare(null)} leftIcon={<ChevronLeft size={14} aria-hidden />} style={{ alignSelf: "flex-start" }}>Back to versions</Btn>
            <div role="table" aria-label="Side-by-side comparison" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div role="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: C.offWhite, borderBottom: `1px solid ${C.border}` }}>
                <div role="columnheader" style={{ padding: "8px 12px" }}><Label>{compare.label}</Label></div>
                <div role="columnheader" style={{ padding: "8px 12px", borderLeft: `1px solid ${C.border}` }}><Label>{current.label}</Label></div>
              </div>
              {rows.map((r, i) => (
                <div role="row" key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div role="cell" style={{ minWidth: 0 }}><DiffCell text={r.left} side="left" kind={r.kind} /></div>
                  <div role="cell" style={{ minWidth: 0, borderLeft: `1px solid ${C.border}` }}><DiffCell text={r.right} side="right" kind={r.kind} /></div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" size="sm" leftIcon={<RotateCcw size={14} aria-hidden />} onClick={() => setRestoring(compare)}>Restore {compare.label}</Btn>
            </div>
          </div>
        ) : (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {versions.map((v, i) => (
              <li key={v.id} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, display: "flex", gap: 12, alignItems: "flex-start", background: "#fff", boxShadow: tokens.shadows.sm, flexWrap: "wrap" }}>
                <Avatar name={v.author} size={32} />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.ink }}>{v.label}</span>
                    {i === 0 && <Badge variant="info">Current</Badge>}
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: C.ink, lineHeight: 1.45 }}>{v.change}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: C.textSecondary }}>{v.author} · {relTime(v.minsAgo)}</p>
                </div>
                {i > 0 && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn variant="secondary" size="sm" leftIcon={<GitCompare size={14} aria-hidden />} onClick={() => setCompare(v)} aria-label={`Compare ${v.label} with current`}>Compare</Btn>
                    <Btn variant="ghost" size="sm" leftIcon={<RotateCcw size={14} aria-hidden />} onClick={() => setRestoring(v)} aria-label={`Restore ${v.label}`}>Restore</Btn>
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      <ConfirmDialog open={!!restoring} onOpenChange={(o) => !o && setRestoring(null)} destructive={false}
        title={restoring ? `Restore ${restoring.label}?` : "Restore version?"}
        body="The current version stays in history. Restoring saves this version as a new one and the rule uses it from the next run."
        confirmLabel="Restore" onConfirm={() => { if (restoring) { onRestore(restoring); setCompare(null); } }} />
    </>
  );
}

function VersionHistoryDemo() {
  const [open, setOpen] = React.useState(false);
  const [versions, setVersions] = React.useState<RuleVersion[]>(VERSIONS);
  const [note, setNote] = React.useState<string | null>(null);
  const restore = (v: RuleVersion) => {
    const next: RuleVersion = { id: `v${versions.length + 1}`, label: `v${versions.length + 1} (current)`, author: "You", minsAgo: 0, change: `Restored from ${v.label}`, lines: v.lines };
    setVersions([next, ...versions.map((x, i) => (i === 0 ? { ...x, label: x.label.replace(" (current)", "") } : x))]);
    setNote(`Restored ${v.label} as ${next.id}.`);
  };
  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: F, fontWeight: 700, fontSize: 16, color: C.ink }}>Escalate budget risk on Tier 1 projects</div>
          <p style={{ margin: "2px 0 0", fontFamily: F, fontSize: 14, color: C.textSecondary }}>{versions.length} saved versions · last edited by {versions[0].author} {relTime(versions[0].minsAgo)}</p>
        </div>
        <Btn variant="secondary" leftIcon={<History size={16} aria-hidden />} onClick={() => setOpen(true)}>Version history</Btn>
      </div>
      {note && <div style={{ marginTop: 16 }}><Banner tone="success" icon={<CheckCircle2 size={16} aria-hidden />}>{note}</Banner></div>}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="rm-overlay" />
          <Dialog.Content className="rm-slide">
            <VersionPanel versions={versions} onRestore={restore} onClose={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Panel>
  );
}

/* ───────── 6. States ───────── */

function SkeletonTable() {
  return (
    <div role="status" aria-label="Loading rules" aria-busy="true">
      <span style={sr}>Loading rules</span>
      <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 100px 80px 90px", gap: 16, padding: "12px 16px", background: C.offWhite, borderBottom: `1px solid ${C.border}` }}>
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="rm-skel" style={{ height: 12, background: "#E4E4EA", width: i === 0 ? 16 : "60%" }} />)}
      </div>
      {[0, 1, 2, 3, 4].map((r) => (
        <div key={r} style={{ display: "grid", gridTemplateColumns: "44px 1fr 1fr 100px 80px 90px", gap: 16, padding: "16px", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
          <div className="rm-skel" style={{ width: 40, height: 24, borderRadius: 9999 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="rm-skel" style={{ height: 14, width: `${70 - r * 6}%` }} />
            <div className="rm-skel" style={{ height: 10, width: "90%" }} />
          </div>
          <div className="rm-skel" style={{ height: 14, width: "55%" }} />
          <div className="rm-skel" style={{ height: 14, width: "70%" }} />
          <div className="rm-skel" style={{ height: 24, width: 64 }} />
          <div className="rm-skel" style={{ height: 24, width: 24, borderRadius: 9999 }} />
        </div>
      ))}
    </div>
  );
}

function StatesDemo() {
  const [tab, setTab] = React.useState("empty");
  const [q, setQ] = React.useState("quarterly forecast");
  return (
    <Panel pad={0} style={{ overflow: "hidden" }}>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List aria-label="Rule list states" style={{ display: "flex", gap: 4, padding: 12, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {[["empty", "Empty"], ["noresults", "No search results"], ["loading", "Loading"], ["viewer", "View-only access"]].map(([v, l]) => (
            <Tabs.Trigger key={v} value={v} className="rm-tab rb-f">{l}</Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="empty" className="rm-live" style={{ padding: 64 }}>
          <EmptyBlock icon={<Zap size={24} aria-hidden />} title="No rules yet"
            body="Rules take care of repetitive hand-offs, like alerting an account lead when a project nears its budget. Create your first one or start from a template."
            actions={<><Btn leftIcon={<Plus size={16} aria-hidden />}>New rule</Btn><Btn variant="secondary" leftIcon={<Sparkles size={16} aria-hidden />}>Browse templates</Btn></>} />
        </Tabs.Content>
        <Tabs.Content value="noresults" className="rm-live" style={{ padding: 24 }}>
          <div style={{ marginBottom: 32 }}>
            <TextInput value={q} onChange={setQ} aria-label="Search rules" width={280} prefix={<Search size={14} aria-hidden />} />
          </div>
          <EmptyBlock icon={<SearchX size={24} aria-hidden />} title={q ? `No rules match “${q}”` : "No rules match"}
            body="Check the spelling, search by a trigger such as “budget”, or clear the search to see every rule."
            actions={<Btn variant="secondary" onClick={() => setQ("")}>Clear search</Btn>} />
        </Tabs.Content>
        <Tabs.Content value="loading" className="rm-live"><SkeletonTable /></Tabs.Content>
        <Tabs.Content value="viewer" className="rm-live" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Banner icon={<Lock size={16} aria-hidden />}>
            <strong>You have view-only access.</strong> You can read how this rule works, but only editors and admins can change it. Ask your workspace admin to upgrade your role.
          </Banner>
          <RuleComposer disabled defaultRule={MOCK_RULES[0].rule} />
        </Tabs.Content>
      </Tabs.Root>
    </Panel>
  );
}

/* ───────── Section ───────── */

export function RulesManagementShowcase() {
  return (
    <section id="rulesmanagement" className="mb-16">
      <Label>Rules</Label>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: C.ink, margin: "4px 0 8px" }}>Rules management</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: C.textSecondary, lineHeight: 1.5 }}>
        Everything around the editor: finding, enabling, auditing, templating and restoring automation rules.
      </p>

      <Block label="1 · List" title="Rules list page" note="Search, filter, sort and select rules. Bulk actions appear as soon as a row is ticked. Five rows per page.">
        <RulesListDemo />
      </Block>
      <Block label="2 · Card" title="Rule card" note="A compact summary for grid views and dashboards. Status is always shown as icon plus text.">
        <RuleCardsDemo />
      </Block>
      <Block label="3 · Templates" title="Templates gallery" note="Proven starting points grouped by category. Picking one opens the editor pre-filled.">
        <TemplatesDemo />
      </Block>
      <Block label="4 · Runs" title="Run history" note="Each execution with its outcome. Expand a row to see which conditions passed, which actions ran and why a run failed.">
        <RunHistoryDemo />
      </Block>
      <Block label="5 · Versions" title="Version history" note="A right-hand panel listing saved versions with side-by-side comparison and restore.">
        <VersionHistoryDemo />
      </Block>
      <Block label="6 · States" title="Empty, no results, loading and view-only" note="Switch between the states a rules list needs to cover. The skeleton pulse stops when reduced motion is requested.">
        <StatesDemo />
      </Block>
    </section>
  );
}
