import { useState } from "react";

const F = "'Rethink Sans', sans-serif";

type NotifType = "project" | "mention" | "deadline" | "system";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const TYPE_DOT: Record<NotifType, string> = {
  project: "#0000FF",
  mention: "#01FF97",
  deadline: "#E8334A",
  system: "#BABAC4",
};

const TYPE_LABEL: Record<NotifType, string> = {
  project: "Project",
  mention: "Mention",
  deadline: "Deadline",
  system: "System",
};

const initialNotifs: Notification[] = [
  {
    id: 1, type: "deadline", read: false,
    title: "Brief due in 2 days",
    body: "Fortis Realty — Positioning & Messaging brief must be delivered by May 31.",
    time: "10m ago",
  },
  {
    id: 2, type: "mention", read: false,
    title: "Marcus Reid mentioned you",
    body: "\"Anya, can you review the audit draft before we share with the client?\"",
    time: "1h ago",
  },
  {
    id: 3, type: "project", read: false,
    title: "New project assigned",
    body: "You've been added as Brand Strategist on Noor Studio — Rebranding.",
    time: "3h ago",
  },
  {
    id: 4, type: "system", read: true,
    title: "Export complete",
    body: "Brand guidelines PDF for Johnson Luke is ready to download.",
    time: "Yesterday",
  },
  {
    id: 5, type: "project", read: true,
    title: "Varda Finance approved",
    body: "The client approved identity concept v2. Moving to refinement phase.",
    time: "2 days ago",
  },
];

function BellIcon({ count }: { count: number }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2a7 7 0 0 0-7 7v3l-2 3h18l-2-3V9a7 7 0 0 0-7-7z" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 18a2 2 0 0 0 4 0" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span style={{
          position: "absolute", top: -4, right: -4,
          width: 16, height: 16, borderRadius: "50%",
          background: "#E8334A", color: "#FFFFFF",
          fontSize: 10, fontFamily: F, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid #FFFFFF",
        }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}

function NotifItem({ notif, onRead }: { notif: Notification; onRead: (id: number) => void }) {
  return (
    <div
      onClick={() => !notif.read && onRead(notif.id)}
      style={{
        padding: "14px 16px",
        background: notif.read ? "transparent" : "#F5F5FF",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        cursor: notif.read ? "default" : "pointer",
        display: "flex", gap: 12, alignItems: "flex-start",
        transition: "background 150ms ease-out",
      }}
    >
      <div style={{ paddingTop: 4, flexShrink: 0 }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: notif.read ? "transparent" : TYPE_DOT[notif.type],
          border: notif.read ? "1.5px solid rgba(0,0,0,0.15)" : "none",
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: notif.read ? 400 : 700, color: "#0A0A0F" }}>
            {notif.title}
          </p>
          <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4", flexShrink: 0 }}>{notif.time}</span>
        </div>
        <p style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
          {notif.body}
        </p>
      </div>
    </div>
  );
}

function NotificationFeed() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [open, setOpen] = useState(true);
  const unread = notifs.filter(n => !n.read).length;

  function markRead(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Bell trigger */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: 44, height: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            background: open ? "#0A0A0F" : "#F4F4F6",
            border: "1px solid rgba(0,0,0,0.10)", cursor: "pointer",
            transition: "background 150ms ease-out",
          }}
        >
          <div style={{ filter: open ? "invert(1)" : "none" }}>
            <BellIcon count={unread} />
          </div>
        </button>
        <div>
          <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F" }}>
            {unread > 0 ? `${unread} unread notification${unread !== 1 ? "s" : ""}` : "All caught up"}
          </p>
          <p style={{ fontSize: 12, fontFamily: F, color: "#BABAC4" }}>Click bell to toggle feed</p>
        </div>
      </div>

      {/* Feed panel */}
      {open && (
        <div style={{ borderRadius: 10, border: "1px solid rgba(0,0,0,0.10)", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          {/* Panel header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            background: "#FAFAFA",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <p style={{ fontSize: 12, fontFamily: F, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0A0A0F" }}>
              Notifications
            </p>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                style={{ fontSize: 12, fontFamily: F, color: "#0000FF", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Mark all read
              </button>
            )}
          </div>
          {/* Items */}
          <div style={{ background: "#FFFFFF" }}>
            {notifs.map(n => (
              <NotifItem key={n.id} notif={n} onRead={markRead} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationShowcase() {
  return (
    <section id="notifications" className="mb-16">
      <h2 className="mb-2" style={{ fontSize: 28, fontFamily: F, fontWeight: 700, lineHeight: 1.2, color: "#0A0A0F" }}>
        Notifications
      </h2>
      <p className="mb-8" style={{ fontSize: 14, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
        Four notification types: project (blue), mention (green), deadline (red), system (grey). Unread items have a coloured dot and bold title. Click to mark as read.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Interactive feed */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Interactive feed
          </p>
          <NotificationFeed />
        </div>

        {/* Type reference */}
        <div className="p-8 rounded-[10px]" style={{ border: "1px solid rgba(0,0,0,0.10)", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <p className="mb-6" style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5A6A" }}>
            Notification types
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {(["project", "mention", "deadline", "system"] as NotifType[]).map(type => (
              <div key={type} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: TYPE_DOT[type] === "#BABAC4" ? "#F4F4F6" : `${TYPE_DOT[type]}18`,
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: TYPE_DOT[type] }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: "#0A0A0F", marginBottom: 2 }}>
                    {TYPE_LABEL[type]}
                  </p>
                  <p style={{ fontSize: 12, fontFamily: F, color: "#5A5A6A", lineHeight: 1.5 }}>
                    {type === "project" && "Project updates, assignments, and status changes."}
                    {type === "mention" && "Direct mentions in comments or briefs."}
                    {type === "deadline" && "Upcoming or overdue deadline alerts."}
                    {type === "system" && "Exports, imports, and platform activity."}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Badge states */}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <p style={{ fontSize: 12, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5A6A", marginBottom: 16 }}>
              Badge states
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[0, 1, 3, 9, 12].map(count => (
                <div key={count} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, background: "#F4F4F6",
                    border: "1px solid rgba(0,0,0,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <BellIcon count={count} />
                  </div>
                  <span style={{ fontSize: 11, fontFamily: F, color: "#BABAC4" }}>{count === 0 ? "None" : count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 rounded-[6px]" style={{ background: "#EEEEFF", border: "1px solid rgba(27,27,255,0.2)" }}>
        <p style={{ fontSize: 13, fontFamily: F, color: "#0A0A0F", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700 }}>Pattern:</strong> Unread state is visual only — coloured dot, bold title, tinted background. Never use pop-up alerts or sounds. Badge caps at "9+" to avoid layout shift. Clicking an item marks it read; "Mark all read" clears the badge instantly.
        </p>
      </div>
    </section>
  );
}
