import logoLight from "../../imports/Artboard_1_300x.png";
import logoDark from "../../imports/Artboard_5_300x.png";

const F = "'Rethink Sans', sans-serif";

// Artboard_1 is the full-colour wordmark with near-black type (light surfaces).
// Artboard_5 is the reversed wordmark with white type and green mark (dark and blue surfaces).
// Its aspect ratio is ~4.73:1 (8000x1690 original).
const RATIO = 8001 / 1690;

const label: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function Logo({ src, w, style }: { src: string; w: number; style?: React.CSSProperties }) {
  return <img src={src} alt="Johnson Luke" style={{ width: w, height: "auto", display: "block", ...style }} />;
}

function Panel({ bg, caption, src, border = "rgba(0,0,0,0.10)" }: { bg: string; caption: string; src: string; border?: string }) {
  return (
    <div>
      <div className="flex items-center justify-center mb-3" style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, height: 160 }}>
        <Logo src={src} w={200} />
      </div>
      <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{caption}</p>
    </div>
  );
}

function Misuse({ title, caption, bg = "#FFFFFF", children }: { title: string; caption: string; bg?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-center mb-3" style={{ background: bg, border: "1px solid #DC2626", borderRadius: 10, height: 140, overflow: "hidden", position: "relative" }}>
        {children}
      </div>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex items-center justify-center"
          style={{ width: 22, height: 22, borderRadius: 9999, background: "#DC2626", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: F }}
        >
          ✕
        </span>
        <span style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#DC2626" }}>Don't: {title}</span>
      </div>
      <p className="mt-1" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{caption}</p>
    </div>
  );
}

export function LogoUsageShowcase() {
  const clearW = 280;
  const clearH = clearW / RATIO;
  const x = clearH * 0.5; // clear space unit: half the wordmark height

  return (
    <section id="logousage" className="mb-16">
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B1BFF" }}>Brand Assets</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Logo Usage</h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A" }}>
        One wordmark, two versions: full colour on light, reversed on blue and near black.
      </p>

      <p className="mb-4" style={label}>Approved surfaces</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Panel bg="#FFFFFF" src={logoLight} caption="On white or Off White, use the full-colour wordmark (Artboard_1)." />
        <Panel bg="#1B1BFF" src={logoDark} border="#1B1BFF" caption="On Electric Blue, use the reversed wordmark (Artboard_5). Its white type and green mark sit directly on the blue." />
        <Panel bg="#0A0A0F" src={logoDark} border="#0A0A0F" caption="On Near Black, use the reversed wordmark (Artboard_5)." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div>
          <p className="mb-4" style={label}>Clear space</p>
          <div className="flex items-center justify-center" style={{ background: "#F4F4F6", borderRadius: 10, padding: 24 }}>
            <div style={{ position: "relative", padding: x, border: "1px dashed #1B1BFF", background: "#FFFFFF" }}>
              <Logo src={logoLight} w={clearW} />
              {[
                { top: 0, left: "50%", width: 0, height: x, tx: "-50%" },
                { bottom: 0, left: "50%", width: 0, height: x, tx: "-50%" },
              ].map((m, i) => (
                <span key={i} aria-hidden style={{ position: "absolute", top: m.top, bottom: m.bottom, left: m.left, height: m.height, width: 1, background: "#1B1BFF" }} />
              ))}
              {[{ left: 0 }, { right: 0 }].map((m, i) => (
                <span key={i} aria-hidden style={{ position: "absolute", top: "50%", ...m, width: x, height: 1, background: "#1B1BFF" }} />
              ))}
              <span style={{ position: "absolute", top: 4, left: "50%", marginLeft: 6, fontSize: 12, fontFamily: F, fontWeight: 700, color: "#1B1BFF" }}>x</span>
            </div>
          </div>
          <p className="mt-3" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
            Keep a margin of x on all sides, where x is half the height of the wordmark. No text, edges or imagery inside it.
          </p>
        </div>

        <div>
          <p className="mb-4" style={label}>Minimum size</p>
          <div className="flex items-end gap-10" style={{ background: "#F4F4F6", borderRadius: 10, padding: 24, minHeight: 154 }}>
            <div>
              <Logo src={logoLight} w={120} />
              <p className="mt-2" style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>Digital: 120px wide</p>
            </div>
            <div>
              <Logo src={logoLight} w={80} />
              <p className="mt-2" style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>Print: 30mm wide</p>
            </div>
          </div>
          <p className="mt-3" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
            Below these widths the wordmark loses legibility. Use the standalone mark instead.
          </p>
        </div>
      </div>

      <p className="mb-4" style={label}>Misuse</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Misuse title="stretch" caption="Never change the proportions. Scale uniformly.">
          <img src={logoLight} alt="Johnson Luke wordmark, stretched" style={{ width: 160, height: 90 }} />
        </Misuse>
        <Misuse title="recolour" caption="Never change the logo colours outside the two approved versions.">
          <Logo src={logoLight} w={160} style={{ filter: "hue-rotate(160deg) saturate(2)" }} />
        </Misuse>
        <Misuse title="effects" caption="No shadows, glows, outlines or bevels.">
          <Logo src={logoLight} w={160} style={{ filter: "drop-shadow(4px 6px 3px rgba(0,0,0,0.6)) drop-shadow(0 0 8px #01FF97)", transform: "rotate(-6deg)" }} />
        </Misuse>
        <Misuse title="busy background" caption="Place the logo on flat colour or a calm image area, never over patterns.">
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, #1B1BFF 0 10px, #01FF97 10px 20px, #0A0A0F 20px 30px)" }} />
          <Logo src={logoLight} w={160} style={{ position: "relative" }} />
        </Misuse>
      </div>
    </section>
  );
}
