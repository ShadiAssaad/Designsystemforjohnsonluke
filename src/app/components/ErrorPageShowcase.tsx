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

type Page = {
  code: string;
  title: string;
  body: string;
  dark?: boolean;
  tag: string;
};

const pages: Page[] = [
  {
    code: "404",
    tag: "Not found",
    title: "We can't find that page",
    body: "The project or brief you're looking for may have been moved, archived or never existed. Check the link and try again.",
  },
  {
    code: "500",
    tag: "Server error, Near Black",
    dark: true,
    title: "Something went wrong on our side",
    body: "Our team has been notified. Your work is saved. Try again in a few minutes or return to the dashboard.",
  },
  {
    code: "403",
    tag: "Forbidden",
    title: "You don't have access",
    body: "This workspace is limited to the engagement team. Ask your project lead to add you, then try again.",
  },
];

function Preview({ p }: { p: Page }) {
  const [clicked, setClicked] = useState(false);
  const dark = !!p.dark;
  return (
    <div>
      <p className="mb-3" style={label}>{p.code} / {p.tag}</p>
      <div
        style={{
          background: dark ? "#0A0A0F" : "#FFFFFF",
          border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.10)",
          borderRadius: 10,
          boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
          padding: "48px 32px",
          minHeight: 340,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: F,
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.02em",
            color: dark ? "#FFFFFF" : "#1B1BFF",
          }}
        >
          {p.code}
        </p>
        <h3 style={{ fontFamily: F, fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: 0, color: dark ? "#FFFFFF" : "#0A0A0F" }}>
          {p.title}
        </h3>
        <p style={{ fontFamily: F, fontSize: 16, lineHeight: 1.5, margin: 0, color: dark ? "#8A8A9A" : "#5A5A6A", maxWidth: 420 }}>
          {p.body}
        </p>
        <button
          type="button"
          onClick={() => setClicked(true)}
          onBlur={() => setClicked(false)}
          className={dark ? "jl-err-btn jl-err-btn-dark" : "jl-err-btn"}
          style={{
            marginTop: 8,
            fontFamily: F,
            fontSize: 14,
            fontWeight: 700,
            padding: "10px 20px",
            minHeight: 40,
            borderRadius: 6,
            cursor: "pointer",
            border: dark ? "1px solid rgba(255,255,255,0.12)" : "none",
            background: dark ? "#FFFFFF" : "#1B1BFF",
            color: dark ? "#0A0A0F" : "#FFFFFF",
          }}
        >
          {clicked ? "Redirecting to dashboard" : "Back to dashboard"}
        </button>
      </div>
    </div>
  );
}

export function ErrorPageShowcase() {
  return (
    <section id="errorpages" className="mb-16">
      <style>{`
        .jl-err-btn { transition: opacity 140ms ease-out; }
        .jl-err-btn:hover { opacity: 0.88; }
        .jl-err-btn:focus-visible { outline: 2px solid #1B1BFF; outline-offset: 2px; }
        .jl-err-btn-dark:focus-visible { outline-color: #FFFFFF; }
        @media (prefers-reduced-motion: reduce) { .jl-err-btn { transition: none; } }
      `}</style>

      <p className="mb-2" style={label}>Feedback</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Error Pages
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Full-page errors for missing, failed and restricted routes, each with one clear way back.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pages.map((p) => (
          <Preview key={p.code} p={p} />
        ))}
      </div>
    </section>
  );
}
