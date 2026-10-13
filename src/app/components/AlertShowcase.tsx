import { useState } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

const F = "'Rethink Sans', sans-serif";

type Kind = "info" | "success" | "warning" | "danger";

const kinds: Record<
  Kind,
  { label: string; color: string; bg: string; Icon: typeof Info; title: string; body: string; action: string; link: string }
> = {
  info: {
    label: "Info",
    color: "#1B1BFF",
    bg: "#EEEEFF",
    Icon: Info,
    title: "Discovery workshop rescheduled",
    body: "The Meridian Health kickoff has moved to Thursday at 10:00. Calendar invites have been updated.",
    action: "View schedule",
    link: "#1B1BFF",
  },
  success: {
    label: "Success",
    color: "#00A864",
    bg: "#EEFAF4",
    Icon: CheckCircle2,
    title: "Brief approved by client",
    body: "Northwind Logistics signed off the strategy brief. Phase 2 can begin on Monday.",
    action: "Open phase plan",
    link: "#0A0A0F",
  },
  warning: {
    label: "Warning",
    color: "#D97706",
    bg: "#FEF3CD",
    Icon: AlertTriangle,
    title: "Statement of work expires in 3 days",
    body: "Countersign the Alder & Finch SOW before Friday to hold the proposed team availability.",
    action: "Review agreement",
    link: "#0A0A0F",
  },
  danger: {
    label: "Danger",
    color: "#DC2626",
    bg: "#FEE8E8",
    Icon: XCircle,
    title: "Deliverable upload failed",
    body: "The Brand Architecture deck could not be shared with the client. Check file size and retry.",
    action: "Retry upload",
    link: "#0A0A0F",
  },
};

const order: Kind[] = ["info", "success", "warning", "danger"];

const label: React.CSSProperties = {
  fontSize: 12,
  fontFamily: F,
  fontWeight: 400,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5A5A6A",
};

