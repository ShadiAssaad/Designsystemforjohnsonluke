import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isLast ? (
              <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>
                {item.label}
              </span>
            ) : (
              <>
                <span style={{ fontSize: 13, fontFamily: F, color: "#1B1BFF", cursor: "pointer" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 13, fontFamily: F, color: "#BABAC4", padding: "0 2px" }}>/</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function Pagination({
  total,
  perPage,
  current,
  onChange,
}: {
  total: number;
  perPage: number;
  current: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / perPage);
  const pages = getPages(current, totalPages);
  const from = (current - 1) * perPage + 1;
  const to = Math.min(current * perPage, total);

  const btnBase: React.CSSProperties = {
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    fontFamily: F,
    fontSize: 13,
    border: "1px solid rgba(0,0,0,0.10)",
    cursor: "pointer",
    outline: "none",
    transition: "background 120ms ease-out, color 120ms ease-out, border-color 120ms ease-out",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          style={{
            ...btnBase,
            color: current === 1 ? "#BABAC4" : "#5A5A6A",
            background: "#FFFFFF",
            cursor: current === 1 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft />
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: F, color: "#BABAC4" }}
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onChange(page as number)}
              style={{
                ...btnBase,
                background: current === page ? "#1B1BFF" : "#FFFFFF",
                color: current === page ? "#FFFFFF" : "#0A0A0F",
                borderColor: current === page ? "#1B1BFF" : "rgba(0,0,0,0.10)",
                fontWeight: current === page ? 700 : 400,
              }}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onChange(Math.min(totalPages, current + 1))}
          disabled={current === totalPages}
          style={{
            ...btnBase,
            color: current === totalPages ? "#BABAC4" : "#5A5A6A",
            background: "#FFFFFF",
            cursor: current === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <ChevronRight />
        </button>
      </div>
      <p style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>
        Showing {from}–{to} of {total} results
      </p>
    </div>
  );
}

export function PaginationBreadcrumbShowcase() {
  const [page1, setPage1] = useState(3);
  const [page2, setPage2] = useState(7);

  return (
    <section id="pagination" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Pagination & Breadcrumbs
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        34px page buttons, Electric Blue fill on active. Ellipsis auto-inserts on large page sets. Breadcrumbs use slash separator — last crumb is non-interactive.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Breadcrumbs */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Breadcrumbs
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Breadcrumbs items={[
              { label: "Home" },
              { label: "Projects" },
            ]} />
            <Breadcrumbs items={[
              { label: "Home" },
              { label: "Projects" },
              { label: "Johnson Luke — Q3 Brand Refresh" },
            ]} />
            <Breadcrumbs items={[
              { label: "Home" },
              { label: "Projects" },
              { label: "Johnson Luke — Q3 Brand Refresh" },
              { label: "Deliverables" },
            ]} />
            <Breadcrumbs items={[
              { label: "Home" },
              { label: "Projects" },
              { label: "Johnson Luke — Q3 Brand Refresh" },
              { label: "Deliverables" },
              { label: "Brand guidelines PDF" },
            ]} />
          </div>
        </div>

        {/* Pagination */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Pagination
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", marginBottom: 12 }}>Few pages</p>
              <Pagination total={42} perPage={10} current={page1} onChange={setPage1} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", marginBottom: 12 }}>Many pages — with ellipsis</p>
              <Pagination total={340} perPage={10} current={page2} onChange={setPage2} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Breadcrumbs always start from the root. Never truncate to "..." mid-path — shorten the label instead. Pagination must always show the current range ("Showing X–Y of Z"). Always include prev/next arrows for keyboard users.
        </p>
      </div>
    </section>
  );
}
