import type { LucideIcon } from "lucide-react";

export type FieldType =
  | "text" | "number" | "currency" | "percent" | "date"
  | "select" | "multiselect" | "person" | "boolean";

export type Entity = "Project" | "Budget" | "Client" | "People";

export interface Option { value: string; label: string; description?: string }

export interface Field {
  id: string;
  label: string;
  entity: Entity;
  type: FieldType;
  options?: Option[];
  /** Unit suffix for number fields, e.g. "people" */
  unit?: string;
}

/** What kind of value input an operator needs. */
export type ValueKind = "none" | "single" | "range" | "relative" | "multi";

export interface Operator {
  id: string;
  /** Label shown in the operator picker. */
  label: string;
  /** Wording used in natural-language summaries (defaults to label). */
  phrase?: string;
  kind: ValueKind;
}

export interface RangeValue { from: string; to: string }
export interface RelativeValue { n: string; unit: "days" | "weeks" | "months" }
export type ConditionValue = string | boolean | string[] | RangeValue | RelativeValue | null;

export type TriggerCategory = "Project" | "Budget" | "Client" | "Schedule";

export interface TriggerParam {
  key: string;
  label: string;
  options: Option[];
  default?: string;
}

export interface TriggerDef {
  id: string;
  category: TriggerCategory;
  /** Template, params as {key}. e.g. "Status changes to {status}" */
  name: string;
  /** Sentence used in summaries, e.g. "a project moves to {status}" */
  summary: string;
  description: string;
  icon: LucideIcon;
  params?: TriggerParam[];
}

export interface Trigger { id: string; params: Record<string, string> }

export interface Condition {
  kind: "condition";
  id: string;
  fieldId?: string;
  operatorId?: string;
  value: ConditionValue;
  disabled?: boolean;
}

export interface ConditionGroup {
  kind: "group";
  id: string;
  match: "all" | "any";
  children: ConditionNode[];
}

export type ConditionNode = Condition | ConditionGroup;

export type ActionType =
  | "notify" | "email" | "status" | "assign" | "tag" | "task" | "webhook";

export interface ActionDelay { n: string; unit: "minutes" | "hours" | "days" }

export interface Action {
  id: string;
  type: ActionType;
  /** Keys per type: notify{person,channel} email{to,subject} status{status} assign{owner} tag{tag} task{title,due} webhook{method,url} */
  config: Record<string, string>;
  delay?: ActionDelay | null;
}

export interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: Trigger | null;
  conditions: ConditionGroup;
  actions: Action[];
}

/** id matches a `data-rule-node-id`: "trigger", "conditions", "actions", or a condition/group/action id. */
export interface ValidationError {
  id: string;
  message: string;
  field?: string;
}

export interface Segment { text: string; placeholder?: boolean }
