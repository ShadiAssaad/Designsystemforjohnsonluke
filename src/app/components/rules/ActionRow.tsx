import * as React from "react";
import { AlertCircle, ArrowDown, ArrowUp, Clock, Plus, X } from "lucide-react";
import type { Action, ActionType } from "./types";
import { ACTIONS, ACTION_STATUS_OPTIONS, CHANNEL_OPTIONS, DUE_OPTIONS, EMAIL_TO_OPTIONS, METHOD_OPTIONS, NOTIFY_TARGETS, PEOPLE, getActionDef } from "./data";
import { Avatar, Btn, Collapse, F, FieldError, IconBtn, Label, SelectField, TextInput, tokens } from "./primitives";
import { TokenField } from "./TokenField";
import { makeAction, nodeAttr } from "./utils";

const C = tokens.colors;

export interface ActionRowProps {
  action: Action;
  index: number;
  count: number;
  onChange: (a: Action) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove?: () => void;
  error?: string;
  errorField?: string;
  disabled?: boolean;
}

const typeOptions = ACTIONS.map((a) => ({ value: a.type, label: a.label, icon: <a.icon size={14} aria-hidden color={C.textSecondary} />, description: a.description }));

const Inline = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: F, fontSize: 14, color: C.textSecondary }}>{children}</span>
);

/** One THEN row: type picker, inline config per type, delay, reorder, remove. */
export function ActionRow({ action, index, count, onChange, onMoveUp, onMoveDown, onRemove, error, errorField, disabled }: ActionRowProps) {
  const c = action.config;
  const errId = React.useId();
  const set = (patch: Record<string, string>) => onChange({ ...action, config: { ...c, ...patch } });
  const bad = (k: string) => !!error && errorField === k;
  const def = getActionDef(action.type);

  const personOptions = (list: typeof NOTIFY_TARGETS) =>
    list.map((o) => ({ ...o, icon: PEOPLE.some((p) => p.value === o.value) ? <Avatar name={o.label} size={20} /> : undefined }));

  let config: React.ReactNode;
  switch (action.type) {
    case "notify":
      config = (
        <>
          <SelectField ariaLabel="Who to notify" value={c.person} onChange={(v) => set({ person: v })} options={personOptions(NOTIFY_TARGETS)} placeholder="Choose person" disabled={disabled} invalid={bad("person")} minWidth={190} showDescriptions />
          <Inline>via</Inline>
          <SelectField ariaLabel="Channel" value={c.channel || "app"} onChange={(v) => set({ channel: v })} options={CHANNEL_OPTIONS} disabled={disabled} minWidth={110} />
        </>
      );
      break;
    case "email":
      config = (
        <>
          <Inline>to</Inline>
          <SelectField ariaLabel="Recipient" value={c.to} onChange={(v) => set({ to: v })} options={personOptions(EMAIL_TO_OPTIONS)} placeholder="Choose recipient" disabled={disabled} invalid={bad("to")} minWidth={180} />
          <div style={{ flex: "1 1 100%", display: "flex" }}>
            <TokenField ariaLabel="Email subject" value={c.subject ?? ""} onChange={(v) => set({ subject: v })} placeholder="Subject, e.g. Budget alert for {project.name}" disabled={disabled} invalid={bad("subject")} />
          </div>
        </>
      );
      break;
    case "status":
      config = (
        <>
          <Inline>to</Inline>
          <SelectField ariaLabel="New status" value={c.status} onChange={(v) => set({ status: v })} options={ACTION_STATUS_OPTIONS} placeholder="Choose status" disabled={disabled} invalid={bad("status")} minWidth={160} />
        </>
      );
      break;
    case "assign":
      config = (
        <>
          <Inline>to</Inline>
          <SelectField ariaLabel="New owner" value={c.owner} onChange={(v) => set({ owner: v })} options={personOptions(PEOPLE)} placeholder="Choose person" disabled={disabled} invalid={bad("owner")} minWidth={190} />
        </>
      );
      break;
    case "tag":
      config = <TextInput aria-label="Tag name" value={c.tag ?? ""} onChange={(v) => set({ tag: v })} placeholder="e.g. Needs attention" disabled={disabled} invalid={bad("tag")} width={220} />;
      break;
    case "task":
      config = (
        <>
          <TextInput aria-label="Task title" value={c.title ?? ""} onChange={(v) => set({ title: v })} placeholder="e.g. Review budget with finance" disabled={disabled} invalid={bad("title")} width={280} />
          <Inline>due</Inline>
          <SelectField ariaLabel="Due" value={c.due || "3d"} onChange={(v) => set({ due: v })} options={DUE_OPTIONS} disabled={disabled} minWidth={120} />
        </>
      );
      break;
    case "webhook":
      config = (
        <>
          <SelectField ariaLabel="HTTP method" value={c.method || "POST"} onChange={(v) => set({ method: v })} options={METHOD_OPTIONS} disabled={disabled} minWidth={90} />
          <TextInput aria-label="Webhook URL" value={c.url ?? ""} onChange={(v) => set({ url: v })} placeholder="https://hooks.example.com/projects" disabled={disabled} invalid={bad("url")} style={{ flex: "1 1 240px" }} />
        </>
      );
      break;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        {...nodeAttr(action.id)}
        tabIndex={-1}
        className="rb-row"
        role="group"
        aria-label={`Action ${index + 1}: ${def.label}`}
        aria-describedby={error ? errId : undefined}
        data-disabled={disabled || undefined}
        style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 12, padding: 12, background: disabled ? C.offWhite : "#fff", border: `1px solid ${error ? C.danger : C.border}`, borderRadius: 6, outline: "none", opacity: disabled ? 0.7 : 1 }}
      >
        <div style={{ width: 52, height: 36, display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Label style={{ color: C.ink, fontWeight: 700 }}>{index === 0 ? "Then" : "And"}</Label>
        </div>
        <div style={{ flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <SelectField
              ariaLabel="Action type"
              value={action.type}
              onChange={(t) => onChange({ ...action, type: t as ActionType, config: {} })}
              options={typeOptions}
              disabled={disabled}
              minWidth={170}
              showDescriptions
            />
            {config}
          </div>
          {action.delay ? (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
              <Clock size={14} aria-hidden color={C.textSecondary} />
              <Inline>after</Inline>
              <TextInput aria-label="Delay amount" type="number" min={1} inputMode="numeric" value={action.delay.n} onChange={(n) => onChange({ ...action, delay: { ...action.delay!, n } })} disabled={disabled} invalid={bad("delay")} width={72} />
              <SelectField ariaLabel="Delay unit" value={action.delay.unit} onChange={(u) => onChange({ ...action, delay: { ...action.delay!, unit: u as "minutes" | "hours" | "days" } })} options={["minutes", "hours", "days"].map((u) => ({ value: u, label: u }))} disabled={disabled} minWidth={110} size="sm" />
              <IconBtn label="Remove delay" size={28} disabled={disabled} onClick={() => onChange({ ...action, delay: null })}><X size={14} aria-hidden /></IconBtn>
            </div>
          ) : (
            <div>
              <Btn variant="ghost" size="sm" leftIcon={<Clock size={14} aria-hidden />} disabled={disabled} onClick={() => onChange({ ...action, delay: { n: "2", unit: "hours" } })}>Add delay</Btn>
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto" }}>
          <IconBtn label="Move action up" disabled={disabled || index === 0} onClick={onMoveUp}><ArrowUp size={16} aria-hidden /></IconBtn>
          <IconBtn label="Move action down" disabled={disabled || index === count - 1} onClick={onMoveDown}><ArrowDown size={16} aria-hidden /></IconBtn>
          <IconBtn label="Remove action" danger disabled={disabled} onClick={onRemove}><X size={16} aria-hidden /></IconBtn>
        </div>
      </div>
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 4 }}>
          <AlertCircle size={14} color={C.danger} aria-hidden />
          <FieldError id={errId}>{error}</FieldError>
        </div>
      )}
    </div>
  );
}

