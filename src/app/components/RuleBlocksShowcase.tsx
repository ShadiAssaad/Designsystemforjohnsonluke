import * as React from "react";
import { Trash2 } from "lucide-react";
import {
  ActionRow, ActionList, Avatar, Badge, Btn, Chip, ConditionGroup, ConditionRow, Connector, FieldPicker,
  OperatorPicker, RuleComposer, SelectField, TextInput, Tip, Toggle, TokenField, TriggerSelector, ValueInput,
  emptyRule, focusRuleNode, getField, getOperator, makeAction, makeCondition, makeGroup, sampleRule, tokens, validateRule,
} from "./rules";
import type { Action, Condition, ConditionGroupData, ConditionValue, Rule, Trigger, ValidationError } from "./rules";

const F = "'Rethink Sans', sans-serif";
const C = tokens.colors;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary, margin: 0 }}>{children}</p>;
}

function Block({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 style={{ fontSize: 20, fontFamily: F, fontWeight: 700, lineHeight: 1.3, color: C.ink, margin: 0 }}>{title}</h3>
      {note && <p style={{ fontSize: 14, fontFamily: F, color: C.textSecondary, lineHeight: 1.5, margin: "4px 0 0" }}>{note}</p>}
      <div className="mt-4 p-6 rounded-[10px]" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: tokens.shadows.sm }}>{children}</div>
    </div>
  );
}

function State({ label, children, width }: { label: string; children: React.ReactNode; width?: number | string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0, width }}>
      <Eyebrow>{label}</Eyebrow>
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}

