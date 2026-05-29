const avatarSizes = [
  { size: 64, label: "Profile", initials: "JL", context: "64px" },
  { size: 48, label: "Default", initials: "AK", context: "48px" },
  { size: 36, label: "List", initials: "MC", context: "36px" },
  { size: 24, label: "Micro", initials: "RB", context: "24px" },
];

function Avatar({ size, initials }: { size: number; initials: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#EEEEFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: Math.max(Math.round(size * 0.33), 9),
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 700,
          color: "#1B1BFF",
          lineHeight: 1,
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function AvatarGroup({ initials, count }: { initials: string[]; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {initials.map((ini, i) => (
        <div
          key={ini}
          style={{
            marginLeft: i === 0 ? 0 : -8,
            zIndex: initials.length - i,
            borderRadius: "50%",
            border: "2px solid #FFFFFF",
          }}
        >
          <Avatar size={36} initials={ini} />
        </div>
      ))}
      {count && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#F4F4F6",
            border: "2px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: -8,
            zIndex: 0,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 700,
              color: "#5A5A6A",
            }}
          >
            +{count}
          </span>
        </div>
      )}
    </div>
  );
}

export function AvatarShowcase() {
  return (
    <section id="avatars" className="mb-16">
      <h2
        className="mb-10"
        style={{ fontSize: 28, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}
      >
        Avatars
      </h2>

      <div
        className="p-8 rounded-[10px]"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)" }}
      >
        {/* Size scale */}
        <div className="mb-8">
          <p
            className="mb-6"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Size scale — initials fallback
          </p>
          <div className="flex items-end gap-10 flex-wrap">
            {avatarSizes.map((a) => (
              <div key={a.size} className="flex flex-col items-center gap-3">
                <Avatar size={a.size} initials={a.initials} />
                <div className="text-center">
                  <p style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>{a.label}</p>
                  <p style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A" }}>{a.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar group */}
        <div className="mb-8">
          <p
            className="mb-5"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            Avatar group — stacked with +N counter
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col gap-3">
              <AvatarGroup initials={["AK", "MC", "JL"]} count={4} />
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>7 people involved</span>
            </div>
            <div className="flex flex-col gap-3">
              <AvatarGroup initials={["RB", "SY"]} />
              <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", color: "#5A5A6A" }}>2 reviewers</span>
            </div>
          </div>
        </div>

        {/* In-context comment */}
        <div>
          <p
            className="mb-4"
            style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}
          >
            In context — comment thread
          </p>
          <div className="flex flex-col gap-3">
            {[
              { initials: "AK", name: "Alicia Kwan", role: "Strategy Director", time: "2h ago", comment: "The perception gap we identified in segment B is wider than expected — worth surfacing in the executive summary." },
              { initials: "MC", name: "Marcus Chen", role: "Senior Associate", time: "1h ago", comment: "Agreed. I've flagged the receptor nodes most affected. Framework revision ready by EOW." },
            ].map((c) => (
              <div key={c.initials} className="flex gap-3">
                <Avatar size={36} initials={c.initials} />
                <div style={{ flex: 1, background: "#F4F4F6", borderRadius: 10, padding: "12px 16px" }}>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 700, color: "#0A0A0F" }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>{c.role}</span>
                    <span style={{ fontSize: 12, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#BABAC4", marginLeft: "auto" }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: 14, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, lineHeight: 1.5, color: "#0A0A0F" }}>{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-4 px-5 py-4 rounded-[6px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p style={{ fontSize: 13, fontFamily: "'Rethink Sans', sans-serif", fontWeight: 400, color: "#5A5A6A", lineHeight: 1.5 }}>
          Circular crop is the only exception to the no-pill-radius rule. Background <code style={{ fontFamily: "monospace", background: "#EEEEFF", color: "#1B1BFF", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>#EEEEFF</code>, text <code style={{ fontFamily: "monospace", background: "#EEEEFF", color: "#1B1BFF", padding: "1px 4px", borderRadius: 3, fontSize: 12 }}>#1B1BFF</code>. Never add a border or shadow.
        </p>
      </div>
    </section>
  );
}
