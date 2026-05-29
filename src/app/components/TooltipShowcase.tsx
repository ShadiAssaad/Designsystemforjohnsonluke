import * as Tooltip from "@radix-ui/react-tooltip";

const F = "'Rethink Sans', sans-serif";

const tooltipContent: React.CSSProperties = {
  background: "#0A0A0F",
  color: "#FFFFFF",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
  fontFamily: F,
  fontWeight: 400,
  lineHeight: 1.4,
  maxWidth: 220,
  zIndex: 9999,
};

function TooltipBtn({
  label,
  tooltip,
  side,
}: {
  label: string;
  tooltip: string;
  side: "top" | "right" | "bottom" | "left";
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          style={{
            padding: "8px 16px",
            background: "#F4F4F6",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 6,
            fontFamily: F,
            fontSize: 13,
            fontWeight: 400,
            color: "#0A0A0F",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {label}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={side} sideOffset={8} style={tooltipContent}>
          {tooltip}
          <Tooltip.Arrow style={{ fill: "#0A0A0F" }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function IconTooltipBtn({ icon, tooltip }: { icon: React.ReactNode; tooltip: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F4F4F6",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 6,
            cursor: "pointer",
            outline: "none",
          }}
        >
          {icon}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={8} style={tooltipContent}>
          {tooltip}
          <Tooltip.Arrow style={{ fill: "#0A0A0F" }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function TooltipShowcase() {
  return (
    <section id="tooltips" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Tooltips
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Dark background, 6px radius, arrow pointer. 200ms delay. Four positions — defaults to top when space allows.
      </p>

      <Tooltip.Provider delayDuration={200}>
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
                Positions — hover to reveal
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <TooltipBtn side="top" label="Top" tooltip="Appears above the trigger" />
                <TooltipBtn side="right" label="Right" tooltip="Appears to the right of the trigger" />
                <TooltipBtn side="bottom" label="Bottom" tooltip="Appears below the trigger" />
                <TooltipBtn side="left" label="Left" tooltip="Appears to the left of the trigger" />
              </div>
            </div>

            <div>
              <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
                Icon buttons
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <IconTooltipBtn
                  tooltip="Download as PDF"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <IconTooltipBtn
                  tooltip="Copy shareable link"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5l-1 1" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5l1-1" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  }
                />
                <IconTooltipBtn
                  tooltip="Move to archive — recoverable for 30 days"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 5h12M3 5l1 8h8l1-8M6 5V3h4v2" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <IconTooltipBtn
                  tooltip="Edit project settings"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11.5 2.5a2 2 0 0 1 2 2L5 13H3v-2L11.5 2.5z" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Tooltip.Provider>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Tooltips label icon buttons or clarify consequences — never gate critical information behind hover. 200ms delay prevents tooltip noise during normal navigation.
        </p>
      </div>
    </section>
  );
}