export interface ActionListProps {
  actions: Action[];
  onChange: (a: Action[]) => void;
  errors?: Record<string, { message: string; field?: string }>;
  disabled?: boolean;
}

/** Reorderable list of ActionRows with "+ Add action" and an empty state. */
export function ActionList({ actions, onChange, errors = {}, disabled }: ActionListProps) {
  const [removing, setRemoving] = React.useState<Set<string>>(new Set());
  const seen = React.useRef<Set<string>>(new Set(actions.map((a) => a.id)));
  React.useEffect(() => { actions.forEach((a) => seen.current.add(a.id)); });
  const latest = React.useRef(actions); latest.current = actions;

  const move = (i: number, d: -1 | 1) => {
    const a = actions.slice();
    const [x] = a.splice(i, 1);
    a.splice(i + d, 0, x);
    onChange(a);
  };
  const remove = (id: string) => {
    setRemoving((s) => new Set(s).add(id));
    window.setTimeout(() => {
      setRemoving((s) => { const n = new Set(s); n.delete(id); return n; });
      onChange(latest.current.filter((a) => a.id !== id));
    }, 180);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {actions.length === 0 && (
        <div style={{ border: `1px dashed ${C.borderStrong}`, borderRadius: 6, background: "#fff", padding: "16px 12px", marginBottom: 8, fontFamily: F, fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>
          <b style={{ fontWeight: 700, color: C.ink }}>No actions yet.</b> A rule needs at least one action, such as notifying the account lead.
        </div>
      )}
      {actions.map((a, i) => (
        <Collapse key={a.id} enter={!seen.current.has(a.id)} exiting={removing.has(a.id)}>
          <div style={{ paddingBottom: 8 }}>
            <ActionRow
              action={a}
              index={i}
              count={actions.length}
              onChange={(n) => onChange(actions.map((x) => (x.id === a.id ? n : x)))}
              onMoveUp={() => move(i, -1)}
              onMoveDown={() => move(i, 1)}
              onRemove={() => remove(a.id)}
              error={errors[a.id]?.message}
              errorField={errors[a.id]?.field}
              disabled={disabled}
            />
          </div>
        </Collapse>
      ))}
      <div>
        <Btn variant="ghost" size="sm" leftIcon={<Plus size={14} aria-hidden />} disabled={disabled} onClick={() => onChange([...actions, makeAction("notify", { channel: "app" })])}>
          Add action
        </Btn>
      </div>
    </div>
  );
}
