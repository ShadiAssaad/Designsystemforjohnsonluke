# Johnson Luke Design System v1.0 — generation rules

Extend only. Never redesign, restyle, rename or remove existing sections.

## Conventions
- Each section is its own file `src/app/components/XxxShowcase.tsx` exporting `XxxShowcase`, registered in `src/app/App.tsx` (import, render with matching section `id`, add to `navItems` in a logical position).
- Style with inline styles and `const F = "'Rethink Sans', sans-serif"`. Use Radix primitives where interaction needs it. Do not import from `src/app/components/ui/`.
- Section header: Label eyebrow + Heading M title + one-line Body S description.
- Show every state, labelled: default, hover, focus, active/selected, disabled, error where relevant. Keyboard focus ring = 2px #1B1BFF.
- Example content fits a strategy & design consultancy (projects, phases, clients, briefs). No lorem ipsum.

## Tokens
- Colours: Electric Blue #1B1BFF, Blue tint #EEEEFF, Neon Green #01FF97 (decoration only, never text), Green text #00A864, Near Black #0A0A0F, Off White #F4F4F6, White #FFFFFF, text-secondary #5A5A6A, text-disabled #BABAC4, text-secondary-dark #8A8A9A.
- Borders: default rgba(0,0,0,0.10), strong rgba(0,0,0,0.20), inverse rgba(255,255,255,0.12), focus #1B1BFF.
- Status: success #00A864 / bg #EEFAF4; warning #D97706 / bg #FEF3CD; danger #DC2626 / bg #FEE8E8; info #1B1BFF / bg #EEEEFF.
- Type: Rethink Sans 400/700 only. Display 72, Heading L 40, Heading M 28, Heading S 20, Body L 18, Body 16, Body S 14, Label 12 (400, +0.08em, ALL CAPS), Metric 40.
- Spacing (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Radius: 6 small components, 10 cards/panels, 16 modals/sheets, 9999 pills only (sparingly). Never 0, never 24+.
- Shadows: xs `0 1px 2px rgba(0,0,0,0.05)`; sm `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)`; md `0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)`; lg `0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)`. On dark surfaces use a rgba(255,255,255,0.10) border instead of a shadow.
- Motion: popovers/tooltips 140ms ease-out, tab/section change 180ms ease-out, modal 220ms ease-out (scale 0.97→1 + fade), panels/sheets 280ms ease-in-out. No springs, no bounce, no loops (spinner rotation is the only exception).
- Contrast: everything passes WCAG AA. Never blue text on near-black, never near-black text on blue, never #01FF97 as text. No gradients on UI components. No border accents on cards or toasts.
- Logos: `src/imports/Artboard_1_300x.png` on light surfaces, `Artboard_5_300x.png` on dark.

## Rule builder
Rules read WHEN [trigger] IF [conditions] THEN [actions]. Example: "When a project moves to Review, if budget used > 80% and client is Tier 1, notify the account lead and flag as At risk."
- Shared blocks live in `src/app/components/rules/` (import from `rules/index.ts`); showcases and the full editor page reuse them. Never restyle them per page.
- WHEN: `TriggerSelector`, one per rule. Card-style select grouped by category; selected shows a blue-tint pill. Use for the event or schedule only, never for filtering.
- IF: `ConditionGroup` of `ConditionRow`s, each built from `FieldPicker` + `OperatorPicker` (options depend on field type) + `ValueInput` (hidden when the operator needs no value). `Connector` toggles AND/OR for the whole group. Nest groups at most 3 levels; the add-group control is disabled with a tooltip at max depth. Conditions are optional.
- THEN: `ActionRow` list (at least one), reorderable, with optional delay. Use `TokenField` chips like `{project.name}` for dynamic text.
- `RuleComposer` assembles all three; `summarizeRule` renders the live plain-language sentence (incomplete parts as grey placeholders) and `validateRule` returns errors that `focusRuleNode(id)` can scroll to and focus.
- Row states: incomplete (dashed border + "Choose a field"), complete, invalid (red border + inline error under the row), disabled. Add/remove rows animate 180ms (height + fade), menus 140ms, panels 280ms.
- Page patterns: editor (header, WHEN → IF → THEN canvas, settings panel, validation summary, test slideout, conflict warning, Visual/JSON toggle) and management (list table, rule cards, templates modal, run history, version history, empty/loading/permission states). Destructive actions need confirmation; deleting a rule requires typing its name.
