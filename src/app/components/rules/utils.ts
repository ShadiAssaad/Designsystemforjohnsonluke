import type { Action, ActionType, Condition, ConditionGroup, ConditionNode, ValidationError } from "./types";

let n = 0;
export function uid(prefix = "n"): string {
  n += 1;
  return `${prefix}_${Date.now().toString(36)}${n.toString(36)}`;
}

export function makeCondition(partial: Partial<Condition> = {}): Condition {
  return { kind: "condition", id: uid("c"), value: null, ...partial };
}

export function makeGroup(match: "all" | "any" = "all", children: ConditionNode[] = []): ConditionGroup {
  return { kind: "group", id: uid("g"), match, children };
}

export function makeAction(type: ActionType = "notify", config: Record<string, string> = {}): Action {
  return { id: uid("a"), type, config, delay: null };
}

/** Deep clone with fresh ids. */
export function cloneNode<T extends ConditionNode>(node: T): T {
  if (node.kind === "condition") return { ...node, id: uid("c") } as T;
  return { ...node, id: uid("g"), children: node.children.map((c) => cloneNode(c)) } as T;
}

export function errorMap(errors?: ValidationError[]): Record<string, ValidationError> {
  const m: Record<string, ValidationError> = {};
  (errors ?? []).forEach((e) => { if (!m[e.id]) m[e.id] = e; });
  return m;
}

export const nodeAttr = (id: string) => ({ "data-rule-node-id": id, id: `rule-node-${id}` });

/** Scroll to a rule node and focus its invalid control (or first control, or the node itself). */
export function focusRuleNode(id: string, root: ParentNode = document): boolean {
  const el = root.querySelector<HTMLElement>(`[data-rule-node-id="${id}"]`);
  if (!el) return false;
  el.scrollIntoView({ block: "center", behavior: "smooth" });
  const target =
    el.querySelector<HTMLElement>('[data-invalid="true"]:not(:disabled)') ??
    el.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), [tabindex="0"]') ??
    el;
  target.focus({ preventScroll: true });
  return true;
}
