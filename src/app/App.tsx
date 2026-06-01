import { useState, useEffect } from "react";
import patternMedClip from "../imports/Artboard_4_copy-1.svg?url";
import patternAltClip from "../imports/Artboard_4_copy_2.svg?url";
import { BrandHero } from "./components/BrandHero";
import { ColorTokens } from "./components/ColorTokens";
import { TypographyScale } from "./components/TypographyScale";
import { SpacingTokens } from "./components/SpacingTokens";
import { ButtonShowcase } from "./components/ButtonShowcase";
import { InputShowcase } from "./components/InputShowcase";
import { CardShowcase } from "./components/CardShowcase";
import { BadgeShowcase } from "./components/BadgeShowcase";
import { MetricShowcase } from "./components/MetricShowcase";
import { AvatarShowcase } from "./components/AvatarShowcase";
import { NavigationShowcase } from "./components/NavigationShowcase";
import { ToastShowcase } from "./components/ToastShowcase";
import { MotionShowcase } from "./components/MotionShowcase";
import { PatternShowcase } from "./components/PatternShowcase";
import { CheckboxShowcase } from "./components/CheckboxShowcase";
import { ToggleShowcase } from "./components/ToggleShowcase";
import { DropdownShowcase } from "./components/DropdownShowcase";
import { TooltipShowcase } from "./components/TooltipShowcase";
import { ProgressShowcase } from "./components/ProgressShowcase";
import { SliderShowcase } from "./components/SliderShowcase";
import { ModalShowcase } from "./components/ModalShowcase";
import { FileInputShowcase } from "./components/FileInputShowcase";
import { TabsShowcase } from "./components/TabsShowcase";
import { TableShowcase } from "./components/TableShowcase";
import { PaginationBreadcrumbShowcase } from "./components/PaginationBreadcrumbShowcase";
import { SlideoutShowcase } from "./components/SlideoutShowcase";
import { NotificationShowcase } from "./components/NotificationShowcase";
import { AccordionShowcase } from "./components/AccordionShowcase";

