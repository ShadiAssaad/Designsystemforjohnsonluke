import * as React from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import type { Option } from "./types";

export const F = "'Rethink Sans', sans-serif";

export const tokens = {
  colors: {
    blue: "#1B1BFF", blueTint: "#EEEEFF", blueHover: "#1515D6", blueActive: "#0F0FA0", blueTintStrong: "#DDDDF5",
    ink: "#0A0A0F", offWhite: "#F4F4F6", white: "#FFFFFF",
    textSecondary: "#5A5A6A", textDisabled: "#BABAC4",
    border: "rgba(0,0,0,0.10)", borderStrong: "rgba(0,0,0,0.20)",
    success: "#00A864", successBg: "#EEFAF4", warning: "#D97706", warningBg: "#FEF3CD",
    danger: "#DC2626", dangerBg: "#FEE8E8", focus: "#1B1BFF",
  },
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    sm: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)",
    lg: "0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
  },
  radius: { sm: 6, md: 10, lg: 16 },
  motion: { popover: "140ms ease-out", section: "180ms ease-out", panel: "280ms ease-in-out" },
} as const;
const C = tokens.colors;

/* ───────── Shared CSS (hover / focus / menu animation) ───────── */

const CSS = `
.rb-f:focus-visible,.rb-f[data-force="focus"]{outline:2px solid ${C.focus};outline-offset:2px}
.rb-field{box-sizing:border-box;min-height:36px;background:#fff;border:1px solid ${C.border};border-radius:6px;font-family:${F};font-size:14px;color:${C.ink};transition:border-color 140ms ease-out,background 140ms ease-out}
.rb-field:hover:not([aria-disabled="true"]),.rb-field[data-force="hover"]{border-color:${C.borderStrong}}
.rb-field:focus-within,.rb-field[data-force="focus"],.rb-field[data-state="open"]{border-color:${C.focus}}
.rb-field:focus-visible,.rb-field:focus-within,.rb-field[data-force="focus"]{outline:2px solid ${C.focus};outline-offset:1px}
.rb-field[data-state="open"]:not(:focus-visible){outline:none}
.rb-field[data-invalid="true"]{border-color:${C.danger}}
.rb-field[data-incomplete="true"]{border-style:dashed;border-color:${C.borderStrong}}
.rb-field[aria-disabled="true"]{background:${C.offWhite};color:${C.textDisabled};cursor:not-allowed}
.rb-field input{font:inherit;color:inherit;background:transparent;border:0;outline:0;padding:0;min-width:0;width:100%}
.rb-field input::placeholder{color:#8A8A9A}
.rb-field input:disabled{cursor:not-allowed}
.rb-btn{font-family:${F};font-weight:700;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;gap:8px;line-height:1;cursor:pointer;border:1.5px solid transparent;white-space:nowrap;transition:background 180ms ease-out,color 180ms ease-out,transform 100ms ease-out}
.rb-btn:active:not([aria-disabled="true"]),.rb-btn[data-force="active"]{transform:scale(0.98)}
.rb-btn[aria-disabled="true"]{cursor:not-allowed}
.rb-primary{background:${C.blue};color:#fff}
.rb-primary:hover:not([aria-disabled="true"]),.rb-primary[data-force="hover"]{background:${C.blueHover}}
.rb-primary:active:not([aria-disabled="true"]),.rb-primary[data-force="active"]{background:${C.blueActive}}
.rb-primary[aria-disabled="true"]{background:#BABAC4;color:#fff}
.rb-secondary{background:transparent;color:${C.blue};border-color:${C.blue}}
.rb-secondary:hover:not([aria-disabled="true"]),.rb-secondary[data-force="hover"]{background:${C.blueTint}}
.rb-secondary:active:not([aria-disabled="true"]),.rb-secondary[data-force="active"]{background:${C.blueTintStrong}}
.rb-secondary[aria-disabled="true"]{color:${C.textDisabled};border-color:${C.textDisabled}}
.rb-ghost{background:transparent;color:${C.textSecondary}}
.rb-ghost:hover:not([aria-disabled="true"]),.rb-ghost[data-force="hover"]{background:${C.offWhite};color:${C.ink}}
.rb-ghost:active:not([aria-disabled="true"]),.rb-ghost[data-force="active"]{background:#EBEBEB;color:${C.ink}}
.rb-ghost[aria-disabled="true"]{color:${C.textDisabled}}
.rb-destructive{background:${C.danger};color:#fff}
.rb-destructive:hover:not([aria-disabled="true"]),.rb-destructive[data-force="hover"]{background:#B91C1C}
.rb-destructive:active:not([aria-disabled="true"]),.rb-destructive[data-force="active"]{background:#991B1B}
.rb-destructive[aria-disabled="true"]{background:#BABAC4}
.rb-destructive.rb-f:focus-visible,.rb-destructive.rb-f[data-force="focus"]{outline-color:${C.danger}}
.rb-ghost.rb-danger:hover:not([aria-disabled="true"]){background:${C.dangerBg};color:${C.danger}}
.rb-menu{background:#fff;border:1px solid ${C.border};border-radius:10px;padding:4px;box-shadow:${tokens.shadows.md};z-index:9999;font-family:${F};animation:rb-pop 140ms ease-out;outline:none}
.rb-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:6px;font-family:${F};font-size:14px;color:${C.ink};cursor:pointer;outline:none;user-select:none;border:0;background:transparent;width:100%;text-align:left}
.rb-item[data-highlighted],.rb-item:hover{background:${C.offWhite}}
.rb-item[data-state="checked"]{font-weight:700}
.rb-item[data-disabled]{color:${C.textDisabled};cursor:not-allowed}
.rb-item.rb-danger{color:${C.danger}}
.rb-item.rb-danger[data-highlighted]{background:${C.dangerBg}}
.rb-sep{height:1px;background:rgba(0,0,0,0.08);margin:4px 0}
.rb-chip-x{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:4px;border:0;background:transparent;color:inherit;cursor:pointer;padding:0}
.rb-chip-x:hover{background:rgba(27,27,255,0.14)}
.rb-row{transition:border-color 140ms ease-out,box-shadow 140ms ease-out}
.rb-row:hover:not([data-disabled="true"]),.rb-row[data-force="hover"]{border-color:${C.borderStrong}}
.rb-row:focus-visible,.rb-row[data-force="focus"]{outline:2px solid ${C.focus};outline-offset:2px}
.rb-enter{display:grid;animation:rb-enter 180ms ease-out}
.rb-enter>*{min-height:0;overflow:hidden}
.rb-exit{display:grid;animation:rb-exit 180ms ease-out forwards}
.rb-exit>*{min-height:0;overflow:hidden}
.rb-pill:hover:not([aria-disabled="true"]),.rb-pill[data-force="hover"]{background:${C.blueTintStrong} !important}
.rb-pill-empty:hover:not([aria-disabled="true"]),.rb-pill-empty[data-force="hover"]{border-color:${C.blue} !important;background:${C.blueTint} !important}
.rb-spin{animation:rb-spin 800ms linear infinite}
@keyframes rb-pop{from{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:none}}
@keyframes rb-enter{from{grid-template-rows:0fr;opacity:0}to{grid-template-rows:1fr;opacity:1}}
@keyframes rb-exit{from{grid-template-rows:1fr;opacity:1}to{grid-template-rows:0fr;opacity:0}}
@keyframes rb-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.rb-menu,.rb-enter,.rb-exit{animation-duration:1ms}.rb-spin{animation-duration:1600ms}}
`;
if (typeof document !== "undefined" && !document.getElementById("rb-styles")) {
  const el = document.createElement("style");
  el.id = "rb-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export type ForceState = "hover" | "focus" | "active";

/* ───────── Btn ───────── */

export interface BtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md";
  loading?: boolean;
  /** Keeps the button focusable (for tooltips) but inert. */
  softDisabled?: boolean;
  /** Render a static visual state for documentation. */
  forceState?: ForceState;
  leftIcon?: React.ReactNode;
  type?: "button" | "submit";
}

