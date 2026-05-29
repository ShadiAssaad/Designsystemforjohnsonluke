export function DiagramShowcase() {
  return (
    <section id="diagrams" className="mb-16">
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
        Diagram / Framework Nodes
      </h2>

      <div
        className="p-8 rounded-[10px]"
        style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FAFAFA" }}
      >
        <p
          className="mb-6"
          style={{
            fontSize: 12,
            fontFamily: "'Rethink Sans', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5A5A6A",
          }}
        >
          Perception Engine — Simplified Framework
        </p>

        {/* Diagram canvas */}
        <div className="relative" style={{ minHeight: 340 }}>
          <svg
            width="100%"
            height="340"
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
          >
            {/* Connectors - orthogonal only */}
            {/* Brand Signal → Receptor */}
            <line x1="160" y1="60" x2="280" y2="60" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            <polygon points="278,55 286,60 278,65" fill="rgba(0,0,0,0.20)" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            {/* Receptor → Perception Gap */}
            <line x1="400" y1="75" x2="400" y2="140" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            <polygon points="395,138 400,148 405,138" fill="rgba(0,0,0,0.20)" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            {/* Perception Gap → Strategy Response */}
            <line x1="350" y1="175" x2="200" y2="220" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            <polygon points="202,214 196,222 204,224" fill="rgba(0,0,0,0.20)" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
            {/* Perception Gap → Brand Adjustment */}
            <line x1="450" y1="175" x2="560" y2="220" stroke="#1B1BFF" strokeWidth="1" />
            <polygon points="556,214 564,222 556,226" fill="#1B1BFF" stroke="#1B1BFF" strokeWidth="1" />
          </svg>

          {/* Group container */}
          <div
            style={{
              position: "absolute",
              top: 120,
              left: 240,
              width: 340,
              height: 200,
              border: "1px dashed rgba(0,0,0,0.20)",
              borderRadius: 10,
              background: "#F4F4F6",
            }}
          />
          <p
            style={{
              position: "absolute",
              top: 126,
              left: 252,
              fontSize: 11,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#5A5A6A",
            }}
          >
            Response cluster
          </p>

          {/* Standard node */}
          <Node top={40} left={20} label="Brand Signal" width={130} />

          {/* Primary node (featured) */}
          <Node top={40} left={280} label="Receptor" width={120} primary />

          {/* Standard nodes */}
          <Node top={150} left={330} label="Perception Gap" width={140} />
          <Node top={210} left={60} label="Strategy Response" width={150} />
          <Node top={210} left={430} label="Brand Adjustment" width={150} />

          {/* Output node */}
          <Node top={290} left={220} label="Realigned Brand" width={130} primary />
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 40,
                height: 28,
                borderRadius: 6,
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.20)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Standard node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 40,
                height: 28,
                borderRadius: 6,
                background: "#FFFFFF",
                border: "2px solid #1B1BFF",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Primary node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 40,
                height: 28,
                borderRadius: 10,
                background: "#F4F4F6",
                border: "1px dashed rgba(0,0,0,0.20)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Group container
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="40" height="12">
              <line x1="0" y1="6" x2="34" y2="6" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
              <polygon points="32,2 40,6 32,10" fill="rgba(0,0,0,0.20)" />
            </svg>
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Connector (stroke-only arrowhead)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="40" height="12">
              <line x1="0" y1="6" x2="34" y2="6" stroke="#1B1BFF" strokeWidth="1" />
              <polygon points="32,2 40,6 32,10" fill="#1B1BFF" />
            </svg>
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Rethink Sans', sans-serif",
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Featured connector
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Node({
  top,
  left,
  label,
  width = 120,
  primary = false,
}: {
  top: number;
  left: number;
  label: string;
  width?: number;
  primary?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        padding: "8px 12px",
        borderRadius: 6,
        background: "#FFFFFF",
        border: primary ? "2px solid #1B1BFF" : "1px solid rgba(0,0,0,0.20)",
        fontSize: 13,
        fontFamily: "'Rethink Sans', sans-serif",
        fontWeight: primary ? 700 : 400,
        color: "#0A0A0F",
        lineHeight: 1.3,
        textAlign: "center" as const,
        zIndex: 1,
      }}
    >
      {label}
    </div>
  );
}
