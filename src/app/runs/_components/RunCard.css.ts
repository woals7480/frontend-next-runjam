import { style } from "@vanilla-extract/css";

const radius = "16px";

export const card = style({
  borderRadius: radius,
  background: "rgba(255,255,255,0.92)",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  overflow: "hidden",
  backdropFilter: "saturate(120%) blur(8px)",
  WebkitBackdropFilter: "saturate(120%) blur(8px)",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(17,24,39,0.65)",
      border: "1px solid #374151",
      boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
    },
  },
});

export const inner = style({
  padding: "16px",
});

export const headRow = style({
  display: "flex",
  justifyContent: "space-between",
});

export const headRowLeft = style({
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  columnGap: "12px",
  alignItems: "center",
});

export const headRowRight = style({
  position: "relative",
});

export const dots = style({
  cursor: "pointer",
});

export const thumb = style({
  width: 64,
  height: 64,
  borderRadius: "12px",
  background: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style({
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.15,
  margin: 0,
});

export const subtitle = style({
  marginTop: "4px",
  fontSize: "13px",
  color: "#6b7280",
});

export const metrics = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "8px",
  marginTop: "14px",
});

export const metric = style({
  display: "grid",
  rowGap: 2,
  justifyItems: "start",
});

export const value = style({
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.2px",
});

export const label = style({
  fontSize: "12px",
  color: "#6b7280",
});

export const menu = style({
  position: "absolute",
  top: "18px",
  right: 0,
  minWidth: 140,
  padding: 6,
  borderRadius: 12,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(0,0,0,.12)",
  opacity: 0,
  transform: "translateY(-4px)",
  pointerEvents: "none",
  transition: "opacity .15s ease, transform .15s ease",
  zIndex: 20,
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "rgba(17,24,39,0.95)",
      border: "1px solid #374151",
    },
  },
});

export const menuOpen = style({
  opacity: 1,
  transform: "translateY(0)",
  pointerEvents: "auto",
});

export const item = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 10px",
  borderRadius: 8,
  fontSize: 14,
  lineHeight: 1.1,
  color: "#111827",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  selectors: {
    "&:hover": { background: "#f3f4f6" },
    "&:focus-visible": { outline: "2px solid #60a5fa", outlineOffset: 2 },
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      color: "#e5e7eb",
      selectors: { "&:hover": { background: "rgba(255,255,255,0.10)" } },
    },
  },
});

export const itemIcon = style({ width: 16, height: 16 });
