import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

const label: React.CSSProperties = {
  fontSize: 12,
  fontFamily: F,
  fontWeight: 400,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#5A5A6A",
};

const panel: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.10)",
  background: "#FFFFFF",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
  borderRadius: 10,
  padding: 24,
};

/** Line illustration built on the >< motif. */
function Illustration({ variant }: { variant: "first" | "search" | "table" | "lock" }) {
  const s = "#0A0A0F";
  const a = "#1B1BFF";
  const common = { fill: "none", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden>
      <rect x="10" y="10" width="100" height="60" rx="10" {...common} stroke="rgba(0,0,0,0.20)" />
      {variant === "first" && (
        <>
          <path d="M44 30 L32 40 L44 50" {...common} stroke={s} />
          <path d="M76 30 L88 40 L76 50" {...common} stroke={s} />
          <path d="M56 40 H64" {...common} stroke={a} />
        </>
      )}
      {variant === "search" && (
        <>
          <path d="M30 30 L42 40 L30 50" {...common} stroke={s} />
          <path d="M90 30 L78 40 L90 50" {...common} stroke={s} />
          <circle cx="60" cy="38" r="9" {...common} stroke={a} />
          <path d="M67 45 L73 51" {...common} stroke={a} />
        </>
      )}
      {variant === "table" && (
        <>
          <path d="M26 28 H94 M26 40 H94 M26 52 H70" {...common} stroke="rgba(0,0,0,0.20)" />
          <path d="M44 34 L36 40 L44 46" {...common} stroke={s} />
          <path d="M76 34 L84 40 L76 46" {...common} stroke={s} />
        </>
      )}
      {variant === "lock" && (
        <>
          <path d="M34 30 L24 40 L34 50" {...common} stroke={s} />
          <path d="M86 30 L96 40 L86 50" {...common} stroke={s} />
          <rect x="50" y="38" width="20" height="14" rx="3" {...common} stroke={a} />
          <path d="M54 38 V34 a6 6 0 0 1 12 0 V38" {...common} stroke={a} />
        </>
      )}
    </svg>
  );
}

function Btn({ kind, children, onClick }: { kind: "primary" | "secondary"; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="jl-empty-btn"
      style={{
        fontFamily: F,
        fontSize: 14,
        fontWeight: 700,
        padding: "10px 20px",
        borderRadius: 6,
        cursor: "pointer",
        minHeight: 40,
        border: kind === "primary" ? "none" : "1px solid rgba(0,0,0,0.20)",
        background: kind === "primary" ? "#1B1BFF" : "#FFFFFF",
        color: kind === "primary" ? "#FFFFFF" : "#0A0A0F",
      }}
    >
      {children}
    </button>
  );
}

function Empty({
  variant,
  title,
  body,
  actions,
}: {
  variant: "first" | "search" | "table" | "lock";
  title: string;
  body: string;
  actions?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 24px", gap: 16 }}>
      <Illustration variant={variant} />
      <div>
        <p style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#0A0A0F", margin: 0, lineHeight: 1.3 }}>{title}</p>
        <p style={{ fontFamily: F, fontSize: 14, color: "#5A5A6A", margin: "8px auto 0", lineHeight: 1.5, maxWidth: 360 }}>{body}</p>
      </div>
      {actions && <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>{actions}</div>}
    </div>
  );
}

export function EmptyStateShowcase() {
  const [created, setCreated] = useState(false);
  const [filtered, setFiltered] = useState(true);
  const [requested, setRequested] = useState(false);

  return (
    <section id="emptystates" className="mb-16">
      <style>{`
        .jl-empty-btn:focus-visible { outline: 2px solid #1B1BFF; outline-offset: 2px; }
        .jl-empty-btn { transition: opacity 140ms ease-out; }
        .jl-empty-btn:hover { opacity: 0.88; }
        @media (prefers-reduced-motion: reduce) { .jl-empty-btn { transition: none; } }
      `}</style>

      <p className="mb-2" style={label}>Feedback</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Empty States
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        What users see when there is nothing to show. Explain why, then offer at most two ways forward.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <p className="mb-2" style={label}>First use</p>
          {created ? (
            <Empty
              variant="first"
              title="Project created"
              body="Your first project is ready. Add a brief to get the team started."
              actions={<Btn kind="secondary" onClick={() => setCreated(false)}>Reset demo</Btn>}
            />
          ) : (
            <Empty
              variant="first"
              title="No projects yet"
              body="Projects hold briefs, phases and deliverables for each client engagement. Create your first to get started."
              actions={<Btn kind="primary" onClick={() => setCreated(true)}>Create project</Btn>}
            />
          )}
        </div>

        <div style={panel}>
          <p className="mb-2" style={label}>No search results</p>
          {filtered ? (
            <Empty
              variant="search"
              title="No results for &ldquo;rebrand&rdquo;"
              body="No projects match the filters Phase: Delivery and Client: Harbour Capital. Try removing a filter."
              actions={
                <>
                  <Btn kind="secondary" onClick={() => setFiltered(false)}>Clear filters</Btn>
                </>
              }
            />
          ) : (
            <Empty
              variant="search"
              title="Filters cleared"
              body="Showing all 24 projects across 9 clients."
              actions={<Btn kind="secondary" onClick={() => setFiltered(true)}>Reset demo</Btn>}
            />
          )}
        </div>

        <div style={panel}>
          <p className="mb-4" style={label}>No data in a table</p>
          <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, padding: "10px 16px", background: "#F4F4F6", borderBottom: "1px solid rgba(0,0,0,0.10)" }}>
              {["Deliverable", "Phase", "Due"].map((h) => (
                <span key={h} style={{ ...label, color: "#5A5A6A" }}>{h}</span>
              ))}
            </div>
            <Empty
              variant="table"
              title="No deliverables logged"
              body="Deliverables for this phase will appear here once the team adds them."
              actions={<Btn kind="secondary">Add deliverable</Btn>}
            />
          </div>
        </div>

        <div style={panel}>
          <p className="mb-2" style={label}>No permission</p>
          {requested ? (
            <Empty
              variant="lock"
              title="Request sent"
              body="Your engagement lead has been notified and will respond within one working day."
              actions={<Btn kind="secondary" onClick={() => setRequested(false)}>Reset demo</Btn>}
            />
          ) : (
            <Empty
              variant="lock"
              title="Financials are restricted"
              body="Budget and margin data for this engagement is limited to partners and finance. Request access from your lead."
              actions={
                <>
                  <Btn kind="primary" onClick={() => setRequested(true)}>Request access</Btn>
                  <Btn kind="secondary">Back to projects</Btn>
                </>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