const Grid = ({ cols = 3, children, gap = 24 }: { cols?: number; children: React.ReactNode; gap?: number }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${cols === 1 ? 560 : cols === 2 ? 380 : 240}px, 1fr))`, gap }}>{children}</div>
);

const Divider = () => <div style={{ height: 1, background: C.border, margin: "24px 0" }} />;

/* ── local live wrappers ── */

function LiveValue({ fieldId, opId, initial = null }: { fieldId: string; opId: string; initial?: ConditionValue }) {
  const [v, setV] = React.useState<ConditionValue>(initial);
  const field = getField(fieldId);
  return <ValueInput field={field} operator={getOperator(field?.type, opId)} value={v} onChange={setV} />;
}

function LiveRow({ init, error, errorField, disabled, forceState, canConvert }: { init: Condition; error?: string; errorField?: string; disabled?: boolean; forceState?: "hover" | "focus"; canConvert?: boolean }) {
  const [c, setC] = React.useState<Condition>(init);
  return <ConditionRow condition={c} onChange={setC} onDelete={() => setC(makeCondition())} onDuplicate={() => undefined} onConvert={() => undefined} error={error} errorField={errorField} disabled={disabled} forceState={forceState} canConvert={canConvert} />;
}

function LiveGroup({ init, disabled, maxDepth }: { init: ConditionGroupData; disabled?: boolean; maxDepth?: number }) {
  const [g, setG] = React.useState(init);
  return <ConditionGroup group={g} onChange={setG} disabled={disabled} maxDepth={maxDepth} />;
}

function LiveTrigger({ init, ...rest }: { init: Trigger | null; disabled?: boolean; error?: string; errorField?: string; forceState?: "hover" | "focus" }) {
  const [t, setT] = React.useState<Trigger | null>(init);
  return <TriggerSelector value={t} onChange={setT} {...rest} />;
}

function LiveAction({ init, ...rest }: { init: Action; error?: string; errorField?: string; disabled?: boolean }) {
  const [a, setA] = React.useState(init);
  return <ActionRow action={a} index={0} count={2} onChange={setA} {...rest} />;
}

function LiveToken({ init, ...rest }: { init: string; invalid?: boolean; disabled?: boolean; placeholder?: string }) {
  const [v, setV] = React.useState(init);
  return <TokenField ariaLabel="Email subject" value={v} onChange={setV} {...rest} />;
}

function LiveConnector({ disabled }: { disabled?: boolean }) {
  const [v, setV] = React.useState<"and" | "or">("and");
  return <Connector value={v} onChange={setV} disabled={disabled} />;
}

function LiveSelect(props: { placeholder?: string; invalid?: boolean; disabled?: boolean; forceState?: "focus" | "hover"; init?: string }) {
  const [v, setV] = React.useState(props.init);
  return <SelectField ariaLabel="Project phase" value={v} onChange={setV} width={200} {...props} options={[{ value: "discovery", label: "Discovery" }, { value: "strategy", label: "Strategy" }, { value: "design", label: "Design" }]} />;
}

function LiveInput(props: { init?: string; invalid?: boolean; disabled?: boolean; forceState?: "focus" | "hover"; placeholder?: string }) {
  const [v, setV] = React.useState(props.init ?? "");
  return <TextInput aria-label="Project name" value={v} onChange={setV} width={220} invalid={props.invalid} disabled={props.disabled} forceState={props.forceState} placeholder={props.placeholder} />;
}

function LiveToggle(props: { init: boolean; disabled?: boolean; label: string }) {
  const [v, setV] = React.useState(props.init);
  return <Toggle checked={v} onChange={setV} disabled={props.disabled} label={props.label} />;
}

function LiveField({ init, ...rest }: { init?: string; invalid?: boolean; disabled?: boolean; forceState?: "focus" | "hover"; incomplete?: boolean }) {
  const [v, setV] = React.useState(init);
  return <FieldPicker value={v} onChange={setV} {...rest} />;
}

function LiveOperator({ fieldType, init, disabled }: { fieldType?: "text" | "number" | "date" | "select" | "boolean" | "person"; init?: string; disabled?: boolean }) {
  const [v, setV] = React.useState(init);
  return <OperatorPicker fieldType={fieldType} value={v} onChange={setV} disabled={disabled} />;
}

/* ── fixtures ── */

const cond = (partial: Partial<Condition>) => makeCondition(partial);
const budgetCond = () => cond({ fieldId: "budget.used", operatorId: "gt", value: "80" });

const nested3: ConditionGroupData = makeGroup("all", [
  cond({ fieldId: "client.tier", operatorId: "any_of", value: ["tier1"] }),
  makeGroup("any", [
    cond({ fieldId: "project.phase", operatorId: "any_of", value: ["design"] }),
    makeGroup("all", [
      cond({ fieldId: "budget.used", operatorId: "gt", value: "90" }),
      cond({ fieldId: "project.health", operatorId: "any_of", value: ["at_risk"] }),
    ]),
  ]),
]);

const tfmt = (s: string) => s;

export function RuleBlocksShowcase() {
  const [rule, setRule] = React.useState<Rule>(sampleRule);
  const [errors, setErrors] = React.useState<ValidationError[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [collapsible, setCollapsible] = React.useState(false);

  const validate = () => setErrors(validateRule(rule));
  const flawed = () => {
    const bad: Rule = {
      ...rule,
      trigger: { id: "status_changes", params: { status: "" } },
      conditions: { ...rule.conditions, children: [...rule.conditions.children, makeCondition({ fieldId: "budget.used", operatorId: "between", value: { from: "90", to: "40" } }), makeCondition()] },
      actions: [...rule.actions, makeAction("webhook", { method: "POST", url: "http://crm.internal" })],
    };
    setRule(bad);
    setErrors(validateRule(bad));
  };

  return (
    <section id="ruleblocks" className="mb-16">
      <Eyebrow>Rule builder</Eyebrow>
      <h2 className="mb-2 mt-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: C.ink }}>Rule blocks</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: C.textSecondary, lineHeight: 1.5 }}>
        Building blocks for When / If / Then automations: triggers, conditions, nested groups and actions, shown alone and composed.
      </p>

      {/* ── Primitives ── */}
      <Block title="Primitives" note="Shared controls used by every block. Hover and focus are pinned so each state can be inspected.">
        <Grid cols={3}>
          <State label="Primary: default / hover / focus">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn>Save rule</Btn><Btn forceState="hover">Save rule</Btn><Btn forceState="focus">Save rule</Btn>
            </div>
          </State>
          <State label="Secondary / ghost / destructive">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn variant="secondary">Test rule</Btn><Btn variant="ghost">Cancel</Btn><Btn variant="destructive" leftIcon={<Trash2 size={14} aria-hidden />}>Delete rule</Btn>
            </div>
          </State>
          <State label="Disabled / loading / small">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn disabled>Save rule</Btn><Btn loading>Saving</Btn><Btn size="sm" variant="secondary">Add note</Btn>
            </div>
          </State>
          <State label="Badge: status variants">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge>Draft</Badge><Badge variant="info">Active</Badge><Badge variant="success">Passing</Badge><Badge variant="warning">Needs review</Badge><Badge variant="danger">Failing</Badge>
            </div>
          </State>
          <State label="Toggle: on / off / disabled">
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <LiveToggle init label="Enabled" /><LiveToggle init={false} label="Paused" /><LiveToggle init disabled label="Locked" />
            </div>
          </State>
          <State label="Chip / avatar / tooltip">
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Chip label="Tier 1" onRemove={() => undefined} /><Chip mono label="{client.owner}" />
              <Avatar name="Priya Nair" /><Avatar name="Tom Okafor" />
              <Tip label="Runs for projects in Review"><Btn variant="ghost" size="sm">Hover for tip</Btn></Tip>
            </div>
          </State>
          <State label="Text input: default / focus">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><LiveInput placeholder="Project name" /><LiveInput init="Northwind rebrand" forceState="focus" /></div>
          </State>
          <State label="Text input: error / disabled">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><LiveInput init="??" invalid /><LiveInput init="Locked value" disabled /></div>
          </State>
          <State label="Select: default / hover / focus">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><LiveSelect placeholder="Choose phase" /><LiveSelect init="strategy" forceState="hover" /><LiveSelect init="design" forceState="focus" /></div>
          </State>
          <State label="Select: error / disabled">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><LiveSelect placeholder="Choose phase" invalid /><LiveSelect init="design" disabled /></div>
          </State>
        </Grid>
      </Block>

      {/* ── Trigger ── */}
      <Block title="Trigger selector" note="Card-style picker grouped by category. Parameterised triggers expose inline selects.">
        <Grid cols={2}>
          <State label="Empty"><LiveTrigger init={null} /></State>
          <State label="Selected, parameterised"><LiveTrigger init={{ id: "status_changes", params: { status: "review" } }} /></State>
          <State label="Selected, schedule"><LiveTrigger init={{ id: "weekly", params: { day: "monday", time: "09:00" } }} /></State>
          <State label="Hover"><LiveTrigger init={{ id: "project_created", params: {} }} forceState="hover" /></State>
          <State label="Focus"><LiveTrigger init={{ id: "project_created", params: {} }} forceState="focus" /></State>
          <State label="Disabled"><LiveTrigger init={{ id: "budget_threshold", params: { percent: "80" } }} disabled /></State>
          <State label="Error"><LiveTrigger init={{ id: "due_in", params: { days: "" } }} error="Choose a lead time for this trigger." errorField="days" /></State>
          <State label="Error, empty"><LiveTrigger init={null} error="Choose a trigger so the rule knows when to run." /></State>
        </Grid>
      </Block>

      {/* ── Pickers ── */}
      <Block title="Field, operator and value" note="Operators depend on the field type. Value inputs adapt to the operator and disappear when none is needed.">
        <Grid cols={3}>
          <State label="Field picker: empty (incomplete)"><LiveField incomplete /></State>
          <State label="Field picker: selected"><LiveField init="budget.used" /></State>
          <State label="Field picker: focus"><LiveField init="client.tier" forceState="focus" /></State>
          <State label="Field picker: error"><LiveField invalid incomplete /></State>
          <State label="Field picker: disabled"><LiveField init="project.due" disabled /></State>
          <State label="Operator: no field yet"><LiveOperator disabled /></State>
          <State label="Operator: text"><LiveOperator fieldType="text" init="contains" /></State>
          <State label="Operator: number / currency / %"><LiveOperator fieldType="number" init="gte" /></State>
          <State label="Operator: date"><LiveOperator fieldType="date" init="in_last" /></State>
          <State label="Operator: select"><LiveOperator fieldType="select" init="any_of" /></State>
          <State label="Operator: boolean"><LiveOperator fieldType="boolean" init="is_true" /></State>
          <State label="Operator: person"><LiveOperator fieldType="person" init="is_me" /></State>
        </Grid>
        <Divider />
        <Eyebrow>Value inputs</Eyebrow>
        <div className="mt-4">
          <Grid cols={3}>
            <State label="Text"><LiveValue fieldId="project.name" opId="contains" initial="Northwind" /></State>
            <State label="Number + unit"><LiveValue fieldId="people.size" opId="gte" initial="6" /></State>
            <State label="Currency"><LiveValue fieldId="budget.total" opId="gt" initial="45000" /></State>
            <State label="Percent"><LiveValue fieldId="budget.used" opId="gt" initial="80" /></State>
            <State label="Range"><LiveValue fieldId="budget.used" opId="between" initial={{ from: "60", to: "90" }} /></State>
            <State label="Date"><LiveValue fieldId="project.due" opId="before" initial="2026-12-01" /></State>
            <State label="Relative date"><LiveValue fieldId="project.lastUpdate" opId="in_last" initial={{ n: "7", unit: "days" }} /></State>
            <State label="Date range"><LiveValue fieldId="project.due" opId="between" initial={{ from: "2026-11-01", to: "2026-11-30" }} /></State>
            <State label="Single select"><LiveValue fieldId="people.owner" opId="is" initial="maya" /></State>
            <State label="Multi-select chips"><LiveValue fieldId="client.tier" opId="any_of" initial={["tier1", "tier2"]} /></State>
            <State label="Person picker, multiple"><LiveValue fieldId="people.lead" opId="any_of" initial={["priya", "daniel"]} /></State>
            <State label="Boolean toggle"><LiveValue fieldId="client.retainer" opId="is" initial={true} /></State>
            <State label="No value needed (is empty)">
              <div style={{ fontSize: 13, fontFamily: F, color: C.textSecondary, display: "flex", alignItems: "center", gap: 8 }}>
                <LiveValue fieldId="project.name" opId="is_empty" /> <span>Input is hidden</span>
              </div>
            </State>
          </Grid>
        </div>
      </Block>

      {/* ── Row ── */}
      <Block title="Condition row" note="Field, operator, value. Reorder with the handle (drag, or arrow keys when focused). Rows wrap on narrow containers.">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <State label="Empty / incomplete"><LiveRow init={makeCondition()} /></State>
          <State label="Complete"><LiveRow init={budgetCond()} /></State>
          <State label="Hover"><LiveRow init={budgetCond()} forceState="hover" /></State>
          <State label="Focus"><LiveRow init={budgetCond()} forceState="focus" /></State>
          <State label="Invalid"><LiveRow init={cond({ fieldId: "budget.used", operatorId: "between", value: { from: "90", to: "40" } })} error="The start must not be after the end." errorField="value" /></State>
          <State label="Disabled"><LiveRow init={cond({ fieldId: "client.tier", operatorId: "any_of", value: ["tier1"] })} disabled /></State>
          <State label="Narrow container (360px), stacked" width={360}><LiveRow init={cond({ fieldId: "people.owner", operatorId: "any_of", value: ["priya", "tom"] })} /></State>
        </div>
      </Block>

      {/* ── Connector ── */}
      <Block title="Connector" note="AND / OR applies to the whole group, not a single pair of rows.">
        <Grid cols={3}>
          <State label="Interactive"><LiveConnector /></State>
          <State label="Disabled"><LiveConnector disabled /></State>
        </Grid>
      </Block>

      {/* ── Group ── */}
      <Block title="Condition group" note="Nested up to three levels. At the limit, Add group is disabled with an explanation.">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <State label="Empty"><LiveGroup init={makeGroup("all")} /></State>
          <State label="Default with nested OR group"><LiveGroup init={makeGroup("all", [budgetCond(), makeGroup("any", [cond({ fieldId: "people.owner", operatorId: "any_of", value: ["priya"] }), cond({ fieldId: "project.due", operatorId: "before", value: "2026-12-01" })])])} /></State>
          <State label="Maximum depth (3 levels): focus Add group inside the deepest group for the tooltip"><LiveGroup init={nested3} /></State>
          <State label="Disabled"><LiveGroup init={makeGroup("any", [budgetCond(), cond({ fieldId: "client.tier", operatorId: "any_of", value: ["tier1"] })])} disabled /></State>
        </div>
      </Block>

      {/* ── Token ── */}
      <Block title="Token field" note="Merge fields appear as chips. Insert at the caret, remove with Backspace or the chip's close button.">
        <Grid cols={2}>
          <State label="With tokens"><LiveToken init="Budget alert: {project.name} is at {budget.used_percent}" /></State>
          <State label="Empty"><LiveToken init="" placeholder="Subject, e.g. Review needed for {project.name}" /></State>
          <State label="Error"><LiveToken init="" invalid placeholder="Add an email subject" /></State>
          <State label="Disabled"><LiveToken init="Weekly update for {client.name}" disabled /></State>
        </Grid>
      </Block>

      {/* ── Action ── */}
      <Block title="Action row" note="Choose an action type, configure inline, optionally delay, reorder or remove.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <State label="Notify person"><LiveAction init={makeAction("notify", { person: "role:account_lead", channel: "slack" })} /></State>
          <State label="Send email with tokens"><LiveAction init={makeAction("email", { to: "role:client_contact", subject: "Update on {project.name}" })} /></State>
          <State label="Change status, with delay"><LiveAction init={{ ...makeAction("status", { status: "at_risk" }), delay: { n: "2", unit: "hours" } }} /></State>
          <State label="Assign owner / add tag / create task / webhook">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <LiveAction init={makeAction("assign", { owner: "maya" })} />
              <LiveAction init={makeAction("tag", { tag: "Needs attention" })} />
              <LiveAction init={makeAction("task", { title: "Review budget with finance", due: "3d" })} />
              <LiveAction init={makeAction("webhook", { method: "POST", url: "https://hooks.example.com/projects" })} />
            </div>
          </State>
          <State label="Error"><LiveAction init={makeAction("webhook", { method: "POST", url: "http://crm.internal" })} error="Enter a secure URL starting with https://" errorField="url" /></State>
          <State label="Disabled"><LiveAction init={makeAction("notify", { person: "priya", channel: "app" })} disabled /></State>
          <State label="Empty list"><ActionList actions={[]} onChange={() => undefined} /></State>
        </div>
      </Block>

      {/* ── Composer ── */}
      <Block title="Composed rule" note="When a project moves to Review, if budget is high and the client is Tier 1, notify the account lead and flag the project.">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Btn size="sm" variant="secondary" onClick={() => { setRule(sampleRule); setErrors([]); }}>Load sample</Btn>
          <Btn size="sm" variant="secondary" onClick={() => { setRule(emptyRule()); setErrors([]); }}>Start blank</Btn>
          <Btn size="sm" variant="secondary" onClick={flawed}>Add mistakes</Btn>
          <Btn size="sm" onClick={validate}>Validate</Btn>
          <Toggle label="Collapsible" checked={collapsible} onChange={setCollapsible} />
          <Toggle label="Disabled" checked={disabled} onChange={setDisabled} />
        </div>
        {errors.length > 0 && (
          <div role="alert" style={{ background: C.dangerBg, borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <p style={{ margin: "0 0 8px", fontFamily: F, fontSize: 14, fontWeight: 700, color: "#7F1D1D" }}>{errors.length} {errors.length === 1 ? "problem" : "problems"} to fix</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {errors.map((e, i) => (
                <li key={i}>
                  <button type="button" className="rb-f" onClick={() => focusRuleNode(e.id)} style={{ background: "none", border: 0, padding: 0, fontFamily: F, fontSize: 14, color: "#7F1D1D", textDecoration: "underline", cursor: "pointer", textAlign: "left" }}>{tfmt(e.message)}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <RuleComposer rule={rule} onChange={(r) => { setRule(r); if (errors.length) setErrors(validateRule(r)); }} errors={errors} disabled={disabled} collapsible={collapsible} />
      </Block>
    </section>
  );
}
