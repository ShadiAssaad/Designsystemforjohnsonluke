import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const F = "'Rethink Sans', sans-serif";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DetailPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"details" | "activity">("details");

  return createPortal(
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(10,10,15,0.40)",
          zIndex: 200,
        }}
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: 400, maxWidth: "100vw",
          background: "#FFFFFF",
          zIndex: 201,
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(0,0,0,0.10)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#BABAC4", marginBottom: 4 }}>
              Project
            </p>
            <p style={{ fontSize: 16, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>
              Johnson Luke — Q3 Brand Refresh
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              background: "#F4F4F6", border: "none", cursor: "pointer", color: "#5A5A6A", flexShrink: 0,
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.10)", padding: "0 24px" }}>
          {(["details", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 0", marginRight: 20,
                background: "none", border: "none",
                borderBottom: `2px solid ${tab === t ? "#1B1BFF" : "transparent"}`,
                marginBottom: -1,
                fontFamily: F, fontSize: 13,
                fontWeight: tab === t ? 700 : 400,
                color: tab === t ? "#1B1BFF" : "#5A5A6A",
                cursor: "pointer", outline: "none",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {tab === "details" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                ["Client", "Johnson Luke Ltd."],
                ["Timeline", "8 weeks (Wk 1–8)"],
                ["Budget band", "£45k–£60k"],
                ["Phase", "Discovery & Audit"],
                ["Lead", "Anya Belk"],
                ["Status", "Active"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4" }}>{k}</span>
                  <span style={{ fontSize: 14, fontFamily: F, color: "#0A0A0F" }}>{v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />
              <div>
                <span style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4", display: "block", marginBottom: 8 }}>
                  Brief summary
                </span>
                <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.6 }}>
                  A full-system review of brand expression across digital, print, and environmental touchpoints. Phase one covers identity audit and competitor benchmarking.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { time: "2h ago", who: "Marcus Reid", action: "uploaded brand audit draft v2" },
                { time: "Yesterday", who: "Anya Belk", action: "updated timeline — Wk 5 pushed by 3 days" },
                { time: "2 days ago", who: "Sian Torres", action: "shared moodboard with client" },
                { time: "3 days ago", who: "Oliver Ng", action: "confirmed budget band with client" },
                { time: "1 week ago", who: "Anya Belk", action: "created project and set brief" },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1B1BFF", marginTop: 4, flexShrink: 0 }} />
                    {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.08)", marginTop: 6 }} />}
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", marginBottom: 2 }}>
                      <strong style={{ fontWeight: 700 }}>{item.who}</strong> {item.action}
                    </p>
                    <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(0,0,0,0.10)", display: "flex", gap: 10 }}>
          <button
            style={{
              flex: 1, padding: "10px", borderRadius: 6,
              background: "#0A0A0F", color: "#FFFFFF",
              fontFamily: F, fontSize: 13, fontWeight: 700,
              border: "none", cursor: "pointer",
            }}
          >
            Open full view
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "10px 16px", borderRadius: 6,
              background: "#F4F4F6", color: "#0A0A0F",
              fontFamily: F, fontSize: 13, fontWeight: 400,
              border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

function FilterPanel({ onClose }: { onClose: () => void }) {
  const [statuses, setStatuses] = useState<Set<string>>(new Set(["Active"]));
  const [phases, setPhases] = useState<Set<string>>(new Set());

  function toggleSet(set: Set<string>, setFn: (s: Set<string>) => void, val: string) {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setFn(next);
  }

  function CheckItem({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
    return (
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 0" }}>
        <div style={{
          width: 16, height: 16, borderRadius: 3, flexShrink: 0,
          border: `1.5px solid ${checked ? "#1B1BFF" : "rgba(0,0,0,0.22)"}`,
          background: checked ? "#1B1BFF" : "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F" }}>{label}</span>
      </div>
    );
  }

  return createPortal(
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(10,10,15,0.40)", zIndex: 200 }}
      />
      <motion.div
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: 320, maxWidth: "100vw",
          background: "#FFFFFF", zIndex: 201,
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.10)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 16, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>Filters</p>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F4F6", border: "none", cursor: "pointer", color: "#5A5A6A" }}>
            <CloseIcon />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>Status</p>
            {["Active", "Review", "Complete", "On Hold"].map(s => (
              <CheckItem key={s} label={s} checked={statuses.has(s)} onToggle={() => toggleSet(statuses, setStatuses, s)} />
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 28 }} />
          <div>
            <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 12 }}>Phase</p>
            {["Discovery", "Refinement", "Delivery", "Complete"].map(p => (
              <CheckItem key={p} label={p} checked={phases.has(p)} onToggle={() => toggleSet(phases, setPhases, p)} />
            ))}
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(0,0,0,0.10)", display: "flex", gap: 10 }}>
          <button
            style={{ flex: 1, padding: "10px", borderRadius: 6, background: "#0A0A0F", color: "#FFFFFF", fontFamily: F, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}
          >
            Apply {statuses.size + phases.size > 0 ? `(${statuses.size + phases.size})` : ""}
          </button>
          <button
            onClick={() => { setStatuses(new Set()); setPhases(new Set()); }}
            style={{ padding: "10px 14px", borderRadius: 6, background: "#F4F4F6", color: "#5A5A6A", fontFamily: F, fontSize: 13, fontWeight: 400, border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer" }}
          >
            Reset
          </button>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

export function SlideoutShowcase() {
  const [showDetail, setShowDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <section id="slideout" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Slideout Panels
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Right-edge spring animation. Dark scrim overlay. Dismiss on overlay click. Two variants: detail view (with tabs) and filter panel.
      </p>

      <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
          Variants — click to open
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button
            onClick={() => setShowDetail(true)}
            style={{
              padding: "10px 18px", borderRadius: 6,
              background: "#0A0A0F", color: "#FFFFFF",
              fontFamily: F, fontSize: 13, fontWeight: 700,
              border: "none", cursor: "pointer",
            }}
          >
            Project detail
          </button>
          <button
            onClick={() => setShowFilter(true)}
            style={{
              padding: "10px 18px", borderRadius: 6,
              background: "#F4F4F6", color: "#0A0A0F",
              fontFamily: F, fontSize: 13, fontWeight: 400,
              border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer",
            }}
          >
            Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDetail && <DetailPanel onClose={() => setShowDetail(false)} />}
        {showFilter && <FilterPanel onClose={() => setShowFilter(false)} />}
      </AnimatePresence>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Slideouts are for contextual detail, not primary navigation. Always include a close button in the header. Detail panels default 400px wide; filter panels 320px. Spring animation (damping 28, stiffness 260) — never linear.
        </p>
      </div>
    </section>
  );
}
