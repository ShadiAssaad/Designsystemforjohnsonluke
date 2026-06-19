import { useState, useRef, useEffect } from "react";

const F = "'Rethink Sans', sans-serif";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function ChevLeft() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function ChevRight() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ── Calendar popup ────────────────────────────────────────────────────────────

function CalendarPopup({
  selected,
  onSelect,
  rangeStart,
  rangeEnd,
  onHover,
  hovering,
}: {
  selected?: Date | null;
  onSelect: (d: Date) => void;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onHover?: (d: Date | null) => void;
  hovering?: Date | null;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells = buildCalendarCells(viewYear, viewMonth);

  function isInRange(d: Date) {
    const start = rangeStart;
    const end = rangeEnd ?? hovering;
    if (!start || !end) return false;
    const lo = start < end ? start : end;
    const hi = start < end ? end : start;
    return d > lo && d < hi;
  }

  function isRangeEdge(d: Date) {
    return (rangeStart && d.toDateString() === rangeStart.toDateString()) ||
           (rangeEnd && d.toDateString() === rangeEnd.toDateString()) ||
           (selected && d.toDateString() === selected.toDateString());
  }

  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
      padding: "16px", minWidth: 264,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={prevMonth} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F4F6", border: "none", borderRadius: 6, cursor: "pointer", color: "#5A5A6A" }}>
          <ChevLeft />
        </button>
        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#0A0A0F" }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F4F6", border: "none", borderRadius: 6, cursor: "pointer", color: "#5A5A6A" }}>
          <ChevRight />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontFamily: F, fontWeight: 700, color: "#BABAC4", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const thisDate = new Date(viewYear, viewMonth, day);
          const edge = isRangeEdge(thisDate);
          const inRange = isInRange(thisDate);
          const isToday = today.toDateString() === thisDate.toDateString();
          return (
            <button
              key={i}
              onClick={() => onSelect(thisDate)}
              onMouseEnter={() => onHover?.(thisDate)}
              onMouseLeave={() => onHover?.(null)}
              style={{
                width: "100%", aspectRatio: "1",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, border: "none",
                background: edge ? "#0000FF" : inRange ? "#EEEEFF" : "transparent",
                color: edge ? "#FFFFFF" : isToday ? "#0000FF" : "#0A0A0F",
                fontFamily: F, fontSize: 13,
                fontWeight: edge || isToday ? 700 : 400,
                cursor: "pointer",
                outline: isToday && !edge ? "1.5px solid rgba(27,27,255,0.4)" : "none",
                outlineOffset: -1,
                transition: "background 100ms ease-out",
              }}
              onMouseOver={e => { if (!edge) e.currentTarget.style.background = inRange ? "#DDDEFF" : "#F4F4F6"; }}
              onMouseOut={e => { e.currentTarget.style.background = edge ? "#0000FF" : inRange ? "#EEEEFF" : "transparent"; }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Single date picker ────────────────────────────────────────────────────────

function DatePicker({ label, placeholder = "Select a date" }: { label: string; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 6 }}>{label}</p>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "10px 14px",
          background: "#FFFFFF", border: `1.5px solid ${open ? "#0000FF" : "rgba(0,0,0,0.12)"}`,
          borderRadius: 8, cursor: "pointer", outline: "none",
          transition: "border-color 150ms ease-out",
        }}
      >
        <span style={{ fontFamily: F, fontSize: 14, color: selected ? "#0A0A0F" : "#BABAC4" }}>
          {selected ? formatDate(selected) : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke={open ? "#0000FF" : "#BABAC4"} strokeWidth="1.4"/>
          <path d="M5 1v3M11 1v3M2 7h12" stroke={open ? "#0000FF" : "#BABAC4"} strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50 }}>
          <CalendarPopup
            selected={selected}
            onSelect={(d) => { setSelected(d); setOpen(false); }}
          />
          {selected && (
            <div style={{ background: "#FFFFFF", padding: "8px 16px", borderRadius: "0 0 10px 10px", border: "1px solid rgba(0,0,0,0.10)", borderTop: "none" }}>
              <button onClick={() => { setSelected(null); setOpen(false); }} style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Clear date
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Date range picker ─────────────────────────────────────────────────────────

function DateRangePicker() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [hovering, setHovering] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState<"start" | "end">("start");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function handleSelect(d: Date) {
    if (picking === "start") {
      setStart(d); setEnd(null); setPicking("end");
    } else {
      if (start && d < start) { setEnd(start); setStart(d); }
      else setEnd(d);
      setOpen(false);
      setPicking("start");
    }
  }

  function displayStart() {
    if (start) return formatDate(start);
    return open && picking === "start" ? "Pick start…" : "Start date";
  }
  function displayEnd() {
    if (end) return formatDate(end);
    return open && picking === "end" ? "Pick end…" : "End date";
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 6 }}>Date range</p>
      <div
        onClick={() => { setOpen(true); if (!start) setPicking("start"); else if (!end) setPicking("end"); }}
        style={{
          display: "flex", alignItems: "center",
          background: "#FFFFFF", border: `1.5px solid ${open ? "#0000FF" : "rgba(0,0,0,0.12)"}`,
          borderRadius: 8, overflow: "hidden", cursor: "pointer",
          transition: "border-color 150ms ease-out",
        }}
      >
        <div style={{ flex: 1, padding: "10px 14px", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
          <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", marginBottom: 1 }}>From</p>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: start ? 700 : 400, color: start ? "#0A0A0F" : "#BABAC4" }}>{displayStart()}</p>
        </div>
        <div style={{ flex: 1, padding: "10px 14px" }}>
          <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", marginBottom: 1 }}>To</p>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: end ? 700 : 400, color: end ? "#0A0A0F" : "#BABAC4" }}>{displayEnd()}</p>
        </div>
        <div style={{ padding: "0 14px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="1.5" stroke={open ? "#0000FF" : "#BABAC4"} strokeWidth="1.4"/>
            <path d="M5 1v3M11 1v3M2 7h12" stroke={open ? "#0000FF" : "#BABAC4"} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      {open && picking && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50 }}>
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: picking === "start" ? "#0000FF" : "#BABAC4", background: "#FFFFFF", padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(0,0,0,0.10)" }}>
              {picking === "start" ? "Select start date" : "Select end date"}
            </span>
          </div>
          <CalendarPopup
            rangeStart={start}
            rangeEnd={end}
            hovering={hovering}
            onHover={setHovering}
            onSelect={handleSelect}
          />
          {(start || end) && (
            <div style={{ background: "#FFFFFF", padding: "8px 16px", borderRadius: "0 0 10px 10px", border: "1px solid rgba(0,0,0,0.10)", borderTop: "none" }}>
              <button onClick={() => { setStart(null); setEnd(null); setPicking("start"); setOpen(false); }} style={{ fontFamily: F, fontSize: 12, color: "#5A5A6A", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Clear range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── File type badge ───────────────────────────────────────────────────────────

const FILE_TYPES: Record<string, { color: string; bg: string }> = {
  pdf:  { color: "#E8334A", bg: "#FFF0F0" },
  jpg:  { color: "#0000FF", bg: "#EEEEFF" },
  png:  { color: "#0000FF", bg: "#EEEEFF" },
  svg:  { color: "#DC0073", bg: "#FFE8F3" },
  docx: { color: "#0000FF", bg: "#EEEEFF" },
  doc:  { color: "#0000FF", bg: "#EEEEFF" },
  xlsx: { color: "#00A864", bg: "#D1FAE5" },
  xls:  { color: "#00A864", bg: "#D1FAE5" },
  mp4:  { color: "#7340FF", bg: "#EDE8FF" },
  zip:  { color: "#5A5A6A", bg: "#F4F4F6" },
  fig:  { color: "#DC0073", bg: "#FFE8F3" },
};

function FileTypeBadge({ ext, size = 40 }: { ext: string; size?: number }) {
  const key = ext.toLowerCase().replace(".", "");
  const style = FILE_TYPES[key] ?? { color: "#BABAC4", bg: "#F4F4F6" };
  const label = key.toUpperCase().slice(0, 3);
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.2,
      background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <span style={{ fontSize: size * 0.265, fontFamily: F, fontWeight: 700, color: style.color, letterSpacing: "0.02em" }}>{label}</span>
    </div>
  );
}

// ── Drop zone ─────────────────────────────────────────────────────────────────

function DropZone() {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); }}
      style={{
        border: `2px dashed ${dragging ? "#0000FF" : "rgba(0,0,0,0.15)"}`,
        borderRadius: 10, padding: "40px 24px",
        background: dragging ? "#EEEEFF" : "#FAFAFA",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        cursor: "pointer",
        transition: "border-color 150ms ease-out, background 150ms ease-out",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: dragging ? "#0000FF" : "#F4F4F6",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 150ms ease-out",
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 14V5M8 8l3-3 3 3" stroke={dragging ? "#FFFFFF" : "#5A5A6A"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" stroke={dragging ? "#FFFFFF" : "#5A5A6A"} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: dragging ? "#0000FF" : "#0A0A0F", marginBottom: 4 }}>
          {dragging ? "Drop to upload" : "Drag files here"}
        </p>
        <p style={{ fontFamily: F, fontSize: 13, color: "#5A5A6A" }}>
          or <span style={{ color: "#0000FF", textDecoration: "underline", cursor: "pointer" }}>browse from your computer</span>
        </p>
      </div>
      <p style={{ fontFamily: F, fontSize: 11, color: "#BABAC4", textAlign: "center" }}>
        PDF, DOCX, XLSX, PNG, JPG, SVG · max 25 MB per file
      </p>
    </div>
  );
}

// ── File state rows ───────────────────────────────────────────────────────────

type FileStatus = "uploading" | "error" | "complete";

interface FileEntry {
  name: string;
  ext: string;
  size: number;
  status: FileStatus;
  progress?: number;
  error?: string;
}

function FileRow({ file }: { file: FileEntry }) {
  const isError = file.status === "error";
  const isDone = file.status === "complete";
  const isUploading = file.status === "uploading";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
      background: isError ? "#FFF8F8" : "#FFFFFF",
      borderRadius: 8,
      border: `1px solid ${isError ? "rgba(232,51,74,0.18)" : "rgba(0,0,0,0.08)"}`,
    }}>
      <FileTypeBadge ext={file.ext} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: isUploading ? 6 : 2 }}>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </p>
          <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", flexShrink: 0 }}>{formatBytes(file.size)}</span>
        </div>

        {isUploading && (
          <>
            <div style={{ height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 9999, overflow: "hidden", marginBottom: 4 }}>
              <div style={{ width: `${file.progress}%`, height: "100%", background: "#0000FF", borderRadius: "inherit", transition: "width 400ms ease-out" }} />
            </div>
            <p style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>{file.progress}% uploaded…</p>
          </>
        )}
        {isError && (
          <p style={{ fontSize: 12, fontFamily: F, color: "#E8334A" }}>{file.error}</p>
        )}
        {isDone && (
          <p style={{ fontSize: 12, fontFamily: F, color: "#00A864" }}>Upload complete</p>
        )}
      </div>

      {/* Action icon */}
      {isUploading && (
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#BABAC4", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {isError && (
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 5.5v4M8 11.5h.01" stroke="#E8334A" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 13L8 2l6 11H2z" stroke="#E8334A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {isDone && (
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="#00A864" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// ── Live upload demo ──────────────────────────────────────────────────────────

function LiveUploadDemo() {
  const [progress, setProgress] = useState(24);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setDone(true); clearInterval(t); return 100; }
        return p + 3;
      });
    }, 180);
    return () => clearInterval(t);
  }, [done]);

  function reset() { setProgress(0); setDone(false); }

  const file: FileEntry = done
    ? { name: "Brand_Audit_v2.pdf", ext: "pdf", size: 4200000, status: "complete" }
    : { name: "Brand_Audit_v2.pdf", ext: "pdf", size: 4200000, status: "uploading", progress };

  return (
    <div>
      <FileRow file={file} />
      {done && (
        <button onClick={reset} style={{ marginTop: 8, fontFamily: F, fontSize: 12, color: "#0000FF", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          ↺ Replay animation
        </button>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

const staticFiles: FileEntry[] = [
  { name: "Competitor_Analysis.xlsx", ext: "xlsx", size: 1100000, status: "complete" },
  { name: "Identity_System_v3.fig",   ext: "fig",  size: 8900000, status: "complete" },
  { name: "Campaign_Visuals.zip",     ext: "zip",  size: 22000000, status: "error", error: "File exceeds 25 MB limit — compress before uploading." },
  { name: "Moodboard.png",            ext: "png",  size: 6400000, status: "error", error: "Upload failed. Check your connection and try again." },
  { name: "Project_Brief.docx",       ext: "docx", size: 245000, status: "complete" },
  { name: "Logo_Primary.svg",         ext: "svg",  size: 48000, status: "complete" },
];

export function FileInputShowcase() {
  return (
    <section id="fileinput" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Date & File Inputs
      </h2>
      <p className="mb-10" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Date pickers, date range selection, drag-and-drop upload zone, and all file upload states with file type indication.
      </p>

      {/* Date pickers */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Date pickers</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "visible", position: "relative", zIndex: 20 }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Single date</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <DatePicker label="Project start date" />
            <DatePicker label="Deadline" placeholder="No deadline set" />
          </div>
        </div>
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "visible", position: "relative", zIndex: 10 }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Date range</p>
          <DateRangePicker />
          <p className="mt-5" style={{ fontSize: 12, fontFamily: F, color: "#BABAC4", lineHeight: 1.5 }}>Click to select start, then end. Range highlights as you hover.
          </p>
        </div>
      </div>

      {/* Drop zone */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>File upload area</p>
      <div className="p-8 rounded-[10px] mb-8" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <DropZone />
      </div>

      {/* Upload states */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Upload states</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Live uploading */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Uploading → complete</p>
          <LiveUploadDemo />
        </div>

        {/* Error */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-5" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Error states</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <FileRow file={{ name: "Campaign_Visuals.zip", ext: "zip", size: 22000000, status: "error", error: "File exceeds 25 MB limit." }} />
            <FileRow file={{ name: "Moodboard_Final.png", ext: "png", size: 18400000, status: "error", error: "Upload failed — check your connection." }} />
          </div>
        </div>
      </div>

      {/* File type reference */}
      <p className="mb-3" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>Complete — file type indication</p>
      <div className="p-8 rounded-[10px] mb-6" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {staticFiles.filter(f => f.status === "complete").map(f => (
            <FileRow key={f.name} file={f} />
          ))}
        </div>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <p className="mb-3" style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#BABAC4" }}>File type colour key</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.entries({ pdf: "pdf", docx: "docx", xlsx: "xlsx", png: "png", svg: "svg", fig: "fig", zip: "zip", mp4: "mp4" }).map(([ext]) => (
              <div key={ext} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FileTypeBadge ext={ext} size={28} />
                <span style={{ fontSize: 11, fontFamily: F, color: "#5A5A6A" }}>{ext.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Date pickers open below the input and close on outside click — never inline by default. File types carry consistent colour: blue for office docs, red for PDF, green for spreadsheets, pink for design files. Error messages sit directly under the filename — never in a toast. Progress bar disappears and is replaced by a green checkmark on completion.
        </p>
      </div>
    </section>
  );
}