export const Btn = React.forwardRef<HTMLButtonElement, BtnProps>(function Btn(
  { variant = "primary", size = "md", loading, softDisabled, forceState, leftIcon, children, disabled, onClick, style, className, type = "button", ...rest },
  ref,
) {
  const inert = !!(disabled || softDisabled || loading);
  return (
    <button
      ref={ref}
      type={type}
      className={`rb-btn rb-f rb-${variant} ${className ?? ""}`}
      disabled={disabled || undefined}
      aria-disabled={inert || undefined}
      aria-busy={loading || undefined}
      data-force={forceState}
      onClick={(e) => { if (inert) { e.preventDefault(); return; } onClick?.(e); }}
      style={{ height: size === "sm" ? 32 : 40, padding: size === "sm" ? "0 12px" : "0 20px", fontSize: size === "sm" ? 13 : 15, ...style }}
      {...rest}
    >
      {loading ? <Loader2 size={14} className="rb-spin" aria-hidden /> : leftIcon}
      {children}
    </button>
  );
});

export interface IconBtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  label: string;
  size?: number;
  danger?: boolean;
  forceState?: ForceState;
  /** Hide the tooltip (e.g. when inside another tooltip) */
  noTip?: boolean;
}
export const IconBtn = React.forwardRef<HTMLButtonElement, IconBtnProps>(function IconBtn(
  { label, size = 32, danger, forceState, noTip, disabled, children, style, onClick, ...rest }, ref,
) {
  const btn = (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      data-force={forceState}
      className={`rb-btn rb-f rb-ghost ${danger ? "rb-danger" : ""}`}
      onClick={(e) => { if (disabled) { e.preventDefault(); return; } onClick?.(e); }}
      style={{ width: size, height: size, padding: 0, flexShrink: 0, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
  return noTip ? btn : <Tip label={label}>{btn}</Tip>;
});

/* ───────── Badge ───────── */

export type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";
const BADGE: Record<BadgeVariant, [string, string]> = {
  neutral: [C.offWhite, C.textSecondary], info: [C.blueTint, C.blue], success: [C.successBg, "#007A4B"],
  warning: [C.warningBg, "#9A5200"], danger: [C.dangerBg, "#B91C1C"],
};
export function Badge({ variant = "neutral", children }: { variant?: BadgeVariant; children: React.ReactNode }) {
  const [bg, fg] = BADGE[variant];
  return (
    <span style={{ background: bg, color: fg, padding: "0 10px", height: 24, borderRadius: 6, fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

/* ───────── Toggle ───────── */

export interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
  ariaLabel?: string;
  forceState?: ForceState;
}
export function Toggle({ checked, onChange, disabled, label, ariaLabel, forceState }: ToggleProps) {
  const sw = (
    <Switch.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      data-force={forceState}
      className="rb-f"
      style={{ width: 40, height: 24, borderRadius: 9999, background: checked ? C.blue : "rgba(0,0,0,0.20)", border: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer", position: "relative", flexShrink: 0, opacity: disabled ? 0.45 : 1, transition: "background 180ms ease-out" }}
    >
      <Switch.Thumb style={{ display: "block", width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: 3, transition: "transform 180ms ease-out", transform: checked ? "translateX(16px)" : "none", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }} />
    </Switch.Root>
  );
  if (!label) return sw;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F, fontSize: 14, color: disabled ? C.textDisabled : C.ink, cursor: disabled ? "not-allowed" : "pointer" }}>
      {sw}{label}
    </label>
  );
}

/* ───────── TextInput ───────── */

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "prefix" | "value"> {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  width?: number | string;
  forceState?: ForceState;
}
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { value, onChange, invalid, prefix, suffix, width, disabled, forceState, style, ...rest }, ref,
) {
  return (
    <div
      className="rb-field"
      aria-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-force={forceState}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 10px", width, minWidth: 0, ...style }}
    >
      {prefix && <span style={{ color: C.textSecondary, fontSize: 14 }}>{prefix}</span>}
      <input ref={ref} value={value} disabled={disabled} aria-invalid={invalid || undefined} data-invalid={invalid || undefined} onChange={(e) => onChange(e.target.value)} {...rest} />
      {suffix && <span style={{ color: C.textSecondary, fontSize: 14, whiteSpace: "nowrap" }}>{suffix}</span>}
    </div>
  );
});

/* ───────── SelectField (Radix Select) ───────── */

export interface SelectOption extends Option { icon?: React.ReactNode }
export interface SelectFieldProps {
  value?: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  incomplete?: boolean;
  ariaLabel: string;
  id?: string;
  width?: number | string;
  minWidth?: number;
  size?: "sm" | "md";
  forceState?: ForceState;
  /** Show option descriptions in the menu */
  showDescriptions?: boolean;
}
export function SelectField({ value, onChange, options, placeholder = "Select", disabled, invalid, incomplete, ariaLabel, id, width, minWidth = 120, size = "md", forceState, showDescriptions }: SelectFieldProps) {
  return (
    <Select.Root value={value ?? ""} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        id={id}
        aria-label={ariaLabel}
        className="rb-field rb-f"
        aria-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-incomplete={incomplete || undefined}
        data-force={forceState}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "0 10px", height: size === "sm" ? 28 : 36, minHeight: size === "sm" ? 28 : 36, width, minWidth, cursor: disabled ? "not-allowed" : "pointer", textAlign: "left" }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: value ? undefined : "#6B6B7B" }}>
          <Select.Value placeholder={placeholder} />
        </span>
        <ChevronDown size={14} aria-hidden style={{ flexShrink: 0, color: disabled ? C.textDisabled : C.textSecondary }} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="rb-menu" position="popper" sideOffset={4} align="start" style={{ minWidth: "var(--radix-select-trigger-width)", maxHeight: 320 }}>
          <Select.Viewport>
            {options.map((o) => (
              <Select.Item key={o.value} value={o.value} className="rb-item">
                <span style={{ flex: 1, minWidth: 0 }}>
                  <Select.ItemText>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{o.icon}{o.label}</span>
                  </Select.ItemText>
                  {showDescriptions && o.description && <span style={{ display: "block", fontSize: 12, color: C.textSecondary }}>{o.description}</span>}
                </span>
                <Select.ItemIndicator><Check size={14} color={C.blue} aria-hidden /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

/* ───────── Chip ───────── */

export interface ChipProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  mono?: boolean;
  leading?: React.ReactNode;
  tabIndex?: number;
}
export function Chip({ label, onRemove, disabled, mono, leading, tabIndex }: ChipProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 24, padding: onRemove ? "0 2px 0 8px" : "0 8px", borderRadius: 6, background: disabled ? C.offWhite : C.blueTint, color: disabled ? C.textDisabled : C.blue, fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : F, fontSize: 13, whiteSpace: "nowrap", flexShrink: 0 }}>
      {leading}{label}
      {onRemove && (
        <button type="button" className="rb-chip-x rb-f" aria-label={`Remove ${label}`} disabled={disabled} tabIndex={tabIndex} onClick={onRemove}>
          <X size={12} aria-hidden />
        </button>
      )}
    </span>
  );
}

/* ───────── Avatar ───────── */

export const initialsOf = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
const AV_BG = ["#EEEEFF", "#E3F7EC", "#FEF3CD", "#EDEDF0", "#FDE4E4"];
export function Avatar({ name, size = 24 }: { name: string; size?: number }) {
  const bg = AV_BG[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AV_BG.length];
  return (
    <span aria-hidden style={{ width: size, height: size, borderRadius: "50%", background: bg, color: C.ink, fontFamily: F, fontWeight: 700, fontSize: Math.round(size * 0.42), display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {initialsOf(name)}
    </span>
  );
}

/* ───────── Tip ───────── */

export function Tip({ label, children, side = "top", disabled }: { label: React.ReactNode; children: React.ReactElement; side?: "top" | "right" | "bottom" | "left"; disabled?: boolean }) {
  if (disabled) return children;
  return (
    <Tooltip.Provider delayDuration={300} skipDelayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={side} sideOffset={6} className="rb-menu" style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 6, padding: "6px 10px", fontSize: 12, lineHeight: 1.4, maxWidth: 240, boxShadow: tokens.shadows.md }}>
            {label}
            <Tooltip.Arrow style={{ fill: C.ink }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/* ───────── Misc layout helpers ───────── */

export const Label = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{ fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textSecondary, ...style }}>{children}</span>
);

export function FieldError({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" style={{ margin: 0, fontFamily: F, fontSize: 12, lineHeight: 1.4, color: "#B91C1C" }}>{children}</p>
  );
}

/** Height + fade wrapper used when rows are added / removed (180ms). */
export function Collapse({ children, enter, exiting }: { children: React.ReactNode; enter?: boolean; exiting?: boolean }) {
  const [entering, setEntering] = React.useState(!!enter);
  return (
    <div className={exiting ? "rb-exit" : entering ? "rb-enter" : undefined} onAnimationEnd={() => setEntering(false)}>
      <div>{children}</div>
    </div>
  );
}
