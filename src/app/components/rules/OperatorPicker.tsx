import { getOperators } from "./data";
import type { FieldType } from "./types";
import { SelectField } from "./primitives";
import type { ForceState } from "./primitives";

export interface OperatorPickerProps {
  fieldType?: FieldType;
  value?: string;
  onChange: (operatorId: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  width?: number | string;
  forceState?: ForceState;
}

export function OperatorPicker({ fieldType, value, onChange, disabled, invalid, id, width, forceState }: OperatorPickerProps) {
  const options = fieldType ? getOperators(fieldType).map((o) => ({ value: o.id, label: o.label })) : [];
  return (
    <SelectField
      id={id}
      ariaLabel="Operator"
      value={value}
      onChange={onChange}
      options={options}
      placeholder={fieldType ? "Choose operator" : "Operator"}
      disabled={disabled || !fieldType}
      invalid={invalid}
      width={width}
      minWidth={110}
      forceState={forceState}
    />
  );
}
