const F = "'Rethink Sans', sans-serif";

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const WORKSHOP = "1590103514966-5e2a11c13e21";
const WORKSHOP2 = "1532619675605-1ede6c2ed2b0";
const ARCH = "1483366774565-c783b9f70e2c";
const ARCH2 = "1549791084-5f78368b208b";

const ratios = [
  { name: "16:9", css: "16 / 9", w: 640, h: 360, id: ARCH, alt: "Concrete building seen from below", use: "Hero and case-study banners" },
  { name: "3:2", css: "3 / 2", w: 600, h: 400, id: WORKSHOP, alt: "Person writing on a whiteboard during a workshop", use: "Editorial and article images" },
  { name: "1:1", css: "1 / 1", w: 480, h: 480, id: ARCH2, alt: "White concrete building under a blue sky", use: "Grid thumbnails and team cards" },
  { name: "4:5", css: "4 / 5", w: 480, h: 600, id: WORKSHOP2, alt: "Facilitator standing beside a dry-erase board", use: "Portrait and mobile story crops" },
];

const label: React.CSSProperties = { fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" };

function Photo({ id, w, h, alt, fallback = "#EEEEFF", style, children }: {
  id: string; w: number; h: number; alt: string; fallback?: string; style?: React.CSSProperties; children?: React.ReactNode;
}) {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: fallback, borderRadius: 10, ...style }}>
      <img src={u(id, w, h)} alt={alt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {children}
    </div>
  );
}

function Cross() {
  return (
    <span
      aria-label="Don't"
      className="inline-flex items-center justify-center"
      style={{ width: 22, height: 22, borderRadius: 9999, background: "#DC2626", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: F }}
    >
      ✕
    </span>
  );
}

function Wrong({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-center mb-3" style={{ background: "#F4F4F6", borderRadius: 10, padding: 24, minHeight: 220, border: "1px solid #DC2626" }}>
        {children}
      </div>
      <div className="flex items-center gap-2">
        <Cross />
        <span style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#DC2626" }}>Don't: {title}</span>
      </div>
      <p className="mt-1" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{caption}</p>
    </div>
  );
}

export function PhotographyShowcase() {
  return (
    <section id="photography" className="mb-16">
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1B1BFF" }}>Brand Assets</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Photography</h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, fontWeight: 400, color: "#5A5A6A" }}>
        Four crops, one gradient treatment for text, and a short list of things we never do to an image.
      </p>

      <p className="mb-4" style={label}>Aspect ratios</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 items-end">
        {ratios.map((r) => (
          <div key={r.name}>
            <Photo id={r.id} w={r.w} h={r.h} alt={r.alt} style={{ aspectRatio: r.css, width: "100%" }} />
            <p className="mt-3" style={{ fontSize: 14, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{r.name}</p>
            <p style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>{r.use}</p>
          </div>
        ))}
      </div>

      <p className="mb-4" style={label}>Text overlay: directional gradient</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        <Photo id={ARCH} w={800} h={450} alt="Concrete building seen from below" style={{ aspectRatio: "16 / 9" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.80) 0%, rgba(10,10,15,0) 60%)" }} />
          <div style={{ position: "absolute", left: 24, bottom: 24, right: 24 }}>
            <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF" }}>Case study</p>
            <p style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>Redesigning the Halden operating model</p>
          </div>
        </Photo>
        <Photo id={WORKSHOP} w={800} h={450} alt="Person writing on a whiteboard during a workshop" style={{ aspectRatio: "16 / 9" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,15,0.80) 0%, rgba(10,10,15,0) 65%)" }} />
          <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF" }}>Workshop</p>
            <p style={{ fontSize: 20, fontFamily: F, fontWeight: 700, color: "#FFFFFF" }}>Phase 1 discovery sprint</p>
          </div>
        </Photo>
      </div>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Use <code style={{ fontFamily: "monospace", fontSize: 12 }}>linear-gradient(to top, rgba(10,10,15,0.8), transparent)</code> or <code style={{ fontFamily: "monospace", fontSize: 12 }}>to right</code>, only to keep text legible. Never apply a gradient to the whole image for decoration.
      </p>

      <p className="mb-4" style={label}>Caption style</p>
      <figure className="mb-10" style={{ maxWidth: 480 }}>
        <Photo id={WORKSHOP2} w={600} h={400} alt="Facilitator standing beside a dry-erase board" style={{ aspectRatio: "3 / 2" }} />
        <figcaption className="mt-2" style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
          Stakeholder alignment session, Meridian Group, March 2026. Photo: Kaleidico / Unsplash.
        </figcaption>
        <p className="mt-2" style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A" }}>12px Rethink Sans Regular, text-secondary, 8px below the image, left aligned.</p>
      </figure>

      <p className="mb-4" style={label}>Don't</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Wrong title="drop shadow" caption="Photos sit flat. Shadows on images add noise and break elevation rules.">
          <Photo id={ARCH2} w={360} h={240} alt="White concrete building under a blue sky" style={{ width: 180, aspectRatio: "3 / 2", boxShadow: "8px 12px 24px rgba(0,0,0,0.5)" }} />
        </Wrong>
        <Wrong title="circular crop" caption="Use the four set ratios with a 10px radius. Circles belong to avatars only.">
          <Photo id={WORKSHOP2} w={240} h={240} alt="Facilitator standing beside a dry-erase board" style={{ width: 150, aspectRatio: "1 / 1", borderRadius: 9999 }} />
        </Wrong>
        <Wrong title="image in a card in a card" caption="One container at most. Nesting frames and borders buries the photo.">
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 12 }}>
            <div style={{ background: "#F4F4F6", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 12 }}>
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.20)", borderRadius: 10, padding: 8 }}>
                <Photo id={ARCH} w={240} h={160} alt="Concrete building seen from below" style={{ width: 130, aspectRatio: "3 / 2" }} />
              </div>
            </div>
          </div>
        </Wrong>
      </div>
    </section>
  );
}
