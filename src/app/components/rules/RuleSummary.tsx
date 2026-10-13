import { summarizeRule } from "./data";
import type { Rule, Segment } from "./types";
import { F, tokens } from "./primitives";

const C = tokens.colors;

export function SegmentText({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((s, i) => (
        <span key={i} style={s.placeholder ? { color: "#6B6B7B", fontStyle: "normal", background: C.offWhite, borderRadius: 4, padding: "0 4px" } : undefined}>{s.text}</span>
      ))}
    </>
  );
}

/** Plain-English sentence for a rule; incomplete parts render as grey placeholders. */
export function RuleSummary({ rule, segments }: { rule?: Rule; segments?: Segment[] }) {
  const segs = segments ?? (rule ? summarizeRule(rule) : []);
  return (
    <p style={{ margin: 0, fontFamily: F, fontSize: 16, lineHeight: 1.6, color: C.ink }} aria-live="polite">
      <SegmentText segments={segs} />.
    </p>
  );
}
