import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AlertCircle, Copy, GripVertical, MoreHorizontal, Trash2, X, FolderPlus } from "lucide-react";
import type { Condition, ConditionValue } from "./types";
import { getField, getOperator } from "./data";
import { FieldPicker } from "./FieldPicker";
import { OperatorPicker } from "./OperatorPicker";
import { ValueInput } from "./ValueInput";
import { FieldError, IconBtn, tokens } from "./primitives";
import type { ForceState } from "./primitives";
import { nodeAttr } from "./utils";

const C = tokens.colors;

export interface ConditionRowProps {
  condition: Condition;
  onChange: (c: Condition) => void;
  onDuplicate?: () => void;
  onConvert?: () => void;
  onDelete?: () => void;
  /** Validation message; puts the row in the invalid state */
  error?: string;
  /** Which part is at fault: field | operator | value (defaults to first incomplete) */
  errorField?: string;
  disabled?: boolean;
  /** Hide "Convert to group" (max depth reached) */
  canConvert?: boolean;
  /** Reorder: drag handle props + keyboard move */
  onMove?: (dir: -1 | 1) => void;
  onDragStart?: (e: React.DragEvent<HTMLElement>) => void;
  onDragEnd?: () => void;
  forceState?: ForceState;
}

export function ConditionRow({ condition, onChange, onDuplicate, onConvert, onDelete, error, errorField, disabled: groupDisabled, canConvert = true, onMove, onDragStart, onDragEnd, forceState }: ConditionRowProps) {
  const disabled = groupDisabled || condition.disabled;
  const field = getField(condition.fieldId);
  const op = getOperator(field?.type, condition.operatorId);
  const incomplete = !field;
  const errId = React.useId();
  const faulty = errorField ?? (!field ? "field" : !op ? "operator" : "value");

  const setField = (fieldId: string) => {
    const nf = getField(fieldId)!;
    const keep = getOperator(nf.type, condition.operatorId);
    onChange({ ...condition, fieldId, operatorId: keep ? keep.id : undefined, value: keep && nf.type === field?.type ? condition.value : null });
  };
  const setOp = (operatorId: string) => {
    const next = getOperator(field?.type, operatorId)!;
    onChange({ ...condition, operatorId, value: next.kind === op?.kind && next.kind !== "none" ? condition.value : null });
  };
  const setValue = (value: ConditionValue) => onChange({ ...condition, value });

  const onHandleKey = (e: React.KeyboardEvent) => {
    if (disabled || !onMove) return;
    if (e.key === "ArrowUp") { e.preventDefault(); onMove(-1); }
    if (e.key === "ArrowDown") { e.preventDefault(); onMove(1); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        {...nodeAttr(condition.id)}
        tabIndex={-1}
        className="rb-row"
        data-disabled={disabled || undefined}
        data-force={forceState}
        data-state={error ? "invalid" : incomplete ? "incomplete" : "complete"}
        aria-describedby={error ? errId : undefined}
        role="group"
        aria-label="Condition"
        style={{
          display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 8, padding: 8,
          background: disabled ? C.offWhite : "#fff", borderRadius: 6, outline: "none",
          border: `1px ${incomplete && !error ? "dashed" : "solid"} ${error ? C.danger : incomplete ? C.borderStrong : C.border}`,
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Reorder condition. Press arrow up or arrow down to move, or drag."
          aria-disabled={disabled || undefined}
          draggable={!disabled && !!onDragStart}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onKeyDown={onHandleKey}
          className="rb-f"
          style={{ width: 20, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", color: disabled ? C.textDisabled : C.textSecondary, cursor: disabled ? "not-allowed" : "grab", flexShrink: 0, borderRadius: 4 }}
        >
          <GripVertical size={16} aria-hidden />
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, flex: "1 1 260px", minWidth: 0 }}>
          <div style={{ flex: "1 1 170px", display: "flex", minWidth: 0 }}>
            <FieldPicker value={condition.fieldId} onChange={setField} disabled={disabled} incomplete invalid={!!error && faulty === "field"} width="100%" />
          </div>
          <div style={{ flex: "0 1 150px", display: "flex", minWidth: 0 }}>
            <OperatorPicker fieldType={field?.type} value={condition.operatorId} onChange={setOp} disabled={disabled} invalid={!!error && faulty === "operator"} width="100%" />
          </div>
          {op && op.kind !== "none" && (
            <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", minWidth: 0 }}>
              <ValueInput field={field} operator={op} value={condition.value} onChange={setValue} disabled={disabled} invalid={!!error && faulty === "value"} />
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: "auto" }}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild disabled={disabled}>
              <IconBtn label="More actions" disabled={disabled} noTip>
                <MoreHorizontal size={16} aria-hidden />
              </IconBtn>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="rb-menu" align="end" sideOffset={4} style={{ minWidth: 190 }}>
                <DropdownMenu.Item className="rb-item" onSelect={onDuplicate}><Copy size={14} aria-hidden /> Duplicate</DropdownMenu.Item>
                <DropdownMenu.Item className="rb-item" disabled={!canConvert} onSelect={onConvert}><FolderPlus size={14} aria-hidden /> Convert to group</DropdownMenu.Item>
                <DropdownMenu.Separator className="rb-sep" />
                <DropdownMenu.Item className="rb-item rb-danger" onSelect={onDelete}><Trash2 size={14} aria-hidden /> Delete</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <IconBtn label="Remove condition" disabled={disabled} onClick={onDelete}><X size={16} aria-hidden /></IconBtn>
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