const navItems = [
  { id: "brand", label: "Brand" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing & Radius" },
  { id: "navigation", label: "Navigation" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "checkboxes", label: "Checkboxes" },
  { id: "toggles", label: "Toggles" },
  { id: "dropdowns", label: "Dropdowns" },
  { id: "tooltips", label: "Tooltips" },
  { id: "progress", label: "Progress" },
  { id: "sliders", label: "Sliders" },
  { id: "modals", label: "Modals" },
  { id: "fileinput", label: "Date & File" },
  { id: "tabs", label: "Tabs" },
  { id: "tables", label: "Tables" },
  { id: "pagination", label: "Pagination" },
  { id: "slideout", label: "Slideout Panels" },
  { id: "notifications", label: "Notifications" },
  { id: "accordion", label: "Accordion" },
  { id: "cards", label: "Cards" },
  { id: "badges", label: "Badges" },
  { id: "metrics", label: "Metrics" },
  { id: "avatars", label: "Avatars" },
  { id: "toasts", label: "Toasts" },
  { id: "motion", label: "Motion" },
  { id: "patterns", label: "Patterns" },
];

export default function App() {
  const [active, setActive] = useState("brand");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  }

  return (
    <div
      style={{
        fontFamily: "'Rethink Sans', sans-serif",
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          minWidth: 220,
          background: "#F4F4F6",
          borderRight: "1px solid rgba(0,0,0,0.10)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
        className="hidden md:flex"
      >
        {/* Sidebar header */}
        <div
          style={{
            padding: "20px 20px 12px",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#BABAC4",
              marginBottom: 4,
            }}
          >
            Johnson Luke
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#0A0A0F",
            }}
          >
            Design System v1.0
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ padding: "12px 12px", flex: 1 }}>
          {navItems.map((item, i) => {
            const isGroupStart = [
              "navigation",
              "checkboxes",
              "tabs",
              "accordion",
              "motion",
              "patterns",
            ].includes(item.id);

            return (
              <div key={item.id}>
                {isGroupStart && (
                  <div
                    style={{
                      height: 1,
                      background: "rgba(0,0,0,0.10)",
                      margin: "8px 8px",
                    }}
                  />
                )}
                <button
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Rethink Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: active === item.id ? 700 : 400,
                    color: active === item.id ? "#1B1BFF" : "#5A5A6A",
                    background:
                      active === item.id ? "#E8E8FF" : "transparent",
                    transition:
                      "background 180ms ease-out, color 180ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== item.id) {
                      e.currentTarget.style.background = "#EBEBEB";
                      e.currentTarget.style.color = "#0A0A0F";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== item.id) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#5A5A6A";
                    }
                  }}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#BABAC4",
              lineHeight: 1.6,
            }}
          >
            Brand Relationship
            <br />
            Design Consultancy
          </p>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#01FF97",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "#5A5A6A",
              }}
            >
              Live system
            </span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        {/* Mobile header */}
        <div
          className="md:hidden flex items-center px-5 py-4"
          style={{
            background: "#FFFFFF",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontFamily: "'Rethink Sans', sans-serif",
              fontWeight: 700,
              color: "#0A0A0F",
            }}
          >
            Johnson Luke Design System
          </p>
          <button
            className="ml-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              fontFamily: "'Rethink Sans', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              color: "#1B1BFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile nav overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              background: "#F4F4F6",
              zIndex: 30,
              overflowY: "auto",
              padding: "20px 16px",
            }}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#1B1BFF",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Close
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: active === item.id ? 700 : 400,
                  color: active === item.id ? "#1B1BFF" : "#0A0A0F",
                  background: active === item.id ? "#E8E8FF" : "transparent",
                  marginBottom: 4,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: "0 0 80px 0" }}>
          <BrandHero />

          <div style={{ padding: "0 40px" }}>
            <ColorTokens />
            <TypographyScale />
            <SpacingTokens />
            <NavigationShowcase />
            <ButtonShowcase />
            <InputShowcase />
            <CheckboxShowcase />
            <ToggleShowcase />
            <DropdownShowcase />
            <TooltipShowcase />
            <ProgressShowcase />
            <SliderShowcase />
            <ModalShowcase />
            <FileInputShowcase />
            <TabsShowcase />
            <TableShowcase />
            <PaginationBreadcrumbShowcase />
            <SlideoutShowcase />
            <NotificationShowcase />
            <AccordionShowcase />
            <CardShowcase />
            <BadgeShowcase />
            <MetricShowcase />
            <AvatarShowcase />
            <ToastShowcase />
            <MotionShowcase />
            <PatternShowcase />

            {/* Exclusions section */}
            <section id="exclusions" className="mb-16" style={{ position: "relative" }}>
              {/* Subtle right-edge texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${patternAltClip})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center right",
                  opacity: 0.06,
                  pointerEvents: "none",
                }}
              />
              <p
                className="mb-3"
                style={{
                  fontSize: 12,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1B1BFF",
                }}
              >
                Deliberate Exclusions
              </p>
              <h2
                className="mb-6"
                style={{
                  fontSize: 40,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: "#0A0A0F",
                }}
              >
                What this system does not include.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "No dark mode toggle",
                    body: "Dark surfaces are deliberate design choices within layouts — not a system-level toggle.",
                  },
                  {
                    title: "No carousel or slider components",
                    body: "Content should be structured to be shown, not hidden behind navigation controls.",
                  },
                  {
                    title: "No loading spinners",
                    body: "Use skeleton screens or progress bars. Spinners communicate only waiting — not direction.",
                  },
                  {
                    title: "No confetti or celebration animations",
                    body: "The system is professional, not gamified. Success is communicated through clarity.",
                  },
                  {
                    title: "No floating images with drop shadows",
                    body: "Photography is full-bleed and editorial. Treat it with editorial weight.",
                  },
                  {
                    title: "No gradient fills on UI components",
                    body: "Gradients are limited to brand illustrations and hero backgrounds — never buttons, cards, or UI surfaces.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      padding: "20px 24px",
                      borderRadius: 10,
                      background: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,0.10)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#E8334A",
                          lineHeight: 1.3,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        ×
                      </span>
                      <div>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "'Rethink Sans', sans-serif",
                            fontWeight: 700,
                            color: "#0A0A0F",
                            marginBottom: 4,
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            fontFamily: "'Rethink Sans', sans-serif",
                            fontWeight: 400,
                            color: "#5A5A6A",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Closing statement */}
            <div
              style={{
                background: "#0A0A0F",
                borderRadius: 10,
                padding: "48px 40px",
                border: "1px solid rgba(255,255,255,0.12)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${patternMedClip})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.14,
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontSize: 12,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#01FF97",
                  marginBottom: 16,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                System Test
              </p>
              <p
                style={{
                  fontSize: 28,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  maxWidth: 560,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Does this look like it belongs to an intelligent, precise, original consultancy — or does it look like it came from a template?
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: 16,
                  fontFamily: "'Rethink Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.64)",
                  maxWidth: 480,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                If the answer is the latter, redesign it. Every component must be
                complete before moving to the next. No placeholder states.
                No "to be defined" tokens.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
