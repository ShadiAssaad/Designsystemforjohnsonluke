import { useState } from "react";
import logoLight from "../../imports/Artboard_1_300x.png";

export function NavigationShowcase() {
  const [active, setActive] = useState("Work");

  const links = ["Work", "Capabilities", "About", "Insights"];

  return (
    <section id="navigation" className="mb-16">
      <h2
        className="mb-10"
        style={{
          fontSize: 28,
          fontFamily: "'Rethink Sans', sans-serif",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#0A0A0F",
        }}
      >
        Navigation
      </h2>

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {/* Top nav */}
        <nav
          style={{
            background: "#FFFFFF",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            height: 60,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 32,
          }}
        >
          <img src={logoLight} alt="Johnson Luke" style={{ height: 22, width: "auto" }} />
          <div className="flex items-center gap-6 ml-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => setActive(link)}
                style={{
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  color: active === link ? "#1B1BFF" : "#5A5A6A",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  transition: "color 180ms ease-out",
                }}
              >
                {link}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <button
              style={{
                fontFamily: "'Rethink Sans', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: 6,
                border: "none",
                background: "#1B1BFF",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              Schedule a call
            </button>
          </div>
        </nav>

        {/* Content area preview */}
        <div
          style={{
            background: "#FAFAFA",
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5A5A6A",
            }}
          >
            Active: {active}
          </p>
          <p
            style={{
              fontSize: 16,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 400,
              color: "#BABAC4",
              lineHeight: 1.6,
            }}
          >
            Page content loads here. Nav transitions: 180ms ease-out. Active link uses Electric Blue,
            no underline, no background highlight.
          </p>
        </div>
      </div>

      <div
        className="mt-4 px-5 py-4 rounded-[6px]"
        style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)" }}
      >
        <p
          style={{
            fontSize: 13,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            color: "#5A5A6A",
            lineHeight: 1.5,
          }}
        >
          On scroll: add{" "}
          <code
            style={{
              fontFamily: "monospace",
              background: "#E8E8FF",
              color: "#1B1BFF",
              padding: "1px 5px",
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            shadow-card
          </code>{" "}
          to the bar. Height fixed at 60px. Logo left-anchored. Primary CTA right-anchored.
        </p>
      </div>
    </section>
  );
}
