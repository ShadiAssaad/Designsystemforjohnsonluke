import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

type SortKey = "client" | "project" | "phase" | "budget" | "status" | "due";
type SortDir = "asc" | "desc";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#E8E8FF", color: "#1B1BFF" },
  Review: { bg: "#FEF3C7", color: "#92400E" },
  Complete: { bg: "#D1FAE5", color: "#065F46" },
  "On Hold": { bg: "#F4F4F6", color: "#5A5A6A" },
};

const rows = [
  { id: 1, client: "Beacon Systems", project: "Identity Refresh", phase: "Discovery", budget: "£38k", status: "Active", due: "Jun 14" },
  { id: 2, client: "Fortis Realty", project: "Positioning & Messaging", phase: "Delivery", budget: "£22k", status: "Review", due: "May 31" },
  { id: 3, client: "Luminal Health", project: "Brand System", phase: "Complete", budget: "£64k", status: "Complete", due: "May 12" },
  { id: 4, client: "Crane & Co.", project: "Environmental Design", phase: "Scoping", budget: "£19k", status: "On Hold", due: "Jul 3" },
  { id: 5, client: "Varda Finance", project: "Campaign Identity", phase: "Refinement", budget: "£45k", status: "Active", due: "Jun 28" },
  { id: 6, client: "Noor Studio", project: "Rebranding", phase: "Discovery", budget: "£31k", status: "Active", due: "Jul 19" },
];

function SortIcon({ dir, active }: { dir: SortDir; active: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: active ? 1 : 0.3 }}>
      {dir === "asc" || !active ? (
        <path d="M5 2L8 6H2L5 2Z" fill={active && dir === "asc" ? "#1B1BFF" : "#5A5A6A"} />
      ) : null}
      {dir === "desc" || !active ? (
        <path d="M5 8L2 4H8L5 8Z" fill={active && dir === "desc" ? "#1B1BFF" : "#5A5A6A"} />
      ) : null}
      {!active && (
        <>
          <path d="M5 2L8 5H2L5 2Z" fill="#BABAC4" />
          <path d="M5 8L2 5H8L5 8Z" fill="#BABAC4" />
        </>
      )}
    </svg>
  );
}

export function TableShowcase() {
  const [sortKey, setSortKey] = useState<SortKey>("client");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [hovered, setHovered] = useState<number | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...rows].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const allSelected = selected.size === rows.length;
  const someSelected = selected.size > 0 && selected.size < rows.length;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map(r => r.id)));
    }
  }

  function toggleRow(id: number) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const cols: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "client", label: "Client" },
    { key: "project", label: "Project" },
    { key: "phase", label: "Phase" },
    { key: "budget", label: "Budget", align: "right" },
    { key: "status", label: "Status" },
    { key: "due", label: "Due" },
  ];

  return (
    <section id="tables" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Tables
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Sortable columns, row selection, status badges. Header row is sticky on scroll. Hover state on rows.
      </p>

      <div className="rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: selected.size > 0 ? "#EEEEFF" : "#FAFAFA",
          transition: "background 180ms ease-out",
        }}>
          {selected.size > 0 ? (
            <>
              <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#1B1BFF" }}>
                {selected.size} selected
              </span>
              <div style={{ width: 1, height: 16, background: "rgba(27,27,255,0.2)" }} />
              <button
                onClick={() => setSelected(new Set())}
                style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Clear
              </button>
              <button
                style={{ fontSize: 13, fontFamily: F, color: "#E8334A", background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: "auto" }}
              >
                Archive selected
              </button>
            </>
          ) : (
            <span style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A" }}>
              {rows.length} projects
            </span>
          )}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr style={{ background: "#FAFAFA", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <th style={{ width: 44, padding: "12px 0 12px 20px" }}>
                  {/* Select all checkbox */}
                  <div
                    onClick={toggleAll}
                    style={{
                      width: 16, height: 16, borderRadius: 3, cursor: "pointer",
                      border: `1.5px solid ${allSelected || someSelected ? "#1B1BFF" : "rgba(0,0,0,0.22)"}`,
                      background: allSelected ? "#1B1BFF" : "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {allSelected && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {someSelected && !allSelected && (
                      <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                        <path d="M1 1h6" stroke="#1B1BFF" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </th>
                {cols.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      padding: "12px 16px 12px 0",
                      textAlign: col.align || "left",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        fontSize: 11, fontFamily: F, fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        color: sortKey === col.key ? "#1B1BFF" : "#5A5A6A",
                      }}>
                        {col.label}
                      </span>
                      <SortIcon
                        dir={sortKey === col.key ? sortDir : "asc"}
                        active={sortKey === col.key}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const isSelected = selected.has(row.id);
                const isHovered = hovered === row.id;
                const statusStyle = STATUS_COLORS[row.status];
                return (
                  <tr
                    key={row.id}
                    onMouseEnter={() => setHovered(row.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      borderBottom: i < sorted.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                      background: isSelected ? "#F5F5FF" : isHovered ? "#FAFAFA" : "#FFFFFF",
                      transition: "background 100ms ease-out",
                    }}
                  >
                    <td style={{ padding: "14px 0 14px 20px" }}>
                      <div
                        onClick={() => toggleRow(row.id)}
                        style={{
                          width: 16, height: 16, borderRadius: 3, cursor: "pointer",
                          border: `1.5px solid ${isSelected ? "#1B1BFF" : "rgba(0,0,0,0.22)"}`,
                          background: isSelected ? "#1B1BFF" : "#FFFFFF",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px 14px 0" }}>
                      <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{row.client}</span>
                    </td>
                    <td style={{ padding: "14px 16px 14px 0" }}>
                      <span style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A" }}>{row.project}</span>
                    </td>
                    <td style={{ padding: "14px 16px 14px 0" }}>
                      <span style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A" }}>{row.phase}</span>
                    </td>
                    <td style={{ padding: "14px 16px 14px 0", textAlign: "right" }}>
                      <span style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>{row.budget}</span>
                    </td>
                    <td style={{ padding: "14px 16px 14px 0" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "3px 8px", borderRadius: 4,
                        fontSize: 11, fontFamily: F, fontWeight: 700,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        background: statusStyle.bg, color: statusStyle.color,
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px 14px 0" }}>
                      <span style={{ fontSize: 13, fontFamily: F, color: "#5A5A6A" }}>{row.due}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#FAFAFA",
        }}>
          <span style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>
            Showing {rows.length} of {rows.length} projects
          </span>
          <span style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>
            Sorted by {cols.find(c => c.key === sortKey)?.label} ({sortDir})
          </span>
        </div>
      </div>

      <div className="mt-4 px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Column headers are always clickable and show sort state. Selection triggers a contextual toolbar — not a floating action bar. Status badges use semantic colour, never just text.
        </p>
      </div>
    </section>
  );
}
