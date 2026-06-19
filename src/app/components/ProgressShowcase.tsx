import { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { motion } from "motion/react";

const F = "'Rethink Sans', sans-serif";

function ProgressBar({
  label,
  value,
  color = "#0000FF",
  indeterminate = false,
}: {
  label: string;
  value: number;
  color?: string;
  indeterminate?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A" }}>{label}</span>
        {!indeterminate && (
          <span style={{ fontSize: 12, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{value}%</span>
        )}
      </div>
      <Progress.Root
        value={value}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "rgba(0,0,0,0.08)",
          height: 6,
          borderRadius: 9999,
          width: "100%",
        }}
      >
        {indeterminate ? (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <motion.div
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "30%",
                height: "100%",
                background: color,
                borderRadius: "inherit",
              }}
            />
          </div>
        ) : (
          <Progress.Indicator
            style={{
              width: `${value}%`,
              height: "100%",
              background: color,
              borderRadius: "inherit",
              transition: "width 500ms ease-out",
            }}
          />
        )}
      </Progress.Root>
    </div>
  );
}

export function ProgressShowcase() {
  const [live, setLive] = useState(12);

  useEffect(() => {
    const t = setInterval(() => {
      setLive(prev => (prev >= 100 ? 0 : prev + 4));
    }, 350);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="progress" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Progress
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        6px track, rounded ends. Supports determinate values, animated indeterminate, and semantic color states.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
              Determinate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <ProgressBar label="Not started" value={0} />
              <ProgressBar label="Discovery phase" value={25} />
              <ProgressBar label="Identity design" value={60} />
              <ProgressBar label="Delivered" value={100} color="#01FF97" />
            </div>
          </div>

          <div>
            <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
              States
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <ProgressBar label="Loading…" value={0} indeterminate />
              <ProgressBar label="Animated (live)" value={live} />
              <ProgressBar label="Warning" value={40} color="#F59E0B" />
              <ProgressBar label="Error" value={15} color="#E8334A" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Electric Blue for standard progress. Green signals completion. Indeterminate is for unknown-duration operations only — not a decorative loader.
        </p>
      </div>
    </section>
  );
}
