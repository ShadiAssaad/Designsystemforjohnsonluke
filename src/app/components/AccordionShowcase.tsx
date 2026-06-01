import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 220ms ease-out",
        flexShrink: 0,
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

function AccordionSingle({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderTop: i === 0 ? "1px solid rgba(0,0,0,0.10)" : undefined,
              borderBottom: "1px solid rgba(0,0,0,0.10)",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: F,
                fontSize: 14,
                fontWeight: isOpen ? 700 : 400,
                color: isOpen ? "#1B1BFF" : "#0A0A0F",
                textAlign: "left",
                transition: "color 180ms ease-out",
              }}
            >
              {item.question}
              <span style={{ color: isOpen ? "#1B1BFF" : "#BABAC4" }}>
                <ChevronDown open={isOpen} />
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 400 : 0,
                transition: "max-height 280ms ease-out",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontFamily: F,
                  color: "#5A5A6A",
                  lineHeight: 1.65,
                  paddingBottom: 16,
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AccordionMulti({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set([items[0].id]));

  function toggle(id: string) {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setOpen(next);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id);
        return (
          <div
            key={item.id}
            style={{
              borderTop: i === 0 ? "1px solid rgba(0,0,0,0.10)" : undefined,
              borderBottom: "1px solid rgba(0,0,0,0.10)",
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: F,
                fontSize: 14,
                fontWeight: isOpen ? 700 : 400,
                color: isOpen ? "#1B1BFF" : "#0A0A0F",
                textAlign: "left",
                transition: "color 180ms ease-out",
              }}
            >
              {item.question}
              <span style={{ color: isOpen ? "#1B1BFF" : "#BABAC4" }}>
                <ChevronDown open={isOpen} />
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 400 : 0,
                transition: "max-height 280ms ease-out",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontFamily: F,
                  color: "#5A5A6A",
                  lineHeight: 1.65,
                  paddingBottom: 16,
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AccordionCard({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderRadius: 8,
              border: `1px solid ${isOpen ? "#1B1BFF" : "rgba(0,0,0,0.10)"}`,
              background: isOpen ? "#FAFAFF" : "#FFFFFF",
              overflow: "hidden",
              transition: "border-color 180ms ease-out, background 180ms ease-out",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: F,
                fontSize: 13,
                fontWeight: isOpen ? 700 : 400,
                color: isOpen ? "#1B1BFF" : "#0A0A0F",
                textAlign: "left",
                transition: "color 180ms ease-out",
              }}
            >
              {item.question}
              <span style={{ color: isOpen ? "#1B1BFF" : "#BABAC4" }}>
                <ChevronDown open={isOpen} />
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 400 : 0,
                transition: "max-height 280ms ease-out",
              }}
            >
              <div
                style={{
                  padding: "0 16px 14px",
                  borderTop: "1px solid rgba(27,27,255,0.12)",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: F,
                    color: "#5A5A6A",
                    lineHeight: 1.65,
                    paddingTop: 12,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AccordionWithIcon({ items }: { items: (AccordionItem & { icon: string })[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            style={{
              borderTop: i === 0 ? "1px solid rgba(0,0,0,0.10)" : undefined,
              borderBottom: "1px solid rgba(0,0,0,0.10)",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "15px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isOpen ? "#EEEEFF" : "#F4F4F6",
                  fontSize: 16,
                  transition: "background 180ms ease-out",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  flex: 1,
                  fontFamily: F,
                  fontSize: 14,
                  fontWeight: isOpen ? 700 : 400,
                  color: isOpen ? "#1B1BFF" : "#0A0A0F",
                  transition: "color 180ms ease-out",
                }}
              >
                {item.question}
              </span>
              <span style={{ color: isOpen ? "#1B1BFF" : "#BABAC4" }}>
                <ChevronDown open={isOpen} />
              </span>
            </button>
            <div
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 400 : 0,
                transition: "max-height 280ms ease-out",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontFamily: F,
                  color: "#5A5A6A",
                  lineHeight: 1.65,
                  paddingLeft: 44,
                  paddingBottom: 16,
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const faqItems: AccordionItem[] = [
  {
    id: "q1",
    question: "What is included in the brand audit phase?",
    answer:
      "The brand audit covers a full review of all existing brand assets — including logo, typography, colour usage, tone of voice, and digital touchpoints. We benchmark against direct and adjacent competitors, then produce a written gap analysis with prioritised recommendations.",
  },
  {
    id: "q2",
    question: "How long does a typical engagement last?",
    answer:
      "Most engagements run between six and twelve weeks. Discovery and audit typically take two to three weeks; identity development three to four weeks; and delivery — including guidelines, asset production, and handover — two to three weeks.",
  },
  {
    id: "q3",
    question: "Who owns the final deliverables?",
    answer:
      "All intellectual property created during the engagement is transferred to the client upon final payment. This includes source files, typeface licences procured for the project, and usage rights for commissioned photography.",
  },
  {
    id: "q4",
    question: "Do you offer ongoing brand management?",
    answer:
      "Yes. We offer a Brand Partner retainer — typically eight to sixteen hours per month — for clients who need ongoing creative direction, asset production, or strategic counsel post-launch.",
  },
];

const processItems: AccordionItem[] = [
  {
    id: "p1",
    question: "Discovery & Audit",
    answer:
      "We start every engagement with structured stakeholder interviews, a comprehensive audit of existing brand assets, and a competitor landscape review. Outputs: audit report, positioning map, and a brief.",
  },
  {
    id: "p2",
    question: "Identity Development",
    answer:
      "Based on the agreed strategic brief, we develop two or three distinct creative directions for review. Each direction covers logo, typography, colour, and one applied example. One direction is selected and refined.",
  },
  {
    id: "p3",
    question: "Refinement & Sign-off",
    answer:
      "The selected direction is refined across two rounds of feedback. All refinements are tracked in a shared version document. Sign-off is required before proceeding to delivery.",
  },
  {
    id: "p4",
    question: "Delivery & Handover",
    answer:
      "We produce a complete brand guidelines document, export all assets in agreed formats, brief internal and external stakeholders, and conduct a 30-day post-launch check-in.",
  },
];

const iconItems: (AccordionItem & { icon: string })[] = [
  { id: "i1", icon: "📋", question: "Project brief", answer: "A concise written document defining scope, objectives, audience, success criteria, and constraints. The brief is co-signed by client and lead strategist before work begins." },
  { id: "i2", icon: "🎨", question: "Creative direction", answer: "The overarching visual and tonal approach that informs all design decisions within the engagement. Typically expressed as a one-page reference board with annotation." },
  { id: "i3", icon: "📐", question: "Brand guidelines", answer: "A structured document defining how all brand elements are to be used — across digital, print, environmental, and motion contexts. Updated as the brand evolves." },
  { id: "i4", icon: "📁", question: "Asset library", answer: "A structured Figma file and/or cloud folder containing all approved brand assets in all required formats. Accompanied by a naming convention document." },
];

export function AccordionShowcase() {
  return (
    <section id="accordion" className="mb-16">
      <h2
        className="mb-2"
        style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Accordion
      </h2>
      <p
        className="mb-8"
        style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}
      >
        Three variants: line-rule (single and multi-open), card-bordered, and icon-prefixed. Active item shows Electric Blue label and rotated chevron.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Single-open line accordion */}
        <div
          className="p-8 rounded-[10px]"
          style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <p
            className="mb-6"
            style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Single open — FAQ
          </p>
          <AccordionSingle items={faqItems} />
        </div>

        {/* Multi-open line accordion */}
        <div
          className="p-8 rounded-[10px]"
          style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <p
            className="mb-6"
            style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Multi open — process
          </p>
          <AccordionMulti items={processItems} />
        </div>

        {/* Card accordion */}
        <div
          className="p-8 rounded-[10px]"
          style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <p
            className="mb-6"
            style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Card variant
          </p>
          <AccordionCard items={faqItems.slice(0, 3)} />
        </div>

        {/* Icon accordion */}
        <div
          className="p-8 rounded-[10px]"
          style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <p
            className="mb-6"
            style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            With icon prefix
          </p>
          <AccordionWithIcon items={iconItems} />
        </div>
      </div>

      <div
        className="px-5 py-4 rounded-[6px]"
        style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}
      >
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Use single-open for FAQs and linear flows where context is mutually exclusive. Use multi-open for process steps or reference content the user may want to compare. Card variant provides additional visual separation on dense pages. Never animate with JS-set height — use{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, background: "rgba(0,0,0,0.06)", padding: "1px 5px", borderRadius: 3 }}>max-height</code>{" "}
          transition for GPU-composited layout performance.
        </p>
      </div>
    </section>
  );
}
