import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const toastVariants = [
  {
    variant: "Success",
    border: "#00A864",
    icon: "#00A864",
    title: "Engagement confirmed",
    detail: "Your project brief has been received. We'll be in touch within 48 hours.",
  },
  {
    variant: "Warning",
    border: "#D97706",
    icon: "#D97706",
    title: "Action required",
    detail: "Your signed agreement is overdue. Please upload before the 31st to proceed.",
  },
  {
    variant: "Error",
    border: "#DC2626",
    icon: "#DC2626",
    title: "Submission failed",
    detail: "We couldn't process your request. Check your connection and try again.",
  },
  {
    variant: "Info",
    border: "#0000FF",
    icon: "#0000FF",
    title: "New framework update",
    detail: "The Perception Engine v2.1 is now available. View the release notes.",
  },
];

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: typeof toastVariants[0];
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{
        width: 320,
        background: "#FFFFFF",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.10)",
        padding: "14px 16px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: toast.icon,
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 14,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 700,
            color: "#0A0A0F",
            marginBottom: 3,
            lineHeight: 1.3,
          }}
        >
          {toast.title}
        </p>
        <p
          style={{
            fontSize: 14,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            color: "#5A5A6A",
            lineHeight: 1.5,
          }}
        >
          {toast.detail}
        </p>
      </div>
      {/* Dismiss */}
      <button
        onClick={onDismiss}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#5A5A6A",
          fontSize: 16,
          lineHeight: 1,
          padding: 2,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

export function ToastShowcase() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [liveToasts, setLiveToasts] = useState<string[]>([]);

  function dismissStatic(variant: string) {
    setDismissed((prev) => new Set([...prev, variant]));
  }

  function triggerLive(variant: string) {
    if (!liveToasts.includes(variant)) {
      setLiveToasts((prev) => [...prev, variant]);
      setTimeout(() => {
        setLiveToasts((prev) => prev.filter((v) => v !== variant));
      }, 4000);
    }
  }

  return (
    <section id="toasts" className="mb-16">
      <h2
        className="mb-2"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Toast Notifications
      </h2>
      <p
        className="mb-8"
        style={{ fontSize: 14, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}
      >
        Appear bottom-right. Communicate action results — confirmation, warning, error. Brief, functional, non-blocking. Auto-dismiss after 4 seconds.
      </p>

      {/* Static display */}
      <div
        className="p-8 rounded-[10px] mb-4"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#F4F4F6" }}
      >
        <p
          className="mb-6"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          All 4 variants — as they appear stacked
        </p>
        <div className="flex flex-col gap-3" style={{ maxWidth: 360 }}>
          <AnimatePresence>
            {toastVariants.filter((t) => !dismissed.has(t.variant)).map((t) => (
              <ToastItem
                key={t.variant}
                toast={t}
                onDismiss={() => dismissStatic(t.variant)}
              />
            ))}
          </AnimatePresence>
          {dismissed.size === toastVariants.length && (
            <button
              onClick={() => setDismissed(new Set())}
              style={{
                fontFamily: "'Rethink Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#0000FF",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
              }}
            >
              Reset all toasts ↩
            </button>
          )}
        </div>
      </div>

      {/* Live trigger demo */}
      <div
        className="p-6 rounded-[10px]"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}
      >
        <p
          className="mb-4"
          style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
        >
          Live demo — trigger a toast (auto-dismisses in 4s)
        </p>
        <div className="flex flex-wrap gap-3">
          {toastVariants.map((t) => (
            <button
              key={t.variant}
              onClick={() => triggerLive(t.variant)}
              style={{
                fontFamily: "'Rethink Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: 6,
                border: `1.5px solid ${t.border}`,
                background: "transparent",
                color: t.border === "#0000FF" ? "#0000FF" : t.border,
                cursor: "pointer",
              }}
            >
              {t.variant}
            </button>
          ))}
        </div>
      </div>

      {/* Live toasts portal */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {toastVariants
            .filter((t) => liveToasts.includes(t.variant))
            .map((t) => (
              <div key={t.variant} style={{ pointerEvents: "all" }}>
                <ToastItem
                  toast={t}
                  onDismiss={() =>
                    setLiveToasts((prev) => prev.filter((v) => v !== t.variant))
                  }
                />
              </div>
            ))}
        </AnimatePresence>
      </div>

      {/* Spec notes */}
      <div
        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div
          className="px-5 py-4 rounded-[6px]"
          style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
        >
          <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>Anatomy</p>
          <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.6 }}>
            320px fixed width · 10px radius · shadow-md · 1px border · 16px icon circle · dismiss ✕ top-right
          </p>
        </div>
        <div
          className="px-5 py-4 rounded-[6px]"
          style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
        >
          <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F", marginBottom: 4 }}>Behavior</p>
          <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.6 }}>
            Slide in from right: 280ms ease-out. Fade out: 200ms ease-in. Max 3 stacked. Position: bottom-right, 24px from edges.
          </p>
        </div>
      </div>
    </section>
  );
}