function DismissButton({ onClick, name }: { onClick: () => void; name: string }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Dismiss ${name}`}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="jl-alert-btn"
      style={{
        background: hover ? "rgba(0,0,0,0.06)" : "transparent",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        color: "#0A0A0F",
        padding: 4,
        display: "flex",
        flexShrink: 0,
      }}
    >
      <X size={16} />
    </button>
  );
}

function InlineAlert({ kind, onDismiss }: { kind: Kind; onDismiss: () => void }) {
  const k = kinds[kind];
  return (
    <div
      role={kind === "danger" || kind === "warning" ? "alert" : "status"}
      style={{
        background: k.bg,
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 10,
        padding: 16,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        fontFamily: F,
        animation: "jl-alert-in 180ms ease-out",
      }}
    >
      <k.Icon size={20} color={k.color} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#0A0A0F", lineHeight: 1.4, margin: 0 }}>{k.title}</p>
        <p style={{ fontSize: 14, fontWeight: 400, color: "#0A0A0F", lineHeight: 1.5, margin: "4px 0 0" }}>{k.body}</p>
        <a
          href="#alerts"
          className="jl-alert-link"
          onClick={(e) => e.preventDefault()}
          style={{
            display: "inline-block",
            marginTop: 8,
            fontSize: 14,
            fontWeight: 700,
            color: k.link,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            borderRadius: 6,
          }}
        >
          {k.action}
        </a>
      </div>
      <DismissButton onClick={onDismiss} name={k.label.toLowerCase() + " alert"} />
    </div>
  );
}

function Banner({ kind, onDismiss }: { kind: Kind; onDismiss: () => void }) {
  const k = kinds[kind];
  const banners: Record<Kind, string> = {
    info: "Scheduled maintenance on Saturday 02:00 to 04:00 UTC. The project portal will be read-only.",
    success: "Your workspace has been upgraded. All active engagements now include the Insight Library.",
    warning: "Three client invoices are overdue. Resolve them to keep project handover on schedule.",
    danger: "The client portal is unreachable. Shared briefs and approvals are temporarily unavailable.",
  };
  return (
    <div
      role="status"
      style={{
        background: k.bg,
        borderBottom: "1px solid rgba(0,0,0,0.10)",
        padding: "12px 16px",
        display: "flex",
        gap: 12,
        alignItems: "center",
        fontFamily: F,
      }}
    >
      <k.Icon size={20} color={k.color} style={{ flexShrink: 0 }} aria-hidden />
      <p style={{ flex: 1, margin: 0, fontSize: 14, color: "#0A0A0F", lineHeight: 1.5 }}>
        <strong style={{ fontWeight: 700 }}>{k.label}.</strong> {banners[kind]}
      </p>
      <a
        href="#alerts"
        className="jl-alert-link"
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: 14, fontWeight: 700, color: k.link, textDecoration: "underline", textUnderlineOffset: 3, whiteSpace: "nowrap", borderRadius: 6 }}
      >
        Learn more
      </a>
      <DismissButton onClick={onDismiss} name={k.label.toLowerCase() + " banner"} />
    </div>
  );
}

function Compact({ kind }: { kind: Kind }) {
  const k = kinds[kind];
  const text: Record<Kind, string> = {
    info: "Draft saved to Project Atlas workspace.",
    success: "Moodboard shared with 4 stakeholders.",
    warning: "Timeline overlaps with the Q3 review window.",
    danger: "Budget exceeds the approved scope by 12%.",
  };
  return (
    <div
      style={{
        background: k.bg,
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 6,
        padding: "8px 12px",
        display: "flex",
        gap: 8,
        alignItems: "center",
        fontFamily: F,
      }}
    >
      <k.Icon size={16} color={k.color} style={{ flexShrink: 0 }} aria-hidden />
      <span style={{ fontSize: 14, color: "#0A0A0F", lineHeight: 1.5 }}>{text[kind]}</span>
    </div>
  );
}

export function AlertShowcase() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const dismiss = (id: string) => setDismissed((p) => new Set([...p, id]));
  const reset = () => setDismissed(new Set());

  const panel: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#FFFFFF",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
    borderRadius: 10,
    padding: 24,
  };

  const resetBtn = (
    <button
      type="button"
      onClick={reset}
      className="jl-alert-btn"
      style={{
        fontFamily: F,
        fontSize: 14,
        fontWeight: 700,
        padding: "8px 16px",
        borderRadius: 6,
        border: "1px solid rgba(0,0,0,0.20)",
        background: "#FFFFFF",
        color: "#0A0A0F",
        cursor: "pointer",
      }}
    >
      Restore dismissed alerts
    </button>
  );

  return (
    <section id="alerts" className="mb-16">
      <style>{`
        @keyframes jl-alert-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .jl-alert-btn:focus-visible, .jl-alert-link:focus-visible { outline: 2px solid #1B1BFF; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .jl-alert-btn, .jl-alert-link, [role="alert"], [role="status"] { animation: none !important; transition: none !important; } }
      `}</style>

      <p className="mb-2" style={label}>Feedback</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Alerts
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Persistent messages that sit in the page flow. Info, success, warning and danger, with an optional action and dismiss.
      </p>

      <div style={panel} className="mb-6">
        <div className="flex items-center justify-between mb-6" style={{ gap: 16, flexWrap: "wrap" }}>
          <p style={label}>Inline alerts, dismissible</p>
          {dismissed.size > 0 && resetBtn}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ alignItems: "start" }}>
          {order.map((kind) =>
            dismissed.has("inline-" + kind) ? null : (
              <InlineAlert key={kind} kind={kind} onDismiss={() => dismiss("inline-" + kind)} />
            )
          )}
        </div>
        {order.every((k) => dismissed.has("inline-" + k)) && (
          <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", margin: 0 }}>
            All alerts dismissed. Use restore to bring them back.
          </p>
        )}
      </div>

      <div className="mb-6" style={{ ...panel, padding: 0, overflow: "hidden" }}>
        <p style={{ ...label, padding: "24px 24px 16px" }}>Full-width page banner</p>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.10)" }}>
          {order.map((kind) =>
            dismissed.has("banner-" + kind) ? null : (
              <Banner key={kind} kind={kind} onDismiss={() => dismiss("banner-" + kind)} />
            )
          )}
        </div>
        {order.every((k) => dismissed.has("banner-" + k)) && (
          <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", margin: 0, padding: 24 }}>
            All banners dismissed. Use restore above to bring them back.
          </p>
        )}
      </div>

      <div style={panel}>
        <p className="mb-6" style={label}>Compact single-line</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {order.map((kind) => (
            <Compact key={kind} kind={kind} />
          ))}
        </div>
      </div>
    </section>
  );
}
