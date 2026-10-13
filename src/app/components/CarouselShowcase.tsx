import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const F = "'Rethink Sans', sans-serif";
const u = (id: string, w: number, h: number) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const slides = [
  { id: "1715593949273-09009558300a", alt: "Bright studio desk and chair in a modern office", cap: "Meridian Bank — new regional workspace", bg: "#0A0A0F" },
  { id: "1706074793638-da28b90ea8ae", alt: "Large conference room with a long table and chairs", cap: "Kestrel Energy — executive alignment room", bg: "#5A5A6A" },
  { id: "1631193816258-28b44b21e78b", alt: "Open plan office with rows of desks under linear lights", cap: "Atlas Health — operations floor redesign", bg: "#8A8A9A" },
  { id: "1532622785990-d2c36a76f5a6", alt: "Two people drawing on a whiteboard during a workshop", cap: "Northwind — discovery workshop, week 2", bg: "#0A0A0F" },
];
const gallery = [
  { id: "1532619187608-e5375cab36aa", alt: "Facilitator drawing on a dry-erase board", cap: "Workshop facilitation" },
  { id: "1681949287382-052ea3954a51", alt: "Group meeting in a sunlit office", cap: "Stakeholder session" },
  { id: "1542744094-24638eff58bb", alt: "Strategist writing on a whiteboard", cap: "Strategy mapping" },
];

function Img({ id, w, h, alt, bg }: { id: string; w: number; h: number; alt: string; bg: string }) {
  return <img src={u(id, w, h)} alt={alt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", background: bg }} />;
}

export function CarouselShowcase() {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (d: number) => setI((i + d + n) % n);
  const nav = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: 6, border: "1px solid rgba(255,255,255,0.12)", background: "#0A0A0F", color: "#FFFFFF", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" } as const;

  return (
    <section id="carousel" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Media</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Carousel and gallery</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Full-bleed 16:9 case-study carousel with captions, and a three-column gallery grid.</p>

      <div role="region" aria-roledescription="carousel" aria-label="Case study images" style={{ fontFamily: F }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", background: slides[i].bg }}
          onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }} tabIndex={0}>
          <Img key={slides[i].id} id={slides[i].id} w={1600} h={900} alt={slides[i].alt} bg={slides[i].bg} />
          {/* Directional overlay for legibility of the counter only */}
          <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30%", background: "linear-gradient(to top, rgba(10,10,15,0.65), rgba(10,10,15,0))" }} />
          <span style={{ position: "absolute", left: 24, bottom: 16, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF" }}>
            Case study {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <button aria-label="Previous image" onClick={() => go(-1)} style={{ ...nav, left: 16 }}><ChevronLeft size={20} /></button>
          <button aria-label="Next image" onClick={() => go(1)} style={{ ...nav, right: 16 }}><ChevronRight size={20} /></button>
        </div>
        <div className="flex items-center justify-between mt-3 gap-4">
          <p style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }} aria-live="polite">{slides[i].cap}</p>
          <div className="flex gap-2" role="tablist" aria-label="Choose image">
            {slides.map((s, k) => (
              <button key={s.id} role="tab" aria-selected={k === i} aria-label={`Image ${k + 1}`} onClick={() => setI(k)}
                style={{ width: 10, height: 10, borderRadius: 9999, padding: 0, cursor: "pointer", border: k === i ? "1px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)", background: k === i ? "#1B1BFF" : "#FFFFFF" }} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-12 mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>Gallery grid</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery.map((g) => (
          <figure key={g.id} style={{ margin: 0 }}>
            <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "#F4F4F6" }}>
              <Img id={g.id} w={800} h={600} alt={g.alt} bg="#F4F4F6" />
            </div>
            <figcaption style={{ fontFamily: F, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginTop: 8 }}>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
