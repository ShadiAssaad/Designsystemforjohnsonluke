import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { ConditionGroup as Group, Rule, ValidationError } from "./types";
import { sampleRule, summarizeRule } from "./data";
import { F, IconBtn, Label, tokens } from "./primitives";
import { TriggerSelector } from "./TriggerSelector";
import { ConditionGroup } from "./ConditionGroup";
import { ActionList } from "./ActionRow";
import { RuleSummary, SegmentText } from "./RuleSummary";
import { errorMap, nodeAttr } from "./utils";
import { summarizeAction } from "./data";

const C = tokens.colors;

export interface RuleComposerProps {
  /** Controlled value. Omit for uncontrolled (uses defaultRule). */
  rule?: Rule;
  defaultRule?: Rule;
  onChange?: (rule: Rule) => void;
  /** Validation errors keyed by node id ("trigger", "conditions", "actions", or a condition/group/action id) */
  errors?: ValidationError[];
  disabled?: boolean;
  /** Section cards can be collapsed to a one-line summary */
  collapsible?: boolean;
  maxDepth?: number;
  /** Show the plain-English summary under the builder (default true) */
  showSummary?: boolean;
}

function Section({ keyword, id, collapsible, summary, children, error }: { keyword: string; id: string; collapsible?: boolean; summary: React.ReactNode; children: React.ReactNode; error?: string }) {
  const [open, setOpen] = React.useState(true);
  const bodyId = React.useId();
  return (
    <section
      {...(id === "actions" ? nodeAttr(id) : {})}
      tabIndex={id === "actions" ? -1 : undefined}
      style={{ background: "#fff", border: `1px solid ${error ? C.danger : C.border}`, borderRadius: 10, boxShadow: tokens.shadows.sm, padding: 16, outline: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: open ? 12 : 0 }}>
        <span style={{ width: 52, flexShrink: 0 }}><Label style={{ color: C.blue, fontWeight: 700 }}>{keyword}</Label></span>
        {!open && <span style={{ flex: 1, minWidth: 0, fontFamily: F, fontSize: 14, color: C.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{summary}</span>}
        {open && <span style={{ flex: 1 }} />}
        {collapsible && (
          <IconBtn label={open ? `Collapse ${keyword.toLowerCase()}` : `Expand ${keyword.toLowerCase()}`} aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen(!open)}>
            <ChevronDown size={16} aria-hidden style={{ transition: "transform 180ms ease-out", transform: open ? "rotate(180deg)" : "none" }} />
          </IconBtn>
        )}
      </div>
      <div id={bodyId} hidden={!open}>{children}</div>
      {error && open && <p role="alert" style={{ margin: "8px 0 0", fontFamily: F, fontSize: 12, color: "#B91C1C" }}>{error}</p>}
    </section>
  );
}

/** WHEN / IF / THEN builder. Controlled via `rule` + `onChange`, or uncontrolled via `defaultRule`. */
export function RuleComposer({ rule: controlled, defaultRule = sampleRule, onChange, errors, disabled, collapsible, maxDepth = 3, showSummary = true }: RuleComposerProps) {
  const [inner, setInner] = React.useState<Rule>(defaultRule);
  const rule = controlled ?? inner;
  const update = (next: Rule) => { if (controlled === undefined) setInner(next); onChange?.(next); };
  const em = React.useMemo(() => errorMap(errors), [errors]);
  const segs = summarizeRule(rule);
  const condCount = rule.conditions.children.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: F, containerType: "inline-size" }} aria-label="Rule builder" role="form">
      <Section keyword="When" id="trigger" collapsible={collapsible} summary={<SegmentText segments={segs.slice(0, segs.findIndex((s) => s.text.startsWith(", if") || s.text.startsWith(", then")) >= 0 ? segs.findIndex((s) => s.text.startsWith(", if") || s.text.startsWith(", then")) : segs.length).slice(1)} />}>
        <TriggerSelector
          value={rule.trigger}
          onChange={(trigger) => update({ ...rule, trigger })}
          disabled={disabled}
          error={em.trigger?.message}
          errorField={em.trigger?.field}
        />
      </Section>
      <Section keyword="If" id="conditions" collapsible={collapsible} summary={condCount ? `${condCount} condition${condCount > 1 ? "s" : ""}, ${rule.conditions.match === "all" ? "all must match" : "any can match"}` : "No conditions"} error={em.conditions?.message}>
        <ConditionGroup group={rule.conditions} onChange={(conditions: Group) => update({ ...rule, conditions })} errors={em} disabled={disabled} maxDepth={maxDepth} />
      </Section>
      <Section keyword="Then" id="actions" collapsible={collapsible} summary={rule.actions.length ? <SegmentText segments={rule.actions.flatMap((a, i) => [...(i ? [{ text: ", " }] : []), ...summarizeAction(a)])} /> : "No actions"} error={em.actions?.message}>
        <ActionList actions={rule.actions} onChange={(actions) => update({ ...rule, actions })} errors={em} disabled={disabled} />
      </Section>
      {showSummary && (
        <div style={{ background: C.offWhite, borderRadius: 10, padding: "12px 16px" }}>
          <div style={{ marginBottom: 4 }}><Label>In plain English</Label></div>
          <RuleSummary segments={segs} />
        </div>
      )}
    </div>
  );
}
