import logoLight from "../../imports/Artboard_1_300x.png";
import logoDark from "../../imports/Artboard_5_300x.png";
import patternFine from "../../imports/Artboard_1-1.svg?url";
import patternHero from "../../imports/Artboard_2-1.svg?url";
import patternCorner from "../../imports/Artboard_3-1.svg?url";
import patternTile from "../../imports/Artboard_4-1.svg?url";

export function BrandHero() {
  return (
    <section id="brand" className="mb-16">
      {/* Full-bleed hero */}
      <div
        className="relative w-full overflow-hidden flex flex-col justify-end"
        style={{
          background: "#0A0A0F",
          minHeight: 420,
        }}
      >
        {/* Fine scattered motif texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${patternFine})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        {/* Large brand chevron accent — right half */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${patternHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: 0.28,
          }}
        />
        {/* Gradient scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="relative z-10 px-10 pb-12 pt-16">
          <p
            className="mb-5"
            style={{
              fontSize: 12,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#01FF97",
            }}
          >
            Johnson Luke Design System — v1.0
          </p>
          <img
            src={logoDark}
            alt="Johnson Luke wordmark"
            style={{ width: "100%", maxWidth: 720, height: "auto", display: "block" }}
          />
          <p
            className="mt-6 max-w-xl"
            style={{
              fontSize: 16,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.64)",
            }}
          >
            A system of decisions — every token, component, and pattern must be
            explainable. Built for a brand operating at the intersection of
            strategy and design intelligence.
          </p>
        </div>
      </div>

      {/* Light logo strip */}
      <div
        className="relative w-full overflow-hidden flex items-center px-10 py-8 border-b"
        style={{ borderColor: "rgba(0,0,0,0.10)" }}
      >
        {/* Corner watermark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${patternCorner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
          }}
        />
        <img
          src={logoLight}
          alt="Johnson Luke wordmark light"
          style={{ width: "min(480px, 100%)", height: "auto", position: "relative", zIndex: 1 }}
        />
        <div
          className="ml-auto text-right"
          style={{
            fontSize: 12,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5A5A6A",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>Brand Relationship Design</div>
          <div style={{ color: "#1B1BFF" }}>johnson-luke.com</div>
        </div>
      </div>

      {/* Motif tile strip */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: 120,
          backgroundImage: `url(${patternTile})`,
          backgroundSize: "auto 120px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "left center",
          opacity: 0.18,
        }}
      />
    </section>
  );
}
