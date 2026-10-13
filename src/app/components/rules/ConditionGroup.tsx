import * as React from "react";
import { FolderPlus, Plus, X } from "lucide-react";
import type { Condition, ConditionGroup as Group, ConditionNode } from "./types";
import { Btn, Collapse, F, FieldError, IconBtn, Tip, tokens } from "./primitives";
import { Connector } from "./Connector";
import { ConditionRow } from "./ConditionRow";
import { cloneNode, makeCondition, makeGroup, nodeAttr } from "./utils";

const C = tokens.colors;

export interface ConditionGroupProps {
  group: Group;
  onChange: (g: Group) => void;
  /** Present on nested groups; renders a remove button in the header */
  onRemove?: () => void;
  depth?: number;
  /** Max nesting levels (default 3) */
  maxDepth?: number;
  /** node id -> message */
  errors?: Record<string, { message: string; field?: string }>;
  disabled?: boolean;
}

let currentDrag: { groupId: string; id: string } | null = null;

export function ConditionGroup({ group, onChange, onRemove, depth = 0, maxDepth = 3, errors = {}, disabled }: ConditionGroupProps) {
  const [removing, setRemoving] = React.useState<Set<string>>(new Set());
  const [overId, setOverId] = React.useState<string | null>(null);
  const seen = React.useRef<Set<string>>(new Set(group.children.map((c) => c.id)));
  React.useEffect(() => { group.children.forEach((c) => seen.current.add(c.id)); });

  const canNest = depth < maxDepth - 1;
  const set = (children: ConditionNode[]) => onChange({ ...group, children });
  const replace = (i: number, n: ConditionNode) => set(group.children.map((c, j) => (j === i ? n : c)));
  const insertAfter = (i: number, n: ConditionNode) => { const a = group.children.slice(); a.splice(i + 1, 0, n); set(a); };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= group.children.length || from === to) return;
    const a = group.children.slice();
    const [x] = a.splice(from, 1);
    a.splice(to, 0, x);
    set(a);
  };
  // Keep latest group for delayed removal
  const latest = React.useRef(group); latest.current = group;
  const removeLatest = (id: string) => {
    setRemoving((s) => new Set(s).add(id));
    window.setTimeout(() => {
      setRemoving((s) => { const n = new Set(s); n.delete(id); return n; });
      onChange({ ...latest.current, children: latest.current.children.filter((c) => c.id !== id) });
    }, 180);
  };

  const empty = group.children.length === 0;
  const bg = depth % 2 === 0 ? C.offWhite : "#fff";
  const err = errors[group.id];
  const label = group.match === "all" ? "ALL" : "ANY";

  return (
    <div
      {...nodeAttr(group.id)}
      tabIndex={-1}
      role="group"
      aria-label={`${label} of the following`}
      style={{
        background: bg, border: `1px solid ${err ? C.danger : depth ? C.borderStrong : C.border}`, borderRadius: 10, padding: 12, outline: "none",
        marginLeft: depth ? 0 : 0, position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10, minHeight: 24 }}>
        <span style={{ fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary }}>
          <b style={{ fontWeight: 700, color: disabled ? C.textDisabled : C.ink }}>{label}</b> of the following
        </span>
        {onRemove && <IconBtn label="Remove group" size={28} disabled={disabled} onClick={onRemove}><X size={14} aria-hidden /></IconBtn>}
      </div>

      {empty ? (
        <div style={{ border: `1px dashed ${C.borderStrong}`, borderRadius: 6, background: "#fff", padding: "16px 12px", fontFamily: F, fontSize: 14, color: C.textSecondary, lineHeight: 1.5, marginBottom: 8 }}>
          <b style={{ fontWeight: 700, color: C.ink }}>No conditions yet.</b> Without conditions, this rule runs for every matching project.
        </div>
      ) : (
        <div style={{ paddingLeft: depth ? 12 : 0, borderLeft: depth ? `2px solid ${C.borderStrong}` : undefined, marginLeft: depth ? 2 : 0 }}>
          {group.children.map((child, i) => (
            <Collapse key={child.id} enter={!seen.current.has(child.id)} exiting={removing.has(child.id)}>
              <div
                onDragOver={(e) => { if (currentDrag?.groupId === group.id && currentDrag.id !== child.id) { e.preventDefault(); setOverId(child.id); } }}
                onDragLeave={() => setOverId((o) => (o === child.id ? null : o))}
                onDrop={(e) => {
                  if (currentDrag?.groupId !== group.id) return;
                  e.preventDefault();
                  const from = group.children.findIndex((c) => c.id === currentDrag!.id);
                  move(from, i);
                  currentDrag = null; setOverId(null);
                }}
                style={{ paddingBottom: 8, boxShadow: overId === child.id ? `0 -3px 0 -1px ${C.blue}` : undefined }}
              >
                {i > 0 && (
                  <div style={{ paddingBottom: 8 }}>
                    <Connector value={group.match === "all" ? "and" : "or"} onChange={(v) => onChange({ ...group, match: v === "and" ? "all" : "any" })} disabled={disabled} />
                  </div>
                )}
                {child.kind === "condition" ? (
                  <ConditionRow
                    condition={child}
                    onChange={(c) => replace(i, c)}
                    onDuplicate={() => insertAfter(i, cloneNode(child))}
                    onConvert={() => replace(i, makeGroup("all", [child]))}
                    onDelete={() => removeLatest(child.id)}
                    canConvert={canNest}
                    error={errors[child.id]?.message}
                    errorField={errors[child.id]?.field}
                    disabled={disabled}
                    onMove={(d) => move(i, i + d)}
                    onDragStart={(e) => {
                      currentDrag = { groupId: group.id, id: child.id };
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", child.id);
                      const row = (e.currentTarget as HTMLElement).closest("[data-rule-node-id]");
                      if (row) e.dataTransfer.setDragImage(row, 16, 16);
                    }}
                    onDragEnd={() => { currentDrag = null; setOverId(null); }}
                  />
                ) : (
                  <ConditionGroup
                    group={child}
                    onChange={(g) => replace(i, g)}
                    onRemove={() => removeLatest(child.id)}
                    depth={depth + 1}
                    maxDepth={maxDepth}
                    errors={errors}
                    disabled={disabled}
                  />
                )}
              </div>
            </Collapse>
          ))}
        </div>
      )}

      {err && <div style={{ marginBottom: 8 }}><FieldError>{err.message}</FieldError></div>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Btn variant="ghost" size="sm" leftIcon={<Plus size={14} aria-hidden />} disabled={disabled} onClick={() => onChange({ ...group, children: [...group.children, makeCondition()] })}>
          Add condition
        </Btn>
        {canNest ? (
          <Btn variant="ghost" size="sm" leftIcon={<FolderPlus size={14} aria-hidden />} disabled={disabled} onClick={() => onChange({ ...group, children: [...group.children, makeGroup(group.match === "all" ? "any" : "all", [makeCondition()])] })}>
            Add group
          </Btn>
        ) : (
          <Tip label={`Groups can be nested up to ${maxDepth} levels deep. Move this condition into a higher-level group instead.`}>
            <Btn variant="ghost" size="sm" leftIcon={<FolderPlus size={14} aria-hidden />} softDisabled>Add group</Btn>
          </Tip>
        )}
      </div>
    </div>
  );
}

export type { Condition };
