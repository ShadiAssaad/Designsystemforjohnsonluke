const F = "'Rethink Sans', sans-serif";

function Labelled({ text, dark }: { text: string; dark?: boolean }) {
  const line = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  return (
    <div role="separator" aria-label={text} className="flex items-center gap-4" style={{ fontFamily: F }}>
      <span style={{ flex: 1, height: 1, background: line }} />
      <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "#8A8A9A" : "#5A5A6A" }}>{text}</span>
      <span style={{ flex: 1, height: 1, background: line }} />
    </div>
  );
}

const panel = { background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: 24, fontFamily: F } as const;
const Label = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "#8A8A9A" : "#5A5A6A", marginBottom: 12 }}>{children}</p>
);
const body = (dark?: boolean) => ({ fontSize: 14, color: dark ? "#FFFFFF" : "#0A0A0F", lineHeight: 1.5 } as const);

export function DividerShowcase() {
  return (
    <section id="dividers" className="mb-16">
      <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 8 }}>Layout</p>
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>Dividers</h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>Horizontal, vertical and labelled dividers on light and dark surfaces.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div style={panel}>
          <Label>Horizontal</Label>
          <p style={body()}>Discovery and research</p>
          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.10)", margin: "16px 0" }} />
          <p style={body()}>Strategy and positioning</p>
          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.20)", margin: "16px 0" }} />
          <p style={body()}>Strong divider separates major groups</p>
        </div>

        <div style={panel}>
          <Label>Vertical</Label>
          <div className="flex items-stretch gap-4" style={{ height: 48 }}>
            {[["38", "Engagements"], ["12", "Active phases"], ["94%", "Retention"]].map(([v, l], i) => (
              <div key={l} className="flex items-stretch gap-4">
                {i > 0 && <span role="separator" aria-orientation="vertical" style={{ width: 1, background: "rgba(0,0,0,0.10)" }} />}
                <div className="flex flex-col justify-center">
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#0A0A0F", lineHeight: 1.1 }}>{v}</span>
                  <span style={{ fontSize: 12, color: "#5A5A6A" }}>{l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={panel}>
          <Label>With centred label</Label>
          <p style={body()}>Sign in with your studio account</p>
          <div style={{ margin: "16px 0" }}><Labelled text="or" /></div>
          <p style={body()}>Continue as a client guest</p>
          <div style={{ margin: "16px 0" }}><Labelled text="Phase 2 · Strategy" /></div>
          <p style={body()}>Positioning workshop outputs</p>
        </div>

        <div style={{ background: "#0A0A0F", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 24, fontFamily: F }}>
          <Label dark>On dark surface</Label>
          <p style={body(true)}>Executive summary</p>
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "16px 0" }} />
          <div className="flex items-center gap-4" style={{ height: 24 }}>
            <span style={body(true)}>Brief</span>
            <span role="separator" aria-orientation="vertical" style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.12)" }} />
            <span style={body(true)}>Scope</span>
            <span role="separator" aria-orientation="vertical" style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.12)" }} />
            <span style={body(true)}>Budget</span>
          </div>
          <div style={{ margin: "16px 0" }}><Labelled text="Next steps" dark /></div>
          <p style={{ ...body(true), color: "#8A8A9A" }}>Confirm workshop dates with the client.</p>
        </div>
      </div>
    </section>
  );
}
