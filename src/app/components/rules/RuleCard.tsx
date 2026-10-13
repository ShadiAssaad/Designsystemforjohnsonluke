import { AlertTriangle, CheckCircle2, PauseCircle } from "lucide-react";
import { Avatar, Badge, F, Toggle, Tip, tokens } from "./primitives";
import type { BadgeVariant } from "./primitives";
import { segmentsToString, summarizeRule } from "./data";
import { relTime, type ManagedRule, type RuleStatus } from "./mockRules";

const C = tokens.colors;

export const STATUS_META: Record<RuleStatus, { label: string; variant: BadgeVariant; icon: typeof CheckCircle2 }> = {
  active: { label: "Active", variant: "success", icon: CheckCircle2 },
  paused: { label: "Paused", variant: "neutral", icon: PauseCircle },
  error: { label: "Error", variant: "danger", icon: AlertTriangle },
};

export const summaryOf = (r: ManagedRule) => segmentsToString(summarizeRule(r.rule));

export function RuleCard({ item, onToggle }: { item: ManagedRule; onToggle: (id: string, on: boolean) => void }) {
  const meta = STATUS_META[item.status];
  const Icon = meta.icon;
  const on = item.status === "active" || item.status === "error";
  return (
    <article
      className="rb-row"
      style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, boxShadow: tokens.shadows.sm, padding: 16, display: "flex", flexDirection: "column", gap: 12, fontFamily: F }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <h4 style={{ margin: 0, flex: 1, minWidth: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.3, color: C.ink }}>{item.name}</h4>
        <Toggle checked={on} onChange={(v) => onToggle(item.id, v)} ariaLabel={`${item.name} enabled`} />
      </div>
      <Tip label={summaryOf(item)}>
        <p tabIndex={0} className="rb-f" style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: C.textSecondary, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", borderRadius: 4 }}>
          {summaryOf(item)}
        </p>
      </Tip>
      {item.status === "error" && item.errorMessage && (
        <p role="alert" style={{ margin: 0, fontSize: 13, lineHeight: 1.4, background: C.dangerBg, color: "#B91C1C", borderRadius: 6, padding: "8px 10px" }}>
          {item.errorMessage}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 12, borderTop: `1px solid ${C.border}`, fontSize: 13, color: C.textSecondary }}>
        <Icon size={14} aria-hidden color={item.status === "error" ? C.danger : item.status === "active" ? C.success : C.textSecondary} />
        <span style={{ flex: 1, minWidth: 0 }}>
          Last run: {relTime(item.lastRunMins).toLowerCase()}
        </span>
        <Badge variant={meta.variant}>{meta.label}</Badge>
        <Avatar name={item.owner} />
      </div>
    </article>
  );
}
